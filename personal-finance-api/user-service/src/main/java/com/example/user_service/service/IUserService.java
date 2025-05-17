package com.example.user_service.service;

import com.example.user_service.dto.request.*;
import com.example.user_service.dto.response.UserRegisterResponse;
import com.example.user_service.dto.response.UserResponse;

public interface IUserService {
    UserResponse getUserById(String id);
    UserRegisterResponse addUser(UserRegisterRequest request);
    boolean updateUser(String userId, UserRequest userRequest);
    boolean deleteUser(String id);
    boolean changePassword(String userId, UpdatePasswordRequest request);
    boolean forgotPassword(ForgotPasswordRequest request);
    boolean resetPassword(ResetPasswordRequest request);
}
