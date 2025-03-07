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
}

export interface Review {
    id: string
    userId: string
    rating: number
    comment: string
    createdAt: string
}

export interface ProductFilters {
    category?: string
    minPrice?: number
    maxPrice?: number
    sortBy?: 'price' | 'rating' | 'newest'
    sortOrder?: 'asc' | 'desc'
    search?: string
}
