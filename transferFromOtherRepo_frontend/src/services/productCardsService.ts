
import { apiClient } from './apiClient';
import {
    ProductCard,
    PaginatedResponse,
    FilterParams
} from '@/types';
import { API_ENDPOINTS } from '@/utils/constants';

class ProductCardsService {
    async getProductCards(params?: FilterParams): Promise<PaginatedResponse<ProductCard>> {
        return apiClient.get<PaginatedResponse<ProductCard>>(API_ENDPOINTS.PRODUCTS_CARDS, params);
    }

    async getProductCardById(id: string): Promise<ProductCard> {
        return apiClient.get<ProductCard>(`${API_ENDPOINTS.PRODUCTS_CARDS}/${id}`);
    }

    async getFeaturedProductCards(): Promise<ProductCard[]> {
        return apiClient.get<ProductCard[]>(`${API_ENDPOINTS.PRODUCTS_CARDS}/featured`);
    }

    async searchProductCards(query: string, params?: FilterParams): Promise<PaginatedResponse<ProductCard>> {
        return apiClient.get<PaginatedResponse<ProductCard>>(`${API_ENDPOINTS.PRODUCTS_CARDS}/search`, {
            q: query,
            ...params
        });
    }
}

export const productCardsService = new ProductCardsService();


