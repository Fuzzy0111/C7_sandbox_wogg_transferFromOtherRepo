
package com.wog.mapper.impl;

import com.wog.repository.StockItemRepository;
import com.wog.entity.StockItem;
import com.wog.mapper.StockItemMapper;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;
import java.util.Optional;

@Singleton
public class StockItemRepositoryImpl implements StockItemRepository {
    
    private final StockItemMapper stockItemMapper;
    
    @Inject
    public StockItemRepositoryImpl(StockItemMapper stockItemMapper) {
        this.stockItemMapper = stockItemMapper;
    }
    
    @Override
    public Optional<StockItem> findById(Long id) {
        return stockItemMapper.findById(id);
    }
    
    @Override
    public List<StockItem> findAll(String authorName, Integer year, Boolean isActive) {
        return stockItemMapper.findAll(authorName, year, isActive);
    }
    
    @Override
    public Optional<StockItem> findRandom() {
        return stockItemMapper.findRandom();
    }
    
    @Override
    public StockItem save(StockItem stockItem) {
        stockItemMapper.insert(stockItem);
        return stockItem; // ID will be set by MyBatis
    }
    
    @Override
    public StockItem update(StockItem stockItem) {
        int rowsAffected = stockItemMapper.update(stockItem);
        if (rowsAffected == 0) {
            throw new RuntimeException("StockItem not found with id: " + stockItem.getId());
        }
        return stockItemMapper.findById(stockItem.getId())
                .orElseThrow(() -> new RuntimeException("StockItem not found after update"));
    }
    
    @Override
    public boolean deleteById(Long id) {
        return stockItemMapper.deleteById(id) > 0;
    }
    
    @Override
    public int countActive() {
        return stockItemMapper.countActive();
    }
    
    @Override
    public int countByProductType(StockItem.ProductType pType) {
        return stockItemMapper.countByProductType(pType);
    }
    
    @Override
    public List<String> findDistinctAuthorNames() {
        return stockItemMapper.findDistinctAuthorNames();
    }
    
    @Override
    public List<Integer> findDistinctYears() {
        return stockItemMapper.findDistinctYears();
    }
}


