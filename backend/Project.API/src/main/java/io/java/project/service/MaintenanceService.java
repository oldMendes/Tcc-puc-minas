package io.java.project.service;

import io.java.project.model.Maintenance;
import io.java.project.repository.MaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MaintenanceService {

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    public Optional<Maintenance> findById(Integer maintenanceId) {
        return maintenanceRepository.findById(maintenanceId);
    }
}
