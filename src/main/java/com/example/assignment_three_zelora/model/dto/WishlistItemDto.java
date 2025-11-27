package com.example.assignment_three_zelora.model.dto;

import java.math.BigDecimal;

public class WishlistItemDto {

    private Integer wishlistId;
    private Integer productId;
    private String productName;
    private BigDecimal effectivePrice;
    private boolean notifyBackInStock;
    private boolean notifyPriceDrop;

    public WishlistItemDto(Integer wishlistId,
                           Integer productId,
                           String productName,
                           BigDecimal effectivePrice,
                           boolean notifyBackInStock,
                           boolean notifyPriceDrop) {
        this.wishlistId = wishlistId;
        this.productId = productId;
        this.productName = productName;
        this.effectivePrice = effectivePrice;
        this.notifyBackInStock = notifyBackInStock;
        this.notifyPriceDrop = notifyPriceDrop;
    }

    public Integer getWishlistId() {
        return wishlistId;
    }

    public Integer getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }

    public BigDecimal getEffectivePrice() {
        return effectivePrice;
    }

    public boolean isNotifyBackInStock() {
        return notifyBackInStock;
    }

    public boolean isNotifyPriceDrop() {
        return notifyPriceDrop;
    }
}