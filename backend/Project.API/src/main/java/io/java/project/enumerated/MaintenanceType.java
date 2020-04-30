package io.java.project.enumerated;

import lombok.Getter;

@Getter
public enum MaintenanceType {

    PREVENTIVE(0, "Preventive"),
    CORRECTIVE(1, "Corrective");

    private Integer id;
    private String description;

    MaintenanceType(Integer id, String description) {
        this.id = id;
        this.description = description;
    }
}
