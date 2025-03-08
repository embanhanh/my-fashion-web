import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/authService'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/userContext'

export const useAuthLogin = () => {
    const router = useRouter()
    const { setUser } = useAuth()

    return useMutation({
        mutationFn: (data: { email: string; password: string }) => authService.login(data.email, data.password),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            document.cookie = `refreshToken=${data.refreshToken}; path=/; secure; HttpOnly`
            router.push('/')
            setUser(data.user)
        },
        onError: (error) => {
            console.error(error)
        },
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: { email: string; mode: string }) => authService.checkEmail(data.email, data.mode),
        onSuccess: () => {},
        onError: (error) => {
            console.error(error)
        },
    })
}

export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: (data: { email: string; code: string; mode: string; password: string }) =>
            authService.verifyEmail(data.email, data.code, data.mode, data.password),
        onSuccess: () => {},
        onError: (error) => {
            console.error(error)
        },
    })
}
