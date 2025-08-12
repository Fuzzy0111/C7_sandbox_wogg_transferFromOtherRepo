
package com.wog.repository;

import com.wog.entity.StockItem;

import java.util.List;
import java.util.Optional;


public interface StockItemRepository  {
    
    Optional<StockItem> findById(Long id);
    
    List<StockItem> findAll(String authorName, Integer year, Boolean isActive);
    
    Optional<StockItem> findRandom();
    
    StockItem save(StockItem stockItem);
    
    StockItem update(StockItem stockItem);
    
    boolean deleteById(Long id);
    
    int countActive();
    
    int countByProductType(StockItem.ProductType pType);
    
    List<String> findDistinctAuthorNames();
    
    List<Integer> findDistinctYears();
}


