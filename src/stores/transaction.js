import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/user';
import { useCartStore } from '@/stores/cart';

export const useTransactionStore = defineStore('transaction', () => {
  const userStore = useUserStore();
  const cartStore = useCartStore();

  function addTransaction(transaction, userId) {
    userStore.currentUser.transactions.push(transaction);
    cartStore.emptyCart(userId);
  }

  return {
    addTransaction
  };
});
