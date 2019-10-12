<template>
  <div>
    <v-row v-if="isLoaded">
      <v-col  v-for="film in films" :key="film.id" xs="12" sm="6" md="4">
        <v-card class="pa-2" outlined tile >
          <v-img v-if="film.backdrop_path" height="200px" :src="imagePrefix + film.backdrop_path" />
          <v-img v-else height="200px" :src="defaultImage" />
          <v-card-title>{{ film.title }}</v-card-title>
          <v-card-text class="crop">{{ film.overview }}</v-card-text>
          <v-card-actions>
            <router-link :to="'/full-film/'+film.id" tag="span">
              <v-btn text>Подробнее...</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>Не удалось получить данные. Перезагрузите страницу или попробуйте позже!</v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FullFilm from './FullFilm.vue';


export default {
    props: {
      isLoaded: Boolean,
      films: Array,
    },
    data() {
      return {
        imagePrefix: "https://image.tmdb.org/t/p/w600_and_h900_bestv2",
        defaultImage: "http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png",
      }
    },
    mounted() {
      console.log("MOUNTED", this.films)
      // this.$store.dispatch('getPopularMoviesAction', this.page).then(res => {
      //   this.ListFilms = res.results;
      //   this.isLoaded = !this.isLoaded;
      // });
    },
    methods: {
    }
}

</script> 

<style scoped>

</style>