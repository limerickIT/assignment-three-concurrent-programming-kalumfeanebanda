package com.example.assignment_three_zelora.model.repos;

import com.example.assignment_three_zelora.model.entitys.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

    List<Inventory> findByProductId_ProductId(Integer productId);
}