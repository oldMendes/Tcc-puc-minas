package io.java.project.controller;

import io.java.project.exception.ResourceNotFoundException;
import io.java.project.model.Maintenance;
import io.java.project.repository.MaintenanceRepository;
import io.java.project.service.ActiveService;
import io.java.project.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@CrossOrigin
public class MaintenanceController {

    @Autowired
    public MaintenanceRepository maintenanceRepository;

    @Autowired
    public MaintenanceService maintenanceService;

    @Autowired
    private ActiveService activeService;

    @GetMapping("/maintenaceById/{maintenanceId}")
    public Optional<Maintenance> fetchActiveById(@PathVariable Integer maintenanceId) {
        return maintenanceRepository.findById(maintenanceId);
    }

    @PostMapping("/saveMaintenance/{activeId}")
    public Maintenance saveMaintenance(@PathVariable Integer activeId, @Valid @RequestBody Maintenance maintenance) {
        return activeService.findById(activeId).map(active -> {
            maintenance.setActive(active);
            return maintenanceRepository.save(maintenance);
        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + activeId + " not found"));
    }

    @PutMapping("/updateMaintenance/{maintenanceId}")
    public Maintenance update(@PathVariable (value = "maintenanceId") Integer maintenanceId,
                              @Valid @RequestBody Maintenance maintenanceRequest) {
        return maintenanceService.findById(maintenanceId).map(maintenance -> {
            maintenance.setMaintenanceStartDate(maintenanceRequest.getMaintenanceStartDate());
            maintenance.setMaintenanceEndDate(maintenanceRequest.getMaintenanceEndDate());
            maintenance.setMaintenanceDescription(maintenanceRequest.getMaintenanceDescription());
            maintenance.setMaintenanceStatus(maintenanceRequest.getMaintenanceStatus());
            maintenance.setTypeMaintenance(maintenanceRequest.getTypeMaintenance());
            maintenance.setDeletado(maintenanceRequest.getDeletado());
            return maintenanceRepository.save(maintenance);
        }).orElseThrow(() -> new ResourceNotFoundException("CommentId " + maintenanceId + "not found"));
    }

//   delete
}
