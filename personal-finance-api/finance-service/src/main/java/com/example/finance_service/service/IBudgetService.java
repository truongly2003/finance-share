package com.example.finance_service.service;


import com.example.finance_service.dto.request.BudgetRequest;
import com.example.finance_service.dto.response.BudgetResponse;

import java.util.List;

public interface IBudgetService {
    List<BudgetResponse> getAllBudgetByUserId(String userId);

    BudgetResponse getBudgetById(Integer id);

    boolean addBudget(BudgetRequest request);

    boolean updateBudget(Integer budgetId, BudgetRequest request);

    boolean deleteBudget(Integer budgetId);
}
