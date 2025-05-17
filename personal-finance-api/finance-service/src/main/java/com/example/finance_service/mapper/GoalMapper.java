package com.example.finance_service.mapper;


import com.example.finance_service.dto.request.GoalRequest;
import com.example.finance_service.dto.response.GoalResponse;
import com.example.finance_service.entity.Goal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GoalMapper {
    @Mapping(source = "userId", target = "userId")
    @Mapping(source = "id", target = "walletId")
    @Mapping(source = "description", target = "description")
    GoalResponse toGoalResponse(Goal goal);
    Goal toGoal(GoalRequest request);
}
