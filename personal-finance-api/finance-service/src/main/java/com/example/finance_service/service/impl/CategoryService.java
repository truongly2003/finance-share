package com.example.finance_service.service.impl;


import com.example.finance_service.dto.request.CategoryRequest;
import com.example.finance_service.dto.response.CategoryResponse;
import com.example.finance_service.entity.Budget;
import com.example.finance_service.entity.Category;
import com.example.finance_service.mapper.CategoryMapper;
import com.example.finance_service.repository.BudgetRepository;
import com.example.finance_service.repository.CategoryRepository;
import com.example.finance_service.repository.TransactionRepository;
//import com.example.finance_service.repository.UserRepository;
import com.example.finance_service.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    private final CategoryRepository categoryRepository;
    //    private final UserRepository userRepository;
    private final CategoryMapper categoryMapper;
    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public List<CategoryResponse> getAllCategories(String userId) {
        List<Category> categories = categoryRepository.getAllCategory(userId);
        return categories.stream().map(categoryMapper::toCategoryResponse).toList();
    }

    @Override
    public List<CategoryResponse> getAllCategoriesInAddTransaction(String userId) {
        List<Category> categories = categoryRepository.getAllCategory(userId);
        return categories.stream().map(category -> {
            CategoryResponse categoryResponse = categoryMapper.toCategoryResponse(category);
            // tìm ngân sách có hiệu lực
            Optional<Budget> budget = budgetRepository.findByUserIdAndCategoryIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                    userId, categoryResponse.getId(), LocalDate.now(), LocalDate.now()
            );
            if (budget.isPresent()) {
                Budget budget1 = budget.get();
                BigDecimal budgetLimit = budget1.getAmountLimit();
                BigDecimal spent = transactionRepository
                        .sumAmountByUserIdAndCategoryIdAndTransactionDateBetween(
                                userId,
                                category.getId(),
                                budget1.getStartDate(),
                                budget1.getEndDate()
                        );
                if (spent == null) spent = BigDecimal.ZERO;
                categoryResponse.setBudgetLimit(budgetLimit);
                categoryResponse.setBudgetSpent(spent);
                categoryResponse.setBudgetRemaining(budgetLimit.subtract(spent));
            }
            return categoryResponse;
        }).toList();
    }

    @Override
    public List<CategoryResponse> getAllCategoriesByUserId(String userId) {
        List<Category> categories = categoryRepository.getCategoryByUserId(userId);
        return categories.stream().map(categoryMapper::toCategoryResponse).toList();
    }

    @Override
    public CategoryResponse getCategoryById(Integer categoryId) {
        Category category = categoryRepository.getCategoryById(categoryId);
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    public boolean addCategory(CategoryRequest request) {
//        User user = userRepository.findById(request.getUserId()).orElse(null);
        Category category = categoryMapper.toCategory(request);
        category.setUserId(request.getUserId());
        categoryRepository.save(category);
        return true;
    }

    @Override
    public boolean updateCategory(Integer categoryId, String userId, CategoryRequest request) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
//            if (category.getUser() == null || !category.getUser().getUserId().equals(userId)) {
//                return false;
//            }
//            User user = userRepository.findById(request.getUserId()).orElse(null);
            category.setUserId(request.getUserId());
            category.setCategoryName(request.getCategoryName());
            category.setCategoryType(request.getCategoryType());
            category.setDescription(request.getDescription());
            category.setIcon(request.getIcon());
            categoryRepository.save(category);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteCategory(Integer categoryId, String userId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
//            if (category.getUser() == null || !category.getUser().getUserId().equals(userId)) {
//                return false;
//            }
            categoryRepository.deleteById(categoryId);
            return true;
        }
        return false;
    }


}
