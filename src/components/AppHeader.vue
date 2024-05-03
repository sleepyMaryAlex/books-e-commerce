<script setup>
import '../assets/scss/layout/app-header.scss';
import { ref, inject } from 'vue';
import AppModal from './AppModal.vue';
import AuthForm from './AuthForm.vue';
import SettingsButton from './SettingsButton.vue';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();

const { isModalOpened, setModalOpened } = inject('isModalOpened');
const access = ref('log-in');

const handleCartButtonClick = () => {
  userStore.currentUser ? router.push('/cart') : setModalOpened(true);
};
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">Books</div>
      <div class="header__buttons">
        <button
          v-if="!userStore.currentUser"
          type="button"
          class="header__log-in-button"
          @click="setModalOpened(true)"
        >
          Log In
        </button>
        <SettingsButton />
        <button type="button" class="header__cart-button" @click="handleCartButtonClick">
          <img src="../assets/images/icons/shopping-cart.svg" alt="Shopping cart" />
        </button>
      </div>
      <Transition>
        <AppModal v-if="isModalOpened && !userStore.currentUser">
          <div class="modal__content">
            <h2 class="modal__heading">{{ access === 'log-in' ? 'Log In' : 'Sign Up' }}</h2>
            <AuthForm :access="access" @setAccess="(a) => (access = a)" />
            <div
              class="modal__switch-button"
              @click="access === 'log-in' ? (access = 'sign-up') : (access = 'log-in')"
            >
              {{
                access === 'log-in'
                  ? 'Don’t have an account? Sign up'
                  : 'Already have an account? Log In'
              }}
            </div>
          </div>
        </AppModal>
      </Transition>
    </div>
  </header>
</template>
