package com.example.notification_service.service.impl;

import com.example.common.dto.NotificationEventDto;
import com.example.notification_service.dto.response.NotificationResponse;
import com.example.notification_service.entity.Notification;
import com.example.notification_service.mapper.NotificationMapper;
import com.example.notification_service.repository.NotificationRepository;
import com.example.notification_service.service.INotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService implements INotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public List<NotificationResponse> getAllNotifications(String userId) {
        List<Notification> notifications = notificationRepository.findAllNotificationByUserIdOrderByCreatedAtDesc(userId);
        return notifications.stream().map(notificationMapper::toNotificationResponse).toList();
    }

    @Override
    public void handleEvent(NotificationEventDto notificationEventDto) {

    }

//    @Override
//    public void handleEvent(NotificationEventDto event) {
//        Notification n = new Notification();
//        n.setUserId(event.getUserId());
////        n.setSenderId(event.getSenderId());
//        n.setType(event.getType());
//        n.setMessage(event.getMessage());
//        n.setLink(event.getLink());
//        n.setCreatedAt(LocalDateTime.now());
//        notificationRepository.save(n);
//
//
//// Gửi real-time tới user (destination: /user/{userId}/queue/notifications)
//        try {
//            messagingTemplate.convertAndSendToUser(event.getUserId(), "/queue/notifications", n);
//        } catch (Exception ex) {
//// Nếu gửi thất bại (user offline) thì chỉ cần lưu DB
//        }
//    }
}
