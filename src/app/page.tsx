'use client'
import Slider from '@/components/Slider'
import ProductCard from '@/components/ProductCard'
import Image from 'next/image'
import Link from 'next/link'
import { useCategories } from '@/hooks/useCategories'
import { useProducts } from '@/hooks/useProducts'

export default function Home() {
    const { data } = useProducts(1, 4, [], { min: 0, max: Infinity }, '', 0, '')
    const { data: categories } = useCategories()

    return (
        <div>
            {/* Slider */}
            <Slider />
            {/* Featured Products */}
            <div className="flex flex-col gap-12 mt-12 md:mt-24 px-4 md:px-8 lg:px-16 2xl:px-32">
                <h2 className="text-3xl md:text-4xl font-semibold">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 ">
                    {data?.products &&
                        data?.products.map((product) => (
                            <ProductCard
                                key={product._id}
                                name={product.name}
                                price={product.originalPrice}
                                image={product.urlImage[0]}
                                subImage={product.urlImage[1] || product.urlImage[0]}
                                href={`/${product.slug}`}
                            />
                        ))}
                </div>
            </div>
            {/* Categories */}
            <div className="flex flex-col gap-12 mt-12 md:mt-24">
                <h2 className="text-3xl md:text-4xl font-semibold px-4 md:px-8 lg:px-16 2xl:px-32">Categories</h2>
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-8 min-w-max px-4 md:px-8">
                        {categories?.map((category) => (
                            <Link
                                key={category._id}
                                href={`/list?category=${JSON.stringify([category._id])}`}
                                className="relative flex-shrink-0 w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/6 h-80 rounded-lg overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={
                                        category.urlImage ||
                                        'https://images.pexels.com/photos/24553189/pexels-photo-24553189/free-photo-of-dan-ba-di-n-tho-i-thong-minh-mo-hinh-chan-dung.jpeg?auto=compress&cs=tinysrgb&w=600'
                                    }
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
                    {data?.products &&
                        data?.products.map((product) => (
                            <ProductCard
                                key={product._id}
                                name={product.name}
                                price={product.originalPrice}
                                image={product.urlImage[0]}
                                subImage={product.urlImage[1] || product.urlImage[0]}
                                href={`/${product.slug}`}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}
