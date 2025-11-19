package com.example.assignment_three_zelora.controller;

import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.assignment_three_zelora.model.dto.ProductSummaryDto;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/products")   // <-- base path
public class ProductApiController {

    private final ProductService productService;

    public ProductApiController(ProductService productService) {
        this.productService = productService;
    }

    // GET http://localhost:8080/api/products/search
    @GetMapping("/search")
    public List<ProductSummaryDto> searchProducts() {
        // for now: just return all summaries
        return productService.getAllProductSummaries();
    }

    // GET http://localhost:8080/api/products/1
    @GetMapping("/{id:\\d+}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }
}