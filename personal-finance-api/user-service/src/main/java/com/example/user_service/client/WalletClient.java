package com.example.user_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
@FeignClient(name = "finance-service", url = "http://localhost:2000/finance-service")
public interface WalletClient {
    @PostMapping("wallet/create-wallet-default")
    void createWallet(@RequestParam String userId);
}
