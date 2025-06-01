/*
 * File: router.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */
import {createRouter, createWebHistory} from 'vue-router';

import api from './api.js';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/views/layout.vue'),
    beforeEnter: (to, from, next) => {
      // if the user is logged in go to the editor else show the welcome screen
      if (to.path === '/')
        return next({
          name: to.requestor.isAnonymous ? 'Welcome' : 'ListJobs'
        });

      next();
    },
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/components/views/welcome.vue'),
        meta: {
          requiredRoles: ['guest'],
          nav: {
            titleId: 'TITLE_HOME',
            icon: 'home'
          }
        }
      },
      {
        path: '/jobs',
        name: 'ListJobs',
        component: () => import('@/components/views/jobs.vue'),
        meta: {
          nav: {
            titleId: 'TITLE_JOBS',
            icon: 'work'
          }
          // both guests and job posters are allowed to visit
        }
      },
      {
        path: '/job/:jobId',
        name: 'Job',
        component: () => import('@/components/views/job-details.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/views/login.vue'),
        meta: {
          requiredRoles: ['guest']
        }
      }
    ]
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

router.beforeEach(async (to, from, next) => {
  to.requestor = await api.getUser();

  // if no "requiredRoles" is defined then every user allowed to visit the route
  if (to.meta.requiredRoles?.some(role => to.requestor.roles.includes(role)) === false)
    return next({
      name: 'NotFound'
    });

  next();
});

export default router;