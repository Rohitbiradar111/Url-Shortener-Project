package com.url.shortener.service;

import com.url.shortener.dtos.UrlMappingDTO;
import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import com.url.shortener.repository.ClickEventRepository;
import com.url.shortener.repository.UrlMappingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UrlMappingServiceTest {

    @Mock
    private UrlMappingRepository urlMappingRepository;

    @Mock
    private ClickEventRepository clickEventRepository;

    @InjectMocks
    private UrlMappingService urlMappingService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setRole("ROLE_USER");
    }

    @Test
    @DisplayName("Should create short URL successfully with https prefix")
    void shouldCreateShortUrlSuccessfully() {
        when(urlMappingRepository.findByShortUrl(any(String.class))).thenReturn(null);
        when(urlMappingRepository.save(any(UrlMapping.class))).thenAnswer(invocation -> invocation.getArgument(0));
        UrlMappingDTO result = urlMappingService.createShortUrl("google.com", testUser);
        assertNotNull(result);
        assertEquals("https://google.com", result.getOriginalUrl());
        assertNotNull(result.getShortUrl());
        assertEquals(8, result.getShortUrl().length());
        assertEquals("test@example.com", result.getEmail());
        verify(urlMappingRepository, times(1)).save(any(UrlMapping.class));
    }

    @Test
    @DisplayName("Should return original URL and increment click count when link is valid")
    void shouldReturnOriginalUrlAndIncrementClickCount() {
        UrlMapping mapping = new UrlMapping();
        mapping.setShortUrl("abc12345");
        mapping.setOriginalUrl("https://youtube.com");
        mapping.setClickCount(0);
        mapping.setExpiresDate(LocalDateTime.now().plusDays(2));

        when(urlMappingRepository.findByShortUrl("abc12345")).thenReturn(mapping);
        UrlMapping result = urlMappingService.getOriginalUrl("abc12345");
        assertNotNull(result);
        assertEquals("https://youtube.com", result.getOriginalUrl());
        assertEquals(1, result.getClickCount());
        verify(urlMappingRepository, times(1)).save(mapping);
        verify(clickEventRepository, times(1)).save(any());
    }

    @Test
    @DisplayName("Should return null when short URL is expired without premature deletion")
    void shouldDeleteAndReturnNullWhenExpired() {
        UrlMapping expiredMapping = new UrlMapping();
        expiredMapping.setShortUrl("expired1");
        expiredMapping.setOriginalUrl("https://expired.com");
        expiredMapping.setExpiresDate(LocalDateTime.now().minusDays(1));

        when(urlMappingRepository.findByShortUrl("expired1")).thenReturn(expiredMapping);
        UrlMapping result = urlMappingService.getOriginalUrl("expired1");
        assertNull(result);
        verify(urlMappingRepository, never()).delete(any());
        verify(clickEventRepository, never()).save(any());
    }
}
