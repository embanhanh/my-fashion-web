export interface Cart {
    id: string
    userId: string
    items: CartItem[]
    total: number
}

export interface CartItem {
    id: string
    productId: string
    quantity: number
    name: string
    price: number
}
