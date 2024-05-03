import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getFromLocalStorage } from '@/utils/storageUtils';

export const useUsersStore = defineStore('users', () => {
  const users = ref(getFromLocalStorage('piniaState')?.users?.users || []);

  const addToUsers = (userData) => {
    users.value.push(userData);
  };

  const findUser = (email, password) => {
    return users.value.find((user) => user.email === email && user.password === password);
  };

  const getUserById = (id) => {
    return users.value.find((user) => user.id === id);
  };

  const updateUser = (user, payload) => {
    for (const property in payload) {
      user[property] = payload[property];
    }
  };

  const addToCart = (book, quantity, userId) => {
    const user = getUserById(userId);
    const cartBook = user.cart.find((cartBook) => cartBook.book.id === book.id);
    if (cartBook) {
      cartBook.quantity = quantity;
      return;
    }
    user.cart.push({ book, quantity });
  };

  const deleteFromCart = (bookId, userId) => {
    const user = getUserById(userId);
    const bookInCartIndex = user.cart.findIndex((bookInCart) => bookInCart.book.id === bookId);
    user.cart.splice(bookInCartIndex, 1);
  };

  const updateCart = (bookId, quantity, userId) => {
    const user = getUserById(userId);
    const bookInCart = user.cart.find((bookInCart) => bookInCart.book.id === bookId);
    bookInCart.quantity = quantity;
  };

  const emptyCart = (userId) => {
    const user = getUserById(userId);
    user.cart = [];
  };

  const addTransaction = (transaction, userId) => {
    const user = getUserById(userId);
    user.transactions.push(transaction);
    emptyCart(userId);
  };

  return {
    users,
    addToUsers,
    findUser,
    getUserById,
    updateUser,
    addToCart,
    deleteFromCart,
    updateCart,
    emptyCart,
    addTransaction
  };
});
