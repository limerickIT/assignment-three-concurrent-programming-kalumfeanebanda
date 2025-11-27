package com.example.assignment_three_zelora.controller;

import com.example.assignment_three_zelora.model.entitys.Alert;
import com.example.assignment_three_zelora.model.repos.AlertRepository;
import com.example.assignment_three_zelora.model.service.AlertService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private static final int DEMO_CUSTOMER_ID = 1;

    private final AlertService alertService;
    private final AlertRepository alertRepository;

    public AlertController(AlertService alertService,
                           AlertRepository alertRepository) {
        this.alertService = alertService;
        this.alertRepository = alertRepository;
    }


    @GetMapping
    public List<Alert> getAlerts(@RequestParam(name = "unseenOnly", defaultValue = "false") boolean unseenOnly) {


        alertService.scanAndGenerateAlerts(DEMO_CUSTOMER_ID);

        if (unseenOnly) {
            return alertRepository.findByCustomerCustomerIdAndSeenFalse(DEMO_CUSTOMER_ID);
        }

        return alertRepository.findByCustomerCustomerIdOrderByCreatedAtDesc(DEMO_CUSTOMER_ID);
    }


    @PostMapping("/{alertId}/seen")
    public ResponseEntity<Void> markSeen(@PathVariable Integer alertId) {
        alertRepository.findById(alertId).ifPresent(alert -> {
            alert.setSeen(true);
            alertRepository.save(alert);
        });
        return ResponseEntity.noContent().build();
    }
}