package com.example.assignment_three_zelora.model.repos;

import com.example.assignment_three_zelora.model.entitys.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Integer> {

    List<Alert> findByCustomerCustomerIdAndSeenFalse(Integer customerId);

    List<Alert> findByCustomerCustomerIdOrderByCreatedAtDesc(Integer customerId);
}