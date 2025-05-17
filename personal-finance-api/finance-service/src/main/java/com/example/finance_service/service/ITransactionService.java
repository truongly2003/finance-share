package com.example.finance_service.service;



import com.example.finance_service.dto.request.TransactionRequest;
import com.example.finance_service.dto.response.TransactionResponse;

import java.time.LocalDate;
import java.util.List;

public interface ITransactionService {
    List<TransactionResponse> getAllTransactionByUserIdAndPeriod(String id, String filterType, Integer walletId);

    List<TransactionResponse> getTransactionsByUserIdAndFilterRange(String userId, LocalDate startDate, LocalDate endDate,Integer walletId);
    // danh sách giao dịch trong ngân sách
    List<TransactionResponse> getAllTransactionByUserIdAndBudgetId(String userId, Integer budgetId);


    TransactionResponse getTransactionById(Integer id);

    boolean addTransaction(TransactionRequest request);

    boolean updateTransaction(Integer transactionId, TransactionRequest request);

    boolean deleteTransaction(Integer transactionId);

    boolean isExceedBudget(TransactionRequest request);
}
