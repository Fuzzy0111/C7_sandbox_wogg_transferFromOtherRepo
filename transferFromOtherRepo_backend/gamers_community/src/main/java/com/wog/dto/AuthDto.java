
package com.wog.dto;

import io.micronaut.core.annotation.Introspected;
import com.wog.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDto {
    
    @Introspected
    public static class LoginRequest {
        @NotBlank
        @Email
        private String email;
        
        @NotBlank
        private String password;
        
        public LoginRequest() {}
        
        public LoginRequest(String email, String password) {
            this.email = email;
            this.password = password;
        }
        
        // Getters and Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    @Introspected
    public static class LoginResponse {
        private String accessToken;
        private String tokenType;
        private Long expiresIn;
        private UserInfo user;
        
        public LoginResponse() {}
        
        public LoginResponse(String accessToken, String tokenType, Long expiresIn, UserInfo user) {
            this.accessToken = accessToken;
            this.tokenType = tokenType;
            this.expiresIn = expiresIn;
            this.user = user;
        }
        
        // Getters and Setters
        public String getAccessToken() { return accessToken; }
        public void setAccessToken(String accessToken) { this.accessToken = accessToken; }
        
        public String getTokenType() { return tokenType; }
        public void setTokenType(String tokenType) { this.tokenType = tokenType; }
        
        public Long getExpiresIn() { return expiresIn; }
        public void setExpiresIn(Long expiresIn) { this.expiresIn = expiresIn; }
        
        public UserInfo getUser() { return user; }
        public void setUser(UserInfo user) { this.user = user; }
    }
    
    @Introspected
    public static class UserInfo {
        private Long id;
        private String email;
        private User.UserRole role;
        private User.UserStatus status;
        
        public UserInfo() {}
        
        public UserInfo(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.role = user.getRole();
            this.status = user.getStatus();
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
    }
}


