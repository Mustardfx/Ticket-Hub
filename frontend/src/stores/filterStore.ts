import { defineStore } from 'pinia'

// interface FilterState {
//   selectedCity: string | null
//   selectedCategory: string | null
// }

export const useFilterStore = defineStore('filter', {
  state: () => ({
    selectedCity: null as string | null,
    selectedCategory: null as string | null,
  }),
  actions: {
    setCity(city: string) {
      this.selectedCity = city
    },
    setCategory(category: string) {
      this.selectedCategory = category
    }
  }
})
