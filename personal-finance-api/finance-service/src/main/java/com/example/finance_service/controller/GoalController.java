package com.example.finance_service.controller;

import com.example.finance_service.dto.request.GoalRequest;
import com.example.finance_service.dto.response.ApiResponse;
import com.example.finance_service.dto.response.GoalResponse;
import com.example.finance_service.service.IGoalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goal")
public class GoalController {
    private final IGoalService goalService;

    public GoalController(IGoalService goalService) {
        this.goalService = goalService;
    }
    @GetMapping("/te")
    public ResponseEntity<String> getGoals() {
        return ResponseEntity.ok("ok");
    }
    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<List<GoalResponse>>> getAllBudgetByUserId(@RequestParam String userId) {
        List<GoalResponse> goalResponses = goalService.getAllGoalByUserId(userId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Goals retrieved successfully", goalResponses));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<GoalResponse>> getBudgetById(@RequestParam Integer goalId) {
        GoalResponse goalResponse = goalService.getGoalById(goalId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Goal retrieved by ID", goalResponse));
    }

    @PostMapping
    ResponseEntity<ApiResponse<Boolean>> addBudget(@RequestBody GoalRequest goalRequest) {
        try {
            boolean create = goalService.addGoal(goalRequest);
            if (create) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Goal added successfully", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to add goal", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }

    @PutMapping
    ResponseEntity<ApiResponse<Boolean>> updateBudget(@RequestParam Integer goalId, @RequestBody GoalRequest goalRequest) {
        try {
            boolean update = goalService.updateGoal(goalId, goalRequest);
            if (update) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Goal updated successfully", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to update goal", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }

    @DeleteMapping
    ResponseEntity<ApiResponse<Boolean>> deleteBudget(@RequestParam Integer goalId) {
        try {
            boolean delete = goalService.deleteGoal(goalId);
            if (delete) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Goal deleted successfully", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to delete goal", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }
}