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
      { id: 2, label: "Сериалы", href: "/tv" },
    ],
    fullFilmInfoById: {
      id: null,
      fullInfo: null,
      isLoaded: false
    },
    trailrFilmById: {},
    tvFilmById: {},
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
    getPopularMoviesAction({commit}:any, page = 1) {
      return new Promise((resolve, reject) => {
        commit('requestRemoteApi');
        api.miscPopularMovies({page}, (err:any, res:any) => {
          if (err) {
            commit('errorRequestRemoteApi', {status: err.status, message: err.message});
            reject(err);
          }
          commit('successRequestPopularMovie', {
            films: res.results,
            page,
          });

          resolve(res);
        });
      })
    },
    getFullMovieInfoAction({commit}:any, id:number)  {
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
    },
    getFullTvInfoAction({commit}:any, id:number) {
      return new Promise((resolve, reject) => {
        commit('requestRemoteApi');
        api.tvInfo({id}, (err:any, res:any) => {
          if (err) {
            commit('errorRequestRemoteApi', {status: err.status, message: err.message});
            reject(err);
          }
          resolve(res);
      })
      
    });
    },
    getPopularTvAction({commit}:any, page = 1 ) {
      return new Promise((resolve, reject) => {
        commit('requestRemoteApi');
        api.miscPopularTvs({page}, (err:any, res:any) => {
          if (err) {
            commit('errorRequestRemoteApi', {status: err.status, message: err.message});
            reject(err);
          }
          resolve(res);
        })
      });
    },
    getFilmTrailersAction({commit}, id:number) {
      return new Promise((resolve, reject) => {
        commit('requestRemoteApi');
        api.movieTrailers({id}, (err:any, res:any) => {
          if (err) {
            commit('errorRequestRemoteApi', {status: err.status, message: err.message});
            reject(err);
          }
          resolve(res.youtube[0]);
        });
      });
    },
  //   getTvTrailersAction({commit}, id:number) {
  //     return new Promise((resolve, reject) => {
  //      api.movieTrailers({id}, )
  //     });
  // }
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
