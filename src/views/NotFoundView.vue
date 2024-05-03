<script setup>
import '../assets/scss/pages/not-found-view.scss';
const classNames = ['last', 'second', 'first', 'basic', 'first', 'second', 'last'];
const error = 401;
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div className="not-found">
    <div class="not-found__container">
      <div className="not-found__errors">
        <p
          v-for="(className, index) in classNames"
          :class="'not-found__' + className"
          class="not-found__error"
          :key="error + index"
        >
          {{ error + index }}
        </p>
      </div>
      <p class="not-found__title">The page you were looking for could not be found</p>
      <div class="not-found__return-button" @click="router.push('/')">
        <p>Return to main page</p>
      </div>
    </div>
  </div>
</template>
