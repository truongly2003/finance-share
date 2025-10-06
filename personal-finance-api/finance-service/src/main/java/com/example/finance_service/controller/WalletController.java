package com.example.finance_service.controller;

import com.example.finance_service.dto.request.SetDefaultWalletRequest;
import com.example.finance_service.dto.request.WalletRequest;
import com.example.finance_service.dto.request.WalletTransferRequest;
import com.example.finance_service.dto.response.ApiResponse;
import com.example.finance_service.dto.response.WalletResponse;
import com.example.finance_service.entity.Wallet;
import com.example.finance_service.service.IWalletService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wallet")
public class WalletController {
    private final IWalletService walletService;

    public WalletController(IWalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<WalletResponse>> wallet(@RequestParam String userId) {
        List<WalletResponse> wallets = walletService.getAllWallets(userId);
        return ResponseEntity.ok(wallets);
    }

    @PostMapping("/create-wallet-default")
    public ResponseEntity<?> createDefaultWalletForUser(@RequestParam String userId) {
        try {
            walletService.createDefaultWalletForUser(userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("");
        }
    }

    @PutMapping("/default")
    public ResponseEntity<?> setDefaultWallet(
            @RequestBody SetDefaultWalletRequest request) {
        Wallet updatedWallet = walletService.setDefaultWallet(request.getUserId(), request.getWalletId());
        return ResponseEntity.ok(updatedWallet);
    }

    // CRUD operations

    @GetMapping
    public ResponseEntity<ApiResponse<WalletResponse>> getBudgetById(@RequestParam Integer walletId) {
        WalletResponse walletResponse = walletService.getWalletById(walletId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Wallet retrieved by ID", walletResponse));
    }

    @PostMapping
    ResponseEntity<ApiResponse<Boolean>> addWallet(@RequestBody WalletRequest walletRequest) {
        try {
            boolean create = walletService.addWallet(walletRequest);
            if (create) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Wallet added successfully", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to add wallet", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }

    @PutMapping
    ResponseEntity<ApiResponse<Boolean>> updateWallet(@RequestParam Integer walletId, @RequestBody WalletRequest walletRequest) {
        try {
            boolean update = walletService.updateWallet(walletId, walletRequest);
            if (update) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Wallet updated successfully", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to update wallet", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }

    @DeleteMapping
    ResponseEntity<ApiResponse<Boolean>> deleteWallet(@RequestParam Integer walletId) {
        try {
            boolean delete = walletService.deleteWallet(walletId);
            if (delete) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Wallet deleted successfully", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to delete wallet", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transferBetweenWallets(@RequestBody WalletTransferRequest request) {
        try {
            walletService.transfer(
                    request.getFromWalletId(),
                    request.getToWalletId(),
                    request.getAmount()
            );
            return ResponseEntity.ok("Transfer completed successfully!");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}