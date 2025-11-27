package com.example.assignment_three_zelora.model.service;

import com.example.assignment_three_zelora.model.entitys.*;
import com.example.assignment_three_zelora.model.repos.AlertRepository;
import com.example.assignment_three_zelora.model.repos.WishlistRepository;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AlertService {

    private final WishlistRepository wishlistRepository;
    private final AlertRepository alertRepository;

    public AlertService(WishlistRepository wishlistRepository,
                        AlertRepository alertRepository) {
        this.wishlistRepository = wishlistRepository;
        this.alertRepository = alertRepository;
    }

    public void scanAndGenerateAlerts(Integer customerId) {

        List<Wishlist> wishlist = wishlistRepository.findByCustomerCustomerId(customerId);

        for (Wishlist item : wishlist) {

            Product product = item.getProduct();


            BigDecimal effectivePrice = product.getDiscountedPrice() != null &&
                    product.getDiscountedPrice().compareTo(product.getPrice()) < 0
                    ? product.getDiscountedPrice()
                    : product.getPrice();


            Integer available = product.getInventoryList().isEmpty()
                    ? 0
                    : product.getInventoryList().get(0).getQuantityInStock()
                    - product.getInventoryList().get(0).getQuantityReserved();


            if (item.isNotifyPriceDrop()
                    && item.getLastSeenPrice() != null
                    && effectivePrice.compareTo(item.getLastSeenPrice()) < 0) {

                Alert alert = new Alert();
                alert.setAlertType(AlertType.PRICE_DROP);
                alert.setCustomer(item.getCustomer());
                alert.setProduct(product);
                alert.setOldValue(item.getLastSeenPrice());
                alert.setNewValue(effectivePrice);
                alert.setSeen(false);
                alert.setCreatedAt(LocalDateTime.now());
                alertRepository.save(alert);


                item.setLastSeenPrice(effectivePrice);
            }


            if (item.isNotifyBackInStock()
                    && item.getLastSeenAvailable() != null
                    && item.getLastSeenAvailable() <= 0
                    && available > 0) {

                Alert alert = new Alert();
                alert.setAlertType(AlertType.BACK_IN_STOCK);
                alert.setCustomer(item.getCustomer());
                alert.setProduct(product);
                alert.setOldValue(BigDecimal.valueOf(item.getLastSeenAvailable()));
                alert.setNewValue(BigDecimal.valueOf(available));
                alert.setSeen(false);
                alert.setCreatedAt(LocalDateTime.now());
                alertRepository.save(alert);


                item.setLastSeenAvailable(available);
            }

            wishlistRepository.save(item);
        }
    }
}