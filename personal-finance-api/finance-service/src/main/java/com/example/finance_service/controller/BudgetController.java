package com.example.finance_service.controller;
import com.example.finance_service.dto.request.BudgetRequest;
import com.example.finance_service.dto.response.ApiResponse;
import com.example.finance_service.dto.response.BudgetResponse;
import com.example.finance_service.service.IBudgetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/budget")
public class BudgetController {
    private final IBudgetService budgetService;

    public BudgetController(IBudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<List<BudgetResponse>>> getAllBudgetByUserId(@RequestParam String userId) {
        List<BudgetResponse> budgetResponses = budgetService.getAllBudgetByUserId(userId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Get list successfully", budgetResponses));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<BudgetResponse>> getBudgetById(@RequestParam Integer budgetId) {
        BudgetResponse budgetResponse = budgetService.getBudgetById(budgetId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Get budget by id", budgetResponse));
    }

    @PostMapping
    ResponseEntity<ApiResponse<Boolean>> addBudget(@RequestBody BudgetRequest budgetRequest) {
        try {
            boolean create = budgetService.addBudget(budgetRequest);
            if (create) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Add budget successfully", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Add budget fail", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }

    @PutMapping
    ResponseEntity<ApiResponse<Boolean>> updateBudget(@RequestParam Integer budgetId, @RequestBody BudgetRequest budgetRequest) {
        try {
            boolean update = budgetService.updateBudget(budgetId, budgetRequest);
            if (update) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Update budget successfully", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Update budget fail", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }

    @DeleteMapping
    ResponseEntity<ApiResponse<Boolean>> deleteBudget(@RequestParam Integer budgetId) {
        try {
            boolean delete = budgetService.deleteBudget(budgetId);
            if (delete) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Delete budget successfully ", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Delete budget fail", false));

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "Lỗi hệ thống: " + e.getMessage(), false));
        }
    }



}
