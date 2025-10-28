import { jwtDecode, JwtPayload } from '@/utils/jwt'
import axios, { AxiosResponse } from 'axios'

interface TokenResponse {
  access: string
  refresh: string
}

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/'

export async function tryRefreshToken(): Promise<boolean> {
  const refresh = localStorage.getItem('refresh') ?? ''
  let token = localStorage.getItem('access') ?? ''

  const isExpired = !token || (() => {
    try {
      const decoded = jwtDecode(token) as JwtPayload
      return !decoded.exp || decoded.exp < Date.now() / 1000
    } catch {
      return true
    }
  })()

  if (isExpired && refresh) {
    try {
      const res: AxiosResponse<TokenResponse> = await axios.post(
        `${API_URL}token/refresh/`,
        { refresh }
      )
      token = res.data.access
      localStorage.setItem('access', token)
      return true
    } catch {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      return false
    }
  }

  return !isExpired
}
