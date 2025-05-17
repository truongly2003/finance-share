package com.example.finance_service.repository;

import com.example.finance_service.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> getCategoryByUserId(String userId);

    @Query("SELECT c FROM Category c WHERE c.userId = :idDefault OR c.userId = :userId")
    List<Category> getAllCategory(@Param("userId") String userId, @Param("idDefault") String idDefault);

    Category getCategoryById(Integer id);

    @Query("SELECT c FROM Category c WHERE c.id = :id AND (c.userId = :userId OR c.userId IS NULL)")
    Optional<Category> findByIdAndUserIdOrDefault(@Param("id") Integer id, @Param("userId") String userId);

    Optional<Category> findByIdAndUserId(Integer id, String userId);

}
