package com.example.community_service.controller;

import com.example.community_service.dto.request.PostRequest;
import com.example.community_service.dto.response.PostResponse;
import com.example.community_service.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping()
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest request) {
        return ResponseEntity.ok(postService.createPost(request));
    }

    @PutMapping()
    public ResponseEntity<PostResponse> updatePost(@RequestParam String postId, @RequestBody PostRequest request) {
        return ResponseEntity.ok(postService.updatePost(postId, request));
    }

    @DeleteMapping()
    public ResponseEntity<Void> deletePost(@RequestParam String postId) {
        postService.deletePost(postId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/getById")
    public ResponseEntity<PostResponse> getPostById(@RequestParam String postId) {
        return ResponseEntity.ok(postService.getPostById(postId));
    }

    @PostMapping("/like")
    public ResponseEntity<Integer> like(@RequestParam String postId, @RequestParam String userId) {
        return ResponseEntity.ok(postService.likePost(postId, userId));
    }
}
