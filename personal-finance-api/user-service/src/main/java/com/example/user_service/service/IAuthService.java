package com.example.user_service.service;

import com.example.user_service.dto.request.LoginRequest;
import com.example.user_service.dto.request.RefreshTokenRequest;
import com.example.user_service.dto.request.UserRequest;
import com.example.user_service.dto.response.AuthResponse;
import com.example.user_service.dto.response.RefreshTokenResponse;
import com.example.user_service.dto.response.UserResponse;
import com.example.user_service.entity.User;
import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.oauth2.core.user.OAuth2User;

public interface IAuthService {

//    AuthResponse refreshToken(String refreshToken);
    UserResponse processOAuth2User(OAuth2User oAuth2User);

    User addUser(UserRequest request);

    AuthResponse handleLogin(LoginRequest request);

    AuthResponse handleGoogleCallback(String code);

    RefreshTokenResponse refreshAccessToken(RefreshTokenRequest refreshToken);

    UserResponse getUser(String userId);
    AuthResponse handleFacebookCallback(String code);

}
