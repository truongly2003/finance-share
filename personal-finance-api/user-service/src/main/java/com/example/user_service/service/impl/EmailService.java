package com.example.user_service.service.impl;

import com.example.user_service.dto.request.Email;
import com.example.user_service.entity.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    public void sendEmail(Email email) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("truonglykhong@gmail.com");
            helper.setTo(email.getToEmail());
            helper.setSubject(email.getSubject());
            helper.setText(email.getBody(), true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    public void sendVerificationEmail(User user, String token) {
        String link = "http://localhost:5173/verify-email-token?token=" + token;
        String subject = "Xác nhận đăng ký tài khoản";
        String body = "<h3>Nhấn vào link để xác nhận tài khoản:</h3><a href='" + link + "'>" + link + "</a>";
        sendHtmlEmail(user.getEmail(), subject, body);
    }

    public void sendPasswordResetEmail(User user, String token) {
        String link = "http://localhost:5173/reset-password?token=" + token;
        String subject = "Đặt lại mật khẩu";
        String body = "<h3>Nhấn vào link để đặt lại mật khẩu:</h3><a href='" + link + "'>" + link + "</a>";
        sendHtmlEmail(user.getEmail(), subject, body);
    }

    private void sendHtmlEmail(String to, String subject, String htmlBody) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("truonglykhong@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Không thể gửi email", e);
        }
    }
}
