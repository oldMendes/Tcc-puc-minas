package io.java.project.enumerated;

import lombok.Getter;

@Getter
public enum ActiveType {

    EQUIPMENT(0,"Equipamento"),
    MACHINE(1,"Máquina"),
    INPUT(2, "Insumo");

    private Integer id;
    private String description;


    ActiveType(Integer id, String description ) {
        this.description = description;
        this.id = id;
    }
}
