package io.java.project.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.java.project.enumerated.MaintenanceStatus;
import io.java.project.enumerated.MaintenanceType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maintenanceId;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    private Date maintenanceStartDate;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    private Date maintenanceEndDate;

    private String deletado;

    private String maintenanceDescription;
    private MaintenanceStatus maintenanceStatus;
    private MaintenanceType typeMaintenance;

    @ManyToOne
    @JsonIgnore
    private Active active;

}
