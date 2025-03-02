'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import MobileMenu from './MobileMenu'
import Search from './Search'
import CartMini from './CartMini'

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
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

    const isLoggedIn = false

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
                <Search />
                <div className="relative">
                    <Image
                        className="cursor-pointer"
                        src="/cart.png"
                        alt="user"
                        width={24}
                        height={24}
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    />
                    <span className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                        2
                    </span>
                    {isCartOpen && <CartMini />}
                </div>
                {/* User */}
                <button className="flex">
                    {isLoggedIn ? (
                        <Image src="/user.png" alt="user" width={24} height={24} />
                    ) : (
                        <Link href="/login" className="hover:text-blue-500 transition-colors">
                            Login
                        </Link>
                    )}
                </button>
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
