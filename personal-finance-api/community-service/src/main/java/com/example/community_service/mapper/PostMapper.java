package com.example.community_service.mapper;

import com.example.community_service.dto.request.PostRequest;
import com.example.community_service.dto.response.PostResponse;
import com.example.community_service.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {
    @Mapping(source = "topic", target = "topic")
    @Mapping(source = "shares", target = "shares")
    PostResponse toPostResponse(Post post);
    @Mapping(source = "imageUrl", target="imageUrl")
    Post toPost(PostRequest postRequest);
}
