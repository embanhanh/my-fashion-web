'use client'
import React, { useState, useEffect } from 'react'
// import { VI } from '../constants/vi'
import { EN } from '../constants/en'
import InputText from './InputText'
import Link from 'next/link'
import GoogleLogo from '@/app/login/components/GoogleLogo'
import FacebookLogo from '@/app/login/components/FacebookLogo'
import { useAuthLogin, useRegister, useVerifyEmail } from '@/hooks/useAuth'
import { useAuth } from '@/context/userContext'
import { useRouter } from 'next/navigation'

enum Mode {
    LOGIN = 'login',
    REGISTER = 'register',
    FORGOT_PASSWORD = 'forgot-password',
    RESET_PASSWORD = 'reset-password',
    VERIFY_EMAIL = 'verify-email',
}

const LoginForm: React.FC = () => {
    const { user } = useAuth()
    const router = useRouter()
    const { mutate: login } = useAuthLogin()
    const { mutate: register } = useRegister()
    const { mutate: verifyEmail } = useVerifyEmail()
    const t = EN
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verifyCode, setVerifyCode] = useState('')
    const [isMounted, setIsMounted] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [mode, setMode] = useState<Mode>(Mode.LOGIN)

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user, router])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            switch (mode) {
                case Mode.LOGIN:
                    await login({ email, password })
                    break
                case Mode.REGISTER:
                    await register({ email, mode: 'signup' })
                    setMode(Mode.VERIFY_EMAIL)
                    break
                case Mode.VERIFY_EMAIL:
                    await verifyEmail({ email, code: verifyCode, mode: 'signup', password })
                    setMode(Mode.LOGIN)
                    setVerifyCode('')
                    setUsername('')
                    break
            }
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
            <h2 className="text-2xl font-bold mb-6">
                {mode === Mode.VERIFY_EMAIL
                    ? t.verifyEmail.title
                    : mode === Mode.REGISTER
                      ? t.register.title
                      : t.login.title}
            </h2>
            <form onSubmit={handleSubmit}>
                {mode === Mode.REGISTER && (
                    <InputText
                        id="username"
                        label={t.register.username}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                )}
                {(mode === Mode.LOGIN || mode === Mode.REGISTER) && (
                    <>
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
                    </>
                )}
                {mode === Mode.VERIFY_EMAIL && (
                    <InputText
                        id="verify-code"
                        label={t.verifyEmail.verifyCode}
                        type="text"
                        value={verifyCode}
                        onChange={(e) => setVerifyCode(e.target.value)}
                        required
                    />
                )}
                <div className="flex items-center justify-center w-full mt-4 mb-2">
                    <button
                        type="submit"
                        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? '...'
                            : mode === Mode.VERIFY_EMAIL
                              ? t.verifyEmail.submit
                              : mode === Mode.REGISTER
                                ? t.register.submit
                                : t.login.submit}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {mode === Mode.LOGIN && (
                    <Link
                        href="/forgot-password"
                        className="inline-block align-baseline font-semibold mb-2 text-sm text-blue-500 hover:text-blue-800"
                    >
                        {t.login.forgotPassword}
                    </Link>
                )}

                {mode === Mode.LOGIN && (
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
                )}
                <div className="flex items-center justify-center gap-2 w-full text-sm">
                    {mode === Mode.LOGIN
                        ? t.login.register
                        : mode === Mode.REGISTER
                          ? t.register.login
                          : mode === Mode.VERIFY_EMAIL
                            ? t.verifyEmail.login
                            : ''}
                    <span
                        onClick={() => {
                            if (mode === Mode.LOGIN) {
                                setMode(Mode.REGISTER)
                            } else if (mode === Mode.REGISTER || mode === Mode.VERIFY_EMAIL) {
                                setMode(Mode.LOGIN)
                            }
                        }}
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                        {mode === Mode.LOGIN
                            ? t.register.title
                            : mode === Mode.REGISTER
                              ? t.login.title
                              : mode === Mode.VERIFY_EMAIL
                                ? t.login.title
                                : ''}
                    </span>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
