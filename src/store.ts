import Vue from 'vue';
import Vuex from 'vuex';
import { api } from './services/movieApi'
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: 0,
    films: [],
    menu: [
      { id: 1, label: "Фильмы",  href: "/films" },
      { id: 2, label: "Сериалы", href: "/series" },
    ],
    fullFilmInfoById: {},
    apiResponse: {status: null, message: null},
  },
  mutations: {
    requestRemoteApi() {
      console.log('requestRemoteApi');
    },
    errorRequestRemoteApi({apiResponse}, {status, message}) {
      apiResponse.status = status;
      apiResponse.message = message;
    },
    successRequestPopularMovie(state, payload) {
      const newFilmArray:any = [...state.films, ...payload.films];
      state.page = payload.page;
      state.films = newFilmArray;
    },
    successRequestFullMovieInfo(state, {id, fullInfo}) {
      const newState = {[id]: fullInfo};
      state.fullFilmInfoById = {
        ...newState
      };
    }
  },
  actions: {
    getPopularMoviesAction({commit}:any, page = 1) {
      commit('requestRemoteApi');
      api.miscPopularMovies({page}, (err:any, res:any) => {
        if (err) {
          commit('errorRequestRemoteApi', {status: err.status, message: err.message});
          throw new Error(err);
        }
        commit('successRequestPopularMovie', {
          page: res.page, 
          films: res.results
        });
      });
    },
    getFullMovieInfoAction({commit}:any, id:number) {
      // trailers : movieTrailers() 
      // title : movieInfo()
      // overwiew : movieInfo()
      // vote_average(rate): movieInfo()
      commit('requestRemoteApi');
      api.movieInfo({id}, (err:any, res:any) => {
        if (err) {
          commit('errorRequestRemoteApi', {status: err.status, message: err.message});
          throw new Error(err);
        }
        commit('successRequestFullMovieInfo', {
          id,
          fullInfo: res
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
    getFilmById: function({fullFilmInfoById}:any):{} {
      return (filmId:number) => _.get(fullFilmInfoById, filmId);
    },
  },
});
