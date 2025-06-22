package com.example.community_service.repository;

import com.example.community_service.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByPostIdOrderByCreatedAtDesc(String postId);

    List<Comment> findByPostIdAndParentCommentIdIsNullOrderByCreatedAtDesc(String postId);

    List<Comment> findByIdOrderByCreatedAtDesc(String commentId);

    List<Comment> findByParentCommentIdOrderByCreatedAtDesc(String parentCommentId);

    int countByPostId(String postId);
}
