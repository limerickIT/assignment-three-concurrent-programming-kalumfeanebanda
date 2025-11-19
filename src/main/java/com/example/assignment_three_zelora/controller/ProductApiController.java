package com.example.assignment_three_zelora.controller;

import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class ProductApiController {

    private final ProductService productService;

    public ProductApiController(ProductService productService) {
        this.productService = productService;
    }

    // TEMPORARY: return ALL products until we build real search logic
    @GetMapping("/products/search")
    public List<Product> searchProducts() {
        return productService.getAllProducts();
    }

    // TEMPORARY: return a single product (for testing)
    @GetMapping("/products/{id}")
    public Product getProduct(@PathVariable Integer id) {
        return productService.getProductById(id);
    }
}