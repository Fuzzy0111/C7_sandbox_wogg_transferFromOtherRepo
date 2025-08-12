
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse } from '@/types';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // Request interceptor to add auth token
        this.client.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('auth_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor to handle common errors
        this.client.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                if (error.response?.status === 401) {
                    // Token expired or invalid
                    const refreshToken = localStorage.getItem('refresh_token');
                    if (refreshToken) {
                        try {
                            const response = await this.client.post('/auth/refresh', {
                                refreshToken,
                            });
                            const { token } = response.data;
                            localStorage.setItem('auth_token', token);

                            // Retry the original request
                            if (error.config) {
                                error.config.headers.Authorization = `Bearer ${token}`;
                                return this.client.request(error.config);
                            }
                        } catch (refreshError) {
                            // Refresh failed, redirect to login
                            localStorage.removeItem('auth_token');
                            localStorage.removeItem('refresh_token');
                            window.location.href = '/login';
                        }
                    } else {
                        // No refresh token, redirect to login
                        localStorage.removeItem('auth_token');
                        window.location.href = '/login';
                    }
                }

                return Promise.reject(this.handleError(error));
            }
        );
    }

    private handleError(error: AxiosError): Error {
        if (error.response) {
            const message = (error.response.data as any)?.message || 'An error occurred';
            return new Error(message);
        } else if (error.request) {
            return new Error('Network error - please check your connection');
        } else {
            return new Error('Request failed');
        }
    }

    // HTTP Methods
    async get<T>(url: string, params?: any): Promise<T> {
        const response = await this.client.get<ApiResponse<T>>(url, { params });
        return response.data.data;
    }

    async post<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.post<ApiResponse<T>>(url, data);
        return response.data.data;
    }

    async put<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.put<ApiResponse<T>>(url, data);
        return response.data.data;
    }

    async patch<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.patch<ApiResponse<T>>(url, data);
        return response.data.data;
    }

    async delete<T>(url: string): Promise<T> {
        const response = await this.client.delete<ApiResponse<T>>(url);
        return response.data.data;
    }

    // Raw methods for responses that don't follow the ApiResponse pattern
    async getRaw<T>(url: string, params?: any): Promise<T> {
        const response = await this.client.get<T>(url, { params });
        return response.data;
    }

    async postRaw<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.post<T>(url, data);
        return response.data;
    }
}

export const apiClient = new ApiClient();


