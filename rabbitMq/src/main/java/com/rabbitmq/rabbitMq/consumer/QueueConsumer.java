package com.rabbitmq.rabbitMq.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class QueueConsumer {

   /* @RabbitListener(queues = "${queue.name}")
    private void reader(String text) {
        System.out.println("Consumer: " + text);
        //
    }*/
}
