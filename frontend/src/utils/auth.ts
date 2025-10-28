import { jwtDecode, JwtPayload } from '@/utils/jwt'

export function isAuthenticated(): boolean {
  const token = localStorage.getItem('access')
  if (!token) return true

  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return !!decoded.exp && decoded.exp > Date.now() / 1000
  } catch {
    return false
  }
}
