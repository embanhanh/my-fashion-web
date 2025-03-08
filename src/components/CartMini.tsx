'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useCart, useCartMutations } from '@/hooks/useCart'
import { useMemo } from 'react'

function CartMini() {
    const { data: cart, isLoading } = useCart()
    const { removeFromCart } = useCartMutations()

    const subtotal = useMemo(
        () => cart?.items.reduce((acc, item) => acc + item.variant.price * item.quantity, 0),
        [cart]
    )

    return (
        <div className="hidden md:flex flex-col gap-4 absolute top-10 right-0 w-96 max-h-[450px] bg-white shadow-lg rounded-lg p-4 z-50">
            <h2 className="text-2xl font-semibold">Shopping Cart</h2>

            {/* Danh sách sản phẩm với thanh cuộn */}
            <div className="flex flex-col gap-2 overflow-y-auto scrollbar max-h-[220px] pr-1">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    cart?.items.map((item) => (
                        <Link
                            key={item._id}
                            href={`/${item.variant.product.slug}`}
                            className="flex items-center gap-2 rounded-lg hover:bg-gray-100 p-2"
                        >
                            <Image
                                src={item.variant.imageUrl}
                                alt="cart"
                                className="object-cover rounded-md shrink-0"
                                width={72}
                                height={96}
                            />
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <p
                                        className="font-semibold truncate max-w-[150px]"
                                        title={item.variant.product.name}
                                    >
                                        {item.variant.product.name}
                                    </p>{' '}
                                    <span className="px-2 bg-gray-100 rounded-lg shrink-0">${item.variant.price}</span>
                                </div>
                                <p className="text-sm">available</p>
                                <div className="flex justify-between items-center mt-2">
                                    <p>{item.quantity}</p>
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault()
                                            removeFromCart(item._id)
                                        }}
                                        className="text-blue-500 cursor-pointer"
                                    >
                                        remove
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>

            {/* Phần subtotal và các nút */}
            <div className="mt-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Subtotal:</span>
                    <span className="text-lg font-bold">${subtotal}</span>
                </div>

                <div className="flex gap-2 justify-between">
                    <Link
                        href="/cart"
                        className=" py-3 px-4 ring-1 ring-gray-200 bg-white text-center rounded-lg font-normal transition-colors"
                    >
                        View Cart
                    </Link>
                    <Link
                        href="/checkout"
                        className=" py-3 px-4 bg-black hover:bg-gray-800 text-white text-center rounded-lg font-medium transition-colors"
                    >
                        Checkout
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartMini
