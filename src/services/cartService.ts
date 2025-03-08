import { Cart } from '@/types/cart'
import api from './api'

export const cartService = {
    getCart: async (): Promise<Cart> => {
        const response = await api.get('/cart')
        return response.data
    },

    addToCart: async (variant: string, quantity: number): Promise<Cart> => {
        const response = await api.post('/cart/add', { variant, quantity })
        return response.data
    },

    updateCartItem: async (itemId: string, quantity: number): Promise<Cart> => {
        const response = await api.put(`/cart/${itemId}`, { quantity })
        return response.data
    },

    removeFromCart: async (itemId: string): Promise<Cart> => {
        const response = await api.delete(`/cart/remove/${itemId}`)
        return response.data
    },
}
