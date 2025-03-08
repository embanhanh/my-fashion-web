import { Product } from '@/types/product'
import { Category } from '@/types/category'
import { Cart } from '@/types/cart'
import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const productService = {
    getProducts: async (
        page = 1,
        limit = 12,
        category: string[] | undefined,
        priceRange: { min: number; max: number } | undefined,
        sort: string | undefined,
        rating: number | undefined,
        search: string | undefined
    ): Promise<{ products: Product[]; currentPage: number; totalPages: number }> => {
        const response = await api.get(
            `/product?page=${page}&limit=${limit}&sort=${sort}&rating=${rating}&search=${search}`,
            {
                params: {
                    category,
                    priceRange,
                },
            }
        )
        return response.data
    },

    getBySlug: async (slug: string): Promise<Product> => {
        const response = await api.get(`/product/${slug}`)
        return response.data
    },
}

export const categoryService = {
    getAll: async (): Promise<Category[]> => {
        const response = await api.get('/category')
        return response.data
    },
}

export const cartService = {
    getCart: async (): Promise<Cart> => {
        const response = await api.get('/cart')
        return response.data
    },

    addToCart: async (productId: string, quantity: number): Promise<Cart> => {
        const response = await api.post('/cart', { productId, quantity })
        return response.data
    },

    updateCartItem: async (itemId: string, quantity: number): Promise<Cart> => {
        const response = await api.put(`/cart/${itemId}`, { quantity })
        return response.data
    },

    removeFromCart: async (itemId: string): Promise<Cart> => {
        const response = await api.delete(`/cart/${itemId}`)
        return response.data
    },
}

export default api
