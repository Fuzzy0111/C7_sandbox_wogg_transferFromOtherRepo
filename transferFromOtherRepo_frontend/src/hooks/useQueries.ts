
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    productsService,
    productCardsService,
    reservationsService,
    usersService,
    adminService
} from '@/services';
import {
    FilterParams,
    CreateProductData,
    UpdateProductData,
    CreateReservationData
} from '@/types';
import { useToast } from './use-toast';

// Query Keys
export const QUERY_KEYS = {
    PRODUCTS: 'products',
    PRODUCT: 'product',
    PRODUCT_CARDS: 'product-cards',
    PRODUCT_CARD: 'product-card',
    RESERVATIONS: 'reservations',
    RESERVATION: 'reservation',
    USERS: 'users',
    USER: 'user',
    ADMIN_STATS: 'admin-stats',
    PRODUCT_TYPES: 'product-types',
    CATEGORIES: 'categories',
} as const;

// Products Hooks
export const useProducts = (params?: FilterParams) => {
    return useQuery({
        queryKey: [QUERY_KEYS.PRODUCTS, params],
        queryFn: () => productsService.getProducts(params),
    });
};

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.PRODUCT, id],
        queryFn: () => productsService.getProductById(id),
        enabled: !!id,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (data: CreateProductData) => productsService.createProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
            toast({ title: 'Success', description: 'Product created successfully!' });
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error.message || 'Failed to create Product',
                variant: 'destructive'
            });
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateProductData }) =>
            productsService.updateProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT] });
            toast({ title: 'Success', description: 'Product updated successfully!' });
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error.message || 'Failed to update Product',
                variant: 'destructive'
            });
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (id: string) => productsService.deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
            toast({ title: 'Success', description: 'Product deleted successfully!' });
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error.message || 'Failed to delete Product',
                variant: 'destructive'
            });
        },
    });
};

// ProductCards Hooks
export const useProductCards = (params?: FilterParams) => {
    return useQuery({
        queryKey: [QUERY_KEYS.PRODUCT_CARDS, params],
        queryFn: () => productCardsService.getProductCards(params),
    });
};

export const useProductCard = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.PRODUCT_CARD, id],
        queryFn: () => productCardsService.getProductCardById(id),
        enabled: !!id,
    });
};

export const useFeaturedProductCards = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.PRODUCT_CARDS, 'featured'],
        queryFn: () => productCardsService.getFeaturedProductCards(),
    });
};

// Reservations Hooks
export const useReservations = (params?: FilterParams) => {
    return useQuery({
        queryKey: [QUERY_KEYS.RESERVATIONS, params],
        queryFn: () => reservationsService.getReservations(params),
    });
};

export const useMyReservations = (params?: FilterParams) => {
    return useQuery({
        queryKey: [QUERY_KEYS.RESERVATIONS, 'my', params],
        queryFn: () => reservationsService.getMyReservations(params),
    });
};

export const useCreateReservation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (data: CreateReservationData) => reservationsService.createReservation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RESERVATIONS] });
            toast({ title: 'Success', description: 'Reservation created successfully!' });
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error.message || 'Failed to create reservation',
                variant: 'destructive'
            });
        },
    });
};

export const useCancelReservation = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (id: string) => reservationsService.cancelReservation(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RESERVATIONS] });
            toast({ title: 'Success', description: 'Reservation cancelled successfully!' });
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error.message || 'Failed to cancel reservation',
                variant: 'destructive'
            });
        },
    });
};

// Users Hooks (Admin)
export const useUsers = (params?: FilterParams) => {
    return useQuery({
        queryKey: [QUERY_KEYS.USERS, params],
        queryFn: () => usersService.getUsers(params),
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (id: string) => usersService.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
            toast({ title: 'Success', description: 'User deleted successfully!' });
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error.message || 'Failed to delete user',
                variant: 'destructive'
            });
        },
    });
};

// Admin Hooks
export const useAdminStats = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.ADMIN_STATS],
        queryFn: () => adminService.getStats(),
        refetchInterval: 60000, // Refetch every minute
    });
};

// Utility Hooks
export const useProductTypes = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.PRODUCT_TYPES],
        queryFn: () => productsService.getProductTypes(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.CATEGORIES],
        queryFn: () => productsService.getCategories(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

