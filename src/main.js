import './scss/base.scss';
import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';
const pinia = createPinia();
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');

watch(
  pinia.state,
  (state) => {
    localStorage.setItem('piniaState', JSON.stringify(state.user));
  },
  { deep: true }
);
