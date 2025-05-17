package com.example.finance_service.service;


import com.example.finance_service.dto.request.CategoryRequest;
import com.example.finance_service.dto.response.CategoryResponse;

import java.util.List;

public interface ICategoryService {
    List<CategoryResponse> getAllCategories(String userId);
    List<CategoryResponse> getAllCategoriesByUserId(String userId);
    CategoryResponse getCategoryById(Integer categoryId);
    boolean addCategory(CategoryRequest categoryRequest);

    boolean updateCategory(Integer categoryId,String userId, CategoryRequest categoryRequest);

    boolean deleteCategory(Integer categoryId,String userId);
}
