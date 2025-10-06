package com.example.finance_service.controller;

import com.example.finance_service.dto.request.CategoryRequest;
import com.example.finance_service.dto.response.ApiResponse;
import com.example.finance_service.dto.response.CategoryResponse;
import com.example.finance_service.service.ICategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    private final ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories(@RequestParam String userId) {
        List<CategoryResponse> categories = categoryService.getAllCategories(userId);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/category-detail")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryId(@RequestParam Integer categoryId) {
        return ResponseEntity.ok(new ApiResponse<>(200, "success", categoryService.getCategoryById(categoryId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Boolean>> createCategory(@RequestBody CategoryRequest category) {
        try {
            boolean created = categoryService.addCategory(category);
            if (created) {
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(new ApiResponse<>(200, "Category added successfully.", true));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse<>(400, "Failed to add category.", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }

    @PutMapping
    public ResponseEntity<ApiResponse<Boolean>> updateCategory(@RequestParam Integer categoryId, @RequestParam String userId, @RequestBody CategoryRequest request) {
        try {
            boolean updated = categoryService.updateCategory(categoryId, userId, request);
            if (updated) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Category updated successfully.", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to update category.", true));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), false));
        }
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Boolean>> deleteCategory(@RequestParam Integer categoryId, @RequestParam String userId) {
        try {
            boolean isDeleted = categoryService.deleteCategory(categoryId, userId);
            if (isDeleted) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Category deleted successfully.", null));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Failed to delete category.", null));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "System error: " + e.getMessage(), null));
        }
    }
}