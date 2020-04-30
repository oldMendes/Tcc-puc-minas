package io.java.project.repository;

import io.java.project.model.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MaintenanceRepository extends JpaRepository<Maintenance, Integer> {

    Optional<Maintenance> findById(Integer maintenanceId);

//    Optional<Maintenance> findByMaintenanceIdAndActiveId(Integer activeId, Integer maintenanceId);
}
