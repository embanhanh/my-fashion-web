import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/api'
import { Product } from '@/types/product'

export const useProducts = (
    page = 1,
    limit = 12,
    category: string[] | undefined,
    priceRange: { min: number; max: number } | undefined,
    sort: string | undefined,
    rating: number | undefined,
    search: string | undefined
) => {
    return useQuery<{ products: Product[]; currentPage: number; totalPages: number }>({
        queryKey: ['products', page, limit, category, priceRange, sort, rating, search],
        queryFn: () => productService.getProducts(page, limit, category, priceRange, sort, rating, search),
        staleTime: 5 * 60 * 1000, // Cache trong 5 phút
        gcTime: 30 * 60 * 1000, // Giữ trong cache 30 phút
        refetchOnWindowFocus: false,
    })
}

export const useProduct = (slug: string) => {
    return useQuery<Product>({
        queryKey: ['product', slug],
        queryFn: () => productService.getBySlug(slug),
        enabled: !!slug,
        staleTime: 5 * 60 * 1000, // Cache trong 5 phút
        gcTime: 30 * 60 * 1000, // Giữ trong cache 30 phút
        refetchOnWindowFocus: false,
    })
}
