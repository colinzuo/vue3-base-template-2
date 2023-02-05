import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import AuthLayout from '@/layout/AuthLayout.vue';
import LoginView from '@/views/auth/LoginView.vue';
import SignupView from '@/views/auth/SignupView.vue';

import WrapperLayout from '@/layout/WrapperLayout.vue';
import PageForbiddenView from '@/views/error-page/PageForbiddenView.vue';
import PageNotFoundView from '@/views/error-page/PageNotFoundView.vue';


export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      redirect: '/auth/login',
      children: [
        {
          path: 'login',
          component: LoginView,
          name: 'login',
          meta: { title: 'Login' }
        },
        {
          path: 'signup',
          component: SignupView,
          name: 'signup',
          meta: { title: 'Signup' }
        },
      ]
    },
    {
      path: '/error-page',
      component: WrapperLayout,
      redirect: '/error-page/page-not-found',
      children: [
        {
          path: 'page-forbidden',
          name: 'page-forbidden',
          component: PageForbiddenView,
          meta: { title: 'Forbidden' },
        },
        {
          path: 'page-not-found',
          name: 'page-not-found',
          component: PageNotFoundView,
          meta: { title: 'Not Found' },
        },
      ],
    },
    {
      path: '/main',
      component: WrapperLayout,
      redirect: '/main/home',
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'home',
          component: HomeView,
          name: 'home',
          meta: { title: 'Home' },
        },
      ]
    },
    {
      path: '/',
      redirect: '/main/home',
    },
  ]
})
