import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'timetable',
      meta: {
        title: "Расписание",
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Timetable.vue'),
    },
    {
      path: '/customers',
      name: 'customers',
      meta: {
        title: "Клиенты",
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Сustomers.vue'),
    },
    {
      path: '/trainers',
      name: 'trainers',
      meta: {
        title: "Тренеры",
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Trainers.vue'),
    },
    {
      path: '/reference',
      name: 'reference',
      meta: {
        title: "Справка",
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Reference.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: "Вход",
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
