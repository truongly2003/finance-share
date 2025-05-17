package com.example.finance_service.service;



import com.example.finance_service.dto.request.WalletRequest;
import com.example.finance_service.dto.response.WalletResponse;
import com.example.finance_service.entity.Wallet;

import java.math.BigDecimal;
import java.util.List;

public interface IWalletService {
    void createDefaultWalletForUser(String userId);

    List<WalletResponse> getAllWallets(String userId);

    Wallet setDefaultWallet(String userId, Integer walletId);
    //    crud
    WalletResponse getWalletById(Integer id);

    boolean addWallet(WalletRequest request);

    boolean updateWallet(Integer walletId, WalletRequest request);

    boolean deleteWallet(Integer budgetId);

    void transfer(Integer fromWalletId, Integer toWalletId, BigDecimal amount);

}
