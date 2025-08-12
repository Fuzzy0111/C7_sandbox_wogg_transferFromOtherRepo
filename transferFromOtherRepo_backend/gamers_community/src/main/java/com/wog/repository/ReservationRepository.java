
package com.wog.repository;

import com.wog.entity.Reservation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository {
    
    Optional<Reservation> findById(Long id);
    
    List<Reservation> findAll(Long userId, Reservation.ReservationStatus status, 
                             LocalDateTime startDate, LocalDateTime endDate);
    
    List<Reservation> findByUserId(Long userId);
    
    Reservation save(Reservation reservation);
    
    Reservation update(Reservation reservation);
    
    boolean deleteById(Long id);
    
    int countByStatus(Reservation.ReservationStatus status);
    
    List<Reservation> findExpiredReservations();
    
    int markAsExpired(Long id);
    
    int markAsRedeemed(Long id);
}


