package com.example.finance_service.repository;


import com.example.finance_service.entity.Wallet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Integer> {
    @Query("SELECT COALESCE(SUM(w.balance), 0) FROM Wallet w WHERE w.userId = :userId")
    BigDecimal getTotalBalance(@Param("userId") String userId);

    List<Wallet> findByUserId(String userId);
    boolean existsByUserId(String userId);

    @Modifying
    @Transactional
    @Query("UPDATE Wallet w SET w.balance = w.balance + :amount WHERE w.id = :walletId")
    void updateBalance(@Param("walletId") Integer walletId, @Param("amount") BigDecimal amount);

    Wallet getWalletById(Integer id);
}
