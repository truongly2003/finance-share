package com.example.finance_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRequest {
     String userName;
     String password;
    String email;
    String phoneNumber;
    String accountType;
    private String loginType;
}
