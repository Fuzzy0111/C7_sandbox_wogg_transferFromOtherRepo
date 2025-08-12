
package com.wog.dto;

import io.micronaut.core.annotation.Introspected;
import com.wog.entity.StockItem;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;



public class StockItemDto {
    

    public enum ProductType {
        GAME, HARDWARE, MERCHANDISE
    }
    
    @Introspected
    public static class Response {
        private Long id;
        private String text;
        private Long authorId;
        private String authorName;
        private ProductType productType;
        private Integer year;
        private BigDecimal price;
        private Boolean isActive;
        private LocalDateTime createdAt;
        
        public Response() {}
        
        public Response(StockItem stockItem) {
            this.id = stockItem.getId();
            this.text = stockItem.getDescription();
            this.authorId = stockItem.getAuthorId();
            this.productType = ProductType.valueOf(stockItem.getProduct_type().name());
            this.year = stockItem.getYear();
            this.price = stockItem.getPrice();
            this.isActive = stockItem.getIsActive();
            this.createdAt = stockItem.getCreatedAt();
            
            if (stockItem.getAuthor() != null) {
                this.authorName = stockItem.getAuthor().getName();
            }
        }
        
        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        
        public Long getAuthorId() { return authorId; }
        public void setAuthorId(Long authorId) { this.authorId = authorId; }
        
        public String getAuthorName() { return authorName; }
        public void setAuthorName(String authorName) { this.authorName = authorName; }
        
        public ProductType getProductType() { return productType; }
        public void setProductType(ProductType productType) { this.productType = productType; }
        
        public Integer getYear() { return year; }
        public void setYear(Integer year) { this.year = year; }
        
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
        
        public Boolean getIsActive() { return isActive; }
        public void setIsActive(Boolean active) { isActive = active; }
        
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
    
    @Introspected
    public static class CreateRequest {
        @NotBlank
        private String text;
        
        private Long authorId;
        
        @NotNull
        private StockItemDto.ProductType productType;
        
        private Integer year;
        
        @NotNull
        @Positive
        private BigDecimal price;
        
        public CreateRequest() {}
        
        // Getters and Setters
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        
        public Long getAuthorId() { return authorId; }
        public void setAuthorId(Long authorId) { this.authorId = authorId; }
        
        public ProductType getProductType() { return productType; }
        public void setProductType(ProductType productType) { this.productType = productType; }
        
        public Integer getYear() { return year; }
        public void setYear(Integer year) { this.year = year; }
        
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
    }
    
    @Introspected
    public static class UpdateRequest {
        private String text;
        private Long authorId;
        private ProductType productType;
        private Integer year;
        
        @Positive
        private BigDecimal price;
        
        private Boolean isActive;
        
        public UpdateRequest() {}
        
        // Getters and Setters
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        
        public Long getAuthorId() { return authorId; }
        public void setAuthorId(Long authorId) { this.authorId = authorId; }
        
        public ProductType getProductType() { return productType; }
        public void setProductType(ProductType productType) { this.productType = productType; }
        
        public Integer getYear() { return year; }
        public void setYear(Integer year) { this.year = year; }
        
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
        
        public Boolean getIsActive() { return isActive; }
        public void setIsActive(Boolean active) { isActive = active; }
    }
    
    @Introspected
    public static class FilterRequest {
        private ProductType productType;
        private String authorName;
        private Integer year;
        private Boolean isActive;
        
        public FilterRequest() {}
        
        // Getters and Setters
        public ProductType getProductType() { return productType; }
        public void setProductType(ProductType pType) { this.productType = pType; }
        
        public String getAuthorName() { return authorName; }
        public void setAuthorName(String authorName) { this.authorName = authorName; }
        
        public Integer getYear() { return year; }
        public void setYear(Integer year) { this.year = year; }
        
        public Boolean getIsActive() { return isActive; }
        public void setIsActive(Boolean active) { isActive = active; }
    }
}
