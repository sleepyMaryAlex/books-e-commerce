import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getFromLocalStorage } from '@/utils/storageUtils';

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(getFromLocalStorage('piniaState')?.user.currentUser || null);

  const addCurrentUser = (user) => {
    currentUser.value = user;
  };

  const deleteCurrentUser = () => {
    currentUser.value = null;
  };

  const addToCart = (book, quantity) => {
    const cartBook = currentUser.value.cart.find((cartBook) => cartBook.book.id === book.id);
    if (cartBook) {
      cartBook.quantity = quantity;
      return;
    }
    currentUser.value.cart.push({ book, quantity });
  };

  const deleteFromCart = (bookId) => {
    const bookInCartIndex = currentUser.value.cart.findIndex(
      (bookInCart) => bookInCart.book.id === bookId
    );
    currentUser.value.cart.splice(bookInCartIndex, 1);
  };

  const updateCart = (bookId, quantity) => {
    const bookInCart = currentUser.value.cart.find((bookInCart) => bookInCart.book.id === bookId);
    bookInCart.quantity = quantity;
  };

  const emptyCart = () => {
    currentUser.value.cart = [];
  };

  const addTransaction = (transaction) => {
    currentUser.value.transactions.push(transaction);
    emptyCart();
  };

  return {
    currentUser,
    addCurrentUser,
    deleteCurrentUser,
    addToCart,
    deleteFromCart,
    updateCart,
    emptyCart,
    addTransaction
  };
});
