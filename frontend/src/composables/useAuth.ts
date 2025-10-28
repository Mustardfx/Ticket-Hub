import { ref } from 'vue'
import axios from 'axios'

const isAuthenticated = ref(false)
const user = ref(null)

export function useAuth() {
    const checkAuth = async () => {
        try {
            const response = await axios.get('/api/profile/settings/')
            isAuthenticated.value = true
            user.value = response.data
        } catch {
            isAuthenticated.value = false
            user.value = null
        }
    }

    const login = async (credentials: { email: string; password: string }) => {
        await axios.post('/api/v1/auth/login/', credentials)
        await checkAuth()
    }

    const logout = async () => {
        await axios.post('/api/v1/auth/logout/')
        isAuthenticated.value = false
        user.value = null
    }

    return {
        isAuthenticated,
        user,
        checkAuth,
        login,
        logout
    }
}