import { jwtDecode as decode } from 'jwt-decode'

export { decode as jwtDecode }

export interface JwtPayload {
  exp?: number
  iat?: number
  user_id?: string
  [key: string]: any
}
