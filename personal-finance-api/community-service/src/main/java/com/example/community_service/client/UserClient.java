package com.example.community_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "user-service", url = "http://localhost:8081")
public interface UserClient {
    @GetMapping("user-service/api/user/get-username")
    String getUsername(@RequestParam String userId);

    @GetMapping("user-service/api/user/get-list-username")
    String getListUsername();
}
