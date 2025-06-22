package com.example.community_service.controller;

import com.example.community_service.dto.request.CommentRequest;
import com.example.community_service.dto.response.CommentResponse;
import com.example.community_service.entity.Comment;
import com.example.community_service.repository.CommentRepository;
import com.example.community_service.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final SimpMessagingTemplate messagingTemplate;
   private final CommentService commentService;

    public CommentController(SimpMessagingTemplate messagingTemplate, CommentService commentService) {
        this.messagingTemplate = messagingTemplate;
        this.commentService = commentService;
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<CommentResponse>> getCommentsByPostId(@PathVariable String postId) {
        return ResponseEntity.ok(commentService.getAllCommentsByPostId(postId));
    }
    @GetMapping("/children")
    public ResponseEntity<List<CommentResponse>> getCommentChildren(@RequestParam String commentId) {
        return ResponseEntity.ok(commentService.getCommentChildren(commentId));
    }
    @PostMapping
    public ResponseEntity<CommentResponse> createComment(@RequestBody CommentRequest comment) {
        return ResponseEntity.ok(commentService.createComment(comment));
    }
    @PostMapping("/test-truong/{postId}")
    public ResponseEntity<String> testTruong(@PathVariable String postId) {
        CommentResponse testResponse = new CommentResponse();
        testResponse.setId("test-id-" + System.currentTimeMillis());
        testResponse.setPostId(postId);
        testResponse.setContent("truong"); // Chuỗi cần gửi
        testResponse.setUserId("test-user");
        testResponse.setUserName("TestUser");
        testResponse.setCreatedAt(LocalDateTime.now());
        testResponse.setParentCommentId(null);

        messagingTemplate.convertAndSend("/topic/comments/" + postId, testResponse);
        System.out.println("Sent WebSocket message 'truong' to /topic/comments/" + postId);
        return ResponseEntity.ok("Sent 'truong' to /topic/comments/" + postId);
    }
}
