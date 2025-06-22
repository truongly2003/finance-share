package com.example.community_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.example.community_service.client")
public class CommunityServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(CommunityServiceApplication.class, args);
    }

}
