import { api } from './api'

export const authService = {
    login: async (email: string, password: string) => {
        const response = await api.post('/user/login', {
            email,
            password,
        })
        return response.data
    },
    checkEmail: async (email: string, mode: string) => {
        const response = await api.post('/user/check-email', {
            email,
            mode,
        })
        return response.data
    },
    verifyEmail: async (email: string, code: string, mode: string, password: string) => {
        const response = await api.post('/user/verify-email', {
            email,
            code,
            mode,
            password,
        })
        return response.data
    },
}
