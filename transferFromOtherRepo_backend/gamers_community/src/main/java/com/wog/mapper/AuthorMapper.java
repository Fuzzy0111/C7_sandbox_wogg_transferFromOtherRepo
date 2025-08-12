
package com.wog.mapper;

import com.wog.entity.Author;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Optional;

@Mapper
public interface AuthorMapper {
    
    @Select("SELECT * FROM authors WHERE id = #{id}")
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "name", column = "name"),
        @Result(property = "bio", column = "bio"),
        @Result(property = "birthYear", column = "birth_year"),
        @Result(property = "deathYear", column = "death_year"),
        @Result(property = "createdAt", column = "created_at")
    })
    Optional<Author> findById(Long id);
    
    @Select("SELECT * FROM authors WHERE name = #{name}")
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "name", column = "name"),
        @Result(property = "bio", column = "bio"),
        @Result(property = "birthYear", column = "birth_year"),
        @Result(property = "deathYear", column = "death_year"),
        @Result(property = "createdAt", column = "created_at")
    })
    Optional<Author> findByName(String name);
    
    @Select("SELECT * FROM authors ORDER BY name ASC")
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "name", column = "name"),
        @Result(property = "bio", column = "bio"),
        @Result(property = "birthYear", column = "birth_year"),
        @Result(property = "deathYear", column = "death_year"),
        @Result(property = "createdAt", column = "created_at")
    })
    List<Author> findAll();
    
    @Insert({
        "INSERT INTO authors (name, bio, birth_year, death_year)",
        "VALUES (#{name}, #{bio}, #{birthYear}, #{deathYear})"
    })
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Author author);
    
    @Update({
        "<script>",
        "UPDATE authors SET",
        "<if test='name != null'>name = #{name},</if>",
        "<if test='bio != null'>bio = #{bio},</if>",
        "<if test='birthYear != null'>birth_year = #{birthYear},</if>",
        "<if test='deathYear != null'>death_year = #{deathYear},</if>",
        "id = #{id}",
        "WHERE id = #{id}",
        "</script>"
    })
    int update(Author author);
    
    @Delete("DELETE FROM authors WHERE id = #{id}")
    int deleteById(Long id);
    
    @Select("SELECT COUNT(*) FROM authors")
    int count();
    
    @Select("SELECT EXISTS(SELECT 1 FROM authors WHERE name = #{name} AND id != #{id})")
    boolean existsByNameAndNotId(@Param("name") String name, @Param("id") Long id);
    
    @Select("SELECT EXISTS(SELECT 1 FROM authors WHERE name = #{name})")
    boolean existsByName(String name);
}



