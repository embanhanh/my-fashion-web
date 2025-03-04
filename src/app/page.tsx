'use client'
import Slider from '@/components/Slider'
import ProductCard from '@/components/ProductCard'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    const products = Array.from({ length: 4 }, (_, i) => ({
        name: `Product ${i + 1}`,
        price: 100,
        image: `https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=600`,
        subImage: `https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=600`,
        href: '/',
    }))

    const categories = Array.from({ length: 8 }, (_, i) => ({
        name: `Category ${i + 1}`,
        image: `https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=600`,
        href: '/',
    }))
    return (
        <div>
            {/* Slider */}
            <Slider />
            {/* Featured Products */}
            <div className="flex flex-col gap-12 mt-12 md:mt-24 px-4 md:px-8 lg:px-16 2xl:px-32">
                <h2 className="text-3xl md:text-4xl font-semibold">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 ">
                    {products.map((product) => (
                        <ProductCard
                            key={product.name}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            subImage={product.subImage}
                            href={product.href}
                        />
                    ))}
                </div>
            </div>
            {/* Categories */}
            <div className="flex flex-col gap-12 mt-12 md:mt-24">
                <h2 className="text-3xl md:text-4xl font-semibold px-4 md:px-8 lg:px-16 2xl:px-32">Categories</h2>
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-8 min-w-max px-4 md:px-8">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                href={category.href}
                                className="relative flex-shrink-0 w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/6 h-80 rounded-lg overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    sizes="100%"
                                    className="object-cover transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <h3 className="text-white text-xl md:text-2xl font-semibold text-center px-4">
                                        {category.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            {/* New Products */}
            <div className="flex flex-col gap-12 mt-12 md:mt-24 px-4 md:px-8 lg:px-16 2xl:px-32">
                <h2 className="text-3xl md:text-4xl font-semibold ">New Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 ">
                    {products.map((product) => (
                        <ProductCard
                            key={product.name}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            subImage={product.subImage}
                            href={product.href}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
