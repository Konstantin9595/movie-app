import Vue from 'vue';
import Router from 'vue-router';
import FullFilm from './components/FullFilm.vue';
import Counter from './components/Counter.vue';
import ListFilms from './components/ListFilms.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/full-:category/:id',
      name: 'full-film',
      components: {
        full: FullFilm,
      }
    },
    {
      path: '/:category?',
      name: 'List Film',
      components: {
        films: ListFilms
      },
    }
  ],
});
