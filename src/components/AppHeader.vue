<script setup>
import { ref, inject } from 'vue';
import AppModal from './AppModal.vue';
import AuthForm from './AuthForm.vue';
import SettingsButton from './SettingsButton.vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useUserStore();

const { isAuthModalOpened, setAuthModalOpened } = inject('isAuthModalOpened');
const access = ref('log-in');

function handleCartButtonClick() {
  store.currentUser ? router.push('/cart') : setAuthModalOpened(true);
}
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">Books</div>
      <div class="header__buttons">
        <button
          v-if="!store.currentUser"
          type="button"
          class="header__log-in-button"
          @click="setAuthModalOpened(true)"
        >
          Log In
        </button>
        <SettingsButton />
        <button type="button" class="header__cart-button" @click="handleCartButtonClick">
          <img src="../assets/icons/shopping-cart.svg" alt="Shopping cart" />
        </button>
      </div>
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
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header__container {
  height: 80px;
  @include flex(row, space-between, center);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: $padding-x-desktop;
}

.header__logo {
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
}

.header__buttons {
  @include flex(row, center, center);
  gap: 24px;
  position: relative;
}

.header__log-in-button {
  width: 95px;
  height: 48px;
  border: 1px solid $border-dark;
  cursor: pointer;
}

.header__cart-button {
  width: 48px;
  height: 48px;
  @include flex(row, center, center);
  background-color: $bg-dark;
  cursor: pointer;
}

.modal__heading {
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
}

.modal__switch-button {
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  border-bottom: 1px solid $text-dark;
}

@media (max-width: 767px) {
  .header__container {
    padding: $padding-x-mobile;
  }
}
</style>
