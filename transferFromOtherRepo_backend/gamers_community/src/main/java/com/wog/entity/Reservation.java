
package com.wog.entity;

import io.micronaut.core.annotation.Introspected;

import java.time.LocalDateTime;

@Introspected
public class Reservation {
    
    private Long id;
    private Long userId;
    private Long stockItemId;
    private Integer quantity;
    private ReservationStatus status;
    private LocalDateTime reservedAt;
    private LocalDateTime expiresAt;
    private LocalDateTime redeemedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // For joined queries
    private User user;
    private StockItem stockItem;
    
    public enum ReservationStatus {
        PENDING, REDEEMED, EXPIRED
    }
    
    // Default constructor
    public Reservation() {}
    
    // Constructor for creation
    public Reservation(Long userId, Long stockItemId, Integer quantity, LocalDateTime expiresAt) {
        this.userId = userId;
        this.stockItemId = stockItemId;
        this.quantity = quantity;
        this.status = ReservationStatus.PENDING;
        this.expiresAt = expiresAt;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public Long getStockItemId() {
        return stockItemId;
    }
    
    public void setStockItemId(Long stockItemId) {
        this.stockItemId = stockItemId;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    public ReservationStatus getStatus() {
        return status;
    }
    
    public void setStatus(ReservationStatus status) {
        this.status = status;
    }
    
    public LocalDateTime getReservedAt() {
        return reservedAt;
    }
    
    public void setReservedAt(LocalDateTime reservedAt) {
        this.reservedAt = reservedAt;
    }
    
    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }
    
    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }
    
    public LocalDateTime getRedeemedAt() {
        return redeemedAt;
    }
    
    public void setRedeemedAt(LocalDateTime redeemedAt) {
        this.redeemedAt = redeemedAt;
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
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public StockItem getStockItem() {
        return stockItem;
    }
    
    public void setStockItem(StockItem stockItem) {
        this.stockItem = stockItem;
    }
    
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiresAt) && status == ReservationStatus.PENDING;
    }
    
    public long getDaysLeft() {
        if (status != ReservationStatus.PENDING) {
            return 0;
        }
        return java.time.temporal.ChronoUnit.DAYS.between(LocalDateTime.now(), expiresAt);
    }
    
    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", userId=" + userId +
                ", stockItem_Id=" + stockItemId +
                ", quantity=" + quantity +
                ", status=" + status +
                ", expiresAt=" + expiresAt +
                '}';
    }
}


