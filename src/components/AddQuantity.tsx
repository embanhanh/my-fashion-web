'use client'
import { useState } from 'react'
import { Variant } from '@/types/product'
import { useCartMutations } from '@/hooks/useCart'

function AddQuantity({ stock, enable, variant }: { stock: number; enable: boolean; variant: Variant }) {
    const { addToCart, addToCartError, addToCartLoading } = useCartMutations()
    const [quantity, setQuantity] = useState(1)
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

    const handleAddToCart = () => {
        addToCart({ variant: variant._id, quantity })
        if (addToCartError) {
            console.log(addToCartError)
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
            <button
                disabled={!enable || variant === null || addToCartLoading}
                onClick={handleAddToCart}
                className="bg-red-400 px-5 py-2 rounded-full shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <p className="text-lg text-white">Add to Cart</p>
            </button>
        </div>
    )
}

export default AddQuantity
