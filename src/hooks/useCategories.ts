import { useQuery } from '@tanstack/react-query'
import { categoryService } from '../services/api'
import { Category } from '@/types/category'

export const useCategories = () => {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: categoryService.getAll,
        // Cấu hình cho dữ liệu ít thay đổi
        staleTime: 24 * 60 * 60 * 1000, // Cache trong 24 giờ
        gcTime: 7 * 24 * 60 * 60 * 1000, // Giữ trong cache 7 ngày
        refetchOnWindowFocus: false, // Không refetch khi focus window
    })
}
