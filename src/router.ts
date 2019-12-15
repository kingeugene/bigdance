import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';

Vue.use(Router);

const ifNotAuthenticated = (to: any, from: any, next: any) => {
  if (!store.getters.isAuthenticated) {
    next();
    return
  }
  next('/')
};

const ifAuthenticated = (to: any, from: any, next: any) => {
  if (store.getters.isAuthenticated) {
    next();
    return
  }
  next('/login')
};

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'timetable',
      meta: {
        title: "Расписание",
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Timetable.vue'),
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/record/:id',
      name: 'record',
      meta: {
        title: "Записи",
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Record.vue'),
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/customers',
      name: 'customers',
      meta: {
        title: "Клиенты",
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Сustomers.vue'),
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/customers/add',
      name: 'customersAdd',
      meta: {
        title: "Добавить клиента",
      },
      component: () => import(/* webpackChunkName: "about" */ './views/CustomerAdd.vue'),
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/trainers',
      name: 'trainers',
      meta: {
        title: "Тренеры",
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Trainers.vue'),
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/reference',
      name: 'reference',
      meta: {
        title: "Справка",
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Reference.vue'),
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: "Вход",
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
      beforeEnter: ifNotAuthenticated,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
