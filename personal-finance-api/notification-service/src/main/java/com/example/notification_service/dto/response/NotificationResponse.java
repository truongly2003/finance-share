package com.example.notification_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationResponse {
    String id;
    String userId;
    String actorId;
    String actorName;
    String message;
    String type;
    String link;
    Boolean isRead;
    LocalDateTime createdAt;
}
