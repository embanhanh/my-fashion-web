'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import SearchForm from './SearchForm'

function Search() {
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [searchHistory, setSearchHistory] = useState<string[]>([])

    useEffect(() => {
        const savedHistory = localStorage.getItem('searchHistory')
        if (savedHistory) {
            setSearchHistory(JSON.parse(savedHistory))
        }
    }, [])

    // Đóng modal khi màn hình lớn hơn mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                // 768px là breakpoint md trong Tailwind
                setShowModal(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleSearch = (searchTerm: string) => {
        if (searchTerm && searchTerm.trim() !== '') {
            const newHistory = [searchTerm, ...searchHistory.filter((item) => item !== searchTerm)].slice(0, 5)
            setSearchHistory(newHistory)
            localStorage.setItem('searchHistory', JSON.stringify(newHistory))
            setShowModal(false)
            console.log(searchTerm)
        }
    }

    const handleHistoryItemClick = (term: string) => {
        setSearch(term)
    }

    const clearHistory = () => {
        setSearchHistory([])
        localStorage.removeItem('searchHistory')
    }

    return (
        <>
            <div className="w-max flex-1 relative">
                <div className="hidden md:block">
                    <SearchForm onSubmit={handleSearch} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <button className="md:hidden" onClick={() => setShowModal(true)} type="button">
                    <Image src="/search.png" alt="search" width={24} height={24} />
                </button>

                {/* Search Modal for Mobile */}
                {showModal && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16 md:hidden"
                        onClick={() => setShowModal(false)} // Đóng modal khi nhấn vào overlay
                    >
                        <div
                            className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg overflow-hidden"
                            onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click lan tỏa đến overlay
                        >
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium">Tìm kiếm</h3>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <Image src="/close.png" alt="close" width={16} height={16} />
                                    </button>
                                </div>

                                <SearchForm
                                    onSubmit={handleSearch}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    autoFocus={true}
                                    className="mb-4"
                                />

                                {searchHistory.length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-medium text-gray-700">Lịch sử tìm kiếm</h4>
                                            <button
                                                onClick={clearHistory}
                                                className="text-xs text-blue-600 hover:text-blue-800"
                                            >
                                                Xóa tất cả
                                            </button>
                                        </div>
                                        <ul className="divide-y divide-gray-200">
                                            {searchHistory.map((term, index) => (
                                                <li key={index} className="py-2">
                                                    <button
                                                        onClick={() => handleHistoryItemClick(term)}
                                                        className="flex items-center w-full text-left gap-2"
                                                    >
                                                        <Image src="/history.png" alt="search" width={16} height={16} />
                                                        <span className="text-gray-700">{term}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Search
