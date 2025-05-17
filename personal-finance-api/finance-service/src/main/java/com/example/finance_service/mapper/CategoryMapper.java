package com.example.finance_service.mapper;


import com.example.finance_service.dto.request.CategoryRequest;
import com.example.finance_service.dto.response.CategoryResponse;
import com.example.finance_service.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(source = "userId", target = "userId")
    CategoryResponse toCategoryResponse(Category category);
    @Mapping(target = "userId", ignore = true)
    Category toCategory(CategoryRequest request);
}
