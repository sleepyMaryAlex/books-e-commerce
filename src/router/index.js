import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/store/user';

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

router.beforeEach((to) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.currentUser) {
    return { name: 'Home' };
  }
});
export default router;
