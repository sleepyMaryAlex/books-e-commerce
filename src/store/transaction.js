import { defineStore } from 'pinia';
import { useUserStore } from '@/store/user';
import { useCartStore } from '@/store/cart';

export const useTransactionStore = defineStore('transaction', () => {
  const userStore = useUserStore();
  const cartStore = useCartStore();

  const addTransaction = (transaction, userId) => {
    userStore.currentUser.transactions.push(transaction);
    cartStore.emptyCart(userId);
  };

  return {
    addTransaction
  };
});
