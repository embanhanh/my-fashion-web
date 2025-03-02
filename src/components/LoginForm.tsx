'use client'
import React, { useState, useEffect } from 'react'
import { VI } from '../constants/vi'
import InputText from './InputText'
import Link from 'next/link'
import GoogleLogo from '@/app/login/components/GoogleLogo'
import FacebookLogo from '@/app/login/components/FacebookLogo'

const LoginForm: React.FC = () => {
    const t = VI
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isMounted, setIsMounted] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('http://your-backend-url/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Đăng nhập thất bại')
            }

            // Lưu token vào localStorage
            localStorage.setItem('token', data.token)

            // Chuyển hướng sau khi đăng nhập thành công
            window.location.href = '/'
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra')
        } finally {
            setIsLoading(false)
        }
    }

    if (!isMounted) {
        return null
    }

    return (
        <div className="min-w-[400px] max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">{t.login.title}</h2>
            <form onSubmit={handleSubmit}>
                <InputText
                    id="email"
                    label={t.login.email}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <InputText
                    id="password"
                    label={t.login.password}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Link
                    href="/forgot-password"
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                    Forgot Password? x{' '}
                </Link>
                <div className="flex items-center justify-center mb-4 w-full my-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang đăng nhập...' : t.login.submit}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="flex items-center justify-between mb-4 gap-4">
                    <button
                        type="button"
                        className="hover:bg-gray-100 py-2 px-4 rounded-xl shadow-md w-1/2 display: flex items-center justify-center bg-white gap-4"
                        onClick={() => alert('Login with Google')}
                    >
                        <GoogleLogo /> <span className="font-semibold text-base">Google</span>
                    </button>
                    <button
                        type="button"
                        className="bg-[#0163E0] hover:bg-blue-700 text-white shadow-md font-bold py-2 px-4 rounded-xl  w-1/2 display: flex items-center justify-center gap-4"
                        onClick={() => alert('Login with Facebook')}
                    >
                        <FacebookLogo /> <span>Facebook</span>
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <Link
                        href="/register"
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
