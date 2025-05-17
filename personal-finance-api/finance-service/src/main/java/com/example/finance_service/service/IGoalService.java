package com.example.finance_service.service;



import com.example.finance_service.dto.request.GoalRequest;
import com.example.finance_service.dto.response.GoalResponse;

import java.util.List;

public interface IGoalService {
    List<GoalResponse> getAllGoalByUserId(String userId);

    GoalResponse getGoalById(Integer id);

    boolean addGoal(GoalRequest request);

    boolean updateGoal(Integer goalId, GoalRequest request);

    boolean deleteGoal(Integer goalId);
}
