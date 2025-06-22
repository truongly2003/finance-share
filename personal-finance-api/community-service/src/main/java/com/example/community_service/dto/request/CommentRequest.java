package com.example.community_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentRequest {
    private String postId;
    private String userId;
    private String content;
    private String parentCommentId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
