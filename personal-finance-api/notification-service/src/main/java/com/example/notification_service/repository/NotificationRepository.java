package com.example.notification_service.repository;

import com.example.notification_service.entity.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    void deleteById(String notificationId);
    List<Notification> findAllNotificationByUserIdOrderByCreatedAtDesc(String userId);
    void deleteByUserId(String userId);
    Notification findByUserIdAndLinkAndType(String userId,String link, String type);
    void deleteByUserIdAndType(String userId, String type);
}
