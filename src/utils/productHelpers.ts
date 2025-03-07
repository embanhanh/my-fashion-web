import { Product, ProductFilters, Review } from '../types/product'

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price)
}

export const calculateAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return sum / reviews.length
}

export const filterProducts = (products: Product[], filters: ProductFilters): Product[] => {
    return products.filter((product) => {
        // Lọc theo category
        if (filters.category && product.category !== filters.category) {
            return false
        }

        // Lọc theo giá
        if (filters.minPrice && product.price < filters.minPrice) {
            return false
        }
        if (filters.maxPrice && product.price > filters.maxPrice) {
            return false
        }

        // Lọc theo tìm kiếm
        if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            return (
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower)
            )
        }

        return true
    })
}

export const sortProducts = (products: Product[], sortBy: string, sortOrder: 'asc' | 'desc'): Product[] => {
    return [...products].sort((a, b) => {
        let comparison = 0

        switch (sortBy) {
            case 'price':
                comparison = a.price - b.price
                break
            case 'rating':
                comparison = a.rating - b.rating
                break
            case 'newest':
                comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                break
            default:
                comparison = 0
        }

        return sortOrder === 'asc' ? comparison : -comparison
    })
}
