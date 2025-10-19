package com.example.notification_service.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Document(collection="notifications")
public class Notification {
    @Id
    private String id;
    private String userId;
    private String actorId;
    private String actorName;
    private String message;
    private String type;
    private String link;
    private Boolean isRead=false;
    private LocalDateTime createdAt=LocalDateTime.now();
}
