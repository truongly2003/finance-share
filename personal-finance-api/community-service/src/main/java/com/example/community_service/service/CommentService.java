package com.example.community_service.service;


import com.example.community_service.client.UserClient;

//import com.example.community_service.dto.NotificationEventDto;
import com.example.community_service.dto.request.CommentRequest;
import com.example.community_service.dto.response.CommentResponse;
import com.example.community_service.entity.Comment;
import com.example.community_service.entity.Post;
import com.example.community_service.mapper.CommentMapper;
import com.example.community_service.repository.CommentRepository;
import com.example.community_service.repository.PostRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import com.example.common.dto.NotificationEventDto;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final PostRepository postRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserClient userClient;

    //    kafka
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    //    kafka
//    public void test() {
//        NotificationEventDto notificationEventDto = new NotificationEventDto(
//                "1", "1", "post", "bạn có bài viết mới", "/post"
//        );
//        kafkaTemplate.send("notification_events", notificationEventDto);
//    }

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

        Map<String, CommentResponse> commentResponseMap = new LinkedHashMap<>();
        for (Comment comment : comments) {
            CommentResponse response = commentMapper.toCommentResponse(comment);
            response.setUserName(getUsername(comment.getUserId()));
            response.setChildren(new ArrayList<>());
            commentResponseMap.put(comment.getId(), response);
        }
//        danh sách comment gốc
        List<CommentResponse> rootCommentResponses = new ArrayList<>();

        Collection<CommentResponse> commentMap = commentResponseMap.values();

        for (CommentResponse comment : commentMap) {
            String parentCommentId = comment.getParentCommentId();
            System.out.println("Returning comments size: " + parentCommentId);
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
        List<Comment> comments = commentRepository.findByParentCommentIdOrderByCreatedAtAsc(parentCommentId);
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

        LocalDateTime commentTime = savedComment.getCreatedAt();

//        kiểm tra comment có phải reply không
        Comment parentComment = null;
        if (commentRequest.getParentCommentId() != null) {
            parentComment = commentRepository.findById(commentRequest.getParentCommentId())
                    .orElseThrow(() -> new RuntimeException("Parent comment not found"));
        }
        if (parentComment == null) {
            //        id của chủ bài viết khác với người comment
            if (!post.getUserId().equals(commentRequest.getUserId())) {
                String actorName = getUsername(commentRequest.getUserId());

                List<Comment> allComments = commentRepository.findByPostIdOrderByCreatedAtAsc(commentRequest.getPostId());
                Set<String> distinctPreviousUsers = new LinkedHashSet<>();
                for (Comment c : allComments) {
//                    Bỏ người đang comment hiện tại   và và Bỏ chủ bài viết (vì họ là người nhận thông báo).
                  if(!c.getUserId().equals(commentRequest.getUserId()) && !c.getUserId().equals(post.getUserId())) {
                      distinctPreviousUsers.add(c.getUserId());
                  }
                }
                String message;
                int previousCount = distinctPreviousUsers.size();
                if (previousCount == 0) {
                    message = "đã bình luận bài viết của bạn";
                } else if (previousCount == 1) {
                    message = "và 1 người khác đã bình luận bài viết của bạn";
                } else {
                    message = String.format("và %d người khác đã bình luận bài viết của bạn", previousCount);
                }

                NotificationEventDto notificationEventDto = new NotificationEventDto(
                        post.getUserId(), commentRequest.getUserId(), actorName, "post", message, "/community/post/detail-post/" + post.getId()
                );
                kafkaTemplate.send("notification_events", notificationEventDto);
            }

        } else {
            if (!parentComment.getUserId().equals(commentRequest.getUserId())) {
                String actorName = getUsername(commentRequest.getUserId());
                NotificationEventDto notificationEventDto = new NotificationEventDto(
                        parentComment.getUserId(), commentRequest.getUserId(), actorName, "reply",
                        "đã trả lời bình luận của bạn", "/community/post/detail-post/" + post.getId()
                );
                kafkaTemplate.send("notification_events", notificationEventDto);
            }
        }


        return commentResponse;
    }

    private void deleteReliesRecursively(String parentCommentId) {
        // lấy tất cả bình luận con
        List<Comment> comments = commentRepository.findByParentCommentIdOrderByCreatedAtDesc(parentCommentId);
        for (Comment comment : comments) {
            // Xóa đệ quy các bình luận con của bình luận con này
            deleteReliesRecursively(comment.getId());
            commentRepository.deleteCommentById(comment.getId());
        }
    }

    public boolean deleteComment(String commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
        //        nếu là comment cha xóa tất cả comment con
        if (comment.getParentCommentId() == null) {
            deleteReliesRecursively(commentId);
        } else {
            //         nếu là comment con xóa khỏi danh sách children của comment cha
            Comment parentComment = commentRepository.findById(comment.getParentCommentId()).orElse(null);
            if (parentComment != null) {
                parentComment.getChildren().remove(commentId);
                commentRepository.save(parentComment);
            }
        }
        commentRepository.deleteCommentById(commentId);
        // cập nhật lại comment count trong post
        Post post = postRepository.findById(comment.getPostId()).orElse(null);
        post.setCommentCount((int) commentRepository.countByPostId(comment.getPostId()));
        postRepository.save(post);
        return true;
    }


}
