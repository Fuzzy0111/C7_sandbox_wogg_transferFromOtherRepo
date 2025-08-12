// src/services/usersService.ts
import { apiClient } from './apiClient';
import { User, PaginatedResponse, FilterParams } from '@/types';
import { API_ENDPOINTS } from '@/utils/constants';

class UsersService {
    async getUsers(params?: FilterParams): Promise<PaginatedResponse<User>> {
        return apiClient.get<PaginatedResponse<User>>(API_ENDPOINTS.USERS, params);
    }

    async getUserById(id: string): Promise<User> {
        return apiClient.get<User>(`${API_ENDPOINTS.USERS}/${id}`);
    }

    async updateUser(id: string, data: Partial<User>): Promise<User> {
        return apiClient.put<User>(`${API_ENDPOINTS.USERS}/${id}`, data);
    }

    async deleteUser(id: string): Promise<void> {
        return apiClient.delete(`${API_ENDPOINTS.USERS}/${id}`);
    }

    async toggleUserStatus(id: string): Promise<User> {
        return apiClient.patch<User>(`${API_ENDPOINTS.USERS}/${id}/toggle-status`);
    }
}

export const usersService = new UsersService();

