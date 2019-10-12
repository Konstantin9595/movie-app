<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
    <ListMenu :listMenu="getMenu" />
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="app-name">
          MovieApp
        </router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
      >
      <template>
        <v-container fluid>
          <router-view name="home"  :films="films" :isLoaded="isLoaded"></router-view>
          <router-view name="counter"></router-view>
          <router-view name="full"></router-view>
        </v-container>
      </template>
      </v-container>
      <div class="my-2">
        <v-btn loading small color="primary" @click="moreContent(page)">Primary</v-btn>
      </div>
      <!-- <input type="submit" value="more..." > -->
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">

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
  }),
  computed: {
    // getFilms: function() {
    //   return this.$store.getters.getFilms;
    // },
    getMenu: function() {
      return this.$store.getters.getMenu;
    },
  },
  created() {
    this.$store.dispatch('getPopularMoviesAction', this.page).then(res => {
      this.films = res.results;
      this.isLoaded = !this.isLoaded;
    });
  },
  methods: {
    moreContent() {
      this.isLoaded = false;
      this.page++;
      this.$store.dispatch('getPopularMoviesAction', this.page).then(res => {
        this.films = res.results;
        this.isLoaded = !this.isLoaded;
      });
    },
  },
});
</script>


<style scoped>

.app-name {
  cursor: pointer;
}

</style>