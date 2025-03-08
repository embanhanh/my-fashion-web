import { useMutation, useQuery } from '@tanstack/react-query'
import { authService } from '@/services/authService'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

export const useAuthLogin = () => {
    const router = useRouter()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: { email: string; password: string }) => authService.login(data.email, data.password),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            document.cookie = `refreshToken=${data.refreshToken}; path=/; secure; HttpOnly`
            queryClient.invalidateQueries({ queryKey: ['user'] })
            router.push('/')
        },
        onError: (error) => {
            console.error(error)
        },
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        document.cookie = 'refreshToken=; path=/; secure; HttpOnly'
        queryClient.removeQueries({ queryKey: ['user'] })
        router.push('/login')
    }
}

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => {
            const user = localStorage.getItem('user')
            return user ? JSON.parse(user) : null
        },
        initialData: null,
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
