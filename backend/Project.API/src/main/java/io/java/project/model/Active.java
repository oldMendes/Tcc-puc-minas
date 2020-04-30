package io.java.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.java.project.enumerated.ActiveType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Active {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer activeId;
    private String name;
    private String patrimony;
    private ActiveType activeType;
    private String description;

    @OneToMany(mappedBy="active", cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Maintenance> maintenance;

//    @ManyToOne
//    @JsonIgnore
//    private Dam dam;
}
