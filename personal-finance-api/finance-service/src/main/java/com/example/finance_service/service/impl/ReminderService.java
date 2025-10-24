package com.example.finance_service.service.impl;

import com.example.common.dto.NotificationEventDto;
import com.example.finance_service.client.UserClient;
import com.example.finance_service.repository.TransactionRepository;
import com.example.finance_service.service.IReminderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReminderService implements IReminderService {
    private final TransactionRepository transactionRepository;
    private final UserClient userClient;
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @Override
    @Scheduled(fixedRate = 1000000)
    public void checkTransaction() {
        List<String> listUserId = userClient.getUserListId();
        for (String item : listUserId) {
            if (!transactionRepository.existsByUserIdAndTransactionDate(item, LocalDate.now())) {
                NotificationEventDto notificationEventDto = new NotificationEventDto(
                        item, "", "", "transaction",
                        "Hãy thêm giao dịch ngày hôm nay của bạn nào", "transaction"
                );
                kafkaTemplate.send("transaction_events", notificationEventDto);
            }
        }
    }

    @Override
    public void checkExpiredGoal() {

    }

    @Override
    public void checkBudgetUsage() {

    }
}
