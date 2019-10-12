import Vue from 'vue';
import Vuex, {mapState} from 'vuex';
import { api } from './services/movieApi'
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fullFilmIsLoaded: false,
    page: 0,
    films: [],
    menu: [
      { id: 1, label: "Фильмы",  href: "/films" },
      { id: 2, label: "Сериалы", href: "/series" },
    ],
    fullFilmInfoById: {
      id: null,
      fullInfo: null,
      isLoaded: false
    },
    apiResponse: {status: null, message: null},
  },
  mutations: {
    requestRemoteApi() {
      //console.log('requestRemoteApi');
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
    successRequestFullMovieInfo(state, {id, fullInfo, isLoaded}) {
      const newState = { id, fullInfo, isLoaded };
      state.fullFilmInfoById = {
        ...newState
      };
      state.fullFilmIsLoaded = true;
    },
  },
  actions: {
    getPopularMoviesAction({state, commit}:any, page = 1) {
      return new Promise((resolve, reject) => {
        commit('requestRemoteApi');
        api.miscPopularMovies({page}, (err:any, res:any) => {
          if (err) {
            commit('successRequestPopularMovie', {status: err.status, message: err.message});
            throw new Error(err);
          }
          commit('successRequestPopularMovie', {
            films: res.results,
            page,
          });

          resolve(res);
        });
      })
    },
    getFullMovieInfoAction({state, commit}:any, id:number)  {
        return new Promise((resolve, reject) => {
          commit('requestRemoteApi');
          api.movieInfo({id}, (err:any, res:any) => {
            if (err) {
              commit('errorRequestRemoteApi', {status: err.status, message: err.message});
              reject(err);
            }
            
            commit('successRequestFullMovieInfo', {
              id,
              fullInfo: res,
              isLoaded: true,
            });

            resolve(res);
        })
        
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
      return (filmId:number) => fullFilmInfoById.id === filmId ? fullFilmInfoById : {id: 0};
    },
  },
});
