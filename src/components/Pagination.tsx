import { memo } from 'react'

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}) => {
    const renderPaginationButtons = () => {
        const buttons = []
        const showMax = 6 // Số nút tối đa hiển thị

        if (totalPages <= showMax) {
            // Nếu tổng số trang ít hơn showMax thì hiện tất cả
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <button
                        key={i}
                        className={`px-3 py-1 text-sm rounded-md  ${currentPage === i ? 'bg-red-400 text-white' : 'ring-1 ring-red-400 bg-white text-red-400'}`}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </button>
                )
            }
        } else {
            // Luôn hiển thị trang đầu
            buttons.push(
                <button
                    key={1}
                    className={`px-3 py-1 text-sm rounded-md  ${currentPage === 1 ? 'bg-red-400 text-white' : 'ring-1 ring-red-400 bg-white text-red-400'}`}
                    onClick={() => onPageChange(1)}
                >
                    1
                </button>
            )

            // Tính toán range của các nút giữa
            let startPage = Math.max(2, currentPage - Math.floor((showMax - 3) / 2))
            const endPage = Math.min(totalPages - 1, startPage + showMax - 4)

            // Điều chỉnh lại startPage nếu endPage đã chạm giới hạn
            startPage = Math.max(2, endPage - (showMax - 4))

            // Hiển thị dấu ... bên trái
            if (startPage > 2) {
                buttons.push(<span className="px-3 py-1">...</span>)
            }

            // Thêm các nút ở giữa
            for (let i = startPage; i <= endPage; i++) {
                buttons.push(
                    <button
                        key={i}
                        className={`px-3 py-1 text-sm rounded-md  ${currentPage === i ? 'bg-red-400 text-white' : 'ring-1 ring-red-400 bg-white text-red-400'}`}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </button>
                )
            }

            // Hiển thị dấu ... bên phải
            if (endPage < totalPages - 1) {
                buttons.push(<span className="px-3 py-1">...</span>)
            }

            // Luôn hiển thị trang cuối
            buttons.push(
                <button
                    key={totalPages}
                    className={`px-3 py-1 text-sm rounded-md  ${currentPage === totalPages ? 'bg-red-400 text-white' : 'ring-1 ring-red-400 bg-white text-red-400'}`}
                    onClick={() => onPageChange(totalPages)}
                >
                    {totalPages}
                </button>
            )
        }

        return buttons
    }

    return (
        <div className="flex items-center justify-between px-4 py-2 mt-4 w-full">
            <button
                className="px-4 py-1 bg-red-400 text-white text-sm rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <div className="flex items-center gap-2 flex-1 justify-center">{renderPaginationButtons()}</div>
            <button
                className="px-4 py-1 bg-red-400 text-white text-sm rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    )
}

export default memo(Pagination)
