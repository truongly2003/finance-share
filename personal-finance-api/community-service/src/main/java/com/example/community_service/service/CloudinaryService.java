package com.example.community_service.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public String fileUpload(MultipartFile file) throws IOException {
        Map uploadResult=cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("folder","finance-share")
                );
        return uploadResult.get("secure_url").toString();
    }
}
