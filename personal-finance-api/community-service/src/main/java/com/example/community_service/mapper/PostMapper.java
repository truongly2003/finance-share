package com.example.community_service.mapper;

import com.example.community_service.dto.request.PostRequest;
import com.example.community_service.dto.response.PostResponse;
import com.example.community_service.entity.Post;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface PostMapper {
    PostResponse toPostResponse(Post post);
    Post toPost(PostRequest postRequest);
}
