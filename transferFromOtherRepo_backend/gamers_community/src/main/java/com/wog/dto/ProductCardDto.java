package com.wog.dto;

import io.micronaut.serde.annotation.Serdeable;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Serdeable
public class ProductCardDto {
    private String id;
    private String productId;
    private ProductDto prodDetail;
    private String photoUrl;
    private BigDecimal price;
    private Boolean isAvailable;
    private Integer stock;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ProductCardDto() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public ProductDto getProdDetail() { return prodDetail; }
    public void setProdDetail(ProductDto prodDetail) { this.prodDetail = prodDetail; }

    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
