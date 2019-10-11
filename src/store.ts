import Vue from 'vue';
import Vuex from 'vuex';
import { api } from './services/movieApi'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: 0,
    films: [],
    menu: [
      { id: 1, label: "Фильмы",  href: "/films" },
      { id: 2, label: "Сериалы", href: "/series" },
    ],
    filmById: [],
    requestApiSuccess: false,
    errorMessage: "Не удалось загрузить контент. Обновите страницу или попробуйте немного позже"
  },
  mutations: {
    requestRemoteApi(state, payload) {
      console.log("requestRemoteApi");
    },
    errorRequestRemoteApi(state, payload) {
      console.log("errorRequestRemoteApi");
    },
    successRequestRemoteApi(state, payload) {
      const newFilmArray:any = [...state.films, ...payload.films];
      state.page = payload.page;
      state.films = newFilmArray;
    }
  },
  actions: {
    getPopularMoviesAction({state, commit}:any, page = 1) {
      // commit('requestRemoteApi');
      api.miscPopularMovies({page}, (err:any, res:any) => {
        if (err) {
          // commit('errorRequestRemoteApi');
          throw new Error(err);
        }

        commit('successRequestRemoteApi', {
          page: res.page, 
          films: res.results
        });
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
