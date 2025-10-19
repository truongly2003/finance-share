package com.example.notification_service.service;

import com.example.notification_service.dto.response.NotificationResponse;
import com.example.common.dto.NotificationEventDto;
import java.util.List;

public interface INotificationService {
    List<NotificationResponse> getAllNotifications(String userId);

    void handleEvent(NotificationEventDto notificationEventDto);
}
