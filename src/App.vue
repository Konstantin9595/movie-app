<template>
  <v-app id='inspire'>
    <v-navigation-drawer v-model='drawer' app clipped>
      <ListMenu :listMenu='getMenu' />
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop='drawer = !drawer'></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to='/' tag='span' class='app-name'>MovieApp</router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <template>
          <v-container fluid>
            <router-view name='films' :films='films' :isLoaded='isLoaded' :category='category' :moreContent='moreContent'></router-view>
            <router-view name='counter'></router-view>
            <router-view name='full'></router-view>
          </v-container>
        </template>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang='ts'>
import Counter from './components/Counter.vue';
import ListFilms from './components/ListFilms.vue';
import ListMenu from './components/ListMenu.vue';
import 'vue-material-design-icons/styles.css';
import { Component, Vue } from 'vue-property-decorator';

export default Vue.extend({
  name: 'App',
  components: {
    Counter,
    ListFilms,
    ListMenu,
  },
  data: () => ({
    drawer: true,
    page: 1,
    isLoaded: false,
    films: null,
    category: 'film',
    currentPath: '/',
  }),
  computed: {
    getMenu() {
      return this.$store.getters.getMenu;
    },
  },
  created() {
    const {category}: any = this.$route.params;
    this.routeMatching(category);
  },
  methods: {
    moreContent() {
      this.isLoaded = !this.isLoaded;
      this.page++;
      const {category} = this.$route.params;
      this.routeMatching(category);

    },
    getFilms() {
      this.$store.dispatch('getPopularMoviesAction', this.page).then((res) => {
        this.films = res.results;
        this.isLoaded = !this.isLoaded;
      }).catch((err) => console.log(err));
    },

    getTv() {
      this.$store.dispatch('getPopularTvAction', this.page).then((res) => {
        this.films = res.results;
        this.isLoaded = !this.isLoaded;
      }).catch((err) => console.log(err));
    },
    routeMatching(path: string) {
      const currentPath = (typeof path === 'string' && path !== '/' ? path.replace('/', '') : '');
      switch (currentPath) {
        case 'films':
          this.category = currentPath;
          this.getFilms();
          break;
        case 'tv':
          this.category = currentPath;
          this.getTv();
          break;
        default:
          this.category = 'films';
          this.getFilms();
          break;
      }
    },
  },
  watch: {
    $route(to, from) {
      this.isLoaded = !this.isLoaded;
      this.routeMatching(to.path);
    },
  },
});
</script>


<style scoped>
.app-name {
  cursor: pointer;
}
</style>