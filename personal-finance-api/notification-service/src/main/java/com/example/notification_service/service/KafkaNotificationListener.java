package com.example.notification_service.service;

import com.example.notification_service.entity.Notification;
import com.example.notification_service.repository.NotificationRepository;
import com.example.notification_service.service.impl.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import org.springframework.kafka.annotation.KafkaListener;


import com.example.common.dto.NotificationEventDto;


@Service
@RequiredArgsConstructor
public class KafkaNotificationListener {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationService notificationService;

    @KafkaListener(topics = "notification_events", groupId = "notification-service-group")
    public void consume(NotificationEventDto event) {
        System.out.println("New notification saved: "+event.getActorName());
        Notification notification = new Notification();
        notification.setUserId(event.getUserId());
        notification.setActorId(event.getActorId());
        notification.setActorName(event.getActorName());
        notification.setMessage(event.getMessage());
        notification.setType(event.getType());
        notification.setLink(event.getLink());
        notificationRepository.save(notification);

        messagingTemplate.convertAndSend("/topic/notifications/" + event.getUserId(), notification);
    }

    @KafkaListener(topics = "notifications.events", groupId = "notification-service-group")
    public void handle(Object payload) {
        // payload có thể được map sang NotificationEventDto (tuỳ client gửi kiểu json)
        // Dùng Jackson hoặc manual cast
        try {
            // giả sử payload đã là NotificationEventDto (Spring JsonDeserializer sẽ cast)
            NotificationEventDto event = (NotificationEventDto) payload;
            Notification n = new Notification();
            n.setUserId(event.getUserId());
            n.setActorId(event.getActorId());
            n.setActorName(event.getActorName());
            n.setType(event.getType());
            n.setMessage(event.getMessage());
            n.setLink(event.getLink());
            notificationRepository.save(n);

            // push realtime tới client tại destination: /topic/notifications/{userId}
            messagingTemplate.convertAndSend("/topic/notifications/" + event.getUserId(), n);

        } catch (ClassCastException ex) {
            // Nếu payload là Map, hoặc String, bạn cần chuyển đổi bằng ObjectMapper
            // xử lý lỗi ở đây hoặc convert
            ex.printStackTrace();
        }
    }
}
