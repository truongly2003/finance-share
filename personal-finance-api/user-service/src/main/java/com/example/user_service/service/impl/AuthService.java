package com.example.user_service.service.impl;

import com.example.user_service.client.WalletClient;
import com.example.user_service.config.JwtConfig;
import com.example.user_service.dto.request.LoginRequest;
import com.example.user_service.dto.request.RefreshTokenRequest;
import com.example.user_service.dto.request.UserRequest;
import com.example.user_service.dto.response.AuthResponse;
import com.example.user_service.dto.response.RefreshTokenResponse;
import com.example.user_service.dto.response.UserResponse;
import com.example.user_service.entity.User;
import com.example.user_service.repository.RefreshTokenRepository;
import com.example.user_service.repository.UserRepository;
import com.example.user_service.service.IAuthService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final WalletClient walletClient;
    private final JwtConfig jwtUtil;

    @NonFinal
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    protected String GOOGLE_CLIENT_ID;

    @NonFinal
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    protected String GOOGLE_CLIENT_SECRET;

    @NonFinal
    @Value("${spring.security.oauth2.client.registration.facebook.client-id}")
    protected String FACEBOOK_CLIENT_ID;

    @NonFinal
    @Value("${spring.security.oauth2.client.registration.facebook.client-secret}")
    protected String FACEBOOK_CLIENT_SECRET;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserResponse processOAuth2User(OAuth2User oAuth2User) {
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String id = oAuth2User.getAttribute("sub");
        return UserResponse.builder()
                .id(id)
                .userName(name)
                .email(email)
                .accountType("GOOGLE")
                .build();
    }

    @Override
    public User addUser(UserRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setLoginType("google");
        return userRepository.save(user);
    }

    @Override
    public AuthResponse handleLogin(LoginRequest request) {
        Optional<User> emailExist = userRepository.findByEmail(request.getEmail());
        if (emailExist.isPresent()) {
            User user = emailExist.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getEmail());
                String refreshToken = jwtUtil.generateRefreshToken(user.getEmail(), user.getEmail());
                try {
                    walletClient.createWallet(user.getUserId());
                } catch (Exception e) {
                    log.error("create wallet fail {}: {}", user.getUserId(), e.getMessage());
                }
                return new AuthResponse(true, accessToken, refreshToken, emailExist.get().getUserId());
            }

        }

        return new AuthResponse(false, "", "", "");
    }

    @Override
    public RefreshTokenResponse refreshAccessToken(RefreshTokenRequest refreshToken) {
        String refreshTokenValue = refreshToken.getRefreshToken();
        if (jwtUtil.validateToken(refreshTokenValue)) {
            String email = jwtUtil.extractUsername(refreshTokenValue);
            if (email != null) {
                String newAccessToken = jwtUtil.generateAccessToken(email, email);
                return new RefreshTokenResponse("true", newAccessToken, refreshTokenValue);
            }
        }
        return new RefreshTokenResponse("false", "", "");

    }

    @Override
    public AuthResponse handleGoogleCallback(String code) {
        try {
            String googleAccessToken = getAccessTokenFromGoogle(code);
            UserRequest userRequest = getUserInfoFromGoogle(googleAccessToken);
            Optional<User> existingUser = userRepository.findByEmail(userRequest.getEmail());
            User user = existingUser.orElseGet(() -> addUser(userRequest));

            String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(user.getEmail(), user.getEmail());
//            if (!walletRepository.existsByUserUserId(user.getUserId())) {
//                walletService.createDefaultWalletForUser(user.getUserId());
//            }

            return AuthResponse.builder()
                    .status(true)
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .userId(user.getUserId())
                    .build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }


    @Override
    public UserResponse getUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new UserResponse(user.getUserId(), user.getUserName(), user.getEmail(), user.getPhoneNumber(), user.getAccountType(), user.getCreatedAt());

    }


    private UserRequest getUserInfoFromGoogle(String accessToken) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String userInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<UserRequest> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity,
                UserRequest.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new Exception("Failed to fetch user info");
        }

        return response.getBody();
    }

    private String getAccessTokenFromGoogle(String code) {
        String tokenUrl = "https://oauth2.googleapis.com/token";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", GOOGLE_CLIENT_ID);
        params.add("client_secret", GOOGLE_CLIENT_SECRET);
        params.add("redirect_uri", "http://localhost:5173/oauth2/callback/google");
        params.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);

        return response.getBody().get("access_token").toString();
    }

    public User addUserFacebook(UserRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setLoginType("facebook");
        return userRepository.save(user);
    }

    @Override
    public AuthResponse handleFacebookCallback(String code) {
        try {
            String facebookAccessToken = getAccessTokenFromFacebook(code);
            UserRequest userRequest = getUserInfoFromFacebook(facebookAccessToken);
            User user;
            Optional<User> existingUser = userRepository.findByEmail(userRequest.getEmail());
            if (existingUser.isPresent()) {
                user = existingUser.get();
            } else {
                try {
                    user = addUserFacebook(userRequest);
                } catch (DataIntegrityViolationException e) {
                    user = userRepository.findByEmail(userRequest.getEmail())
                            .orElseThrow(() -> new RuntimeException("Tạo user thất bại, và cũng không tìm lại được", e));
                }
            }

            String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(user.getEmail(), user.getEmail());

//            if (!walletRepository.existsByUserUserId(user.getUserId())) {
//                walletService.createDefaultWalletForUser(user.getUserId());
//            }

            return AuthResponse.builder()
                    .status(true)
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .userId(user.getUserId())
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Lỗi xử lý callback Facebook", e);
        }

    }

    private String getAccessTokenFromFacebook(String code) {
        String tokenUrl = "https://graph.facebook.com/v18.0/oauth/access_token";

        RestTemplate restTemplate = new RestTemplate();
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(tokenUrl)
                .queryParam("client_id", FACEBOOK_CLIENT_ID)
                .queryParam("redirect_uri", "http://localhost:5173/oauth2/callback/facebook")
                .queryParam("client_secret", FACEBOOK_CLIENT_SECRET)
                .queryParam("code", code);

        ResponseEntity<Map> response = restTemplate.getForEntity(builder.toUriString(), Map.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Lỗi lấy access token từ Facebook");
        }

        return response.getBody().get("access_token").toString();
    }

    private UserRequest getUserInfoFromFacebook(String accessToken) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String userInfoUrl = "https://graph.facebook.com/me?fields=id,name,email";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        ResponseEntity<UserRequest> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity,
                UserRequest.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new Exception("Lỗi lấy thông tin người dùng Facebook");
        }

        return response.getBody();
    }

    //
    //
    //    @Transactional(readOnly = true)
    //    @Override
    //    public RefreshTokenResponse refreshAccessToken(String refreshToken) {
    //        try {
    //            return refreshTokenService.findByToken(refreshToken)
    //                    .map(refreshTokenService::verifyExpiration)
    //                    .map(RefreshToken::getUser)
    //                    .map(user -> {
    //                        String newAccessToken = jwtTokenProvider.generateToken(user.getEmail());
    //                        return RefreshTokenResponse.builder()
    //                                .accessToken(newAccessToken)
    //                                .refreshToken(refreshToken)
    //                                .build();
    //                    })
    //                    .orElseThrow(() -> new AuthException("Invalid refresh token"));
    //        } catch (Exception e) {
    //            log.error("Error refreshing token: {}", e.getMessage());
    //            throw new AuthException("Failed to refresh token", e);
    //        }
    //    }
}
