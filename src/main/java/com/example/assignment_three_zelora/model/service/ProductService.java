package com.example.assignment_three_zelora.model.service;

import com.example.assignment_three_zelora.model.dto.ReviewDisplayDto;
import com.example.assignment_three_zelora.model.entitys.Inventory;
import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.repos.InventoryRepository;
import com.example.assignment_three_zelora.model.repos.ProductRepository;
import com.example.assignment_three_zelora.model.repos.ReviewRepository;
import org.springframework.stereotype.Service;
import com.example.assignment_three_zelora.model.dto.ProductDetailDto;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.stream.Collectors;



import com.example.assignment_three_zelora.model.dto.ProductSummaryDto;


import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    private final InventoryRepository inventoryRepository;


    public ProductService(ProductRepository productRepository,
                          ReviewRepository reviewRepository,
                          InventoryRepository inventoryRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.inventoryRepository = inventoryRepository;
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
                .map(this::toSummaryDto)
                .collect(Collectors.toList());
    }


    private ProductSummaryDto toSummaryDto(Product p) {
        return new ProductSummaryDto(
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
                p.getCategoryId() != null ? p.getCategoryId().getCategoryId() : null,
                p.getCategoryId() != null ? p.getCategoryId().getCategoryName() : null,
                p.getSupplierId() != null ? p.getSupplierId().getSupplierId() : null,
                p.getSupplierId() != null ? p.getSupplierId().getSupplierName() : null
        );
    }

    public List<ProductSummaryDto> searchProducts(
            String name,
            String keyword,
            Integer categoryId,
            Integer supplierId,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            BigDecimal minDiscount,
            BigDecimal maxDiscount,
            Integer minRating,
            String manufacturer,
            String material,
            String colour,
            String size,
            Boolean recent
    ) {
        List<Product> all = productRepository.findAll();

        final Date recentThreshold;
        if (Boolean.TRUE.equals(recent)) {
            LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
            recentThreshold = Date.from(
                    thirtyDaysAgo.atStartOfDay(ZoneId.systemDefault()).toInstant()
            );
        } else {
            recentThreshold = null;
        }

        String nameLc = name != null ? name.toLowerCase() : null;
        String keywordLc = keyword != null ? keyword.toLowerCase() : null;
        String manufacturerLc = manufacturer != null ? manufacturer.toLowerCase() : null;
        String materialLc = material != null ? material.toLowerCase() : null;
        String colourLc = colour != null ? colour.toLowerCase() : null;
        String sizeLc = size != null ? size.toLowerCase() : null;

        return all.stream()
                // name in product name
                .filter(p -> nameLc == null ||
                        (p.getProductName() != null &&
                                p.getProductName().toLowerCase().contains(nameLc)))

                // keyword in description / material / manufacturer
                .filter(p -> keywordLc == null || matchesKeyword(p, keywordLc))

                // category
                .filter(p -> categoryId == null ||
                        (p.getCategoryId() != null &&
                                categoryId.equals(p.getCategoryId().getCategoryId())))

                // supplier
                .filter(p -> supplierId == null ||
                        (p.getSupplierId() != null &&
                                supplierId.equals(p.getSupplierId().getSupplierId())))

                // price range
                .filter(p -> minPrice == null ||
                        (p.getPrice() != null &&
                                p.getPrice().compareTo(minPrice) >= 0))
                .filter(p -> maxPrice == null ||
                        (p.getPrice() != null &&
                                p.getPrice().compareTo(maxPrice) <= 0))

                // discounted price range
                .filter(p -> minDiscount == null ||
                        (p.getDiscountedPrice() != null &&
                                p.getDiscountedPrice().compareTo(minDiscount) >= 0))
                .filter(p -> maxDiscount == null ||
                        (p.getDiscountedPrice() != null &&
                                p.getDiscountedPrice().compareTo(maxDiscount) <= 0))

                // sustainability rating
                .filter(p -> minRating == null ||
                        (p.getSustainabilityRating() != null &&
                                p.getSustainabilityRating() >= minRating))

                // manufacturer / material / colour / size
                .filter(p -> manufacturerLc == null ||
                        (p.getManufacturer() != null &&
                                p.getManufacturer().toLowerCase().contains(manufacturerLc)))
                .filter(p -> materialLc == null ||
                        (p.getMaterial() != null &&
                                p.getMaterial().toLowerCase().contains(materialLc)))
                .filter(p -> colourLc == null ||
                        (p.getColour() != null &&
                                p.getColour().toLowerCase().contains(colourLc)))
                .filter(p -> sizeLc == null ||
                        (p.getSize() != null &&
                                p.getSize().toLowerCase().contains(sizeLc)))

                // recent products last 30 days
                .filter(p -> recentThreshold == null ||
                        (p.getReleaseDate() != null &&
                                !p.getReleaseDate().before(recentThreshold)))
                .map(this::toSummaryDto)
                .collect(Collectors.toList());
    }


    private ProductDetailDto toDetailDto(Product p,
                                         Double averageRating,
                                         Integer availableQty,
                                         String stockStatus,
                                         List<ReviewDisplayDto> reviews) {

        ProductDetailDto dto = new ProductDetailDto();

        dto.setProductId(p.getProductId());
        dto.setProductName(p.getProductName());
        dto.setDescription(p.getDescription());
        dto.setPrice(p.getPrice());
        dto.setDiscountedPrice(p.getDiscountedPrice());
        dto.setReleaseDate(p.getReleaseDate());
        dto.setFeatureImage(p.getFeatureImage());
        dto.setSize(p.getSize());
        dto.setColour(p.getColour());
        dto.setMaterial(p.getMaterial());
        dto.setSustainabilityRating(p.getSustainabilityRating());
        dto.setManufacturer(p.getManufacturer());

        if (p.getCategoryId() != null) {
            dto.setCategoryId(p.getCategoryId().getCategoryId());
            dto.setCategoryName(p.getCategoryId().getCategoryName());
            dto.setCategoryImage(p.getCategoryId().getCategoryImage());
        }

        if (p.getSupplierId() != null) {
            dto.setSupplierId(p.getSupplierId().getSupplierId());
            dto.setSupplierName(p.getSupplierId().getSupplierName());
            dto.setSupplierWebsite(p.getSupplierId().getWebsite());
            dto.setSupplierDescription(p.getSupplierId().getDescription());
        }

        dto.setAverageRating(averageRating);
        dto.setAvailableQuantity(availableQty);
        dto.setStockStatus(stockStatus);
        dto.setReviews(reviews);

        return dto;
    }


    public ProductDetailDto getProductDetailById(Integer id) {
        Product p = productRepository.findById(id).orElse(null);
        if (p == null) {
            return null;
        }


        Double avg = reviewRepository.findAverageRatingForProduct(id);
        if (avg != null) {
            avg = Math.round(avg * 10.0) / 10.0;
        }


        List<ReviewDisplayDto> reviewDtos = reviewRepository
                .findByProductId_ProductIdAndRatingGreaterThanEqual(id, 3)
                .stream()
                .map(r -> new ReviewDisplayDto(
                        r.getRating(),
                        r.getReviewText(),
                        r.getCustomerId() != null ? r.getCustomerId().getFirstName() : null,
                        r.getCustomerId() != null ? r.getCustomerId().getCity() : null
                ))
                .collect(Collectors.toList());


        int available = 0;
        int reorderPoint = 0;

        List<Inventory> inventoryList = inventoryRepository.findByProductId_ProductId(id);
        if (!inventoryList.isEmpty()) {
            available = inventoryList.stream()
                    .mapToInt(inv -> inv.getQuantityInStock() - inv.getQuantityReserved())
                    .sum();


            reorderPoint = inventoryList.get(0).getReorderPoint();
        }

        String stockStatus;
        if (available <= 0) {
            stockStatus = "Out of stock";
        } else if (available <= reorderPoint) {
            stockStatus = "Low stock — only " + available + " left!";
        } else {
            stockStatus = "In stock (" + available + " available)";
        }

        return toDetailDto(p, avg, available, stockStatus, reviewDtos);
    }




    private boolean matchesKeyword(Product p, String keywordLc) {
        return (p.getDescription() != null &&
                p.getDescription().toLowerCase().contains(keywordLc))
                || (p.getMaterial() != null &&
                p.getMaterial().toLowerCase().contains(keywordLc))
                || (p.getManufacturer() != null &&
                p.getManufacturer().toLowerCase().contains(keywordLc));
    }






}