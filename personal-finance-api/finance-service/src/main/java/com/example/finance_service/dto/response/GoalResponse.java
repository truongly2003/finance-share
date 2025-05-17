package com.example.finance_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GoalResponse {
    Integer id;
    String userId;
    String goalName;
    BigDecimal targetAmount;
    BigDecimal currentAmount;
    LocalDate deadline;
    Integer walletId;
    String status;
    String description;

}
