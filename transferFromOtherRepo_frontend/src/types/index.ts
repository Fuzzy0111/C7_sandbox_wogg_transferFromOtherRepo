import {useProduct} from "@/hooks/useQueries.ts";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export interface Product {
    id: string;
    text: string;
    productType: string;
    meaning?: string;
    origin?: string;
    category?: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
}


export interface ProductCard {
    id: string;
    productId: string;
    prodDetail: Product;
    photoUrl: string;
    price: number;
    isAvailable: boolean;
    stock: number;
    createdAt: string;
    updatedAt: string;
}

export interface RentalCard {
    id: string;
    productId: string;
    prodDetail: Product;
    imageUrl: string;
    rental_price: number;
    replacement_cost: number;
    isAvailable: boolean;
    stock: number;
    createdAt: string;
    updatedAt: string;
}

export interface Reservation {
    id: string;
    userId: string;
    user: User;
    productId: string;
    product: ProductCard;
    quantity: number;
    totalPrice: number;
    status: ReservationStatus;
    reservedAt: string;
    expiresAt: string;
    notes?: string;
}

export enum ReservationStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    EXPIRED = 'expired',
}

export interface AuthResponse {
    user: User;
    token: string;
    refreshToken: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface ResetPasswordData {
    token: string;
    password: string;
}

export interface ForgotPasswordData {
    email: string;
}

export interface UpdateProfileData {
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface FilterParams {
    page?: number;
    limit?: number;
    search?: string;
    productType?: string;
    category?: string;
  status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface CreateProductData {
    text: string;
    productType: string;
    meaning?: string;
    origin?: string;
    category?: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
    isActive?: boolean;
}

export interface CreateReservationData {
    productId: string;
    quantity: number;
    notes?: string;
}

export interface AdminStats {
    totalUsers: number;
    totalProducts: number;
    totalProductCards: number;
    totalReservations: number;
    activeReservations: number;
    recentActivity: ActivityItem[];
}

export interface ActivityItem {
    id: string;
    type: 'user_registration' | 'product_created' | 'reservation_made';
    message: string;
    timestamp: string;
    userId?: string;
    userName?: string;
}

export interface ToastMessage {
    id: string;
    title: string;
    description?: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

