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

const { isAuthModalOpened, setAuthModalOpened } = inject('isAuthModalOpened');
const access = ref('log-in');

function handleCartButtonClick() {
  userStore.currentUser ? router.push('/cart') : setAuthModalOpened(true);
}
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
          @click="setAuthModalOpened(true)"
        >
          Log In
        </button>
        <SettingsButton />
        <button type="button" class="header__cart-button" @click="handleCartButtonClick">
          <img src="../assets/images/icons/shopping-cart.svg" alt="Shopping cart" />
        </button>
      </div>
      <Transition>
        <AppModal v-if="isAuthModalOpened">
          <template #header>
            <h2 class="modal__heading">{{ access === 'log-in' ? 'Log In' : 'Sign Up' }}</h2>
          </template>
          <template #content>
            <AuthForm :access="access" @setAccess="(a) => (access = a)" />
          </template>
          <template #footer>
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
          </template>
        </AppModal>
      </Transition>
    </div>
  </header>
</template>
