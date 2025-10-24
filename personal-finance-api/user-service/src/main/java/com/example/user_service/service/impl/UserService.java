package com.example.user_service.service.impl;

import com.example.user_service.dto.request.UpdatePasswordRequest;
import com.example.user_service.dto.request.UserRegisterRequest;
import com.example.user_service.dto.request.ForgotPasswordRequest;
import com.example.user_service.dto.request.ResetPasswordRequest;
import com.example.user_service.dto.request.UserRequest;
import com.example.user_service.dto.response.UserRegisterResponse;
import com.example.user_service.dto.response.UserResponse;
//import com.example.user_service.EmailService;
import com.example.user_service.entity.EmailVerificationToken;
import com.example.user_service.entity.User;
import com.example.user_service.mapper.UserMapper;
import com.example.user_service.repository.EmailVerificationTokenRepository;
import com.example.user_service.repository.UserRepository;
import com.example.user_service.service.IUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final EmailService emailService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserResponse getUserById(String id) {
        User user = userRepository.findById(id).orElse(null);
        return userMapper.userToUserResponse(user);
    }

    // đăng ký
    @Override
    public UserRegisterResponse addUser(UserRegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new UserRegisterResponse("", "Email đã được đăng ký");
        }
        String encodePassword = passwordEncoder.encode(request.getPassword());
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(encodePassword);
        userRepository.save(user);

        String token = UUID.randomUUID().toString();
        EmailVerificationToken verificationToken = new EmailVerificationToken();
        verificationToken.setUser(user);
        verificationToken.setToken(token);
        verificationToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        emailVerificationTokenRepository.save(verificationToken);
        emailService.sendVerificationEmail(user, token);
        return new UserRegisterResponse(user.getEmail(), "Đăng ký thành công");
    }

    // token của email
    @Transactional
    public void verifyTokenEmail(String token) {
        EmailVerificationToken verificationToken = emailVerificationTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token không hợp lệ hoặc đã bị xóa."));
        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            emailVerificationTokenRepository.delete(verificationToken);
            userRepository.delete(verificationToken.getUser());
            throw new RuntimeException("Token đã hết hạn, tài khoản đã bị xóa. Vui lòng đăng ký lại.");
        }
        User user = verificationToken.getUser();
        if (user.isActive()) {
            emailVerificationTokenRepository.delete(verificationToken);
            return;
        }
        user.setActive(true);
        userRepository.save(user);
        emailVerificationTokenRepository.delete(verificationToken);
    }


    @Override
    public boolean updateUser(String userId, UserRequest userRequest) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User user1 = user.get();
            user1.setUserName(userRequest.getUserName());
            user1.setPhoneNumber(userRequest.getPhoneNumber());
            userRepository.save(user1);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteUser(String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean changePassword(String userId, UpdatePasswordRequest request) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return false;
        }
        User user = optionalUser.get();
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return false;
        }
        String encodedNewPassword = passwordEncoder.encode(request.getNewPassword());
        user.setPassword(encodedNewPassword);
        userRepository.save(user);
        return true;
    }


    // password
    @Override
    public boolean forgotPassword(ForgotPasswordRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            return false;
        }
        String token = UUID.randomUUID().toString();
        User user = userOptional.get();
        user.setResetPasswordToken(token);
        userRepository.save(user);
        emailService.sendPasswordResetEmail(user, token);
        return true;
    }

    @Override
    public boolean resetPassword(ResetPasswordRequest request) {
        Optional<User> userOptional = userRepository.findByResetPasswordToken(request.getToken());
        if (userOptional.isEmpty()) {
            return false;
        }
        User user = userOptional.get();
        String encodePassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(encodePassword);
        user.setResetPasswordToken(null);
        userRepository.save(user);
        return true;
    }

    @Override
    public String getUserName(String userId) {
        System.out.println("DEBUG: userId nhận được = " + userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với ID: " + userId));
        return user.getUserName();
    }

    @Override
    public List<String> getListUserName() {
        List<User> user = userRepository.findAll();
        if(user==null){
            log.info("xin chao");
            return null;
        }
        List<String> userNames = new ArrayList<>();
        user.forEach(user1 -> userNames.add(user1.getUserName()));
        return userNames;
    }

    @Override
    public List<String> getListUserId() {
        return userRepository.findDistinctUserIds();
    }

}
