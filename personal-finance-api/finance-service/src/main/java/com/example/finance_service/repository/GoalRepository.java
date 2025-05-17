package com.example.finance_service.repository;

import com.example.finance_service.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Integer> {
    List<Goal> getGoalByUserId(String userId);
    Goal getGoalById(Integer id);

    // kiểm tra goal sắp hết hạn ngày hiện tại / ngày hiện tại + 3 ngày
    // goal trong khoảng đó
    List<Goal> findByUserIdAndDeadlineBetween(String userId, LocalDate from, LocalDate to);

}
