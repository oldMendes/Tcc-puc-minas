package com.modulo.monitoramento.controller;

import com.modulo.monitoramento.model.Alerta;
import com.modulo.monitoramento.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
public class AlertController {

    @Autowired
    private AlertRepository alertRepository;

    @GetMapping("/listAlerts")
    public List<Alerta> listDam() {
        return alertRepository.findAll();
    }

    @PostMapping("/saveAlert")
    public Alerta createDam(@Valid @RequestBody Alerta alerta) {
        return alertRepository.save(alerta);
    }
}
