'use client'
import Image from 'next/image'
import Link from 'next/link'

function ProductCard({
    name,
    price,
    image,
    subImage,
    href,
}: {
    name: string
    price: number
    image: string
    subImage: string
    href: string
}) {
    return (
        <Link href={href} className="flex flex-col gap-4">
            {/* Images */}
            <div className="relative w-full h-96 ">
                <Image
                    src={image}
                    alt="product"
                    fill
                    sizes="100%"
                    className="aspect-3/4 object-cover rounded-lg absolute hover:opacity-0 transition-opacity duration-500 ease-in-out z-10"
                />
                <Image src={subImage} alt="product" fill sizes="100%" className="object-cover rounded-lg absolute" />
            </div>
            {/* Details */}
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-medium truncate">{name}</h3>
                <p className="text-sm text-gray-500 font-semibold px-2 py-1 bg-gray-100 rounded-lg">${price}</p>
            </div>
            {/* Button */}
            <button className="w-max bg-white border border-red-400 text-red-400 text-semibold font-medium px-4 py-2 rounded-2xl hover:bg-red-400 hover:text-white transition-all duration-300">
                Add to Cart
            </button>
        </Link>
    )
}

export default ProductCard
