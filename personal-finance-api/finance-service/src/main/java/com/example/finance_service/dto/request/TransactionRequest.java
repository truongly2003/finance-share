package com.example.finance_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransactionRequest {
    String userId;
    BigDecimal amount;
    String description;
    LocalDate transactionDate;
    Integer categoryId;
    Integer walletId;
    String paymentMethod;
    String transactionStatus;
}
