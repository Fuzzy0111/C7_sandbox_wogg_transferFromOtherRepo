
package com.wog.service;

import com.wog.dto.ReservationDto;
import com.wog.entity.Reservation;
import com.wog.entity.User;
import com.wog.repository.ReservationRepository;
import com.wog.repository.UserRepository;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    @Inject
    public ReservationService(ReservationRepository reservationRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
    }

    public List<ReservationDto.Response> findAll(ReservationDto.FilterRequest filters) {
        return reservationRepository.findAll(
                filters.getUserId(),
                filters.getStatus(),
                filters.getStartDate(),
                filters.getEndDate()
        ).stream()
        .map(ReservationDto.Response::new)
        .collect(Collectors.toList());
    }

    public ReservationDto.Response findById(Long id, String userEmail) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Users can only view their own reservations unless they're admin
        if (!user.isAdmin() && !reservation.getUserId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        return new ReservationDto.Response(reservation);
    }

    public List<ReservationDto.Response> findByUser(Long userId, String userEmail) {
        User currentUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Users can only view their own reservations unless they're admin
        if (!currentUser.isAdmin() && !userId.equals(currentUser.getId())) {
            throw new RuntimeException("Access denied");
        }

        return reservationRepository.findByUserId(userId)
                .stream()
                .map(ReservationDto.Response::new)
                .collect(Collectors.toList());
    }

    public ReservationDto.Response create(ReservationDto.CreateRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDateTime expiresAt = LocalDateTime.now().plusDays(10);
        
        Reservation reservation = new Reservation(
                user.getId(),
                request.getProductId(),
                request.getQuantity(),
                expiresAt
        );

        Reservation savedReservation = reservationRepository.save(reservation);
        return new ReservationDto.Response(savedReservation);
    }

    public void deleteById(Long id, String userEmail) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Users can only delete their own pending reservations
        if (!reservation.getUserId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        if (reservation.getStatus() != Reservation.ReservationStatus.PENDING) {
            throw new RuntimeException("Can only cancel pending reservations");
        }

        if (!reservationRepository.deleteById(id)) {
            throw new RuntimeException("Failed to delete reservation");
        }
    }

    public ReservationDto.Response duplicate(Long id, String userEmail) {
        Reservation originalReservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Users can only duplicate their own redeemed reservations
        if (!originalReservation.getUserId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        if (originalReservation.getStatus() != Reservation.ReservationStatus.REDEEMED) {
            throw new RuntimeException("Can only duplicate redeemed reservations");
        }

        LocalDateTime expiresAt = LocalDateTime.now().plusDays(10);
        
        Reservation newReservation = new Reservation(
                user.getId(),
                originalReservation.getStockItemId(),
                originalReservation.getQuantity(),
                expiresAt
        );

        Reservation savedReservation = reservationRepository.save(newReservation);
        return new ReservationDto.Response(savedReservation);
    }

    public void markAsRedeemed(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (reservation.getStatus() != Reservation.ReservationStatus.PENDING) {
            throw new RuntimeException("Can only redeem pending reservations");
        }

        reservationRepository.markAsRedeemed(id);
    }
}


