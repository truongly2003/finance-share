package com.example.finance_service.controller;

import com.example.finance_service.dto.request.GoalContributionRequest;
import com.example.finance_service.dto.response.ApiResponse;
import com.example.finance_service.dto.response.GoalContributionResponse;
import com.example.finance_service.service.IGoalContributionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contribute")
public class ContributeController {
    final IGoalContributionService goalContribution;

    public ContributeController(IGoalContributionService goalContribution) {
        this.goalContribution = goalContribution;
    }

    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<List<GoalContributionResponse>>> getAllContributeByUserIdAndGoalId(
            @RequestParam Integer goalId, @RequestParam String userId) {
        List<GoalContributionResponse> contributeResponse = goalContribution.getAllGoalByGoalIdAndUserId(goalId, userId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Contributions retrieved successfully", contributeResponse));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<GoalContributionResponse>> getContributeById(@RequestParam Integer contributeId) {
        GoalContributionResponse contributeResponse = goalContribution.getGoalContributionById(contributeId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Contribution retrieved by ID", contributeResponse));
    }

    @PostMapping
    ResponseEntity<ApiResponse<Boolean>> addContribute(@RequestBody GoalContributionRequest contributeRequest) {
        try {
            if (goalContribution.hasBalance(contributeRequest.getGoalId(), contributeRequest.getUserId(), contributeRequest.getAmount(), contributeRequest.getWalletId())) {
                return ResponseEntity.ok(new ApiResponse<>(202, "Insufficient wallet balance", false));
            }
            boolean create = goalContribution.addContribute(contributeRequest);
            if (create) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Contribution added successfully", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to add contribution", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }

    @PutMapping
    ResponseEntity<ApiResponse<Boolean>> updateContribute(@RequestParam Integer contributeId, @RequestBody GoalContributionRequest contributeRequest) {
        try {
            if (goalContribution.hasBalance(contributeRequest.getGoalId(), contributeRequest.getUserId(), contributeRequest.getAmount(), contributeRequest.getWalletId())) {
                return ResponseEntity.ok(new ApiResponse<>(202, "Insufficient wallet balance", false));
            }
            boolean update = goalContribution.updateContribute(contributeId, contributeRequest);
            if (update) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Contribution updated successfully", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to update contribution", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }

    @DeleteMapping
    ResponseEntity<ApiResponse<Boolean>> deleteContribute(@RequestParam Integer contributeId) {
        try {
            boolean delete = goalContribution.deleteContribute(contributeId);
            if (delete) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Contribution deleted successfully", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to delete contribution", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }
}