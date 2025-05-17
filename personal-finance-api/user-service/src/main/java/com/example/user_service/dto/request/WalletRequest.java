package com.example.user_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WalletRequest {
    String userId;
    String walletName;
    String walletType;
    private String currency;
    private BigDecimal balance;
}

