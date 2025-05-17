package com.example.finance_service.mapper;


import com.example.finance_service.dto.request.BudgetRequest;
import com.example.finance_service.dto.response.BudgetResponse;
import com.example.finance_service.entity.Budget;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BudgetMapper {
    @Mapping(source = "userId", target = "userId")
    @Mapping(source = "category.id", target = "categoryId")
    BudgetResponse toBudgetResponse(Budget budget);

    Budget toBudget(BudgetRequest budgetRequest);
}
