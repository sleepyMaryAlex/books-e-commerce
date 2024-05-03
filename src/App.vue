<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !userStore.currentUser) {
    return { name: 'Home' };
  }
});
</script>

<template>
  <div class="wrapper">
    <router-view v-slot="{ Component }">
      <Transition mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>
