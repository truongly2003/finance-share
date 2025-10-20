package com.example.notification_service.service;

import com.example.notification_service.entity.Notification;
import com.example.notification_service.repository.NotificationRepository;
import com.example.notification_service.service.impl.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import org.springframework.kafka.annotation.KafkaListener;


import com.example.common.dto.NotificationEventDto;

import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class KafkaNotificationListener {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationService notificationService;

    @KafkaListener(topics = "notification_events", groupId = "notification-service-group")
    public void consume(NotificationEventDto event) {

//            System.out.println("Kafka consumer got event: " + event);
        Notification existing = notificationRepository
                .findByUserIdAndLinkAndType(
                        event.getUserId(),
                        event.getLink(),
                        event.getType()
                );

        Notification notification;
        //  nếu đã có thông báo
        if (existing != null) {
            existing.setActorId(event.getActorId());
            existing.setActorName(event.getActorName());
            existing.setMessage(event.getMessage());
            existing.setCreatedAt(LocalDateTime.now());
            notification = existing;
        } else {
            notification = new Notification();
            notification.setUserId(event.getUserId());
            notification.setActorId(event.getActorId());
            notification.setActorName(event.getActorName());
            notification.setMessage(event.getMessage());
            notification.setType(event.getType());
            notification.setLink(event.getLink());
        }
        notificationRepository.save(notification);

        messagingTemplate.convertAndSend("/topic/notifications/" + event.getUserId(), notification);

    }


}
