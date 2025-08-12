// src/services/reservationsService.ts
import { apiClient } from './apiClient';
import {
    Reservation,
    PaginatedResponse,
    FilterParams,
    CreateReservationData
} from '@/types';
import { API_ENDPOINTS } from '@/utils/constants';

class ReservationsService {
    async getReservations(params?: FilterParams): Promise<PaginatedResponse<Reservation>> {
        return apiClient.get<PaginatedResponse<Reservation>>(API_ENDPOINTS.RESERVATIONS, params);
    }

    async getReservationById(id: string): Promise<Reservation> {
        return apiClient.get<Reservation>(`${API_ENDPOINTS.RESERVATIONS}/${id}`);
    }

    async createReservation(data: CreateReservationData): Promise<Reservation> {
        return apiClient.post<Reservation>(API_ENDPOINTS.RESERVATIONS, data);
    }

    async cancelReservation(id: string): Promise<void> {
        return apiClient.patch(`${API_ENDPOINTS.RESERVATIONS}/${id}/cancel`);
    }

    async confirmReservation(id: string): Promise<Reservation> {
        return apiClient.patch<Reservation>(`${API_ENDPOINTS.RESERVATIONS}/${id}/confirm`);
    }

    async getUserReservations(userId: string, params?: FilterParams): Promise<PaginatedResponse<Reservation>> {
        return apiClient.get<PaginatedResponse<Reservation>>(`${API_ENDPOINTS.RESERVATIONS}/user/${userId}`, params);
    }

    async getMyReservations(params?: FilterParams): Promise<PaginatedResponse<Reservation>> {
        return apiClient.get<PaginatedResponse<Reservation>>(`${API_ENDPOINTS.RESERVATIONS}/my`, params);
    }
}

export const reservationsService = new ReservationsService();

