
package com.wog.dto;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import com.wog.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDto {
    
    @Introspected
    @Serdeable.Deserializable
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
    @Serdeable.Serializable
    public static class LoginResponse {
        //private String accessToken;
        //private String tokenType;
        //private Long expiresIn;
        private UserInfo user;
        private String token;
        private String refreshToken;
        
        public LoginResponse() {}
        
        //public LoginResponse(String accessToken, String tokenType, Long expiresIn, UserInfo user) {
        public LoginResponse(UserInfo user, String token, String refreshToken) {
            this.user = user;
            this.token = token;
            this.refreshToken = refreshToken;
        }
        
        // Getters and Setters
        public UserInfo getUser() { return user; }
        public void setUser(UserInfo user) { this.user = user; }
        
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        
        public String getRefreshToken() { return refreshToken; }
        public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }
    }
    
    @Introspected
    @Serdeable.Serializable
    public static class TokenResponse {
        private String token;
        private String refreshToken;
        
        public TokenResponse() {}
        
        public TokenResponse(String token, String refreshToken) {
            this.token = token;
            this.refreshToken = refreshToken;
        }
        
        // Getters and Setters
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        
        public String getRefreshToken() { return refreshToken; }
        public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }
    }
    
    @Introspected
    @Serdeable.Deserializable
    public static class RefreshTokenRequest {
        @NotBlank
        private String refreshToken;
        
        public RefreshTokenRequest() {}
        
        public RefreshTokenRequest(String refreshToken) {
            this.refreshToken = refreshToken;
        }
        
        // Getters and Setters
        public String getRefreshToken() { return refreshToken; }
        public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }
    }
    
    @Introspected
    @Serdeable.Serializable
    public static class UserInfo {
        private Long id;
        private String email;
        private String role;
        private String status;
        
        public UserInfo() {}

        public UserInfo(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.role = user.getRole() != null ? user.getRole().name() : null;
            this.status = user.getStatus() != null ? user.getStatus().name() : null;
        }

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}


