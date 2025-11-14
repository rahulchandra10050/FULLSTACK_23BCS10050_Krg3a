package com.app.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public String sendEmail(String from, String to, String messageText, String subject) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(from);  // must match your Gmail
            message.setTo(to);
            message.setSubject(subject);
            message.setText(messageText);

            mailSender.send(message);

            return "Email sent successfully to " + to;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error while sending email: " + e.getMessage();
        }
    }
}

