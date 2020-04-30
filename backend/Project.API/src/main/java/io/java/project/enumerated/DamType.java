package io.java.project.enumerated;

import lombok.Getter;

@Getter
public enum DamType {

    MONTANTE(0, "Montante"),
    JUSTANTE(1, "Jusante"),
    LINHA_DE_CENTRO(2,"Linha de centro");

    public Integer id;
    public String description;

    DamType(Integer id, String description) {
        this.id = id;
        this.description = description;
    }
}
