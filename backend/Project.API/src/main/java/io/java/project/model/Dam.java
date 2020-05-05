package io.java.project.model;

import io.java.project.enumerated.DamStatus;
import io.java.project.enumerated.DamType;
import io.java.project.enumerated.PotentialDamDamage;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Dam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer damId;
    private String name;
    private String nomeEmpresa;
    private double latitude;
    private double longitude;
    private DamType damType;
    private DamStatus damStatus;
    private PotentialDamDamage potentialDamDamage;

//    @OneToMany(mappedBy="dam", cascade=CascadeType.ALL, fetch = FetchType.LAZY)
//    @OneToMany
//    private List<Active> actives;

    @OneToMany(mappedBy="dam", cascade=CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Affected> affecteds;
}
