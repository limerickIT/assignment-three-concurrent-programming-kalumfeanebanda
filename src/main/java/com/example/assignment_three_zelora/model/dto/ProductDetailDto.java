package com.example.assignment_three_zelora.model.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;



public class ProductDetailDto {

    private Integer productId;
    private String productName;
    private String description;
    private BigDecimal price;
    private BigDecimal discountedPrice;
    private Date releaseDate;
    private String featureImage;

    private String size;
    private String colour;
    private String material;
    private Integer sustainabilityRating;
    private String manufacturer;

    private Integer categoryId;
    private String categoryName;
    private String categoryImage;

    private Integer supplierId;
    private String supplierName;
    private String supplierWebsite;
    private String supplierDescription;


    private Double averageRating;
    private List<ReviewDisplayDto> reviews;
    private Integer availableQuantity;
    private String stockStatus;

    public ProductDetailDto() {}

    public ProductDetailDto(
            Integer productId,
            String productName,
            String description,
            BigDecimal price,
            BigDecimal discountedPrice,
            Date releaseDate,
            String featureImage,
            String size,
            String colour,
            String material,
            Integer sustainabilityRating,
            String manufacturer,
            Integer categoryId,
            String categoryName,
            String categoryImage,
            Integer supplierId,
            String supplierName,
            String supplierWebsite,
            String supplierDescription
    ) {
        this.productId = productId;
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.releaseDate = releaseDate;
        this.featureImage = featureImage;
        this.size = size;
        this.colour = colour;
        this.material = material;
        this.sustainabilityRating = sustainabilityRating;
        this.manufacturer = manufacturer;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryImage = categoryImage;
        this.supplierId = supplierId;
        this.supplierName = supplierName;
        this.supplierWebsite = supplierWebsite;
        this.supplierDescription = supplierDescription;
    }

    public Integer getProductId() { return productId; }
    public void setProductId(Integer productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public BigDecimal getDiscountedPrice() { return discountedPrice; }
    public void setDiscountedPrice(BigDecimal discountedPrice) { this.discountedPrice = discountedPrice; }

    public Date getReleaseDate() { return releaseDate; }
    public void setReleaseDate(Date releaseDate) { this.releaseDate = releaseDate; }

    public String getFeatureImage() { return featureImage; }
    public void setFeatureImage(String featureImage) { this.featureImage = featureImage; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public String getColour() { return colour; }
    public void setColour(String colour) { this.colour = colour; }

    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }

    public Integer getSustainabilityRating() { return sustainabilityRating; }
    public void setSustainabilityRating(Integer sustainabilityRating) { this.sustainabilityRating = sustainabilityRating; }

    public String getManufacturer() { return manufacturer; }
    public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }

    public Integer getCategoryId() { return categoryId; }
    public void setCategoryId(Integer categoryId) { this.categoryId = categoryId; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getCategoryImage() { return categoryImage; }
    public void setCategoryImage(String categoryImage) { this.categoryImage = categoryImage; }

    public Integer getSupplierId() { return supplierId; }
    public void setSupplierId(Integer supplierId) { this.supplierId = supplierId; }

    public String getSupplierName() { return supplierName; }
    public void setSupplierName(String supplierName) { this.supplierName = supplierName; }

    public String getSupplierWebsite() { return supplierWebsite; }
    public void setSupplierWebsite(String supplierWebsite) { this.supplierWebsite = supplierWebsite; }

    public String getSupplierDescription() { return supplierDescription; }
    public void setSupplierDescription(String supplierDescription) { this.supplierDescription = supplierDescription; }

    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }

    public List<ReviewDisplayDto> getReviews() { return reviews; }
    public void setReviews(List<ReviewDisplayDto> reviews) { this.reviews = reviews; }

    public Integer getAvailableQuantity() { return availableQuantity; }
    public void setAvailableQuantity(Integer availableQuantity) { this.availableQuantity = availableQuantity; }

    public String getStockStatus() { return stockStatus; }
    public void setStockStatus(String stockStatus) { this.stockStatus = stockStatus; }

}
