'use client'
import { useState } from 'react'
import AddQuantity from './AddQuantity'

function Option() {
    const [selectedColor, setSelectedColor] = useState<string>('')
    const [selectedSize, setSelectedSize] = useState<string>('')

    const handleColorClick = (color: string) => {
        setSelectedColor(color)
    }

    const handleSizeClick = (size: string) => {
        setSelectedSize(size)
    }

    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Choose Color</h3>
            <div className="flex gap-2 items-center">
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedColor === 'red' ? 'ring-2 ring-gray-400' : ''
                    }`}
                >
                    <div className="w-8 h-8 bg-red-500 rounded-full" onClick={() => handleColorClick('red')}></div>
                </div>
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedColor === 'blue' ? 'ring-2 ring-gray-400' : ''
                    }`}
                >
                    <div className="w-8 h-8 bg-blue-500 rounded-full" onClick={() => handleColorClick('blue')}></div>
                </div>
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedColor === 'green' ? 'ring-2 ring-gray-400' : ''
                    }`}
                >
                    <div className="w-8 h-8 bg-green-500 rounded-full" onClick={() => handleColorClick('green')}></div>
                </div>
                {/* Clear */}
                <div
                    className="w-8 h-8 bg-gray-200 rounded-full relative cursor-pointer"
                    onClick={() => handleColorClick('')}
                >
                    <div className="w-10 h-[2px] bg-red-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                </div>
            </div>
            <h3 className="text-lg font-semibold">Choose Size</h3>
            <div className="flex gap-2 items-center">
                <button
                    disabled
                    className={`px-3 py-1 bg-white ring-1 ring-red-400 rounded-md text-red-400 text-sm hover:bg-red-400 hover:text-white transition-all duration-300 ${
                        selectedSize === 'small' ? 'bg-red-400 text-white' : ''
                    } disabled:opacity-50 disabled:bg-gray-400 disabled:text-white disabled:ring-gray-400 disabled:cursor-not-allowed`}
                    onClick={() => handleSizeClick('small')}
                >
                    Small
                </button>
                <button
                    className={`px-3 py-1 bg-white ring-1 ring-red-400 rounded-md text-red-400 text-sm hover:bg-red-400 hover:text-white transition-all duration-300 ${
                        selectedSize === 'medium' ? 'bg-red-400 text-white' : ''
                    } disabled:opacity-50 disabled:bg-gray-400 disabled:text-white disabled:ring-gray-400 disabled:cursor-not-allowed`}
                    onClick={() => handleSizeClick('medium')}
                >
                    Medium
                </button>
                <button
                    className={`px-3 py-1 bg-white ring-1 ring-red-400 rounded-md text-red-400 text-sm hover:bg-red-400 hover:text-white transition-all duration-300 ${
                        selectedSize === 'large' ? 'bg-red-400 text-white' : ''
                    } disabled:opacity-50 disabled:bg-gray-400 disabled:text-white disabled:ring-gray-400 disabled:cursor-not-allowed`}
                    onClick={() => handleSizeClick('large')}
                >
                    Large
                </button>
            </div>
            <h3 className="text-lg font-semibold">Choose Quantity</h3>
            <AddQuantity />
        </div>
    )
}

export default Option
