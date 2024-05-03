<script setup>
import AppHero from '../components/AppHero.vue';
import AppHeader from '../components/AppHeader.vue';
import AppProducts from '../components/AppProducts.vue';
import { ref, provide } from 'vue';

const isModalOpened = ref(false);

function setModalOpened(isOpen) {
  isModalOpened.value = isOpen;
}

provide('isModalOpened', { isModalOpened, setModalOpened });
</script>

<template>
  <div>
    <AppHeader />
    <main>
      <AppHero />
      <AppProducts />
    </main>
  </div>
</template>
