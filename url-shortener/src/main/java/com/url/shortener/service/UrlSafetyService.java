package com.url.shortener.service;

import com.url.shortener.dtos.UrlSafetyResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

@Service
@Slf4j
public class UrlSafetyService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private static final Pattern IP_PATTERN = Pattern.compile("^(?:https?://)?(\\d{1,3}\\.){3}\\d{1,3}(?::\\d+)?(/.*)?$");
    
    private static final List<String> SUSPICIOUS_TLDS = Arrays.asList(".zip", ".xyz", ".top", ".click", ".country", ".kim", ".loan", ".work");

    private static final List<String> PHISHING_KEYWORDS = Arrays.asList("login-verify", "bank-update", "account-verification", "paypal-security", "free-crypto", "wallet-connect");

    public UrlSafetyResponse scanUrl(String url) {
        log.info("Scanning URL for phishing and security risks: {}", url);

        UrlSafetyResponse heuristicResult = runHeuristicScan(url);
        if (!heuristicResult.isSafe()) {
            return heuristicResult;
        }

        if (geminiApiKey != null && !geminiApiKey.trim().isEmpty()) {
            try {
                return callGeminiSafetyScan(url);
            } catch (Exception e) {
                log.warn("Gemini safety scan failed, falling back to heuristic result: {}", e.getMessage());
            }
        }

        return heuristicResult;
    }

    private UrlSafetyResponse runHeuristicScan(String url) {
        String lowerUrl = url.toLowerCase().trim();

        if (IP_PATTERN.matcher(lowerUrl).matches()) {
            return new UrlSafetyResponse(false, "UNSAFE", 90, "The provided link is not safe to use (raw IP address).");
        }

        try {
            URI uri = URI.create(lowerUrl.startsWith("http") ? lowerUrl : "https://" + lowerUrl);
            String host = uri.getHost() != null ? uri.getHost() : "";

            for (String tld : SUSPICIOUS_TLDS) {
                if (host.endsWith(tld)) {
                    return new UrlSafetyResponse(false, "SUSPICIOUS", 65, "The provided link is not safe to use (high-risk domain extension).");
                }
            }

            for (String keyword : PHISHING_KEYWORDS) {
                if (lowerUrl.contains(keyword)) {
                    return new UrlSafetyResponse(false, "SUSPICIOUS", 75, "The provided link is not safe to use (deceptive keyword pattern).");
                }
            }

            long dotCount = host.chars().filter(ch -> ch == '.').count();
            if (dotCount > 3) {
                return new UrlSafetyResponse(false, "SUSPICIOUS", 60, "The provided link is not safe to use (excessive subdomains).");
            }

        } catch (Exception e) {
            log.warn("Error parsing URL during heuristic scan: {}", e.getMessage());
        }

        return new UrlSafetyResponse(true, "SAFE", 5, "The provided link is safe to use.");
    }

    private UrlSafetyResponse callGeminiSafetyScan(String url) {
        log.info("Calling Gemini AI base model for: {}", url);
        RestClient restClient = RestClient.create();
        String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=" + geminiApiKey;

        String prompt = "Analyze this URL for phishing, scam, or security threats: " + url + 
                ". Start your reply with either SAFE: or UNSAFE: followed by a short 1-sentence explanation of why.";

        String requestBody = "{\"contents\": [{\"parts\": [{\"text\": \"" + prompt + "\"}]}]}";

        String response = restClient.post()
                .uri(endpoint)
                .header("Content-Type", "application/json")
                .body(requestBody)
                .retrieve()
                .body(String.class);

        boolean isUnsafe = response != null && response.toUpperCase().contains("UNSAFE");
        String aiReason = extractReason(response, "");

        if (isUnsafe) {
            String reasonMsg = (aiReason != null && !aiReason.isEmpty())
                    ? "The provided link is not safe to use: " + aiReason
                    : "The provided link is not safe to use.";
            log.info("Gemini AI flagged unsafe URL: {}", url);
            return new UrlSafetyResponse(false, "UNSAFE", 85, reasonMsg);
        }

        String reasonMsg = (aiReason != null && !aiReason.isEmpty())
                ? "The provided link is safe to use: " + aiReason
                : "The provided link is safe to use.";
        log.info("Gemini AI verified safe URL: {}", url);
        return new UrlSafetyResponse(true, "SAFE", 10, reasonMsg);
    }

    private String extractReason(String rawResponse, String defaultReason) {
        try {
            int textIdx = rawResponse.indexOf("\"text\": \"");
            if (textIdx != -1) {
                int start = textIdx + 9;
                int end = rawResponse.indexOf("\"", start);
                if (end > start) {
                    String extracted = rawResponse.substring(start, end).replace("\\n", " ").trim();
                    if (extracted.contains(":")) {
                        return extracted.substring(extracted.indexOf(":") + 1).trim();
                    }
                    return extracted;
                }
            }
        } catch (Exception e) {
            log.warn("Could not parse reason from Gemini response: {}", e.getMessage());
        }
        return defaultReason;
    }
}
