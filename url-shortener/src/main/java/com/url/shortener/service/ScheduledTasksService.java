package com.url.shortener.service;

import com.url.shortener.models.UrlMapping;
import com.url.shortener.repository.ClickEventRepository;
import com.url.shortener.repository.UrlMappingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduledTasksService {

    private final ClickEventRepository clickEventRepository;
    private final UrlMappingRepository urlMappingRepository;

    @Scheduled(cron = "0 0 * * * ?")
    @Transactional
    public void cleanupOldData() {
        try {
            LocalDateTime now = LocalDateTime.now();
            log.info("Starting scheduled cleanup task at {}", now);

            LocalDateTime clicksCutoff = now.minusDays(5);
            int deletedClicks = clickEventRepository.deleteByClickDateBefore(clicksCutoff);
            log.info("Deleted {} click events older than {}", deletedClicks, clicksCutoff);

            List<UrlMapping> expiredUrls = urlMappingRepository.findByExpiresDateBefore(now);
            if (!expiredUrls.isEmpty()) {
                urlMappingRepository.deleteAll(expiredUrls);
                log.info("Deleted {} expired URL mappings", expiredUrls.size());
            } else {
                log.info("No expired URL mappings found for deletion");
            }
        } catch (Exception e) {
            log.error("Error occurred during scheduled cleanup task: {}", e.getMessage(), e);
        }
    }
}
