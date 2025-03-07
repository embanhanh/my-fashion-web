export interface Category {
    _id: string
    name: string
    slug: string
    parentCategory: Category
    urlImage: string
    createdAt: string
}
