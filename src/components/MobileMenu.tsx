'use client'

import Link from 'next/link'
import Image from 'next/image'

function MobileMenu({ isMenuOpen, toggleMenu }: { isMenuOpen: boolean; toggleMenu: () => void }) {
    return (
        <>
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-5">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold">Menu</h2>
                        <button onClick={toggleMenu} className="focus:outline-none" aria-label="Close menu">
                            <Image src="/close.png" alt="close" width={16} height={16} />
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="py-2 hover:text-blue-500 transition-colors">
                            Home
                        </Link>
                        <Link href="/about" className="py-2 hover:text-blue-500 transition-colors">
                            About
                        </Link>
                        <Link href="/contact" className="py-2 hover:text-blue-500 transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
            {/* Overlay when menu is open */}
            {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>}
        </>
    )
}

export default MobileMenu
