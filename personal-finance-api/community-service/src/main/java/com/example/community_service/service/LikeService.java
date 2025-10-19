package com.example.community_service.service;

import com.example.community_service.client.UserClient;
import com.example.community_service.entity.Comment;
import com.example.community_service.entity.Post;
import com.example.community_service.repository.CommentRepository;
import com.example.community_service.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class LikeService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserClient userClient;


    public List<String> getLikeByPostId(String postId) {
        Post post=postRepository.findById(postId).orElseThrow(()->new RuntimeException("Post not found"));
        List<String> likes=post.getLikes();
        if(likes.isEmpty()){
            return new ArrayList<>();
        }
        List<String> listUserNameLikes=new ArrayList<>();
        for(String like:likes){
            listUserNameLikes.add(userClient.getUsername(like));
        }
        return listUserNameLikes;
    }
    public List<String> getLikeByCommentId(String commentId) {
        Comment comment=commentRepository.findById(commentId).orElse(null);
        List<String> likes=comment.getLikes();
        if(likes.isEmpty()){
            return new ArrayList<>();
        }
        List<String> listUserNameLikes=new ArrayList<>();
        for(String like:likes){
            listUserNameLikes.add(userClient.getUsername(like));
        }
        return listUserNameLikes;
    }
    public List<String> likeComment(String commentId, String userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        List<String> likes = comment.getLikes();
        if (likes.contains(userId)) {
            likes.remove(userId); // bỏ like
        } else {
            likes.add(userId); // thêm like
        }

        comment.setLikes(likes);
        commentRepository.save(comment);

        return likes;
    }


}
