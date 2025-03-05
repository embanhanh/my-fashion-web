import Image from 'next/image'
import ProductCard from '@/components/ProductCard'

function List() {
    const products = Array.from({ length: 4 }, (_, i) => ({
        name: `Product ${i + 1}`,
        price: 100,
        image: `https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=600`,
        subImage: `https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=600`,
        href: '/',
    }))

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
                    <select name="type" className="border bg-gray-100  rounded-full py-2 px-4 outline-none">
                        <option>Type</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </select>
                    <input
                        type="text"
                        placeholder="min price"
                        className="border w-32 bg-white border-gray-300 rounded-full py-2 px-4 outline-none"
                    />
                    <input
                        type="text"
                        placeholder="max price"
                        className="border w-32 bg-white border-gray-300 rounded-full py-2 px-4 outline-none"
                    />
                    <select name="size" className="border bg-gray-100  rounded-full py-2 px-4 outline-none">
                        <option>Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                    <select name="color" className="border bg-gray-100  rounded-full py-2 px-4 outline-none">
                        <option>Color</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                    </select>
                    <select
                        name="category"
                        id="category"
                        className="border bg-gray-100  rounded-full py-2 px-4 outline-none"
                    >
                        <option>Category</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </select>
                    <select
                        name="allFilters"
                        id="allFilters"
                        className="border bg-gray-100  rounded-full py-2 px-4 outline-none"
                    >
                        <option>All Filters</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>
                {/* Sort */}
                <select
                    name="sort"
                    className="hidden md:block ring-1 ring-gray-300 bg-white  rounded-full py-2 px-4 outline-none"
                >
                    <option>Sort</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <h1 className="text-2xl font-bold">Products for you!</h1>
            {/* Products */}
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
    )
}

export default List
