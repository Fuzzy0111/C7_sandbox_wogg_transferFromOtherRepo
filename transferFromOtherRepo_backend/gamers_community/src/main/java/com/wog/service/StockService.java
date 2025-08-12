package com.wog.service;

import com.wog.dto.ProductCardDto;
import com.wog.dto.ProductDto;
import com.wog.dto.StockDto;
import com.wog.entity.Stock;
import com.wog.mapper.StockMapper;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class StockService {

    private final StockMapper stockMapper;

    @Inject
    public StockService(StockMapper stockMapper) {
        this.stockMapper = stockMapper;
    }

    private StockDto convertToDto(Stock stock) {
        StockDto dto = new StockDto();
        dto.setId(stock.getId());
        dto.setName(stock.getName());
        dto.setDescription(stock.getDescription());
        dto.setCreatorId(stock.getCreatorId());
        dto.setCreatorName(stock.getCreatorName());
        dto.setProductType(stock.getProductType());
        dto.setCreationYear(stock.getCreationYear());
        dto.setPrice(stock.getPrice());
        dto.setIsActive(stock.getIsActive());
        dto.setCreatedAt(stock.getCreatedAt());
        dto.setUpdatedAt(stock.getUpdatedAt());
        dto.setPhotoUrl(stock.getPhotoUrl());
        return dto;
    }

    public List<StockDto> getAllProducts() {
        List<Stock> products = stockMapper.findAllProducts();
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<String> getAllProductTypes() {
        List<String> productTypes = stockMapper.findAllProductTypes();
        return productTypes;
    }

    public List<String> getAllProductCats() {
//   todo     List<String> productCats = stockMapper.findAllProductCategories();
        List<String> productCats = List.of();
        return productCats;
    }

    //  Building product cards that React expects
    public List<ProductCardDto> getProductCards(  ) {
        List<Stock> products = stockMapper.findAllProducts();
        return products.stream()
                .map(this::toProductCard)
                .collect(Collectors.toList());
    }

    private ProductCardDto toProductCard(Stock stock) {
        String idStr = stock.getId() != null ? String.valueOf(stock.getId()) : null;

        ProductDto prod = new ProductDto();
        prod.setId(idStr);
        prod.setText(stock.getName());
        prod.setProductType(stock.getProductType());
        prod.setMeaning(null);
        prod.setOrigin(null);
        prod.setCategory(null);
        prod.setCreatedAt(stock.getCreatedAt());
        prod.setUpdatedAt(stock.getUpdatedAt());
        prod.setIsActive(stock.getIsActive());

        ProductCardDto card = new ProductCardDto();
        card.setId(idStr);          // there can be cases where this could well be a distinct card id
        card.setProductId(idStr);
        card.setProdDetail(prod);
        card.setPhotoUrl(stock.getPhotoUrl());

        card.setPrice(stock.getPrice() != null ? stock.getPrice() : BigDecimal.ZERO);
        // A price of -111 means Free + In App Purchases (IAP)
        // A price of -222 means Price is unknown/Not Available (n/a)

        Integer stockQty = 1111; // hardcoded inventory field coz this is not a stock control system
        card.setStock(stockQty);

        boolean active = stock.getIsActive() != null && stock.getIsActive();
        card.setIsAvailable(active && stockQty != null && stockQty > 0);

        card.setCreatedAt(stock.getCreatedAt());
        card.setUpdatedAt(stock.getUpdatedAt());
        return card;
    }
}
