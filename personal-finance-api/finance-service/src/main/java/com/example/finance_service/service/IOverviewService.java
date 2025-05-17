package com.example.finance_service.service;

import java.math.BigDecimal;

public interface IOverviewService {
    BigDecimal getTotalIncome(String userId);
    BigDecimal getTotalExpenses(String userId);
    BigDecimal getTotalBalance(String userId);
}
