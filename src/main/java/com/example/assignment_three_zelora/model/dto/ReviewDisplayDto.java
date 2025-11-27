package com.example.assignment_three_zelora.model.dto;

public class ReviewDisplayDto {

    private Integer rating;
    private String comment;
    private String customerFirstName;
    private String customerCity;

    public ReviewDisplayDto() {}

    public ReviewDisplayDto(Integer rating,
                            String comment,
                            String customerFirstName,
                            String customerCity) {
        this.rating = rating;
        this.comment = comment;
        this.customerFirstName = customerFirstName;
        this.customerCity = customerCity;
    }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public String getCustomerFirstName() { return customerFirstName; }
    public void setCustomerFirstName(String customerFirstName) { this.customerFirstName = customerFirstName; }

    public String getCustomerCity() { return customerCity; }
    public void setCustomerCity(String customerCity) { this.customerCity = customerCity; }
}