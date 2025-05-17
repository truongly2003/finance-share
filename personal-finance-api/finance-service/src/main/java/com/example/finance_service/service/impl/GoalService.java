package com.example.finance_service.service.impl;

import com.example.finance_service.dto.request.GoalRequest;
import com.example.finance_service.dto.response.GoalResponse;
import com.example.finance_service.entity.Goal;
import com.example.finance_service.entity.Wallet;
import com.example.finance_service.mapper.GoalMapper;
import com.example.finance_service.repository.GoalRepository;
//import com.example.finance_service.repository.UserRepository;
import com.example.finance_service.repository.WalletRepository;
import com.example.finance_service.service.IGoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GoalService implements IGoalService {
    private final GoalRepository goalRepository;
//    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final GoalMapper goalMapper;

    @Override
    public List<GoalResponse> getAllGoalByUserId(String userId) {
        List<Goal> goals = goalRepository.getGoalByUserId(userId);
        return goals.stream().map(goalMapper::toGoalResponse).toList();
    }

    @Override
    public GoalResponse getGoalById(Integer id) {
        Goal goal = goalRepository.getGoalById(id);
        return goalMapper.toGoalResponse(goal);
    }

    @Override
    public boolean addGoal(GoalRequest request) {
//        User user = userRepository.findById(request.getUserId()).orElse(null);
        Wallet wallet = walletRepository.findById(request.getWalletId()).orElse(null);
        Goal goal = goalMapper.toGoal(request);
        goal.setUserId(request.getUserId());
        goalRepository.save(goal);
        return true;
    }

    @Override
    public boolean updateGoal(Integer goalId, GoalRequest request) {
        Optional<Goal> goal = goalRepository.findById(goalId);
        if (goal.isPresent()) {
            Goal goal1 = goal.get();
            Wallet wallet = walletRepository.findById(request.getWalletId()).orElse(null);
            goal1.setUserId(request.getUserId());
            goal1.setGoalName(request.getGoalName());
            goal1.setCurrentAmount(request.getCurrentAmount());
            goal1.setTargetAmount(request.getTargetAmount());
            goal1.setDeadline(request.getDeadline());
            goal1.setStatus(request.getStatus());
            goalRepository.save(goal1);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteGoal(Integer goalId) {
        if (goalRepository.existsById(goalId)) {
            goalRepository.deleteById(goalId);
            return true;
        }
        return false;
    }
}
