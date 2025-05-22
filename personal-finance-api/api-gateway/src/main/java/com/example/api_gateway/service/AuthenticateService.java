package com.example.api_gateway.service;

import com.example.api_gateway.client.AuthenticateClient;
import com.example.api_gateway.dto.request.AuthenticateRequest;
import com.example.api_gateway.dto.response.ApiResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticateService {
    private final AuthenticateClient authenticateClient;
    public Mono<ApiResponse<Boolean>> authenticate(String token) {
        return authenticateClient.authenticate(AuthenticateRequest.builder().token(token).build());
    }
}
