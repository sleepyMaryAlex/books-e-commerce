<script setup>
import '../assets/scss/components/app-hero.scss';
import { useUserStore } from '@/store/user';
import { inject } from 'vue';

const store = useUserStore();

const { setAuthModalOpened } = inject('isAuthModalOpened');

function handleButtonClick() {
  setAuthModalOpened(true);
}
</script>

<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__frame">
        <h1 class="hero__heading">Hello! We're glad to see you. Let's start our purchase</h1>
        <button
          v-if="!store.currentUser"
          type="button"
          class="hero__button"
          @click="handleButtonClick"
        >
          Get started
        </button>
        <a v-if="store.currentUser" href="#products" class="hero__link">Get started</a>
      </div>
    </div>
  </section>
</template>
