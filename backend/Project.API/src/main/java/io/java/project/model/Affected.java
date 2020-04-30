package io.java.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Affected {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer affectedId;

    private String name;
    private String phone;
    private String email;

    private String deletado;

    @ManyToOne
    @JsonIgnore
    private Dam dam;
}
