export interface Product {
    _id: string
    name: string
    slug: string
    description: string
    originalPrice: number
    urlImage: string[]
    categories: string[]
    stockQuantity: number
    rating: number
    createdAt: string
    variants: Variant[]
}

export interface Variant {
    color: string
    size: string
    price: number
    stockQuantity: number
    imageUrl: string
    _id: string
    product: Product
}
