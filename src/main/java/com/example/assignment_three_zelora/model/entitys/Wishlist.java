package com.example.assignment_three_zelora.model.entitys;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;




@Entity
@Table(name = "wishlist")
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishlist_id")
    private Integer wishlistId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "added_date")
    private LocalDate addedDate;

    @Column(name = "wishlist_name")
    private String wishlistName;

    @Column(name = "notes")
    private String notes;



    @Column(name = "notify_back_in_stock", nullable = false)
    private boolean notifyBackInStock;

    @Column(name = "notify_price_drop", nullable = false)
    private boolean notifyPriceDrop;

    @Column(name = "last_seen_price")
    private BigDecimal lastSeenPrice;

    @Column(name = "last_seen_available")
    private Integer lastSeenAvailable;



    public Integer getWishlistId() {
        return wishlistId;
    }

    public void setWishlistId(Integer wishlistId) {
        this.wishlistId = wishlistId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public LocalDate getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(LocalDate addedDate) {
        this.addedDate = addedDate;
    }

    public String getWishlistName() {
        return wishlistName;
    }

    public void setWishlistName(String wishlistName) {
        this.wishlistName = wishlistName;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public boolean isNotifyBackInStock() {
        return notifyBackInStock;
    }

    public void setNotifyBackInStock(boolean notifyBackInStock) {
        this.notifyBackInStock = notifyBackInStock;
    }

    public boolean isNotifyPriceDrop() {
        return notifyPriceDrop;
    }

    public void setNotifyPriceDrop(boolean notifyPriceDrop) {
        this.notifyPriceDrop = notifyPriceDrop;
    }

    public BigDecimal getLastSeenPrice() {
        return lastSeenPrice;
    }

    public void setLastSeenPrice(BigDecimal lastSeenPrice) {
        this.lastSeenPrice = lastSeenPrice;
    }

    public Integer getLastSeenAvailable() {
        return lastSeenAvailable;
    }

    public void setLastSeenAvailable(Integer lastSeenAvailable) {
        this.lastSeenAvailable = lastSeenAvailable;
    }
}
