package com.example.community_service.service;


import com.example.community_service.client.UserClient;
import com.example.community_service.dto.request.CommentRequest;
import com.example.community_service.dto.response.CommentResponse;
import com.example.community_service.entity.Comment;
import com.example.community_service.entity.Post;
import com.example.community_service.mapper.CommentMapper;
import com.example.community_service.repository.CommentRepository;
import com.example.community_service.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final PostRepository postRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserClient userClient;

    public CommentService(CommentRepository commentRepository, CommentMapper commentMapper, PostRepository postRepository, SimpMessagingTemplate messagingTemplate, UserClient userClient) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
        this.postRepository = postRepository;
        this.messagingTemplate = messagingTemplate;
        this.userClient = userClient;
    }

    private String getUsername(String userId) {
        try {
            if (userId != null && !userId.isEmpty()) {
                return userClient.getUsername(userId);
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch username for userId: " + userId + ", error: " + e.getMessage());
        }
        return "Unknown";
    }

    public List<CommentResponse> getAllCommentsByPostId(String postId) {
        List<Comment> comments = commentRepository.findByPostIdOrderByCreatedAtDesc(postId);
//        Map<String, CommentResponse> commentResponseMap = comments.stream()
//                .map(comment -> {
//                    CommentResponse response = commentMapper.toCommentResponse(comment);
//                    response.setUserName(getUsername(comment.getUserId()));
//                    response.setChildren(new ArrayList<>());
//                    return response;
//                }).collect(Collectors.toMap(CommentResponse::getId, c -> c));
        Map<String, CommentResponse> commentResponseMap = new LinkedHashMap<>();
        for (Comment comment : comments) {
            CommentResponse response = commentMapper.toCommentResponse(comment);
            response.setUserName(getUsername(comment.getUserId()));
            response.setChildren(new ArrayList<>());
            commentResponseMap.put(comment.getId(), response);
        }

        List<CommentResponse> rootCommentResponses = new ArrayList<>();

        Collection<CommentResponse> commentMap = commentResponseMap.values();

        for (CommentResponse comment : commentMap) {
            String parentCommentId = comment.getParentCommentId();
            if (parentCommentId == null) {
                rootCommentResponses.add(comment);
            } else {
                // comment children, add to list children in comment parent
                CommentResponse parent = commentResponseMap.get(parentCommentId);
                if (parent != null) {
                    parent.getChildren().add(comment);
                }
            }
        }
        return rootCommentResponses;
    }

    public List<CommentResponse> getCommentChildren(String parentCommentId) {
        List<Comment> comments = commentRepository.findByParentCommentIdOrderByCreatedAtDesc(parentCommentId);
        List<CommentResponse> commentResponses = comments.stream().map(comment -> {
            CommentResponse response = commentMapper.toCommentResponse(comment);
            response.setUserName(getUsername(comment.getUserId()));
            return response;
        }).toList();
        return commentResponses;
    }

    public CommentResponse createComment(CommentRequest commentRequest) {
        if (commentRequest.getPostId() == null || !postRepository.existsById(commentRequest.getPostId())) {
            throw new IllegalArgumentException("Invalid or non-existent postId: " + commentRequest.getPostId());
        }
        Comment comment = commentMapper.toComment(commentRequest);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());
        Comment savedComment = commentRepository.save(comment);
        CommentResponse commentResponse = commentMapper.toCommentResponse(savedComment);
        commentResponse.setUserName(getUsername(comment.getUserId()));
        Post post = postRepository.findById(commentRequest.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));
        post.setCommentCount((int) commentRepository.countByPostId(commentRequest.getPostId()));
        post.setUpdatedAt(LocalDateTime.now());
        postRepository.save(post);
        log.info("Sending WebSocket message to /topic/comments/{}", commentRequest.getPostId());
        messagingTemplate.convertAndSend("/topic/comments/" + commentRequest.getPostId(), commentResponse);
        return commentResponse;
    }


}
