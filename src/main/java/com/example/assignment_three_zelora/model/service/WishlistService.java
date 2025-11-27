package com.example.assignment_three_zelora.model.service;

import com.example.assignment_three_zelora.model.dto.WishlistItemDto;
import com.example.assignment_three_zelora.model.entitys.Customer;
import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.entitys.Wishlist;

import com.example.assignment_three_zelora.model.repos.ProductRepository;
import com.example.assignment_three_zelora.model.repos.WishlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;


@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;

    public WishlistService(WishlistRepository wishlistRepository,
                           ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.productRepository = productRepository;
    }

    public List<Wishlist> getWishlistForCustomer(Integer customerId) {
        return wishlistRepository.findByCustomerCustomerId(customerId);
    }

    public Wishlist addToWishlist(Customer customer, Product product) {

        // 1. If already exists, just return existing row
        return wishlistRepository
                .findByCustomerCustomerIdAndProductProductId(
                        customer.getCustomerId(), product.getProductId())
                .orElseGet(() -> {

                    Wishlist wishlist = new Wishlist();
                    wishlist.setCustomer(customer);
                    wishlist.setProduct(product);


                    wishlist.setNotifyBackInStock(false);
                    wishlist.setNotifyPriceDrop(false);


                    BigDecimal effectivePrice =
                            (product.getDiscountedPrice() != null
                                    && product.getDiscountedPrice().compareTo(product.getPrice()) < 0)
                                    ? product.getDiscountedPrice()
                                    : product.getPrice();

                    wishlist.setLastSeenPrice(effectivePrice);


                    Integer available = product.getInventoryList().isEmpty()
                            ? 0
                            : product.getInventoryList().get(0).getQuantityInStock()
                            - product.getInventoryList().get(0).getQuantityReserved();

                    wishlist.setLastSeenAvailable(available);

                    return wishlistRepository.save(wishlist);
                });
    }

    @Transactional
    public void removeFromWishlist(Integer customerId, Integer productId) {
        wishlistRepository.deleteByCustomerCustomerIdAndProductProductId(customerId, productId);
    }

    public void updateNotifySettings(Integer customerId, Integer productId,
                                     boolean priceDrop, boolean backInStock) {
        wishlistRepository.findByCustomerCustomerIdAndProductProductId(customerId, productId)
                .ifPresent(w -> {
                    w.setNotifyPriceDrop(priceDrop);
                    w.setNotifyBackInStock(backInStock);
                    wishlistRepository.save(w);
                });
    }


    public List<WishlistItemDto> getWishlistItemsForCustomer(Integer customerId) {
        return wishlistRepository.findItemsForCustomer(customerId);
    }


}