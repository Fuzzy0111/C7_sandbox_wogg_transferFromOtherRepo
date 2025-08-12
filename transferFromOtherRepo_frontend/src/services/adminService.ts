// src/services/adminService.ts
import { apiClient } from './apiClient';
import { AdminStats } from '@/types';

class AdminService {
    async getStats(): Promise<AdminStats> {
        return apiClient.get<AdminStats>('/admin/stats');
    }

    async getRecentActivity(): Promise<any[]> {
        return apiClient.get<any[]>('/admin/activity');
    }

    async exportData(type: 'users' | 'products' | 'reservations'): Promise<Blob> {
        // const response = await apiClient.client.get(`/admin/export/${type}`, {
        //     responseType: 'blob'
        // });
        // return response.data;

    // Use the public get method instead of private client
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/admin/export/${type}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
    });
    return response.blob();
    }
}

export const adminService = new AdminService();

