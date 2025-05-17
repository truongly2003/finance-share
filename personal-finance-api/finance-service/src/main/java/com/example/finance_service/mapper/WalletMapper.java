package com.example.finance_service.mapper;


import com.example.finance_service.dto.request.WalletRequest;
import com.example.finance_service.dto.response.WalletResponse;
import com.example.finance_service.entity.Wallet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WalletMapper {
    @Mapping(source = "userId", target = "userId")
    WalletResponse toWalletResponse(Wallet wallet);
    Wallet toWallet(WalletRequest walletRequest);
}
