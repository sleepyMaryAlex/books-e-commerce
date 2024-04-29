<script setup>
import AppHero from '../components/AppHero.vue';
import AppHeader from '../components/AppHeader.vue';
import AppProducts from '../components/AppProducts.vue';
import { ref, provide } from 'vue';

const isAuthModalOpened = ref(false);

function setAuthModalOpened(isOpen) {
  isAuthModalOpened.value = isOpen;
}

provide('isAuthModalOpened', { isAuthModalOpened, setAuthModalOpened });
</script>

<template>
  <AppHeader />
  <main>
    <AppHero />
    <AppProducts />
  </main>
</template>
