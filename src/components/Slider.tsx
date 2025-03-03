'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'

function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slides = [
        {
            id: 1,
            title: 'New Season',
            image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'New Collection 2025, New Styles, New Colors',
            url: '/',
            bg: 'bg-gradient-to-r from-blue-50 to-pink-50',
        },
        {
            id: 2,
            title: 'Spring Collection',
            image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'Spring Collection 2025, New Styles, New Colors',
            url: '/',
            bg: 'bg-gradient-to-r from-pink-50 to-blue-50',
        },
        {
            id: 3,
            title: 'Summer Collection',
            image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'Summer Collection 2025, New Styles, New Colors',
            url: '/',
            bg: 'bg-gradient-to-r from-blue-50 to-yellow-50',
        },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden relative">
            {/* Slides */}
            <div
                className="h-full w-max flex transition-all duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="h-full w-screen flex flex-col xl:flex-row">
                        {/* Content */}
                        <div
                            className={`w-full xl:w-1/2 h-full  flex flex-col items-center justify-center gap-8 xl:gap-12 ${slide.bg}`}
                        >
                            <p className="text-xl lg:text-2xl 2xl:text-3xl text-center">{slide.description}</p>
                            <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-semibold text-center">
                                {slide.title}
                            </h1>
                            <Link href={slide.url}>
                                <button className="bg-black text-white px-4 py-2 rounded-lg text-lg">SHOP NOW</button>
                            </Link>
                        </div>
                        {/* Image */}
                        <div className="w-full xl:w-1/2 h-full relative">
                            <Image src={slide.image} alt={slide.title} fill sizes="100%" className="object-cover" />
                        </div>
                    </div>
                ))}
            </div>
            {/* Controls */}
            <div className="flex gap-4 absolute bottom-10 left-1/2 -translate-x-1/2">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`w-3 h-3 rounded-full ring-2 ring-gray-600 flex items-center justify-center cursor-pointer ${
                            index === currentSlide ? 'scale-150' : ''
                        }`}
                        onClick={() => setCurrentSlide(index)}
                    >
                        <div
                            className={`w-[6px] h-[6px] rounded-full ${index === currentSlide ? 'bg-gray-600' : ''}`}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slider
