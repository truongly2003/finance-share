package com.example.finance_service.service.impl;

import com.example.finance_service.repository.TransactionRepository;
import com.example.finance_service.repository.WalletRepository;
import com.example.finance_service.service.IOverviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class OverviewService implements IOverviewService {
    private final TransactionRepository transactionRepository;
    private final WalletRepository walletRepository;
    @Override
    public BigDecimal getTotalIncome(String userId) {
        return transactionRepository.getTotalIncome(userId);
    }

    @Override
    public BigDecimal getTotalExpenses(String userId) {
        return transactionRepository.getTotalExpense(userId);
    }

    @Override
    public BigDecimal getTotalBalance(String userId) {
        return walletRepository.getTotalBalance(userId);
    }
}
