package com.example.finance_service.service.impl;

import com.example.finance_service.dto.request.GoalContributionRequest;
import com.example.finance_service.dto.response.GoalContributionResponse;
import com.example.finance_service.entity.Goal;
import com.example.finance_service.entity.GoalContribution;
import com.example.finance_service.entity.Wallet;
import com.example.finance_service.mapper.GoalContributeMapper;
import com.example.finance_service.repository.GoalContributionRepository;
import com.example.finance_service.repository.GoalRepository;
import com.example.finance_service.repository.WalletRepository;
import com.example.finance_service.service.IGoalContributionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GoalContributionService implements IGoalContributionService {
    //    final UserRepository userRepository;
    final GoalRepository goalRepository;
    final GoalContributionRepository goalContributionRepository;
    final GoalContributeMapper goalContributeMapper;
    final WalletRepository walletRepository;

    @Override
    public List<GoalContributionResponse> getAllGoalByGoalIdAndUserId(Integer goalId, String userId) {
        List<GoalContribution> goalContributions = goalContributionRepository.getGoalContributionsByGoalIdAndUserId(goalId, userId);
        return goalContributions.stream().map(goalContributeMapper::toGoalContributionResponse).toList();
    }

    @Override
    public GoalContributionResponse getGoalContributionById(Integer id) {
        GoalContribution contribution = goalContributionRepository.getGoalContributionById(id);
        return goalContributeMapper.toGoalContributionResponse(contribution);
    }

    @Override
    public boolean addContribute(GoalContributionRequest request) {
        Goal goal = goalRepository.findById(request.getGoalId())
                .orElseThrow(() -> new IllegalArgumentException("Goal not found"));
        Wallet wallet = walletRepository.findById(request.getWalletId())
                .orElseThrow(() -> new IllegalArgumentException("Wallet not found"));
        // kiểm tra số dư
        BigDecimal currentBalance = wallet.getBalance() == null ? BigDecimal.ZERO : wallet.getBalance();
        if (currentBalance.compareTo(request.getAmount()) < 0) {
            return false;
        }
        // thêm đóng góp
        GoalContribution contribution = goalContributeMapper.toGoalContribution(request);
        contribution.setUserId(request.getUserId());
        contribution.setGoal(goal);
        goalContributionRepository.save(contribution);
        // trừ tiền trong ví
        wallet.setBalance(currentBalance.subtract(request.getAmount()));
        walletRepository.save(wallet);
        // lấy số tiền vừa đóng góp + vào mục tiêu hiện tại
        BigDecimal currentGoalAmount = goal.getCurrentAmount() == null ? BigDecimal.ZERO : goal.getCurrentAmount();
        goal.setCurrentAmount(currentGoalAmount.add(request.getAmount()));
        goalRepository.save(goal);
        return true;
    }

    @Override
    public boolean updateContribute(Integer contribId, GoalContributionRequest req) {
//        // Kiểm tra user
//        String userUrl = "http://user-service/api/users/" + req.getUserId();
//        try {
//            restTemplate.getForObject(userUrl, Object.class);
//        } catch (Exception e) {
//            log.error("User {} not found", req.getUserId());
//            throw new IllegalArgumentException("User not found");
//        }

        // Kiểm tra contribution
        GoalContribution contrib = goalContributionRepository.findById(contribId)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("Contribution not found");
                });
        if (!contrib.getUserId().equals(req.getUserId())) {
            throw new IllegalArgumentException("Unauthorized");
        }

        // Kiểm tra goal mới
        Goal newGoal = goalRepository.findById(req.getGoalId())
                .orElseThrow(() -> {
                    return new IllegalArgumentException("Goal not found");
                });
        if (!newGoal.getUserId().equals(req.getUserId())) {
            throw new IllegalArgumentException("Unauthorized");
        }

        // Kiểm tra wallet mới
        Wallet newWallet = walletRepository.findById(req.getWalletId())
                .orElseThrow(() -> {
                    return new IllegalArgumentException("Wallet not found");
                });
        if (!newWallet.getUserId().equals(req.getUserId())) {
            throw new IllegalArgumentException("Unauthorized");
        }

        // Lấy wallet cũ
        Wallet oldWallet = contrib.getWallet();
        BigDecimal oldAmount = contrib.getAmount();
        BigDecimal newAmount = req.getAmount();

        // Xử lý số dư ví
        if (oldWallet.getId().equals(newWallet.getId())) {
            // Cùng ví
            BigDecimal diff = newAmount.subtract(oldAmount);
            BigDecimal balance = oldWallet.getBalance() != null ? oldWallet.getBalance() : BigDecimal.ZERO;
            if (diff.compareTo(BigDecimal.ZERO) > 0 && balance.compareTo(diff) < 0) {
                return false;
            }
            oldWallet.setBalance(balance.subtract(diff));
            walletRepository.save(oldWallet);
        } else {
            // Khác ví
            BigDecimal oldBalance = oldWallet.getBalance() != null ? oldWallet.getBalance() : BigDecimal.ZERO;
            oldWallet.setBalance(oldBalance.add(oldAmount));
            walletRepository.save(oldWallet);

            BigDecimal newBalance = newWallet.getBalance() != null ? newWallet.getBalance() : BigDecimal.ZERO;
            if (newBalance.compareTo(newAmount) < 0) {
                return false;
            }
            newWallet.setBalance(newBalance.subtract(newAmount));
            walletRepository.save(newWallet);
        }

        // Cập nhật goal
        Goal oldGoal = contrib.getGoal();
        BigDecimal oldGoalAmt = oldGoal.getCurrentAmount() != null ? oldGoal.getCurrentAmount() : BigDecimal.ZERO;
        oldGoal.setCurrentAmount(oldGoalAmt.subtract(oldAmount));
        goalRepository.save(oldGoal);

        BigDecimal newGoalAmt = newGoal.getCurrentAmount() != null ? newGoal.getCurrentAmount() : BigDecimal.ZERO;
        newGoal.setCurrentAmount(newGoalAmt.add(newAmount));
        goalRepository.save(newGoal);

        // Cập nhật contribution
        contrib.setGoal(newGoal);
        contrib.setWallet(newWallet);
        contrib.setAmount(newAmount);
        contrib.setContributionDate(req.getContributionDate());
        contrib.setDescription(req.getDescription());
        goalContributionRepository.save(contrib);

        // Gửi thông báo Kafka
        return true;
    }


    @Override
    public boolean deleteContribute(Integer contributeId) {
        Optional<GoalContribution> optional = goalContributionRepository.findById(contributeId);
        if (optional.isPresent()) {
            GoalContribution contribution = optional.get();
            Goal goal = contribution.getGoal();
            Wallet wallet = contribution.getWallet();

            if (wallet == null) return false;

            BigDecimal amount = contribution.getAmount();

            // Cộng lại tiền vào ví
            wallet.setBalance(wallet.getBalance().add(amount));
            walletRepository.save(wallet);

            // Trừ số tiền khỏi mục tiêu
            if (goal.getCurrentAmount() != null) {
                goal.setCurrentAmount(goal.getCurrentAmount().subtract(amount));
                goalRepository.save(goal);
            }

            // Xóa đóng góp
            goalContributionRepository.deleteById(contributeId);
            return true;
        }
        return false;
    }


    @Override
    public boolean hasBalance(Integer goalId, String userId, BigDecimal amount, Integer walletId) {
        Optional<Goal> goalOpt = goalRepository.findById(goalId);

        if (goalOpt.isEmpty()) return true;

        Wallet wallet = walletRepository.findById(walletId).orElse(null);
        return wallet == null || wallet.getBalance().compareTo(amount) < 0;
    }

}
