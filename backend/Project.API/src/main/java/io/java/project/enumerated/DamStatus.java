package io.java.project.enumerated;

public enum DamStatus {

    STABLE(0,"Estável"),
    ALERT(1,"Alerta"),
    CRITICAL(2,"Crítico");

    private Integer id;
    private String description;

    DamStatus(Integer id, String description) {
        this.id = id;
        this.description = description;
    }
}
