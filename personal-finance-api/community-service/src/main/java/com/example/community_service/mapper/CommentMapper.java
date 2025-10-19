package com.example.community_service.mapper;

import com.example.community_service.client.UserClient;
import com.example.community_service.dto.request.CommentRequest;
import com.example.community_service.dto.response.CommentResponse;
import com.example.community_service.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    @Mapping(source = "likes", target = "likes")
    @Mapping(source = "children", target = "children")
    CommentResponse toCommentResponse(Comment comment);
    @Mapping(source = "likes", target = "likes")
    Comment toComment(CommentRequest commentRequest);
}
