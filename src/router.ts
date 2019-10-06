import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/timetable',
      name: 'timetable',
      component: () => import(/* webpackChunkName: "about" */ './views/Timetable.vue'),
    },
    {
      path: '/customers',
      name: 'customers',
      component: () => import(/* webpackChunkName: "about" */ './views/Сustomers.vue'),
    },
    {
      path: '/trainers',
      name: 'trainers',
      component: () => import(/* webpackChunkName: "about" */ './views/Trainers.vue'),
    },
    {
      path: '/reference',
      name: 'reference',
      component: () => import(/* webpackChunkName: "about" */ './views/Reference.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
  ],
});
