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
public class GoalRequest {
    String userId;
    String goalName;
    BigDecimal targetAmount;
    BigDecimal currentAmount;
    LocalDate deadline;
    Integer walletId;
    String status;
    String description;
}
