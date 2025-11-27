package com.example.assignment_three_zelora.model.repos;

import com.example.assignment_three_zelora.model.entitys.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}