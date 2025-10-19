package com.example.community_service.controller;

import com.example.community_service.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/like")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

//    get post like list
    @GetMapping("/get-list-likes-post")
    public HttpEntity<List<String>> getLikesByPost(@RequestParam String postId) {
        List<String> likes = likeService.getLikeByPostId(postId);
        return ResponseEntity.ok(likes);
    }
//    get comment like list
    @GetMapping("/get-list-likes-comment")
    public HttpEntity<List<String>> getLikesByComment(@RequestParam String commentId) {
        List<String> likes = likeService.getLikeByCommentId(commentId);
        return ResponseEntity.ok(likes);
    }
//    like comment
    @PostMapping ("/comment")
    public HttpEntity<List<String>> addLikeComment( @RequestParam String commentId, @RequestParam String userId) {
        List<String> likes=likeService.likeComment(commentId,userId);
        return ResponseEntity.ok(likes);
    }
}
