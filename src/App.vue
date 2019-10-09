<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item v-for="link in links" :key="link.id">
          <v-list-item-action>
            <v-icon> {{ mdiMovieOpen }} </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-btn text small :href="link.href">{{ link.label }}</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="app-name">
          Application
        </router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
      >
      <template>
        <v-container fluid>
          <v-row class="height">
            <v-col
              v-for="film in films"
              :key="film.id"
              xs="12"
              sm="6"
              md="4"
            >
              <v-card
                class="pa-2"
                outlined
                tile
              >
            <v-img height="200px" :src="film.src" /> 
            <v-card-title>{{ film.title }}</v-card-title>
            <v-card-text class="crop">{{ film.desc }}</v-card-text>
            <v-card-actions>
              <v-btn text to="/full-film">Подробнее...</v-btn>
            </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Counter from './components/Counter.vue';
import 'vue-material-design-icons/styles.css';
import { mdiMovieOpen } from '@mdi/js';

export default Vue.extend({
  name: 'App',
  components: {
    Counter,
  },
  data: () => ({
    drawer: true,
    mdiMovieOpen,
    links: [
      { id: 1, label: "Фильмы",  href: "/films" },
      { id: 2, label: "Сериалы", href: "/series" },
      { id: 3, label: "Мультфильмы", href: "/multfilms" }
    ],
    films: [
      {id: 1, title: "Великий уравнитель", desc: "Описание фильма великий уравнитель", src: "https://picsum.photos/200/300"},
      {id: 2, title: "Великий уравнитель", desc: "Описание фильмы великий уравнитель", src: "https://picsum.photos/id/237/200/300"},
      {id: 3, title: "Великий уравнитель", desc: "Описание фильмы великий уравнитель", src: "https://picsum.photos/id/237/200/300"},
    ],
  }),

});
</script>


<style scoped>

.app-name {
  cursor: pointer;
}

.crop {

}

.height {
  height: 100%;
}

</style>