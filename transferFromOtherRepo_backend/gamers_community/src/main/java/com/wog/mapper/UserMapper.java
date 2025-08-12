
package com.wog.mapper;

import com.wog.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Optional;

@Mapper
public interface UserMapper {

    @Select("SELECT * FROM users WHERE id = #{id}")
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "email", column = "email"),
        @Result(property = "password", column = "password"),
        @Result(property = "role", column = "role"),
        @Result(property = "status", column = "status"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "updatedAt", column = "updated_at")
    })
    Optional<User> findById(Long id);

    @Select("SELECT * FROM users WHERE email = #{email}")
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "email", column = "email"),
        @Result(property = "password", column = "password"),
        @Result(property = "role", column = "role"),
        @Result(property = "status", column = "status"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "updatedAt", column = "updated_at")
    })
    Optional<User> findByEmail(String email);

    @Select({
        "<script>",
        "SELECT * FROM users",
        "<where>",
        "<if test='role != null'>AND role = #{role}</if>",
        "<if test='status != null'>AND status = #{status}</if>",
        "</where>",
        "ORDER BY created_at DESC",
        "</script>"
    })
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "email", column = "email"),
        @Result(property = "password", column = "password"),
        @Result(property = "role", column = "role"),
        @Result(property = "status", column = "status"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "updatedAt", column = "updated_at")
    })
    List<User> findAll(@Param("role") User.UserRole role, @Param("status") User.UserStatus status);

    @Insert({
        "INSERT INTO users (email, password, role, status)",
        "VALUES (#{email}, #{password}, #{role}, #{status})"
    })
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(User user);

    @Update({
        "<script>",
        "UPDATE users SET updated_at = CURRENT_TIMESTAMP",
        "<if test='email != null'>, email = #{email}</if>",
        "<if test='password != null'>, password = #{password}</if>",
        "<if test='role != null'>, role = #{role}</if>",
        "<if test='status != null'>, status = #{status}</if>",
        "WHERE id = #{id}",
        "</script>"
    })
    int update(User user);

    @Delete("DELETE FROM users WHERE id = #{id}")
    int deleteById(Long id);

    @Select("SELECT COUNT(*) FROM users WHERE role = #{role}")
    int countByRole(User.UserRole role);

    @Select("SELECT COUNT(*) FROM users WHERE status = #{status}")
    int countByStatus(User.UserStatus status);

    @Select("SELECT EXISTS(SELECT 1 FROM users WHERE email = #{email} AND id != #{id})")
    boolean existsByEmailAndNotId(@Param("email") String email, @Param("id") Long id);

    @Select("SELECT EXISTS(SELECT 1 FROM users WHERE email = #{email})")
    boolean existsByEmail(String email);
}


