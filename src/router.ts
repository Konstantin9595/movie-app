import Vue from 'vue';
import Router from 'vue-router';
import FullFilm from './components/FullFilm.vue';
import Counter from './components/Counter.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Counter
    },
    {
      path: '/full-film/:id',
      name: 'full-view',
      component: FullFilm
    },
    {
      path: '/test',
      name: 'test',
      component: Counter
    }
  ],
});
