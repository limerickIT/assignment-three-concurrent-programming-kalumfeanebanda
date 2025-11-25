package com.example.assignment_three_zelora.model.service;


import com.example.assignment_three_zelora.model.dto.CategoryDto;
import com.example.assignment_three_zelora.model.repos.CategoryRepository;
import org.springframework.stereotype.Service;
import com.example.assignment_three_zelora.model.entitys.Category;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(c -> new CategoryDto(
                        c.getCategoryId(),
                        c.getCategoryName()
                ))
                .collect(Collectors.toList());
    }


}
