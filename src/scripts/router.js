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
        meta: {
          requiredRoles: ['guest'],
          titleId: 1,
          nav: {
            icon: 'home'
          }
        }
      },
      {
        path: '/jobs',
        name: 'ListJobs',
        component: () => import('@/components/views/jobs.vue'),
        meta: {
          titleId: 2,
          nav: {
            icon: 'work'
          }
          // both guests and job posters are allowed to visit
        }
      },
      {
        path: '/edit/:jobId',
        name: 'EditJob',
        component: () => import('@/components/views/edit.vue'),
        meta: {
          requiredRoles: ['job-poster']
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/views/login.vue'),
    meta: {
      requiredRoles: ['guest'],
      titleId: 3
    }
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
  user = user ? JSON.parse(user) : {
    roles: ['guest']
  };

  to.meta.user = user;

  // if no "requiredRoles" is defined then every user allowed to visit the route
  if (to.meta.requiredRoles?.some(role => user.roles.includes(role)) === false)
    return next({
      name: 'NotFound'
    });

  next();
});

export default router;