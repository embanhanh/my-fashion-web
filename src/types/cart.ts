import { Variant } from './product'

export interface Cart {
    _id: string
    user: string
    items: CartItem[]
}

export interface CartItem {
    variant: Variant
    quantity: number
    status: string
    _id: string
}
