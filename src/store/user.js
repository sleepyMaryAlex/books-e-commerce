import { ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { getFromLocalStorage } from '@/utils/storageUtils';

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(getFromLocalStorage('piniaState')?.currentUser || null);
  const usersData = ref(getFromLocalStorage('piniaState')?.usersData || []);

  const addCurrentUser = (userData) => {
    currentUser.value = userData;
  };

  const deleteCurrentUser = () => {
    currentUser.value = null;
  };

  const updateCurrentUser = (payload) => {
    for (const property in payload) {
      currentUser.value[property] = payload[property];
    }
  };

  const addUserToUsersData = (userData) => {
    usersData.value.push(userData);
    addCurrentUser(userData);
  };

  const findUser = (email, password) => {
    return usersData.value.find((user) => user.email === email && user.password === password);
  };

  const getUserById = (id) => {
    return usersData.value.find((user) => user.id === id);
  };

  const updateUser = (id, payload) => {
    const user = getUserById(id);
    for (const property in payload) {
      user[property] = payload[property];
    }
  };

  const login = (id, isRemember) => {
    const user = getUserById(id);
    updateUser(id, { isRemember });
    addCurrentUser(user);
  };

  const signup = (email, password) => {
    const newUser = {
      id: uuidv4(),
      email: email,
      password: password,
      isRemember: false,
      cart: [],
      transactions: []
    };
    addUserToUsersData(newUser);
  };

  return {
    currentUser,
    addCurrentUser,
    deleteCurrentUser,
    updateCurrentUser,
    usersData,
    addUserToUsersData,
    findUser,
    getUserById,
    updateUser,
    login,
    signup
  };
});
