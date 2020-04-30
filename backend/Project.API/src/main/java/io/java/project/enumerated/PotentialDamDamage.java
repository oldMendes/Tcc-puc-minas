package io.java.project.enumerated;

public enum PotentialDamDamage {
    LOW(0, "Baixo"),
    MEDIUM(1, "Médio"),
    HIGH(2,"Alto");

    public Integer id;
    public String description;

    PotentialDamDamage(Integer id, String description) {
        this.id = id;
        this.description = description;
    }

}
