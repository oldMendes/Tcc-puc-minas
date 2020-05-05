package com.modulo.monitoramento.controller;

import com.modulo.monitoramento.model.Alerta;
import com.modulo.monitoramento.repository.AlertRepository;
import com.modulo.monitoramento.service.AlertSender;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class AlertController {

    private final AlertRepository alertRepository;
    private final AlertSender sender;

    @GetMapping("/listAlerts")
    public List<Alerta> listAlerts() {
        return alertRepository.findAll();
    }

    @PostMapping("/saveAlert")
    public Alerta createAlert(@Valid @RequestBody Alerta alerta) {
        Alerta newAlert = alertRepository.save(alerta);
        sender.sendAlert(newAlert);
        return newAlert;
    }
}
