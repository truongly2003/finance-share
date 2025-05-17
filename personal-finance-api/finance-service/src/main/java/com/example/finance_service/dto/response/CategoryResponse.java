package com.example.finance_service.dto.response;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryResponse {
    Integer id;
    String userId;
    String categoryName;
    String categoryType;
    String description;
    String icon;
    boolean defaultCategory;

    private BigDecimal budgetLimit;
    private BigDecimal budgetSpent;
    private BigDecimal budgetRemaining;
}
