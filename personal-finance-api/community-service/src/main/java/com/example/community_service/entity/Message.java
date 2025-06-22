package com.example.community_service.entity;

import org.springframework.data.annotation.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Document(collection = "messages")
public class Message {
    @Id
    private String id;
    private String senderId;
    private String receiverId;
    private String content;
    private LocalDateTime createdAt;
    private boolean isRead;
}