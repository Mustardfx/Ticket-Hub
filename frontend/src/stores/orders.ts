import { defineStore } from "pinia";

interface OrderState {
    ticketsStore: string
}
const useOrdersStore = defineStore('orders', {
    actions: {
      async createOrder(ticketIds: string) {
        const ticketsStore = useTicketsStore();
        await ticketsStore.reserveTickets(ticketIds);
        // Создаём заказ...
      }
    }
  });