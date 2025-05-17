package com.example.user_service.controller;

import com.example.user_service.dto.request.Email;
import com.example.user_service.service.impl.EmailService;
import com.example.user_service.service.impl.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/email")
public class EmailController {
    private final EmailService emailService;
    private final UserService userService;
    public EmailController(EmailService emailService, UserService userService) {
        this.emailService = emailService;
        this.userService = userService;
    }
    @PostMapping()
    public ResponseEntity<Void> sendEmail(@RequestBody Email email) {
        emailService.sendEmail(email);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @GetMapping("/verify-email")
    public ResponseEntity<Map<String, Object>> verifyEmail(@RequestParam String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            userService.verifyTokenEmail(token);
            response.put("status", true);
            response.put("message", "Xác thực email thành công!");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("status", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("status", false);
            response.put("message", "Đã xảy ra lỗi trong quá trình xác thực.");
            return ResponseEntity.status(500).body(response);
        }
    }

}
