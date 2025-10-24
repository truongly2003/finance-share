package com.example.finance_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "user-service", url = "http://localhost:2002")
public interface UserClient {
    @GetMapping("user-service/api/user/get-list-userId")
    List<String> getUserListId();
}
