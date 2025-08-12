
package com.wog.mapper.impl;

import com.wog.entity.Reservation;
import com.wog.repository.ReservationRepository;
import com.wog.mapper.ReservationMapper;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Singleton
public class ReservationRepositoryImpl implements ReservationRepository {
    
    private final ReservationMapper reservationMapper;
    
    @Inject
    public ReservationRepositoryImpl(ReservationMapper reservationMapper) {
        this.reservationMapper = reservationMapper;
    }
    
    @Override
    public Optional<Reservation> findById(Long id) {
        return reservationMapper.findById(id);
    }
    
    @Override
    public List<Reservation> findAll(Long userId, Reservation.ReservationStatus status, 
                                   LocalDateTime startDate, LocalDateTime endDate) {
        return reservationMapper.findAll(userId, status, startDate, endDate);
    }
    
    @Override
    public List<Reservation> findByUserId(Long userId) {
        return reservationMapper.findByUserId(userId);
    }
    
    @Override
    public Reservation save(Reservation reservation) {
        reservationMapper.insert(reservation);
        return reservation;
    }
    
    @Override
    public Reservation update(Reservation reservation) {
        int rowsAffected = reservationMapper.update(reservation);
        if (rowsAffected == 0) {
            throw new RuntimeException("Reservation not found with id: " + reservation.getId());
        }
        return reservationMapper.findById(reservation.getId())
                .orElseThrow(() -> new RuntimeException("Reservation not found after update"));
    }
    
    @Override
    public boolean deleteById(Long id) {
        return reservationMapper.deleteById(id) > 0;
    }
    
    @Override
    public int countByStatus(Reservation.ReservationStatus status) {
        return reservationMapper.countByStatus(status);
    }
    
    @Override
    public List<Reservation> findExpiredReservations() {
        return reservationMapper.findExpiredReservations();
    }
    
    @Override
    public int markAsExpired(Long id) {
        return reservationMapper.markAsExpired(id);
    }
    
    @Override
    public int markAsRedeemed(Long id) {
        return reservationMapper.markAsRedeemed(id);
    }
}


