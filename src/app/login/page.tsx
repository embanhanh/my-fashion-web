import React from 'react'
import LoginForm from '../../components/LoginForm'

const LoginPage: React.FC = () => {
    return (
        <div className="h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100">
            <LoginForm />
        </div>
    )
}

export default LoginPage
