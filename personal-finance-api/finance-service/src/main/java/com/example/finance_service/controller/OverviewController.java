package com.example.finance_service.controller;

import com.example.finance_service.service.IOverviewService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/overview")
public class OverviewController {
    private final IOverviewService overviewService;
    public OverviewController(IOverviewService overviewService, IOverviewService overviewService1) {
        this.overviewService = overviewService1;
    }
    @GetMapping("/total-balance")
    public Map<String, BigDecimal> getFinancialSummary(@RequestParam String userId) {
        return Map.of(
                "totalBalance", overviewService.getTotalBalance(userId),
                "totalIncome", overviewService.getTotalIncome(userId),
                "totalExpense", overviewService.getTotalExpenses(userId)
        );
    }
}
