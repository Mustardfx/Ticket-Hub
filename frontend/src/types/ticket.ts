import type { CulturalObject } from "./cultural-object"

export interface Ticket {
  id: number
  user: number
  order: number
  cultural_object: CulturalObject
  cultural_object_id: number
  cultural_object_name: string
  visit_date: string
  visit_time: string
  qr_code: string | null
  is_used: boolean
  is_refunded: boolean
}
