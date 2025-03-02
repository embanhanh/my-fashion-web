'use client'
import Image from 'next/image'
import { FormEvent } from 'react'

interface SearchFormProps {
    onSubmit: (searchTerm: string) => void
    value?: string
    autoFocus?: boolean
    className?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function SearchForm({ onSubmit, value = '', onChange, autoFocus = false, className = '' }: SearchFormProps) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (value && value.trim() !== '') {
            onSubmit(value)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={className}>
            <div className="flex items-center bg-gray-100 rounded-full px-4">
                <input
                    name="name"
                    type="text"
                    placeholder="Search"
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 rounded-md bg-transparent outline-none"
                    autoFocus={autoFocus}
                />
                <button type="submit">
                    <Image src="/search.png" alt="search" width={20} height={20} />
                </button>
            </div>
        </form>
    )
}

export default SearchForm
