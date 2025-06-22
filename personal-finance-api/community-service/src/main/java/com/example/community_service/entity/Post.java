package com.example.community_service.entity;
import org.springframework.data.annotation.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Data
@Getter
@Setter
@Document(collection = "posts")
public class Post {
    @Id
    private String id;
    private String userId;
    private String title;
    private String content;
    private List<String> mediaUrls = new ArrayList<>();
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<String> likes = new ArrayList<>();
    private int commentCount;
    private int likesCount;
}
