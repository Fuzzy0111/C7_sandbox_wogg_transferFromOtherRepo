
package com.wog.dto;

import io.micronaut.core.annotation.Introspected;
import com.wog.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class UserDto {
    
    @Introspected
    public static class Response {
        private Long id;
        private String email;
        private User.UserRole role;
        private User.UserStatus status;
        private LocalDateTime createdAt;
        
        public Response() {}
        
        public Response(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.role = user.getRole();
            this.status = user.getStatus();
            this.createdAt = user.getCreatedAt();
        }
        
        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public User.UserRole getRole() { return role; }
        public void setRole(User.UserRole role) { this.role = role; }
        
        public User.UserStatus getStatus() { return status; }
        public void setStatus(User.UserStatus status) { this.status = status; }
        
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
    
    @Introspected
    public static class CreateRequest {
        @NotBlank
        @Email
        private String email;
        
        private User.UserRole role;
        
        public CreateRequest() {}
        
        // Getters and Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public User.UserRole getRole() { return role; }
        public void setRole(User.UserRole role) { this.role = role; }
    }
    
    @Introspected
    public static class UpdateRequest {
        @Email
        private String email;
        
        private User.UserRole role;
        private User.UserStatus status;
        
        public UpdateRequest() {}
        
        // Getters and Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public User.UserRole getRole() { return role; }
        public void setRole(User.UserRole role) { this.role = role; }
        
        public User.UserStatus getStatus() { return status; }
        public void setStatus(User.UserStatus status) { this.status = status; }
    }
    
    @Introspected
    public static class PasswordChangeRequest {
        @NotBlank
        private String currentPassword;
        
        public PasswordChangeRequest() {}
        
        public String getCurrentPassword() { return currentPassword; }
        public void setCurrentPassword(String currentPassword) { this.currentPassword = currentPassword; }
    }
}


