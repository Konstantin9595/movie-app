import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    films: [
      {id: 1, title: "Великий уравнитель", desc: "Описание фильма великий уравнитель", src: "https://picsum.photos/200/300"},
      {id: 2, title: "Великий уравнитель", desc: "Описание фильмы великий уравнитель", src: "https://picsum.photos/id/237/200/300"},
      {id: 3, title: "Великий уравнитель", desc: "Описание фильмы великий уравнитель", src: "https://picsum.photos/id/237/200/300"},
      {id: 4, title: "Тест", desc: "Описание тестового фильма", src: "https://picsum.photos/id/237/200/300"},
    ],
    menu: [
      { id: 1, label: "Фильмы",  href: "/films" },
      { id: 2, label: "Сериалы", href: "/series" },
      { id: 3, label: "Мультфильмы", href: "/multfilms" }
    ]
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    getFilms: function({films}:any):[] {
      return films;
    },
    getMenu: function({menu}:any):[] {
      return menu;
    }
  },
});
