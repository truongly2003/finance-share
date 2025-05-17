package com.example.finance_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
public class GoalContribution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "goal_id")
    private Goal goal;

    private String userId;

    private BigDecimal amount;

    private LocalDate contributionDate;

    private String description;

    @ManyToOne
    @JoinColumn(name = "wallet_id")
    private Wallet wallet;

}