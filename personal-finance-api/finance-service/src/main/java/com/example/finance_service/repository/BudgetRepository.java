package com.example.finance_service.repository;

import com.example.finance_service.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    List<Budget> getBudgetsByUserId(String userId);

    Budget getBudgetById(Integer id);

    // find byuserId and category Id
    // StartDateLessThanEqual(startDate)	Điều kiện: budget.startDate <= LocalDate.now()
    //    EndDateGreaterThanEqual(endDate)	Điều kiện: budget.endDate >= LocalDate.now()
    Optional<Budget> findByUserIdAndCategoryIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            String userId, Integer categoryId, LocalDate startDate, LocalDate endDate);


    List<Budget> findByUserId(String userId);

    List<Budget> findByUserIdAndEndDateBetween(String userId, LocalDate now, LocalDate localDate);


}
