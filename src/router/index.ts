import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserView.vue'),
      meta: {
        layout: 'default',
        title: 'User list',
      },
      alias: "/"
    },
  ]
});

export default router
