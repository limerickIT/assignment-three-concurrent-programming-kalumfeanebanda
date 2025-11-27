package com.example.assignment_three_zelora.model.repos;

import com.example.assignment_three_zelora.model.entitys.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {


    List<Review> findByProductId_ProductIdAndRatingGreaterThanEqual(Integer productId, Integer minRating);


    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.productId.productId = :productId")
    Double findAverageRatingForProduct(@Param("productId") Integer productId);
}