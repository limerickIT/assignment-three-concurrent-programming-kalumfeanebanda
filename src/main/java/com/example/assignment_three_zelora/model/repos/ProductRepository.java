package com.example.assignment_three_zelora.model.repos;

import com.example.assignment_three_zelora.model.entitys.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {




}