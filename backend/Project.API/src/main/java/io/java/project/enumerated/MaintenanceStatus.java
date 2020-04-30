package io.java.project.enumerated;

import lombok.Getter;

@Getter
public enum MaintenanceStatus {

    OPEN(0, "Open"),
    PROCESSING(1, "Processing"),
    CLOSED(2, "Closed");

    private Integer id;
    private String description;

    MaintenanceStatus(Integer id, String description) {
        this.id = id;
        this.description = description;
    }
}
