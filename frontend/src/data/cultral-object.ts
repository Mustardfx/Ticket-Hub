export interface CulturalObject {
    id: string
    name: string
    city: string
    address?: string
    opening_hours?: string
    price: number
    main_image: string
}
export interface Filters {
  city: number | null
  category: string
  minPrice: number | null
  maxPrice: number | null
  search: string
}
