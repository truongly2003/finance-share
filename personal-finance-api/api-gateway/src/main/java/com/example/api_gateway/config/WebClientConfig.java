package com.example.api_gateway.config;

import com.example.api_gateway.client.AuthenticateClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class WebClientConfig {
    @Bean
    WebClient webClient() {
        return WebClient.builder()
                .baseUrl("http://localhost:8081/user-service")
                .build();
    }
    @Bean
    AuthenticateClient authenticateClient(WebClient webClient) {
        HttpServiceProxyFactory httpServiceProxyFactory=HttpServiceProxyFactory
                .builderFor(WebClientAdapter.create(webClient)).build();
        return httpServiceProxyFactory.createClient(AuthenticateClient.class);
    }
}
