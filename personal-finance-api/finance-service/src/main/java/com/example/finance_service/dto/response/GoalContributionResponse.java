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
public class GoalContributionResponse {
    Integer id;
    Integer goalId;
    String userId;
    BigDecimal amount;
    LocalDate contributionDate;
    String description;
}
