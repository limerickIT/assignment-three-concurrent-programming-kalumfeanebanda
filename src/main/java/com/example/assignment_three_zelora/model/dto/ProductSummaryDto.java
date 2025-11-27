package com.example.assignment_three_zelora.model.dto;


import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


public class ProductSummaryDto {

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
    private Integer supplierId;
    private String supplierName;



    public ProductSummaryDto(Integer productId,
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
                             Integer supplierId,
                             String supplierName) {
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
        this.supplierId = supplierId;
        this.supplierName = supplierName;
    }

        public Integer getProductId() {
            return productId;
        }

        public String getProductName() {
            return productName;
        }

        public String getDescription() {
            return description;
        }

        public BigDecimal getPrice() {
            return price;
        }

        public BigDecimal getDiscountedPrice() {
            return discountedPrice;
        }

        public Date getReleaseDate() {
            return releaseDate;
        }

        public String getFeatureImage() {
            return featureImage;
        }

        public String getSize() {
            return size;
        }

        public String getColour() {
            return colour;
        }

        public String getMaterial() {
            return material;
        }

        public Integer getSustainabilityRating() {
            return sustainabilityRating;
        }

        public String getManufacturer() {
            return manufacturer;
        }

        public Integer getCategoryId() {
            return categoryId;
        }

        public String getCategoryName() {
            return categoryName;
        }

        public Integer getSupplierId() {
            return supplierId;
        }

        public String getSupplierName() {
            return supplierName;
        }

}