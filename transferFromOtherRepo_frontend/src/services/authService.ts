
import { apiClient } from './apiClient';
import {
    User,
    AuthResponse,
    LoginCredentials,
    RegisterCredentials,
    ForgotPasswordData,
    ResetPasswordData,
    UpdateProfileData,
    ChangePasswordData
} from '@/types';
import { API_ENDPOINTS } from '@/utils/constants';

class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        return apiClient.postRaw<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    }

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        return apiClient.postRaw<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, credentials);
    }

    async logout(): Promise<void> {
        try {
            await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
        } finally {
            // Always clear local storage even if API call fails
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');
        }
    }

    async getCurrentUser(): Promise<User> {
        return apiClient.get<User>('/auth/me');
    }

    async forgotPassword(data: ForgotPasswordData): Promise<void> {
        return apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
    }

    async resetPassword(data: ResetPasswordData): Promise<void> {
        return apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
    }

    async updateProfile(data: UpdateProfileData): Promise<User> {
        return apiClient.patch<User>('/auth/profile', data);
    }

    async changePassword(data: ChangePasswordData): Promise<void> {
        return apiClient.post('/auth/change-password', data);
    }

    async refreshToken(refreshToken: string): Promise<{ token: string }> {
        return apiClient.postRaw<{ token: string }>(API_ENDPOINTS.AUTH.REFRESH, {
            refreshToken,
        });
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('auth_token');
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }
}

export const authService = new AuthService();

