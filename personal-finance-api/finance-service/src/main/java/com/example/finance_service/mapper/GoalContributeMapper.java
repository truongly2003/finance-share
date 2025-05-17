package com.example.finance_service.mapper;

import com.example.finance_service.dto.request.GoalContributionRequest;
import com.example.finance_service.dto.response.GoalContributionResponse;
import com.example.finance_service.entity.GoalContribution;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GoalContributeMapper {
    @Mapping(source = "goal.id", target = "goalId")
    @Mapping(source = "userId", target = "userId")
    @Mapping(source = "description", target = "description")
    GoalContributionResponse toGoalContributionResponse(GoalContribution goalContribution);
    GoalContribution toGoalContribution(GoalContributionRequest request);
}
