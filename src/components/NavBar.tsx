'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import MobileMenu from './MobileMenu'
import Search from './Search'
import CartMini from './CartMini'
import { useAuth } from '@/context/userContext'
import { useCart } from '@/hooks/useCart'

function NavBar() {
    const { user, logout } = useAuth()
    const { data: cart } = useCart()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isUserOpen, setIsUserOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    if (!isMounted) {
        return null
    }

    const isLoggedIn = user !== null

    return (
        <nav className="h-20 gap-20 flex items-center justify-between px-4 md:px-8 lg:px-16 2xl:px-32 relative">
            <div className="flex items-center justify-between md:w-1/2">
                {/* Logo */}
                <Link href="/">
                    <Image src="/Group.png" alt="logo" width={40} height={40} />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link href="/" className="hover:text-blue-500 transition-colors">
                        Home
                    </Link>
                    <Link href="/list" className="hover:text-blue-500 transition-colors">
                        Shop
                    </Link>
                    <Link href="/about" className="hover:text-blue-500 transition-colors">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-blue-500 transition-colors">
                        Contact
                    </Link>
                </div>
            </div>
            <div className="flex items-center md:w-1/2 gap-6">
                {/* Actions */}
                {/* Search */}
                <Search />
                {/* Cart */}
                <div className="relative">
                    <Link href="/cart" className="block md:hidden hover:text-blue-500 transition-colors">
                        <Image className="cursor-pointer" src="/cart.png" alt="user" width={24} height={24} />
                    </Link>
                    <Image
                        className="cursor-pointer hidden md:block"
                        src="/cart.png"
                        alt="user"
                        width={24}
                        height={24}
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    />
                    <span className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                        {cart?.items.length || 0}
                    </span>
                    {isCartOpen && <CartMini />}
                </div>
                {/* User */}
                <div className="relative">
                    {isLoggedIn ? (
                        <>
                            <Link href="/profile" className="block md:hidden hover:text-blue-500 transition-colors">
                                <Image className="cursor-pointer" src="/user.png" alt="user" width={24} height={24} />
                            </Link>
                            <Image
                                className="cursor-pointer hidden md:block"
                                src="/user.png"
                                alt="user"
                                width={24}
                                height={24}
                                onClick={() => setIsUserOpen(!isUserOpen)}
                            />
                            {isUserOpen && (
                                <div className="hidden md:block absolute top-10 right-0 w-max bg-white shadow-lg rounded-lg p-4 z-50">
                                    <Link href="/profile" className="hover:text-blue-500 transition-colors">
                                        Profile
                                    </Link>
                                    <p
                                        className="hover:text-blue-500 transition-colors"
                                        onClick={() => {
                                            logout()
                                            setIsUserOpen(false)
                                            setIsCartOpen(false)
                                            setIsMenuOpen(false)
                                        }}
                                    >
                                        Logout
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link href="/login" className="hover:text-blue-500 transition-colors">
                            Login
                        </Link>
                    )}
                </div>
                {/* Menu Icon for Mobile */}
                <button className="md:hidden focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
                    <Image src="/menu.png" alt="menu" width={24} height={24} />
                </button>
            </div>

            {/* Mobile Menu Slide-in */}
            <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </nav>
    )
}

export default NavBar
