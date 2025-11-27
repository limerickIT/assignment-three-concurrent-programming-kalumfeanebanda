package com.example.assignment_three_zelora.controller;

import com.example.assignment_three_zelora.model.dto.WishlistItemDto;
import com.example.assignment_three_zelora.model.entitys.Customer;
import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.entitys.Wishlist;
import com.example.assignment_three_zelora.model.repos.ProductRepository;
import com.example.assignment_three_zelora.model.service.WishlistService;
import com.example.assignment_three_zelora.model.repos.CustomerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private static final int DEMO_CUSTOMER_ID = 1; // pretend user 1 is logged in

    private final WishlistService wishlistService;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public WishlistController(WishlistService wishlistService,
                              CustomerRepository customerRepository,
                              ProductRepository productRepository) {
        this.wishlistService = wishlistService;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }


    @GetMapping
    public List<WishlistItemDto> getWishlist() {
        return wishlistService.getWishlistItemsForCustomer(DEMO_CUSTOMER_ID);
    }


    @PostMapping("/{productId}")
    public ResponseEntity<Void> addToWishlist(@PathVariable Integer productId) {
        Customer customer = customerRepository.findById(DEMO_CUSTOMER_ID)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        wishlistService.addToWishlist(customer, product);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable Integer productId) {
        wishlistService.removeFromWishlist(DEMO_CUSTOMER_ID, productId);
        return ResponseEntity.noContent().build();
    }


    @PatchMapping("/{productId}/notifications")
    public ResponseEntity<Void> updateNotifications(@PathVariable Integer productId,
                                                    @RequestParam boolean priceDrop,
                                                    @RequestParam boolean backInStock) {
        wishlistService.updateNotifySettings(DEMO_CUSTOMER_ID, productId, priceDrop, backInStock);
        return ResponseEntity.noContent().build();
    }
}