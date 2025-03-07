'use client'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import Option from '@/components/Option'
import { useParams } from 'next/navigation'
import { useProduct } from '@/hooks/useProducts'

function ProductPage() {
    const params = useParams()
    const { data } = useProduct(params?.slug as string)

    const [selectedImage, setSelectedImage] = useState(0)

    const images = useMemo(
        () => [...(data?.variants.map((variant) => variant.imageUrl) || []), ...(data?.urlImage || [])],
        [data]
    )

    return (
        <div className="flex flex-col gap-12 px-4 md:px-8 lg:px-16 2xl:px-32">
            {/* Main Content */}
            <div className="flex px-0 md:px-12 lg:px-24 flex-col lg:flex-row gap-8">
                {/* Image */}
                <div className="w-full px-0 md:px-8 lg:px-16 lg:w-1/2 h-max flex flex-col gap-4">
                    {/* Main Image */}
                    <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden">
                        <Image
                            src={images[selectedImage]}
                            alt="product"
                            className="object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                    {/* Sub Images */}
                    <div className="flex gap-4 w-full">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`relative aspect-[3/4] flex-1 rounded-lg overflow-hidden cursor-pointer ${
                                    selectedImage === index ? 'ring-2 ring-gray-400' : ''
                                }`}
                                onClick={() => setSelectedImage(index)}
                            >
                                <Image
                                    src={image}
                                    alt={`Product view ${index + 1}`}
                                    className="object-cover hover:opacity-80 transition-opacity"
                                    fill
                                    sizes="(max-width: 768px) 25vw, 15vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Info */}
                <div className="w-full lg:w-1/2 flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold">{data?.name}</h2>
                    <p className="text-gray-500">{data?.description}</p>
                    {/* Separator */}
                    <div className="w-full h-[1px] bg-gray-200 my-4"></div>
                    {/* Price */}
                    <p className="text-2xl font-semibold">
                        <span className="line-through text-gray-500 mr-2">${data?.originalPrice}</span> $
                        {data?.originalPrice}
                    </p>
                    {/* Separator */}
                    <div className="w-full h-[1px] bg-gray-200 my-4"></div>
                    {/* Option */}
                    <Option />
                    {/* Separator */}
                    <div className="w-full h-[1px] bg-gray-200 my-4"></div>
                    {/* Details */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">Details</h3>
                        <p className="text-gray-500">{data?.description}</p>
                    </div>
                </div>
            </div>
            {/* Rating */}
            {/* <div className=""></div> */}
            {/* Related Products */}
            {/* <div className=""></div> */}
        </div>
    )
}

export default ProductPage
