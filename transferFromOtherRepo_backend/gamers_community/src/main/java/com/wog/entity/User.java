
package com.wog.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.micronaut.core.annotation.Introspected;

import java.time.LocalDateTime;

@Introspected
public class User {
    
    private Long id;
    private String email;
    
    @JsonIgnore
    private String password;
    
    private UserRole role;
    private UserStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public enum UserRole {
        ADMIN, USER
    }
    
    public enum UserStatus {
        ACTIVE, PENDING, INACTIVE
    }
    
    // Default constructor
    public User() {}
    
    // Constructor for creation
    public User(String email, String password, UserRole role) {
        this.email = email;
        this.password = password;
        this.role = role != null ? role : UserRole.USER;
        this.status = UserStatus.PENDING;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public UserRole getRole() {
        return role;
    }
    
    public void setRole(UserRole role) {
        this.role = role;
    }
    
    public UserStatus getStatus() {
        return status;
    }
    
    public void setStatus(UserStatus status) {
        this.status = status;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public boolean isAdmin() {
        return UserRole.ADMIN.equals(this.role);
    }
    
    public boolean isActive() {
        return UserStatus.ACTIVE.equals(this.status);
    }
    
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", status=" + status +
                ", createdAt=" + createdAt +
                '}';
    }
}


