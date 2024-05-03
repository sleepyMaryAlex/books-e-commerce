import { ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(JSON.parse(localStorage?.getItem('piniaState'))?.currentUser || null);
  const usersData = ref(JSON.parse(localStorage?.getItem('piniaState'))?.usersData || []);

  function addCurrentUser(userData) {
    currentUser.value = userData;
  }

  function deleteCurrentUser() {
    currentUser.value = null;
  }

  function updateCurrentUser(payload) {
    for (const property in payload) {
      currentUser.value[property] = payload[property];
    }
  }

  function addUserToUsersData(userData) {
    usersData.value.push(userData);
    addCurrentUser(userData);
  }

  function findUser(email, password) {
    return usersData.value.find((user) => user.email === email && user.password === password);
  }

  function getUserById(id) {
    return usersData.value.find((user) => user.id === id);
  }

  function updateUser(id, payload) {
    const user = getUserById(id);
    for (const property in payload) {
      user[property] = payload[property];
    }
  }

  function login(id, isRemember) {
    const user = getUserById(id);
    updateUser(id, { isRemember });
    addCurrentUser(user);
  }

  function signup(email, password) {
    const newUser = {
      id: uuidv4(),
      email: email,
      password: password,
      isRemember: false,
      cart: [],
      transactions: []
    };
    addUserToUsersData(newUser);
  }

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
