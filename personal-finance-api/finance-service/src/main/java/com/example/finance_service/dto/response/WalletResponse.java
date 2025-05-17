package com.example.finance_service.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WalletResponse {
    Integer id;
    String userId;
    String walletName;
    String walletType;
    private String currency;
    private BigDecimal balance;
}

