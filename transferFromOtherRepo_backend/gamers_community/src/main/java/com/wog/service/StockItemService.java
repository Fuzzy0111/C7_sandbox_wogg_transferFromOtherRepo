
package com.wog.service;

import com.wog.dto.StockItemDto;
import com.wog.entity.Author;
import com.wog.entity.StockItem;
import com.wog.repository.StockItemRepository;
import com.wog.mapper.AuthorMapper;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Singleton
public class StockItemService {

    private final StockItemRepository stockItemRepository;
    private final AuthorMapper authorMapper;

    @Inject
    public StockItemService(StockItemRepository stockItemRepository, AuthorMapper authorMapper) {
        this.stockItemRepository = stockItemRepository;
        this.authorMapper = authorMapper;
    }


    public List<StockItemDto.Response> findAll(StockItemDto.FilterRequest filters) {
        return stockItemRepository.findAll(
                filters.getAuthorName(),
                filters.getYear(),
                filters.getIsActive()
        ).stream()
        .map(StockItemDto.Response::new)
        .collect(Collectors.toList());
    }

    public StockItemDto.Response findById(Long id) {
        StockItem stockItem = stockItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("stock item not found"));
        return new StockItemDto.Response(stockItem);
    }

    public StockItemDto.Response findRandom() {
        StockItem stockItem = stockItemRepository.findRandom()
                .orElseThrow(() -> new RuntimeException("No stock items available"));
        return new StockItemDto.Response(stockItem);
    }

    public Map<String, Object> getFilterOptions() {
        Map<String, Object> filters = new HashMap<>();
        filters.put("authors", stockItemRepository.findDistinctAuthorNames());
        filters.put("years", stockItemRepository.findDistinctYears());
        return filters;
    }

    public List<Author> getAllAuthors() {
        return authorMapper.findAll();
    }

    public StockItemDto.Response create(StockItemDto.CreateRequest request) {
        StockItem stockItem = new StockItem(
                request.getText(),
                request.getAuthorId(),
                convertType(request.getProductType()), // Fixed: Convert enum
                request.getYear(),
                request.getPrice()
        );

        StockItem savedStockItem = stockItemRepository.save(stockItem);
        return new StockItemDto.Response(savedStockItem);
    }

    private StockItem.ProductType convertType(StockItemDto.ProductType dtoType) {
        return switch (dtoType) {
            case GAME -> StockItem.ProductType.GAME;
            case HARDWARE -> StockItem.ProductType.HARDWARE;
            case MERCHANDISE -> StockItem.ProductType.MERCHANDISE;
            default -> throw new IllegalArgumentException("Unknown ProductType: " + dtoType);
        };
    }
    public StockItemDto.Response update(Long id, StockItemDto.UpdateRequest request) {
        StockItem stockItem = stockItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("stock item not found"));

        if (request.getText() != null) {
            stockItem.setDescription(request.getText());
        }
        if (request.getAuthorId() != null) {
            stockItem.setAuthorId(request.getAuthorId());
        }
        if (request.getProductType() != null) {
            stockItem.setProduct_type(convertType(request.getProductType())); // Fixed: Convert enum
        }
        if (request.getYear() != null) {
            stockItem.setYear(request.getYear());
        }
        if (request.getPrice() != null) {
            stockItem.setPrice(request.getPrice());
        }
        if (request.getIsActive() != null) {
            stockItem.setIsActive(request.getIsActive());
        }

        StockItem updatedStockItem = stockItemRepository.update(stockItem);
        return new StockItemDto.Response(updatedStockItem);
    }

    public void deleteById(Long id) {
        if (!stockItemRepository.deleteById(id)) {
            throw new RuntimeException("StockItem not found");
        }
    }
}



