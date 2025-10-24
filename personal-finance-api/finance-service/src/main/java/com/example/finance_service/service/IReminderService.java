package com.example.finance_service.service;

public interface IReminderService {
    void checkTransaction();
    void checkExpiredGoal();
    void checkBudgetUsage( );
}
