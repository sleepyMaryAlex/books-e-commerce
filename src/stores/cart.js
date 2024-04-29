import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/user';

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore();

  function addToCart(book, quantity) {
    const addedBook = userStore.currentUser.cart.find((addedBook) => addedBook.book.id === book.id);
    if (addedBook) {
      addedBook.quantity = quantity;
    } else {
      userStore.currentUser.cart.push({ book, quantity });
    }
  }

  function deleteFromCart(bookId) {
    const bookInCartIndex = userStore.currentUser.cart.findIndex(
      (bookInCart) => bookInCart.book.id === bookId
    );
    userStore.currentUser.cart.splice(bookInCartIndex, 1);
  }

  function updateCart(bookId, quantity) {
    const bookInCart = userStore.currentUser.cart.find(
      (bookInCart) => bookInCart.book.id === bookId
    );
    bookInCart.quantity = quantity;
  }

  function emptyCart(userId) {
    userStore.currentUser.cart = [];
    const user = userStore.getUserById(userId);
    user.cart = userStore.currentUser.cart;
  }

  return {
    addToCart,
    deleteFromCart,
    updateCart,
    emptyCart
  };
});
