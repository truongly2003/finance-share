package com.example.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationEventDto {
    private String userId; // người được thông báo
    private String actorId;
    private String actorName;
    private String type;
    private String message;
    private String link;
}
