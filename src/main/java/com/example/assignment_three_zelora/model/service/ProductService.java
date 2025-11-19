package com.example.assignment_three_zelora.model.service;

import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.repos.ProductRepository;
import org.springframework.stereotype.Service;




import com.example.assignment_three_zelora.model.dto.ProductSummaryDto;
import java.util.stream.Collectors;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    //create
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    //Get all
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    //get one
    public Product getProductById(Integer id) {
        return productRepository.findById(id).orElse(null);
    }

    //Update
    public Product updateProduct(Integer id, Product updatedProduct) {
        if (!productRepository.existsById(id)) {
            return null;
        }
        updatedProduct.setProductId(id);
        return productRepository.save(updatedProduct);
    }

    //Delete by id
    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }



    public List<ProductSummaryDto> getAllProductSummaries() {
        return productRepository.findAll()
                .stream()
                .map(p -> new ProductSummaryDto(
                        p.getProductId(),
                        p.getProductName(),
                        p.getDescription(),
                        p.getPrice(),
                        p.getDiscountedPrice(),
                        p.getReleaseDate(),
                        p.getFeatureImage(),
                        p.getSize(),
                        p.getColour(),
                        p.getMaterial(),
                        p.getSustainabilityRating(),
                        p.getManufacturer(),
                        // category may be null
                        p.getCategoryId() != null ? p.getCategoryId().getCategoryId() : null,
                        p.getCategoryId() != null ? p.getCategoryId().getCategoryName() : null,
                        // supplier is optional = false, but be defensive
                        p.getSupplierId() != null ? p.getSupplierId().getSupplierId() : null,
                        p.getSupplierId() != null ? p.getSupplierId().getSupplierName() : null
                ))
                .collect(Collectors.toList());
    }


}
