// stores/userStore.ts
import { defineStore } from 'pinia'
import api from "@/api/axios";

export enum UserRole {
  guest = 'guest',
  user = 'user',
  admin = 'admin',
  controller = 'controller',
}

interface UserState {
  userRole: UserRole
  isLoggedIn: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userRole: UserRole.guest,
    isLoggedIn: false,
  }),

  actions: {
    async login(credentials: { username: string; password: string }) {
      try {
        const res = await api.post('/login/', credentials)

        // Django возвращает { access, refresh, role }
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)

        this.userRole = res.data.role
        this.isLoggedIn = true
      } catch (err) {
        this.logout()
        throw err
      }
    },

    async fetchUser() {
      try {
        const res = await api.get('profile/settings/') // Django вернёт { username, role }
        this.userRole = res.data.role
        this.isLoggedIn = true
      } catch (err) {
        this.logout()
      }
    },

    logout() {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      this.userRole = UserRole.guest
      this.isLoggedIn = false
    },
  },

  getters: {
    isAdmin: (state) => state.userRole === UserRole.admin,
    isController: (state) => state.userRole === UserRole.controller,
    isGuest: (state) => state.userRole === UserRole.guest,
    isUser: (state) => state.userRole === UserRole.user,
  },
})
