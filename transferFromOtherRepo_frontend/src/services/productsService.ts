
import { apiClient } from './apiClient';
import {
    Product,
    PaginatedResponse,
    FilterParams,
    CreateProductData,
    UpdateProductData
} from '@/types';
import { API_ENDPOINTS } from '@/utils/constants';
import {useProductTypes} from "@/hooks/useQueries.ts";
//import {useProduct} from "@/hooks/useQueries.ts";

class ProductsService {
    async getProducts(params?: FilterParams): Promise<PaginatedResponse<Product>> {
        return apiClient.get<PaginatedResponse<Product>>(API_ENDPOINTS.PRODUCTS, params);
    }

    async getProductById(id: string): Promise<Product> {
        return apiClient.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    }

    async createProduct(data: CreateProductData): Promise<Product> {
        return apiClient.post<Product>(API_ENDPOINTS.PRODUCTS, data);
    }

    async updateProduct(id: string, data: UpdateProductData): Promise<Product> {
        return apiClient.put<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`, data);
    }

    async deleteProduct(id: string): Promise<void> {
        return apiClient.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    }

    async getProductTypes(): Promise<string[]> {
        return apiClient.get<string[]>(`${API_ENDPOINTS.PRODUCTS}/product-types`);
    }

    async getCategories(): Promise<string[]> {
        return apiClient.get<string[]>(`${API_ENDPOINTS.PRODUCTS}/categories`);
    }

    async searchProducts(query: string, params?: FilterParams): Promise<PaginatedResponse<Product>> {
        return apiClient.get<PaginatedResponse<Product>>(`${API_ENDPOINTS.PRODUCTS}/search`, {
            q: query,
            ...params
        });
    }
}

export const productsService = new ProductsService();

