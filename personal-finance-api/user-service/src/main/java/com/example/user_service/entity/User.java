package com.example.user_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Getter
@Setter
@Entity
public class User {
    @Id
    private String userId;

    private String userName;

    private String email;

    private String phoneNumber;

    private String password;

    private String accountType;

    private Instant createdAt;

    private Instant updatedAt;

    private boolean isActive=false;

    private String resetPasswordToken;

    private String loginType;

    @PrePersist
    public void generateUUID() {
        if (this.userId == null) {
            this.userId = UUID.randomUUID().toString();
        }
        if (this.createdAt == null) {
            this.createdAt = OffsetDateTime.now(ZoneOffset.UTC).toInstant();
        }
    }

}