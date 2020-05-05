package io.java.project.service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.Map;
import java.util.Properties;

public class EmailSender {

    public static void sendMail(Map<String, String> parameters,
                                List<String> recipients) {
        String username = "oldmendesf@gmail.com";
        String password = "mendes3791314";

        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "465");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.socketFactory.port", "465");
        prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("oldmendesf@gmail.com"));
            InternetAddress[] addresses = new InternetAddress[recipients.size()];
            for (int index = 0; index < recipients.size(); index++){
                addresses[index] = new InternetAddress(recipients.get(index));
            }
            message.setRecipients(
                    Message.RecipientType.TO,
                    addresses
            );
            message.setSubject("Sistema de gestão de baragens");
            message.setText(String.format(
                    "Alerta de nível de barragem:\nBarragem: %s\nSensor: %s\nNivel: %s\nNotificacao: %s",
                    parameters.get("damId"),
                    parameters.get("sensorName"),
                    parameters.get("criticalLevel"),
                    parameters.get("notification")
            ));
            Transport.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }


}
