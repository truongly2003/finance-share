package com.example.finance_service.service.impl;

import com.example.common.dto.NotificationEventDto;
import com.example.finance_service.dto.request.TransactionRequest;
import com.example.finance_service.dto.response.TransactionResponse;
import com.example.finance_service.entity.*;
import com.example.finance_service.mapper.TransactionMapper;
import com.example.finance_service.repository.*;
import com.example.finance_service.service.ITransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TransactionService implements ITransactionService {
    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final CategoryRepository categoryRepository;
    private final WalletRepository walletRepository;
    private final BudgetRepository budgetRepository;

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @Override
    public List<TransactionResponse> getAllTransactionByUserIdAndPeriod(String userId, String filterType, Integer walletId) {
        LocalDate startDate;
        LocalDate endDate = LocalDate.now();
        startDate = switch (filterType) {
            case "day" -> endDate;
            case "week" -> endDate.minusDays(endDate.getDayOfWeek().getValue() - 1);
            case "month" -> endDate.withDayOfMonth(1);
            case "year" -> endDate.withDayOfYear(1);
            default -> throw new IllegalArgumentException("Invalid filter type");
        };
        List<Transaction> transactions = transactionRepository.getTransactionsByUserIdAndPeriod(userId, startDate, endDate, walletId);
        return transactions.stream().map(transactionMapper::toTransactionResponse).toList();
    }

    public List<TransactionResponse> getTransactionsByUserIdAndFilterRange(String userId, LocalDate startDate, LocalDate endDate, Integer walletId) {
        List<Transaction> transactions = transactionRepository.getTransactionsByUserIdAndPeriod(userId, startDate, endDate, walletId);
        return transactions.stream().map(transactionMapper::toTransactionResponse).toList();
    }

    // get transaction của budget
    @Override
    public List<TransactionResponse> getAllTransactionByUserIdAndBudgetId(String userId, Integer budgetId) {
        List<Transaction> transactions = transactionRepository.getTransactionsByUserIdAndBudgetId(userId, budgetId);
        return transactions.stream().map(transactionMapper::toTransactionResponse).toList();
    }


    @Override
    public TransactionResponse getTransactionById(Integer id) {
        Transaction transaction = transactionRepository.getTransactionById(id);
        return transactionMapper.toTransactionResponse(transaction);
    }

    private void updateWalletBalance(Transaction transaction, BigDecimal amount, boolean isReversal) {
        BigDecimal adjAmount = amount;
        if ("expense".equalsIgnoreCase(transaction.getCategory().getCategoryType())) {
            adjAmount = adjAmount.negate();
        }
        if (isReversal) {
            adjAmount = adjAmount.negate();
        }
        walletRepository.updateBalance(transaction.getWallet().getId(), adjAmount);
    }

    // kiểm tra coi có đủ ngân sách không
    @Override
    public boolean isExceedBudget(TransactionRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
        if (category == null || !"expense".equalsIgnoreCase(category.getCategoryType())) {
            return false;
        }
        LocalDate today = request.getTransactionDate();
        // Tìm budget phù hợp theo user, category, và ngày trong khoảng ngân sách
        Optional<Budget> budget = budgetRepository.findByUserIdAndCategoryIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                request.getUserId(), request.getCategoryId(), today, today);
        if (budget != null && budget.isPresent()) {
            Budget budget1 = budget.get();
            // tính tổng số tiền chi tiêu trong ngân sách
            BigDecimal totalExpense = transactionRepository.sumAmountByUserIdAndCategoryIdAndTransactionDateBetween(
                    request.getUserId(), request.getCategoryId(), budget1.getStartDate(), budget1.getEndDate()
            );
            totalExpense = totalExpense != null ? totalExpense : BigDecimal.ZERO;
            BigDecimal newTotal = totalExpense.add(request.getAmount());
            return newTotal.compareTo(budget1.getAmountLimit()) > 0;
        }
        return false;
    }

    @Override
    public boolean addTransaction(TransactionRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
        Wallet wallet = walletRepository.findById(request.getWalletId()).orElse(null);
        Transaction transaction = transactionMapper.toTransaction(request);
        transaction.setCategory(category);
        transaction.setWallet(wallet);
        transaction.setUserId(request.getUserId());
        updateWalletBalance(transaction, transaction.getAmount(), false);
        transactionRepository.save(transaction);
        checkBudgetAfterTransaction(transaction);

        return true;
    }

    // kiểm tra giao dịch có vượt quá ngân sách không
    private void checkBudgetAfterTransaction(Transaction transaction) {
        List<Budget> budgets = budgetRepository.findByUserIdAndCategoryId(
                transaction.getUserId(), transaction.getCategory().getId());
        for (Budget budget : budgets) {
            LocalDate today = LocalDate.now();
            if (today.isBefore(budget.getStartDate()) || today.isAfter(budget.getEndDate())) {
                continue;
            }
            BigDecimal totalSpent = transactionRepository.sumTotalExpenseByUserIdAndDateRange(
                    transaction.getUserId(),
                    budget.getStartDate(),
                    budget.getEndDate()
            );
            if (totalSpent == null) totalSpent = BigDecimal.ZERO;
            BigDecimal ninetyPercent = budget.getAmountLimit().multiply(BigDecimal.valueOf(0.9));
            if (totalSpent.compareTo(ninetyPercent) >= 0) {
                NotificationEventDto notificationEventDto = new NotificationEventDto(
                        transaction.getUserId(), "", "", "budget",
                        "Ngân sách \"" + budget.getBudgetName() +
                                "\" đã sử dụng hơn 90%. Hãy kiểm soát chi tiêu!",
                        "budget"
                );
                kafkaTemplate.send("budget_events",notificationEventDto);
            }
        }
    }

    @Override
    public boolean updateTransaction(Integer transactionId, TransactionRequest request) {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(transactionId);
        if (optionalTransaction.isPresent()) {
            Transaction transaction = optionalTransaction.get();
            Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
            transaction.setAmount(request.getAmount());
            transaction.setDescription(request.getDescription());
            transaction.setCategory(category);
            updateWalletBalance(transaction, transaction.getAmount(), false);
            transactionRepository.save(transaction);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteTransaction(Integer transactionId) {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(transactionId);
        if (optionalTransaction.isPresent()) {
            Transaction transaction = optionalTransaction.get();
            updateWalletBalance(transaction, transaction.getAmount(), true);
            transactionRepository.delete(transaction);
        }
        return false;
    }


}
