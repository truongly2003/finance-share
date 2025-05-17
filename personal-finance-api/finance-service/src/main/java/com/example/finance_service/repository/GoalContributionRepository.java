package com.example.finance_service.repository;


import com.example.finance_service.entity.GoalContribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalContributionRepository extends JpaRepository<GoalContribution, Integer> {
    List<GoalContribution> getGoalContributionsByGoalIdAndUserId(Integer goalId, String userId);
    GoalContribution getGoalContributionById(int id);
}
