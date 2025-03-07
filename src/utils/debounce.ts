// utils/debounce.ts
export function debounce<T extends (...args: Parameters<T>) => void>(callback: T, delay: number) {
    let timeoutId: NodeJS.Timeout

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => callback(...args), delay)
    }
}
