package com.example.community_service.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {
    @MessageMapping("/chat") // Client gửi tới /app/chat
    @SendTo("/topic/messages") // Client subscribe /topic/messages để nhận
    public String sendMessage(String message) {
        return message;
    }
}
