
package com.wog.mapper;

import com.wog.entity.StockItem;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Optional;

@Mapper
public interface StockItemMapper {
    
    @Select({
        "SELECT p.*, a.name as author_name, a.bio as author_bio, a.birth_year as author_birth_year, a.death_year as author_death_year",
        "FROM stocks p",
        "LEFT JOIN authors a ON p.author_id = a.id",
        "WHERE p.id = #{id}"
    })
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "text", column = "text"),
        @Result(property = "authorId", column = "author_id"),
        @Result(property = "year", column = "year"),
        @Result(property = "price", column = "price"),
        @Result(property = "isActive", column = "is_active"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "updatedAt", column = "updated_at"),
        @Result(property = "author.id", column = "author_id"),
        @Result(property = "author.name", column = "author_name"),
        @Result(property = "author.bio", column = "author_bio"),
        @Result(property = "author.birthYear", column = "author_birth_year"),
        @Result(property = "author.deathYear", column = "author_death_year")
    })
    Optional<StockItem> findById(Long id);
    
    @Select({
        "<script>",
        "SELECT p.*, a.name as author_name, a.bio as author_bio, a.birth_year as author_birth_year, a.death_year as author_death_year",
        "FROM stocks p",
        "LEFT JOIN authors a ON p.author_id = a.id",
        "<where>",
        "<if test='authorName != null'>AND a.name LIKE CONCAT('%', #{authorName}, '%')</if>",
        "<if test='year != null'>AND p.year = #{year}</if>",
        "<if test='isActive != null'>AND p.is_active = #{isActive}</if>",
        "</where>",
        "ORDER BY p.created_at DESC",
        "</script>"
    })
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "text", column = "text"),
        @Result(property = "authorId", column = "author_id"),
        @Result(property = "year", column = "year"),
        @Result(property = "price", column = "price"),
        @Result(property = "isActive", column = "is_active"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "updatedAt", column = "updated_at"),
        @Result(property = "author.id", column = "author_id"),
        @Result(property = "author.name", column = "author_name"),
        @Result(property = "author.bio", column = "author_bio"),
        @Result(property = "author.birthYear", column = "author_birth_year"),
        @Result(property = "author.deathYear", column = "author_death_year")
    })
    List<StockItem> findAll(
                         @Param("authorName") String authorName,
                         @Param("year") Integer year,
                         @Param("isActive") Boolean isActive);
    
    @Select({
        "SELECT p.*, a.name as author_name, a.bio as author_bio, a.birth_year as author_birth_year, a.death_year as author_death_year",
        "FROM stocks p",
        "LEFT JOIN authors a ON p.author_id = a.id",
        "WHERE p.is_active = true",
        "LIMIT 1"
    })
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "text", column = "text"),
        @Result(property = "authorId", column = "author_id"),
        @Result(property = "year", column = "year"),
        @Result(property = "price", column = "price"),
        @Result(property = "isActive", column = "is_active"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "updatedAt", column = "updated_at"),
        @Result(property = "author.id", column = "author_id"),
        @Result(property = "author.name", column = "author_name"),
        @Result(property = "author.bio", column = "author_bio"),
        @Result(property = "author.birthYear", column = "author_birth_year"),
        @Result(property = "author.deathYear", column = "author_death_year")
    })
    Optional<StockItem> findRandom();
    
    @Insert({
        "INSERT INTO stocks (text, author_id, year, price, is_active)",
        "VALUES (#{text}, #{authorId}, #{year}, #{price}, #{isActive})"
    })
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(StockItem stockItem);
    
    @Update({
        "<script>",
        "UPDATE stocks SET updated_at = CURRENT_TIMESTAMP",
        "<if test='text != null'>, text = #{text}</if>",
        "<if test='authorId != null'>, author_id = #{authorId}</if>",
        "<if test='year != null'>, year = #{year}</if>",
        "<if test='price != null'>, price = #{price}</if>",
        "<if test='isActive != null'>, is_active = #{isActive}</if>",
        "WHERE id = #{id}",
        "</script>"
    })
    int update(StockItem stockItem);
    
    @Delete("DELETE FROM stocks WHERE id = #{id}")
    int deleteById(Long id);
    
    @Select("SELECT COUNT(*) FROM stocks WHERE is_active = true")
    int countActive();
    
    @Select("SELECT COUNT(*) FROM stocks WHERE product_type = #{pType}")
    int countByProductType(StockItem.ProductType pType);
    
    @Select({
        "SELECT DISTINCT a.name",
        "FROM stocks p",
        "JOIN authors a ON p.author_id = a.id",
        "WHERE p.is_active = true",
        "ORDER BY a.name"
    })
    List<String> findDistinctAuthorNames();
    
    @Select({
        "SELECT DISTINCT year",
        "FROM stocks",
        "WHERE is_active = true AND year IS NOT NULL",
        "ORDER BY year DESC"
    })
    List<Integer> findDistinctYears();
}
