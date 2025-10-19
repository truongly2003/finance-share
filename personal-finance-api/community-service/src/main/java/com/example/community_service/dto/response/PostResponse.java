package com.example.community_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {
    private String id;
    private String userId;
    private String userName;
    private String title;
    private String content;
    private List<String> mediaUrls = new ArrayList<>();
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<String> likes = new ArrayList<>();
    private int commentCount;
    private int likesCount;

    private List<String> topic = new ArrayList<>();

    private List<String> shares = new ArrayList<>();
}
