/*
 * File: router.js
 * Project: job-ad
 *
 * Author: Denes Solti
 */
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/views/layout.vue'),
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/components/views/welcome.vue'),
        meta: {guestOnly: true}
      },
      {
        path: '/jobs',
        name: 'ListJobs',
        component: () => import('@/components/views/jobs.vue')
        // both guests and job posters are allowed to visit
      },
      {
        path: '/edit/:jobId',
        name: 'EditJob',
        component: () => import('@/components/views/edit.vue'),
        meta: {requiredRoles: ['job-poster']}
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/views/login.vue'),
    meta: {guestOnly: true}
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/views/not-found.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('user');
  user = user ? JSON.parse(user) : {roles: []};

  to.meta.user = user;

  if (to.meta.guestOnly && user.roles.length)
    return next('/');

  if (to.meta.requiredRoles?.some(role => user.roles.includes(role)) === false)
    return next(`/login?redirectTo=${from.fullPath}`);

  next();
});

export default router;