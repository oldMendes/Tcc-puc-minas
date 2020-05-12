package com.modulo.monitoramento.service.Impl;

import com.modulo.monitoramento.model.Alerta;
import com.modulo.monitoramento.service.AlertSender;
import com.modulo.monitoramento.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlertSenderImpl implements AlertSender {

    @Value("${queue.name}")
    private String queueName;

    private final RabbitTemplate queueSender;

    public void sendAlert(Alerta alert){
        StringBuilder message = new StringBuilder()
                .append("{")
                .append(StringUtils.addJsonData("sensorName", alert.getSensorName()))
                .append(StringUtils.addJsonData("criticalLevel", alert.getCriticalLevel().getDescription()))
                .append(StringUtils.addJsonData("notification", alert.getNotification()))
                .append(StringUtils.addJsonData("damId", alert.getDamId(), false))
                .append("}");
        queueSender.convertAndSend(queueName, message.toString());
    }
}
