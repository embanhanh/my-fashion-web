'use client'
import { useState } from 'react'
function AddQuantity() {
    const [quantity, setQuantity] = useState(1)
    const stock = 10
    const handleQuantity = (type: 'increment' | 'decrement') => {
        if (type === 'increment') {
            setQuantity((prev) => {
                if (prev >= stock) {
                    return stock
                }
                return prev + 1
            })
        } else {
            setQuantity((prev) => {
                if (prev <= 1) {
                    return 1
                }
                return prev - 1
            })
        }
    }
    return (
        <div className="flex items-center justify-between">
            {/* Quantity */}
            <div className="flex items-center gap-2">
                <div className="flex gap-2 items-center justify-center px-3 py-2 bg-gray-200 rounded-full">
                    <button
                        className="w-10 h-full flex items-center justify-center"
                        onClick={() => handleQuantity('decrement')}
                    >
                        <p className="text-2xl font-semibold">-</p>
                    </button>
                    <p className="text-lg font-semibold">{quantity}</p>
                    <button
                        className="w-10 h-full flex items-center justify-center"
                        onClick={() => handleQuantity('increment')}
                    >
                        <p className="text-2xl font-semibold">+</p>
                    </button>
                </div>
                <p className="text-sm text-gray-500">
                    Only <span className="font-semibold text-orange-400">{stock}</span> left
                </p>
            </div>
            {/* Add to Cart */}
            <button className="bg-red-400 px-5 py-2 rounded-full shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed">
                <p className="text-lg text-white">Add to Cart</p>
            </button>
        </div>
    )
}

export default AddQuantity
