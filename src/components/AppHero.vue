<script setup>
import { useUserStore } from '@/stores/user';
import { inject } from 'vue';

const store = useUserStore();

const { isAuthModalOpened, setAuthModalOpened } = inject('isAuthModalOpened');

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

<style lang="scss" scoped>
.hero__container {
  min-height: 760px;
  padding: $padding-x-desktop;
  padding-top: 100px;
  padding-bottom: 100px;
  @include flex(column, center, stretch);
}

.hero__frame {
  max-width: 1015px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
}

.hero__heading {
  font-size: 80px;
  font-weight: 600;
  line-height: 100px;
  text-transform: uppercase;
}

.hero__button,
.hero__link {
  width: 163px;
  height: 62px;
  @include flex(column, center, center);
  color: $bg-light;
  background-color: $bg-dark;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
}

@media (max-width: 991px) {
  .hero__heading {
    font-size: 50px;
    line-height: 80px;
  }
}

@media (max-width: 767px) {
  .hero__container {
    padding: $padding-x-mobile;
  }

  .hero__heading {
    font-size: 40px;
    line-height: 60px;
  }
}
</style>
