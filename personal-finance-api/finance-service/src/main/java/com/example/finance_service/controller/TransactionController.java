package com.example.finance_service.controller;

import com.example.finance_service.dto.request.TransactionRequest;
import com.example.finance_service.dto.response.ApiResponse;
import com.example.finance_service.dto.response.TransactionResponse;
import com.example.finance_service.service.ITransactionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
    private final ITransactionService transactionService;

    public TransactionController(ITransactionService transactionService  ) {
        this.transactionService = transactionService;

    }

    // Retrieve list of transactions by user ID and wallet ID
    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<List<TransactionResponse>>> getTransactionByUserIdAnd(
            @RequestParam String userId,
            @RequestParam String filterType,
            @RequestParam Integer walletId) {
        List<TransactionResponse> transactionResponses = transactionService.getAllTransactionByUserIdAndPeriod(userId, filterType, walletId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Transactions retrieved successfully", transactionResponses));
    }

    // Retrieve list of transactions by user ID, wallet ID, and date range
    @GetMapping("/filter-range")
    public ResponseEntity<ApiResponse<List<TransactionResponse>>> getTransactionsByCustomRange(
            @RequestParam String userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam Integer walletId) {
        List<TransactionResponse> transactions = transactionService.getTransactionsByUserIdAndFilterRange(userId, startDate, endDate, walletId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Transactions retrieved successfully", transactions));
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<TransactionResponse>> getTransactionById(@RequestParam Integer transactionId) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Transaction retrieved successfully", transactionService.getTransactionById(transactionId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Boolean>> addTransaction(@RequestBody TransactionRequest request) {
        try {
            if (transactionService.isExceedBudget(request)) {
                return ResponseEntity.ok(new ApiResponse<>(202, "Transaction exceeds budget", false));
            }
            boolean create = transactionService.addTransaction(request);
            if (create) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Transaction added successfully", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to add transaction", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }

    @PutMapping("/{transactionId}")
    public ResponseEntity<ApiResponse<Boolean>> updateTransaction(@PathVariable Integer transactionId, @RequestBody TransactionRequest request) {
        try {
            if (transactionService.isExceedBudget(request)) {
                return ResponseEntity.ok(new ApiResponse<>(202, "Transaction exceeds budget", false));
            }
            boolean create = transactionService.updateTransaction(transactionId, request);
            if (create) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Transaction updated successfully", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to update transaction", true));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Boolean>> deleteTransactionById(@RequestParam Integer transactionId) {
        try {
            boolean delete = transactionService.deleteTransaction(transactionId);
            if (!delete) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Transaction deleted successfully", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to delete transaction", true));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }

    @GetMapping("/budget-list")
    public ResponseEntity<ApiResponse<List<TransactionResponse>>> getBudgetByUserId(
            @RequestParam String userId,
            @RequestParam Integer budgetId) {
        List<TransactionResponse> transactions = transactionService.getAllTransactionByUserIdAndBudgetId(userId, budgetId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Transactions retrieved successfully", transactions));
    }
}