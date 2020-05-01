package br.com.alura.eviadorEmail.enviadorEmail;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class SendEmailSSL {

    public static void main(String[] args) {
        final String username = "oldmendesf@gmail.com";
        final String password = "mendes3791314";

        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "465");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.socketFactory.port", "465");
        prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
      //  Session session = Session.getInstance(prop,
        //        new GMailAuthenticator(username, password));
        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("oldmendesf@gmail.com"));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse("fernanda.mendes.lemaf@gmail.com,oldmendesf@gmail.com")
            );
            message.setSubject("Sistema de gestão de baragens");
            message.setText("Risco de rompimento de barragem,"
                    + "\n Encaminhe-se para um local seguro!");
            Transport.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}
