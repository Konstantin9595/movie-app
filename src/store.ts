import Vue from 'vue';
import Vuex from 'vuex';
import { api } from './services/movieApi'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    films: [
      // {id: 1, title: "Великий уравнитель", desc: "Описание фильма великий уравнитель", poster: "https://training.ti.com/sites/default/files/default_images/tmb-video.png"},
      // {id: 2, title: "Великий уравнитель", desc: "Описание фильмы великий уравнитель", poster: "https://training.ti.com/sites/default/files/default_images/tmb-video.png"},
      // {id: 3, title: "Великий уравнитель", desc: "Описание фильмы великий уравнитель", poster: "https://training.ti.com/sites/default/files/default_images/tmb-video.png"},
      // {id: 4, title: "Тест", desc: "Описание тестового фильма", poster: "https://training.ti.com/sites/default/files/default_images/tmb-video.png"},
    ],
    menu: [
      { id: 1, label: "Фильмы",  href: "/films" },
      { id: 2, label: "Сериалы", href: "/series" },
    ],
    filmById: [
      // {id: 1, filmId: 2, title: "Великий уравнитель", fullDesc: "Полное описание фильма под идентификатором № 2", video: "https://www.youtube.com/embed/QPgWnMXRv5o", poster: "https://training.ti.com/sites/default/files/default_images/tmb-video.png", rate: 4.5, peopleCountRate: 433},
      // {id: 2, filmId: 3, title: "Великий уравнитель", fullDesc: "Полное описание фильма под идентификатором № 3", video: "https://www.youtube.com/embed/Mx7xTF8fKz4", poster: "https://training.ti.com/sites/default/files/default_images/tmb-video.png", rate: 4.5, peopleCountRate: 433},
      // {id: 3, filmId: 4, title: "Тест", fullDesc: "Полное описание фильма под идентификатором № 4", video: "https://www.youtube.com/embed/wWPfu-cOvMM", poster: "https://training.ti.com/sites/default/files/default_images/tmb-video.png", rate: 4.5, peopleCountRate: 433},
      // {id: 4, filmId: 1, title: "Великий уравнитель", fullDesc: "Полное описание фильма под идентификатором № 1", video: "https://www.youtube.com/embed/wWPfu-cOvMM", poster: "https://training.ti.com/sites/default/files/default_images/tmb-video.png", rate: 4.5, peopleCountRate: 433},
    ],
  },
  actions: {
    getPopularMoviesAction({commit}, payload) {
      api.miscPopularMovies({page: 1}, (err:any, res:any) => {
        if (err) throw new Error(err);
        console.log("Response = ", res);
      });
    }
  },
  getters: {
    getFilms: function({films}:any):[] {
      return films;
    },
    getMenu: function({menu}:any):[] {
      return menu;
    },
    getFilm: function({filmById}:any):{} {
      return (filmId:number) => filmById.filter((film:any) => film.filmId === filmId);
    },
  },
});
