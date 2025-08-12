

package com.wog.entity;

import io.micronaut.core.annotation.Introspected;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Introspected
public class StockItem {
    
    private Long id;
    private String description;
    private Long authorId;
    private ProductType product_type;
    private Integer year;
    private BigDecimal price;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // For joined queries
    private Author author;
    
    public enum ProductType {
        GAME, HARDWARE, MERCHANDISE
    }
    
    // Default constructor
    public StockItem() {}
    
    // Constructor for creation
    public StockItem(String text, Long authorId, ProductType product_type, Integer year, BigDecimal price) {
        this.description = text;
        this.authorId = authorId;
        this.product_type = product_type;
        this.year = year;
        this.price = price;
        this.isActive = true;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Long getAuthorId() {
        return authorId;
    }
    
    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }
    
    public ProductType getProduct_type() {
        return product_type;
    }
    
    public void setProduct_type(ProductType product_type) {
        this.product_type = product_type;
    }
    
    public Integer getYear() {
        return year;
    }
    
    public void setYear(Integer year) {
        this.year = year;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean active) {
        isActive = active;
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
    
    public Author getAuthor() {
        return author;
    }
    
    public void setAuthor(Author author) {
        this.author = author;
    }
    
    @Override
    public String toString() {
        return "StockItem{" +
                "id=" + id +
                ", text='" + description + '\'' +
                ", product_type=" + product_type +
                ", year=" + year +
                ", price=" + price +
                '}';
    }
}



