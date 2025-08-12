
package com.wog.dto;

import io.micronaut.core.annotation.Introspected;
import com.wog.entity.Reservation;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ReservationDto {
    
    @Introspected
    public static class Response {
        private Long id;
        private Long userId;
        private String userEmail;
        private Long productId;
        private String productDescription;
        private String authorName;
        private BigDecimal price;
        private Integer quantity;
        private Reservation.ReservationStatus status;
        private LocalDateTime reservedAt;
        private LocalDateTime expiresAt;
        private LocalDateTime redeemedAt;
        private Long daysLeft;
        
        public Response() {}
        
        public Response(Reservation reservation) {
            this.id = reservation.getId();
            this.userId = reservation.getUserId();
            this.productId = reservation.getStockItemId();
            this.quantity = reservation.getQuantity();
            this.status = reservation.getStatus();
            this.reservedAt = reservation.getReservedAt();
            this.expiresAt = reservation.getExpiresAt();
            this.redeemedAt = reservation.getRedeemedAt();
            this.daysLeft = reservation.getDaysLeft();
            
            if (reservation.getUser() != null) {
                this.userEmail = reservation.getUser().getEmail();
            }
            
            if (reservation.getStockItem() != null) {
                this.productDescription = reservation.getStockItem().getDescription();
                this.price = reservation.getStockItem().getPrice();
                
                if (reservation.getStockItem().getAuthor() != null) {
                    this.authorName = reservation.getStockItem().getAuthor().getName();
                }
            }
        }
        
        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        
        public String getUserEmail() { return userEmail; }
        public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
        
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        
        public String getProductDescription() { return productDescription; }
        public void setProductDescription(String productDescription) { this.productDescription = productDescription; }
        
        public String getAuthorName() { return authorName; }
        public void setAuthorName(String authorName) { this.authorName = authorName; }
        
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
        
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
        
        public Reservation.ReservationStatus getStatus() { return status; }
        public void setStatus(Reservation.ReservationStatus status) { this.status = status; }
        
        public LocalDateTime getReservedAt() { return reservedAt; }
        public void setReservedAt(LocalDateTime reservedAt) { this.reservedAt = reservedAt; }
        
        public LocalDateTime getExpiresAt() { return expiresAt; }
        public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
        
        public LocalDateTime getRedeemedAt() { return redeemedAt; }
        public void setRedeemedAt(LocalDateTime redeemedAt) { this.redeemedAt = redeemedAt; }
        
        public Long getDaysLeft() { return daysLeft; }
        public void setDaysLeft(Long daysLeft) { this.daysLeft = daysLeft; }
    }
    
    @Introspected
    public static class CreateRequest {
        @NotNull
        private Long productId;
        
        @NotNull
        @Positive
        private Integer quantity;
        
        public CreateRequest() {}
        
        // Getters and Setters
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }
    
    @Introspected
    public static class FilterRequest {
        private Long userId;
        private Reservation.ReservationStatus status;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        
        public FilterRequest() {}
        
        // Getters and Setters
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        
        public Reservation.ReservationStatus getStatus() { return status; }
        public void setStatus(Reservation.ReservationStatus status) { this.status = status; }
        
        public LocalDateTime getStartDate() { return startDate; }
        public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }
        
        public LocalDateTime getEndDate() { return endDate; }
        public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }
    }
}


