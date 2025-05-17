package com.example.user_service.controller;

import com.example.user_service.dto.request.AuthCallbackRequest;
import com.example.user_service.dto.request.LoginRequest;
import com.example.user_service.dto.request.RefreshTokenRequest;
import com.example.user_service.dto.response.UserResponse;
import com.example.user_service.service.IAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    private final IAuthService authService;

    public AuthController(IAuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody LoginRequest requests) {
        return ResponseEntity.ok(authService.handleLogin(requests));
    }

    @GetMapping("/user")
    public ResponseEntity<UserResponse> getUser(@RequestParam String userId) {
        return ResponseEntity.ok(authService.getUser(userId));
    }

    @PostMapping("/callback/google")
    public ResponseEntity<?> callback(@RequestBody AuthCallbackRequest request) {
        return ResponseEntity.ok(authService.handleGoogleCallback(request.getCode()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.refreshAccessToken(request));
    }

    @PostMapping("/callback/facebook")
    public ResponseEntity<?> callbackFacebook(@RequestBody AuthCallbackRequest request) {
        return ResponseEntity.ok(authService.handleFacebookCallback(request.getCode()));
    }
}
