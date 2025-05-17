package com.example.user_service.controller;

import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("api/oauth")
@RequiredArgsConstructor
public class Oauth2AuthApiController {
    @NonFinal
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    protected String GOOGLE_CLIENT_ID;

    @NonFinal
    @Value("${FACEBOOK_CLIENT_ID}")
    protected String FACEBOOK_CLIENT_ID;

    String googleRedirectUri = "http://localhost:5173/oauth2/callback/google";
    String facebookRedirectUri = "http://localhost:5173/oauth2/callback/facebook";
    @GetMapping("/google")
    public ResponseEntity<Map<String, String>> getGoogleAuthUrl() {
        String googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=" + GOOGLE_CLIENT_ID +
                "&scope=email profile&redirect_uri=" + googleRedirectUri + "&access_type=offline&prompt=select_account";
        Map<String, String> response = new HashMap<>();
        response.put("authUrl", googleAuthUrl);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/facebook")
    public ResponseEntity<?> getFacebookAuthUrl() {
        String authUrl = UriComponentsBuilder
                .fromUriString("https://www.facebook.com/v18.0/dialog/oauth")
                .queryParam("client_id", FACEBOOK_CLIENT_ID)
                .queryParam("redirect_uri", facebookRedirectUri)
                .queryParam("response_type", "code")
                .queryParam("scope", "email")
                .toUriString();


        return ResponseEntity.ok(Map.of("authUrl", authUrl));
    }
}