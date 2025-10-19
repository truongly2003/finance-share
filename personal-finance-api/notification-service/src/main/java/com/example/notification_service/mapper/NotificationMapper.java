package com.example.notification_service.mapper;

import com.example.notification_service.dto.response.NotificationResponse;
import com.example.notification_service.entity.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    @Mapping(source = "actorId", target = "actorId")
    @Mapping(source = "actorName", target = "actorName")
    NotificationResponse toNotificationResponse(Notification notification);
}
