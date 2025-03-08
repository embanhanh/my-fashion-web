import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cartService } from '@/services/cartService'
import { Cart } from '@/types/cart'

export const useCart = () => {
    return useQuery<Cart>({
        queryKey: ['cart'],
        queryFn: cartService.getCart,
        // Cấu hình cho dữ liệu thường xuyên thay đổi
        staleTime: 0, // Luôn fetch mới khi component mount
        refetchInterval: 30000, // Tự động refetch mỗi 30 giây
        refetchOnWindowFocus: true, // Refetch khi focus lại window
    })
}

export const useCartMutations = () => {
    const queryClient = useQueryClient()

    const addToCartMutation = useMutation({
        mutationFn: ({ variant, quantity }: { variant: string; quantity: number }) =>
            cartService.addToCart(variant, quantity),
        onSuccess: () => {
            // Invalidate và refetch giỏ hàng sau khi thêm thành công
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
    })

    const updateCartItemMutation = useMutation({
        mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
            cartService.updateCartItem(itemId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
    })

    const removeFromCartMutation = useMutation({
        mutationFn: (itemId: string) => cartService.removeFromCart(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
    })

    return {
        addToCart: addToCartMutation.mutate,
        addToCartError: addToCartMutation.error,
        addToCartLoading: addToCartMutation.isPending,
        updateCartItem: updateCartItemMutation.mutate,
        updateCartItemError: updateCartItemMutation.error,
        updateCartItemLoading: updateCartItemMutation.isPending,
        removeFromCart: removeFromCartMutation.mutate,
        removeFromCartError: removeFromCartMutation.error,
        removeFromCartLoading: removeFromCartMutation.isPending,
    }
}
