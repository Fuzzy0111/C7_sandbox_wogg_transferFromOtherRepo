
package com.wog.service;

import com.wog.dto.UserDto;
import com.wog.entity.User;
import com.wog.repository.UserRepository;
import com.wog.service.EmailService;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Singleton
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Inject
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public List<UserDto.Response> findAll(User.UserRole role, User.UserStatus status) {
        return userRepository.findAll(role, status)
                .stream()
                .map(UserDto.Response::new)
                .collect(Collectors.toList());
    }

    public UserDto.Response findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserDto.Response(user);
    }

    public UserDto.Response create(UserDto.CreateRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        String tempPassword = UUID.randomUUID().toString().substring(0, 8);
        String hashedPassword = passwordEncoder.encode(tempPassword);

        User user = new User(request.getEmail(), hashedPassword, request.getRole());
        user.setStatus(User.UserStatus.PENDING);
        
        User savedUser = userRepository.save(user);

        // Send welcome email with temporary password
        emailService.sendAccountCreationEmail(savedUser.getEmail(), tempPassword);

        return new UserDto.Response(savedUser);
    }

    public UserDto.Response update(Long id, UserDto.UpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getEmail() != null && 
            !request.getEmail().equals(user.getEmail()) &&
            userRepository.existsByEmailAndNotId(request.getEmail(), id)) {
            throw new RuntimeException("Email already exists");
        }

        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }
        if (request.getStatus() != null) {
            user.setStatus(request.getStatus());
        }

        User updatedUser = userRepository.update(user);
        return new UserDto.Response(updatedUser);
    }

    public void deleteById(Long id) {
        if (!userRepository.deleteById(id)) {
            throw new RuntimeException("User not found");
        }
    }

    public void requestPasswordChange(String email, String currentPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        String tempPassword = UUID.randomUUID().toString().substring(0, 8);
        String hashedPassword = passwordEncoder.encode(tempPassword);
        
        user.setPassword(hashedPassword);
        user.setStatus(User.UserStatus.PENDING);
        userRepository.update(user);

        emailService.sendPasswordResetEmail(user.getEmail(), tempPassword);
    }
}



