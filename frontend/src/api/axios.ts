import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { jwtDecode, JwtPayload } from '@/utils/jwt'
import router from '../router'

interface TokenResponse {
  access: string
  refresh: string
}

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/'

const api = axios.create({ baseURL: API_URL })

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode(token) as JwtPayload
    return !decoded.exp || decoded.exp < Date.now() / 1000
  } catch {
    return true
  }
}

// request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access') ?? ''
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// response interceptor для обновления токена при 401
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
    const refresh = localStorage.getItem('refresh') ?? ''

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refresh
    ) {
      originalRequest._retry = true
      try {
        const res: AxiosResponse<TokenResponse> = await axios.post(
          `${API_URL}token/refresh/`,
          { refresh }
        )
        const newAccess = res.data.access
        localStorage.setItem('access', newAccess)
        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${newAccess}`
        return api(originalRequest)
      } catch {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        router.replace('/login')
      }
    }

    return Promise.reject(error)
  }
)

export default api
