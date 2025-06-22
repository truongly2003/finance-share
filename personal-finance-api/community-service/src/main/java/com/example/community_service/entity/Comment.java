package com.example.community_service.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
@Document(collection = "comments")
public class Comment {
    @Id
    private String id;
    private String postId;
    private String userId;
    private String content;
    private String parentCommentId;
    private List<String> replies;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
