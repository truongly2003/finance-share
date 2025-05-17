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
public class BudgetRequest {
    String budgetName;
    String userId;
    Integer categoryId;
     BigDecimal amountLimit;
    LocalDate startDate;
    LocalDate endDate;
    String status;
}
