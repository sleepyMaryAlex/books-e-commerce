import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('../views/CartView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: () => import('../views/CheckoutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
});

export default router;
