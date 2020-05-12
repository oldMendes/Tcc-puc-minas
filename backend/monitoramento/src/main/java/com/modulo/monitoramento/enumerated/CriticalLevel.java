package com.modulo.monitoramento.enumerated;

import lombok.Getter;

@Getter
public enum CriticalLevel {

    STABLE(0,"Estável"),
    ALERT(1,"Alerta"),
    CRITICAL(2,"Crítico");

    private Integer id;
    private String description;

    CriticalLevel(Integer id, String description) {
        this.id = id;
        this.description = description;
    }
}
