package com.example.api_gateway.config;

import com.example.api_gateway.client.AuthenticateClient;
import com.example.api_gateway.dto.request.AuthenticateRequest;
import com.example.api_gateway.service.AuthenticateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

@Component
@Slf4j
public class AuthenticationFilter implements GlobalFilter, Ordered {
    private final String[] publicEndpoints = {
            "/user-service/api/auth/login",
            "/user-service/api/user/register",
            "/user-service/api/auth/authenticate",
    };
    private final AuthenticateService authenticateService;

    public AuthenticationFilter(AuthenticateService authenticateService) {
        this.authenticateService = authenticateService;
    }


    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String url = exchange.getRequest().getURI().getPath();
        if (isPublicEndpoint(url)) {
            return chain.filter(exchange);
        }
        List<String> authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION);
        if (CollectionUtils.isEmpty(authHeader))
        {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        String token = authHeader.get(0).replace("Bearer ", "");

        return authenticateService.authenticate(token)
                .doOnNext(res -> log.info("Kết quả xác thực: {}", res.getData()))
                .flatMap(res -> {
                    if (res.getData()) {
                        log.info("Authentication successful");
                        return chain.filter(exchange);
                    } else {
                        log.warn("Authentication failed for token");
                        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                        return exchange.getResponse().setComplete();
                    }
                })
                .onErrorResume(e -> {
                    log.error("Authentication error: {}", e.getMessage());
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                });
    }

    @Override
    public int getOrder() {
        return -1;
    }

    private boolean isPublicEndpoint(String endpoint) {
        return Arrays.asList(publicEndpoints).contains(endpoint);
    }
}
