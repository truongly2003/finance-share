//package com.example.finance_service.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface UserRepository extends JpaRepository<User, String> {
//    Optional<User> findByEmail(String email);
//
//    boolean existsByEmail(String email);
//
//    Optional<User> findByResetPasswordToken(String token);
//
//    // lấy danh sách user
//    @Query("SELECT DISTINCT t.userId FROM User t")
//    List<String> findDistinctUserIds();
//}
