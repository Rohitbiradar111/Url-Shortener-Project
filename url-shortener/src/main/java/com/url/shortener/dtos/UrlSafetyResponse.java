package com.url.shortener.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UrlSafetyResponse {
    private boolean safe;
    private String safetyLevel;
    private int riskScore;
    private String reason;
}
