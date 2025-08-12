
package com.wog.service;

import com.wog.dto.ReservationDto;
import com.wog.entity.Reservation;
import com.wog.entity.User;
import com.wog.repository.ReservationRepository;
import com.wog.repository.StockItemRepository;
import com.wog.repository.UserRepository;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Singleton
public class AdminService {

    private final UserRepository userRepository;
    private final StockItemRepository stockItemRepository;
    private final ReservationRepository reservationRepository;

    @Inject
    public AdminService(UserRepository userRepository, StockItemRepository stockItemRepository, ReservationRepository reservationRepository) {
        this.userRepository = userRepository;
        this.stockItemRepository = stockItemRepository;
        this.reservationRepository = reservationRepository;
    }

    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalProducts", stockItemRepository.countActive());
        stats.put("totalUsers", userRepository.countByRole(User.UserRole.USER));
        stats.put("activeReservations", reservationRepository.countByStatus(Reservation.ReservationStatus.PENDING));
        
        // Calculate total revenue from redeemed reservations
        List<ReservationDto.Response> redeemedReservations = reservationRepository.findAll(
                null, 
                Reservation.ReservationStatus.REDEEMED, 
                null, 
                null
        ).stream()
        .map(ReservationDto.Response::new)
        .collect(Collectors.toList());
        
        BigDecimal totalRevenue = redeemedReservations.stream()
                .map(r -> r.getPrice().multiply(BigDecimal.valueOf(r.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
                
        stats.put("totalRevenue", totalRevenue);
        
        return stats;
    }

    public List<ReservationDto.Response> getReservationReports(ReservationDto.FilterRequest filters) {
        return reservationRepository.findAll(
                filters.getUserId(),
                filters.getStatus(),
                filters.getStartDate(),
                filters.getEndDate()
        ).stream()
        .map(ReservationDto.Response::new)
        .collect(Collectors.toList());
    }
}


