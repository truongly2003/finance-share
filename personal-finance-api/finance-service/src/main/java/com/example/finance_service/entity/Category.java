package com.example.finance_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String userId;

    private String categoryName;

    // income and expense
    private String categoryType;

    private String description;

    private Instant createdAt;

    private String icon;

    private boolean defaultCategory = false;

}