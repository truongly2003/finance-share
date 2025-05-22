package com.example.api_gateway.client;

import com.example.api_gateway.dto.request.AuthenticateRequest;
import com.example.api_gateway.dto.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.PostExchange;
import reactor.core.publisher.Mono;

public interface AuthenticateClient {
    @PostExchange("/api/auth/authenticate")
    Mono<ApiResponse<Boolean>> authenticate(@RequestBody AuthenticateRequest request);
}
