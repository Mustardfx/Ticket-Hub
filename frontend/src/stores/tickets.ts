import { defineStore } from "pinia";

const useTicketsStore = defineStore('tickets', {
    actions: {
      reserveTickets(ticketIds) {
        // Помечаем билеты как забронированные
      }
    }
  });