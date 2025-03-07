'use client'
import { useState } from 'react'
import AddQuantity from './AddQuantity'
import { Variant } from '@/types/product'
import { colorTranslate } from '@/constants/color'
import { sizeTranslate } from '@/constants/size'

function Option({ variants }: { variants: Variant[] }) {
    const [selectedColor, setSelectedColor] = useState<string>('')
    const [selectedSize, setSelectedSize] = useState<string>('')

    const colors = [...new Set(variants.map((v) => v.color)), 'đỏ'].filter(Boolean)
    const sizes = [...new Set(variants.map((v) => v.size)), 'XL'].filter(Boolean)

    console.log(variants)

    const availableSizes = selectedColor
        ? [...new Set(variants.filter((v) => v.color === selectedColor).map((v) => v.size))]
        : sizes

    // Lọc màu dựa trên size đã chọn
    const availableColors = selectedSize
        ? [...new Set(variants.filter((v) => v.size === selectedSize).map((v) => v.color))]
        : colors

    // Lấy stock của sản phẩm được chọn
    const selectedVariants = variants.filter(
        (v) =>
            (v.color === selectedColor && !selectedSize) ||
            (!selectedColor && v.size === selectedSize) ||
            (v.color === selectedColor && v.size === selectedSize)
    )

    const stock =
        selectedVariants.length > 0
            ? selectedVariants.reduce((acc, curr) => acc + curr.stockQuantity, 0)
            : variants.reduce((acc, curr) => acc + curr.stockQuantity, 0)

    const handleColorClick = (color: string) => {
        setSelectedColor(color)
        if (selectedSize && !variants.some((v) => v.color === color && v.size === selectedSize)) {
            setSelectedSize('')
        }
    }

    const handleSizeClick = (size: string) => {
        setSelectedSize(size)
        if (selectedColor && !variants.some((v) => v.size === size && v.color === selectedColor)) {
            setSelectedColor('')
        }
    }

    return (
        <div className="flex flex-col gap-3">
            {colors.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold">Choose Color</h3>
                    <div className="flex gap-4 items-center">
                        {colors.map((color, index) => (
                            <button
                                key={index}
                                className="w-8 h-8 rounded-full relative cursor-pointer"
                                style={{
                                    backgroundColor: colorTranslate[color.toLowerCase()],
                                    filter: 'brightness(90%)',
                                }}
                                onClick={() => handleColorClick(color)}
                                disabled={!availableColors.includes(color)}
                            >
                                {selectedColor === color && (
                                    <div className="w-10 h-10 rounded-full bg-transparent ring-2 ring-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                )}
                                {!availableColors.includes(color) && (
                                    <div className="w-10 h-[2px] bg-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
            {sizes.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold">Choose Size</h3>
                    <div className="flex gap-3 items-center">
                        {sizes.map((size, index) => (
                            <button
                                key={index}
                                disabled={!availableSizes.includes(size)}
                                className={`px-3 py-1  ring-1 ring-red-400 rounded-md text-sm hover:bg-red-400 hover:text-white transition-all duration-300 ${
                                    selectedSize === size ? 'bg-red-400 text-white' : 'text-red-400 bg-white'
                                } disabled:opacity-50 disabled:bg-gray-400 disabled:text-white disabled:ring-gray-400 disabled:cursor-not-allowed`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {sizeTranslate[size] || size}
                            </button>
                        ))}
                    </div>
                </>
            )}
            <h3 className="text-lg font-semibold">Choose Quantity</h3>
            <AddQuantity stock={stock} />
        </div>
    )
}

export default Option
