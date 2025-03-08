export interface Cart {
    _id: string
    user: string
    items: CartItem[]
}

export interface CartItem {
    variant: string
    quantity: number
    status: string
}
