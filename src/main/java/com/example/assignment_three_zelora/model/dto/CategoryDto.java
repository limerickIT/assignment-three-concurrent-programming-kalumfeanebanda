package com.example.assignment_three_zelora.model.dto;

public class CategoryDto {
    private Integer categoryId;
    private String categoryName;

    public CategoryDto(Integer categoryId, String categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }


    public Integer getCategoryId()
    {
        return categoryId;
    }

    public String getCategoryName()
    {
        return categoryName;
    }

}
