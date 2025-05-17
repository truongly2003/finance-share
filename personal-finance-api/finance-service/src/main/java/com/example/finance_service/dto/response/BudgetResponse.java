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
public class BudgetResponse {
    Integer id;
    String budgetName;
    String userId;
    Integer categoryId;
    String categoryName;
    BigDecimal amountLimit;
    LocalDate startDate;
    LocalDate endDate;
    String status;
    BigDecimal totalSpent;
}
