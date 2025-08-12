
package com.wog.mapper;

import com.wog.entity.Reservation;
import org.apache.ibatis.annotations.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Mapper
public interface ReservationMapper {
    
    @Select({
        "SELECT r.*, u.email as user_email, p.text as desc_text, p.price as product_price,",
        "a.name as author_name",
        "FROM reservations r",
        "LEFT JOIN users u ON r.user_id = u.id",
        "LEFT JOIN stocks p ON r.product_id = p.id",
        "LEFT JOIN authors a ON p.author_id = a.id",
        "WHERE r.id = #{id}"
    })
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "userId", column = "user_id"),
        @Result(property = "stockItemId", column = "product_id"),
        @Result(property = "quantity", column = "quantity"),
        @Result(property = "status", column = "status"),
        @Result(property = "reservedAt", column = "reserved_at"),
        @Result(property = "expiresAt", column = "expires_at"),
        @Result(property = "redeemedAt", column = "redeemed_at"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "updatedAt", column = "updated_at"),
        @Result(property = "user.id", column = "user_id"),
        @Result(property = "user.email", column = "user_email"),
        @Result(property = "stockItem.id", column = "product_id"),
        @Result(property = "stockItem.description", column = "desc_text"),
        @Result(property = "stockItem.price", column = "product_price"),
        @Result(property = "stockItem.author.name", column = "author_name")
    })
    Optional<Reservation> findById(Long id);
    
    @Select({
        "<script>",
        "SELECT r.*, u.email as user_email, p.text as desc_text, p.price as product_price,",
        "a.name as author_name",
        "FROM reservations r",
        "LEFT JOIN users u ON r.user_id = u.id",
        "LEFT JOIN stocks p ON r.product_id = p.id",
        "LEFT JOIN authors a ON p.author_id = a.id",
        "<where>",
        "<if test='userId != null'> r.user_id = #{userId}</if>",
        "<if test='status != null'> AND r.status = #{status}</if>",
        "<if test='startDate != null'> AND r.reserved_at  &gt;= #{startDate}</if>",
        "<if test='endDate != null'> AND r.reserved_at &lt;= #{endDate}</if>",
        "</where>",
        "ORDER BY r.reserved_at DESC"
        ,"</script>"
    })
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "userId", column = "user_id"),
        @Result(property = "stockItemId", column = "product_id"),
        @Result(property = "quantity", column = "quantity"),
        @Result(property = "status", column = "status"),
        @Result(property = "reservedAt", column = "reserved_at"),
        @Result(property = "expiresAt", column = "expires_at"),
        @Result(property = "redeemedAt", column = "redeemed_at"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "updatedAt", column = "updated_at"),
        @Result(property = "user.id", column = "user_id"),
        @Result(property = "user.email", column = "user_email"),
        @Result(property = "stockItem.id", column = "product_id"),
        @Result(property = "stockItem.description", column = "desc_text"),
        @Result(property = "stockItem.price", column = "product_price"),
        @Result(property = "stockItem.author.name", column = "author_name")
    })
    List<Reservation> findAll(@Param("userId") Long userId,
                             @Param("status") Reservation.ReservationStatus status,
                             @Param("startDate") LocalDateTime startDate,
                             @Param("endDate") LocalDateTime endDate);
    
    @Select({
        "SELECT r.*, u.email as user_email, p.text as desc_text, p.price as product_price,",
        "a.name as author_name",
        "FROM reservations r",
        "LEFT JOIN users u ON r.user_id = u.id",
        "LEFT JOIN stocks p ON r.product_id = p.id",
        "LEFT JOIN authors a ON p.author_id = a.id",
        "WHERE r.user_id = #{userId}",
        "ORDER BY r.reserved_at DESC"
    })
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "userId", column = "user_id"),
        @Result(property = "stockItemId", column = "product_id"),
        @Result(property = "quantity", column = "quantity"),
        @Result(property = "status", column = "status"),
        @Result(property = "reservedAt", column = "reserved_at"),
        @Result(property = "expiresAt", column = "expires_at"),
        @Result(property = "redeemedAt", column = "redeemed_at"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "updatedAt", column = "updated_at"),
        @Result(property = "user.id", column = "user_id"),
        @Result(property = "user.email", column = "user_email"),
        @Result(property = "stockItem.id", column = "product_id"),
        @Result(property = "stockItem.description", column = "desc_text"),
        @Result(property = "stockItem.price", column = "product_price"),
        @Result(property = "stockItem.author.name", column = "author_name")
    })
    List<Reservation> findByUserId(Long userId);
    
    @Insert({
        "INSERT INTO reservations (user_id, product_id, quantity, status, expires_at)",
        "VALUES (#{userId}, #{product_id}, #{quantity}, #{status}, #{expiresAt})"
    })
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Reservation reservation);
    
    @Update({
        "<script>",
        "UPDATE reservations SET updated_at = CURRENT_TIMESTAMP ",
        "<if test='status != null'>, status = #{status}</if>",
        "<if test='redeemedAt != null'>, redeemed_at = #{redeemedAt}</if>",
        "WHERE id = #{id}",
        "</script>"
    })
    int update(Reservation reservation);
    
    @Delete("DELETE FROM reservations WHERE id = #{id}")
    int deleteById(Long id);
    
    @Select("SELECT COUNT(*) FROM reservations WHERE status = #{status}")
    int countByStatus(Reservation.ReservationStatus status);
    
    @Select({
        "SELECT * FROM reservations",
        "WHERE status = 'PENDING' AND expires_at < NOW()"
    })
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "userId", column = "user_id"),
        @Result(property = "stockItemId", column = "product_id"),
        @Result(property = "quantity", column = "quantity"),
        @Result(property = "status", column = "status"),
        @Result(property = "reservedAt", column = "reserved_at"),
        @Result(property = "expiresAt", column = "expires_at"),
        @Result(property = "redeemedAt", column = "redeemed_at"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "updatedAt", column = "updated_at")
    })
    List<Reservation> findExpiredReservations();
    
    @Update("UPDATE reservations SET status = 'EXPIRED', updated_at = CURRENT_TIMESTAMP WHERE id = #{id}")
    int markAsExpired(Long id);
    
    @Update("UPDATE reservations SET status = 'REDEEMED', redeemed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = #{id}")
    int markAsRedeemed(Long id);
}



