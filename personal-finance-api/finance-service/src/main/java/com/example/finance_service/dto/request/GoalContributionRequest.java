package com.example.finance_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GoalContributionRequest {
    Integer goalId;
    String userId;
    BigDecimal amount;
    LocalDate contributionDate;
    String description;
    Integer walletId;

}
