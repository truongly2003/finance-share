package com.example.community_service.service;

import com.example.community_service.client.UserClient;
import com.example.community_service.dto.request.PostRequest;
import com.example.community_service.dto.response.PostResponse;
import com.example.community_service.entity.Post;
import com.example.community_service.exception.ResourceNotFoundException;
import com.example.community_service.mapper.PostMapper;
import com.example.community_service.repository.CommentRepository;
import com.example.community_service.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final UserClient userClient;
    private final CommentRepository commentRepository;
    private final SimpMessagingTemplate messagingTemplate;
    public List<PostResponse> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(post -> {
                    PostResponse postResponse = postMapper.toPostResponse(post);
                    postResponse.setLikesCount(post.getLikesCount());
                    postResponse.setUserName(getUsername(post.getUserId()));

                    return postResponse;
                }).toList();
    }

    public int likePost(String postId, String userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        List<String> likes = post.getLikes();
        log.info("likes: {}", likes);
        if (likes.contains(userId)) {
            likes.remove(userId);
        } else {
            likes.add(userId);
        }
        post.setLikes(likes);
        post.setLikesCount(likes.size());
        post.setUpdatedAt(LocalDateTime.now());
        postRepository.save(post);
        log.info("Sending WebSocket message to /topic/post/likes/: {}", likes.size());
        messagingTemplate.convertAndSend("/topic/post/likes/" +postId, likes.size());
        return likes.size();
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

    public PostResponse createPost(PostRequest postRequest) {
        Post post = postMapper.toPost(postRequest);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        return postMapper.toPostResponse(postRepository.save(post));
    }

    public PostResponse updatePost(String postId, PostRequest postRequest) {
        Post existingPost = postRepository.findById(postId).orElseThrow(() -> new ResourceNotFoundException("Post not found"));
        existingPost.setTitle(postRequest.getTitle());
        existingPost.setContent(postRequest.getContent());
        existingPost.setMediaUrls(postRequest.getMediaUrls());
        existingPost.setUpdatedAt(LocalDateTime.now());
        Post updatedPost = postRepository.save(existingPost);
        return postMapper.toPostResponse(updatedPost);
    }

    public PostResponse getPostById(String postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
        return postMapper.toPostResponse(post);
    }

    public void deletePost(String postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
        postRepository.deleteById(postId);
    }
}
