package com.rabbitmq.rabbitMq.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/queue")
public class QueueProducer {

    @Value("${queue.name}")
    private String queueName;

    @Autowired
    RabbitTemplate queueSender;

    @GetMapping("/send")
    public String sendToQueue(@RequestParam(value = "message", defaultValue = "CodeCouple.pl") String message){
        message = "{\"id\" : 4}";
        queueSender.convertAndSend(queueName, message);
        return String.format("Message %s sent! See logs...", message);
    }
}
