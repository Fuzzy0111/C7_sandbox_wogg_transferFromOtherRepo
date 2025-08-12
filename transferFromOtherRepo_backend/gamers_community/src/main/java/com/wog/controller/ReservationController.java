package com.wog.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.authentication.Authentication;
import com.wog.service.ReservationService;
import com.wog.dto.ReservationDto;
import com.wog.entity.Reservation;
import jakarta.inject.Inject;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@Controller("/api/reservations")
@Secured("USER")
public class ReservationController {

    private final ReservationService reservationService;

    @Inject
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @Get
    @Secured("ADMIN")
    public HttpResponse<List<ReservationDto.Response>> getAllReservations(
            @QueryValue(value = "userId", defaultValue = "") String userId,
            @QueryValue(value = "status", defaultValue = "") String status,
            @QueryValue(value = "startDate", defaultValue = "") String startDate,
            @QueryValue(value = "endDate", defaultValue = "") String endDate) {

        ReservationDto.FilterRequest filters = new ReservationDto.FilterRequest();
        if (!userId.isEmpty()) {
            filters.setUserId(Long.valueOf(userId));
        }
        if (!status.isEmpty()) {
            filters.setStatus(Reservation.ReservationStatus.valueOf(status));
        }
        if (!startDate.isEmpty()) {
            filters.setStartDate(LocalDateTime.parse(startDate));
        }
        if (!endDate.isEmpty()) {
            filters.setEndDate(LocalDateTime.parse(endDate));
        }

        List<ReservationDto.Response> reservations = reservationService.findAll(filters);
        return HttpResponse.ok(reservations);
    }

    @Get("/{id}")
    public HttpResponse<ReservationDto.Response> getReservationById(
            @PathVariable Long id,
            Authentication authentication) {
        ReservationDto.Response reservation = reservationService.findById(id, authentication.getName());
        return HttpResponse.ok(reservation);
    }

    @Get("/user/{userId}")
    public HttpResponse<List<ReservationDto.Response>> getReservationsByUser(
            @PathVariable Long userId,
            Authentication authentication) {
        List<ReservationDto.Response> reservations = reservationService.findByUser(userId, authentication.getName());
        return HttpResponse.ok(reservations);
    }

    @Post
    public HttpResponse<ReservationDto.Response> createReservation(
            @Valid @Body ReservationDto.CreateRequest request,
            Authentication authentication) {
        ReservationDto.Response reservation = reservationService.create(request, authentication.getName());
        return HttpResponse.created(reservation);
    }

    @Delete("/{id}")
    public HttpResponse<Void> deleteReservation(
            @PathVariable Long id,
            Authentication authentication) {
        reservationService.deleteById(id, authentication.getName());
        return HttpResponse.noContent();
    }

    @Post("/{id}/duplicate")
    public HttpResponse<ReservationDto.Response> duplicateReservation(
            @PathVariable Long id,
            Authentication authentication) {
        ReservationDto.Response reservation = reservationService.duplicate(id, authentication.getName());
        return HttpResponse.created(reservation);
    }

    @Patch("/{id}/redeem")
    @Secured("ADMIN")
    public HttpResponse<Void> markRedeemed(@PathVariable Long id) {
        reservationService.markAsRedeemed(id);
        return HttpResponse.ok();
    }
}