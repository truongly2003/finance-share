package com.example.community_service.entity;
import org.springframework.data.annotation.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
@Document(collection = "friendships")
public class Friendship {
    @Id
    private String id;
    private String userId1;
    private String userId2;
    private String status; // PENDING, ACCEPTED, REJECTED
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}