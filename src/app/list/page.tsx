'use client'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { useSearchParams } from 'next/navigation'
import { useRouter, usePathname } from 'next/navigation'
import { useProducts } from '@/hooks/useProducts'
import { debounce } from '@/utils/debounce'
import Pagination from '@/components/Pagination'

function List() {
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const pathname = usePathname()

    const { data } = useProducts(
        Number(searchParams?.get('page') || 1),
        Number(searchParams?.get('limit') || 12),
        searchParams?.get('category') ? JSON.parse(searchParams.get('category') || '[]') : [],
        { min: Number(searchParams?.get('minPrice') || 0), max: Number(searchParams?.get('maxPrice') || Infinity) },
        searchParams?.get('sort') || '',
        Number(searchParams?.get('rating') || 0),
        searchParams?.get('search') || ''
    )

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target
        const params = new URLSearchParams(searchParams as URLSearchParams)
        params.set(name, value)
        if (params.get('page') && Number(params.get('page')) > 1) {
            params.set('page', '1')
        }
        replace(`${pathname}?${params.toString()}`)
    }

    const debouncedInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target
        value = value.replace(/\D/g, '')
        e.target.value = value
        if (value === '' || /^\d+$/.test(value)) {
            handleFilterChange(e)
        }
    }, 500)

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams as URLSearchParams)
        params.set('page', page.toString())
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex flex-col gap-12 px-4 md:px-8 lg:px-16 2xl:px-32">
            {/* Campaign */}
            <div className="hidden md:flex gap-4 h-64 bg-pink-100 px-20">
                {/* Content */}
                <div className="flex flex-col gap-8 w-2/3 items-center justify-center">
                    <h1 className="text-4xl text-center font-medium max-w-md">Grab up to 50% off on all products</h1>
                    <button className="bg-red-400 text-white px-4 py-2 rounded-full">Buy Now</button>
                </div>
                {/* Image */}
                <div className="w-1/3 h-full relative">
                    <Image src="/woman.png" alt="campaign" fill sizes="100%" className="object-cover" />
                </div>
            </div>
            {/* Filters */}
            <div className="flex justify-between items-center">
                {/* Filter */}
                <div className="flex gap-4 flex-wrap">
                    <select name="category" className="border bg-gray-100  rounded-full py-2 px-4 outline-none">
                        <option>Category</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </select>
                    <input
                        type="text"
                        name="minPrice"
                        placeholder="min price"
                        className="border w-32 bg-white border-gray-300 rounded-full py-2 px-4 outline-none"
                        onChange={debouncedInputChange}
                    />
                    <input
                        type="text"
                        name="maxPrice"
                        placeholder="max price"
                        className="border w-32 bg-white border-gray-300 rounded-full py-2 px-4 outline-none"
                        onChange={debouncedInputChange}
                    />
                    <select
                        name="rating"
                        onChange={handleFilterChange}
                        className="border bg-gray-100  rounded-full py-2 px-4 outline-none"
                    >
                        <option value={0}>Rating</option>
                        <option value={1}>1 and above</option>
                        <option value={2}>2 and above</option>
                        <option value={3}>3 and above</option>
                        <option value={4}>4 and above</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                {/* Sort */}
                <select
                    name="sort"
                    className="hidden md:block ring-1 ring-gray-300 bg-white  rounded-full py-2 px-4 outline-none"
                    onChange={handleFilterChange}
                >
                    <option value="">Sort</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="popular">Popular</option>
                    <option value="stockAsc">Stock: Low to High</option>
                    <option value="stockDesc">Stock: High to Low</option>
                </select>
            </div>
            <h1 className="text-2xl font-bold">Products for you!</h1>
            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 ">
                {data?.products.map((product) => (
                    <ProductCard
                        key={product.name}
                        name={product.name}
                        price={product.originalPrice}
                        image={product.urlImage[0]}
                        subImage={product.urlImage[1] || product.urlImage[0]}
                        href={`/${product.slug}`}
                    />
                ))}
            </div>
            <Pagination
                currentPage={Number(searchParams?.get('page') || 1)}
                totalPages={data?.totalPages || 1}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default List
