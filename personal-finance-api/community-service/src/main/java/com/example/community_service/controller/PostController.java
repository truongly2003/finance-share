package com.example.community_service.controller;

import com.example.community_service.dto.request.PostRequest;
import com.example.community_service.dto.response.ApiResponse;
import com.example.community_service.dto.response.PostResponse;
import com.example.community_service.service.PostService;
import org.springframework.http.HttpEntity;
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

    @PostMapping
    public ResponseEntity<ApiResponse<PostResponse>> createPost(@RequestBody PostRequest request) {
        PostResponse postResponse = postService.createPost(request);
        ApiResponse<PostResponse> apiResponse = new ApiResponse<>(200, "Tạo bài viết thành công", postResponse);
        return ResponseEntity.ok(apiResponse);
    }


    @PutMapping()
    public ResponseEntity<PostResponse> updatePost(@RequestParam String postId, @RequestBody PostRequest request) {
        return ResponseEntity.ok(postService.updatePost(postId, request));
    }

    @DeleteMapping()
    public ResponseEntity<ApiResponse<Boolean>> deletePost(@RequestParam String postId) {
        boolean deleted = postService.deletePost(postId);
        if (deleted) {
            return ResponseEntity.ok(new ApiResponse<>(200, "Xóa bài viết thành công", true));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse<>(201, "Xóa bài viết thất bại", false));
        }
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
    @GetMapping("/getByUserId")
    public ResponseEntity<List<PostResponse>> getPostByUserId(@RequestParam  String userId){
        return ResponseEntity.ok(postService.getAllPostsByUserId(userId));
    }

    @PostMapping("/share")
    public ResponseEntity<String> share(@RequestParam String postId, @RequestParam String userId) {
        postService.sharePost(postId, userId);
        return ResponseEntity.ok("Chia sẻ thành công");
    }

    @GetMapping("/get-list-post-share")
    public HttpEntity<List<String>> getListSharePost(@RequestParam String postId) {
        return ResponseEntity.ok(postService.getListShare(postId));
    }
}
