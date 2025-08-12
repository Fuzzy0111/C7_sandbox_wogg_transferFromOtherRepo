package com.wog.mapper;

import com.wog.entity.Stock;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface StockMapper {

    @Select("""
        SELECT 
            s.id,
            s.Name as name,
            s.description,
            s.creator_id,
            c.name as creator_name,
            s.product_type,
            s.creation_year,
            s.price,
            s.is_active,
            s.created_at,
            s.updated_at,
            s.photo_url
        FROM stocks s
        LEFT JOIN creators c ON s.creator_id = c.id
        WHERE s.product_type = 'GAME'
        AND s.is_active = true
        ORDER BY s.created_at DESC
        """)
    List<Stock> findAllGames();

    @Select("""
        SELECT 
            s.id,
            s.Name as name,
            s.description,
            s.creator_id,
            c.name as creator_name,
            s.product_type,
            s.creation_year,
            s.price,
            s.is_active,
            s.created_at,
            s.updated_at,
            s.photo_url
        FROM stocks s
        LEFT JOIN creators c ON s.creator_id = c.id
        WHERE s.product_type = 'GAME' or  s.product_type = 'MERCHANDISE'
        AND s.is_active = true
        ORDER BY s.creation_year DESC
        """)
    List<Stock> findAllProducts();


    @Select("""
        SELECT DISTINCT s.product_type
        FROM stocks s
        WHERE s.product_type <> 'HARDWARE'
        AND s.is_active = true
        """)
    List<String> findAllProductTypes();


    @Select("""
        SELECT 
            s.id,
            s.Name as name,
            s.description,
            s.creator_id,
            c.name as creator_name,
            s.product_type,
            s.creation_year,
            s.price,
            s.is_active,
            s.created_at,
            s.updated_at,
            s.photo_url
        FROM stocks s
        LEFT JOIN creators c ON s.creator_id = c.id
        WHERE s.product_type = 'MERCHANDISE'
        AND s.is_active = true
        ORDER BY s.created_at DESC
        """)
    List<Stock> findAllMerch();


    @Select("""
        SELECT 
            s.id,
            s.Name as name,
            s.description,
            s.creator_id,
            c.name as creator_name,
            s.product_type,
            s.creation_year,
            s.price,
            s.is_active,
            s.created_at,
            s.updated_at,
            s.photo_url
        FROM stocks s
        LEFT JOIN creators c ON s.creator_id = c.id
        WHERE s.product_type = 'HARDWARE'
        AND s.is_active = true
        ORDER BY s.created_at DESC
        """)
    List<Stock> findAllHardware();
}

