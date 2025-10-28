export interface City {
    id: number
    name: string
    country: string
    description: string | null
    created_at: string
}

export interface CulturalObject {
    id: number
    name: string
    description: string
    city: number  // ID города
    city_name: string
    city_country: string
    address: string
    price: number
    category: string
    category_display: string
    image: string | null
    image_url: string | null
    working_hours: string | null
    created_at: string
    is_active: boolean
}
