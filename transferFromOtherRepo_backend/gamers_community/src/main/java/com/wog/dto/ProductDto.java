package com.wog.dto;

import io.micronaut.serde.annotation.Serdeable;
import java.time.LocalDateTime;



@Serdeable
public class ProductDto {
    private String id;
    private String text;
    private String productType;
    private String meaning;
    private String origin;
    private String category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isActive;

    public ProductDto() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getProductType() { return productType; }
    public void setProductType(String productType) { this.productType = productType; }

    public String getMeaning() { return meaning; }
    public void setMeaning(String meaning) { this.meaning = meaning; }

    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
