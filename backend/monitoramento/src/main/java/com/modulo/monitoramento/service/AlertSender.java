package com.modulo.monitoramento.service;

import com.modulo.monitoramento.model.Alerta;

public interface AlertSender {

    void sendAlert(Alerta alert);
}
