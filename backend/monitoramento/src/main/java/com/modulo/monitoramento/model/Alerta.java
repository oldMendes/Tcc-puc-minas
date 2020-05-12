package com.modulo.monitoramento.model;

import com.modulo.monitoramento.enumerated.CriticalLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Alerta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer alertId;
    private String sensorName;
    private CriticalLevel criticalLevel;
    private String notification;
    private Integer damId;

}
