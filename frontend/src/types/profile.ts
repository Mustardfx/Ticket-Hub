import type { City } from "./cultural-object"

export interface User {
    id: number
    name: string | null
    surname: string
    email: string
    phone: string
    birthday: string
    city_id: number | null
    city_name: string | null
    city: City | null
}

export interface Filters {
  city: number | null
  category: string
  minPrice: number | null
  maxPrice: number | null
}

// export interface Ticket {
//   id: number,
//   object: string,
//   date: string,
//   time: string,
//   price: number,
// }

export interface Order {
  id: number;
  userId: number;
  ticketsId: number[]; // IDs билетов
  email: string;
  object_name: string;
  status: 'pending' | 'paid' | 'cancelled';
  price: number;
  seatsAvailable: number;
  createdAt: string;
}

export interface BankCard {
  id: number
  card_id: string
  card_mask: string
  card_type: string
  card_expire: string
  card_name: string
  is_default: boolean
}

// export interface Payment {
//   id: number;
//   orderId: number;
//   amount: number;
//   method: 'card' | 'crypto';
//   status: 'success' | 'failed';
// }
