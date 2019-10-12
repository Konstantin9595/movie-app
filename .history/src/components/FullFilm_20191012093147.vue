<template>
  <div>
    <v-container>
      <v-card v-if="isLoaded" :key="currentFilm.id" class="mx-auto my-12" max-width="80%">
        <iframe
          v-if="currentFilm.video"
          class="mx-auto d-flex justify-content-center"
          width="420"
          height="315"
          :src="currentFilm.video"
        ></iframe>
        <v-img else height="200px" :src="imagePrefix + currentFilm.backdrop_path" />
        <v-card-title>{{ currentFilm.title }}</v-card-title>
        <v-card-text>
          <v-row align="center">
            <v-rating
              :value="currentFilm.vote_average"
              color="amber"
              half-increments
              dense
              size="14"
              readonly
              class="ml-2"
            ></v-rating>
            <div class="grey--text ml-4">{{currentFilm.vote_average}} ({{currentFilm.vote_count}})</div>
          </v-row>
          <v-divider class="mt-3 mb-3"></v-divider>
          <div>{{currentFilm.overview}}</div>
        </v-card-text>
      </v-card>
      <v-card v-else>Не удалось загрузить информацию. Попробуйте позже!</v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
export default {
  data() {
    return {
      isLoaded: false,
      currentFilm: {},
      routeId: parseInt(this.$route.params.id),
      imagePrefix: "https://image.tmdb.org/t/p/w600_and_h900_bestv2",
      defaultImage:
        "http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png"
    };
  },
  methods: {
     getFullMovieInfoAction() {
      this.$store.dispatch("getFullMovieInfoAction", this.routeId);
    },
  },
  created () {
    this.$store.dispatch("getFullMovieInfoAction", this.routeId)
    .then(res => {
        this.currentFilm = res;
        this.isLoaded = !this.isLoaded;
    })
    .catch(err => {
      this.isLoaded = false;
      console.log("Err = ", err);
    });
  },

  computed: mapState(['fullFilmIsLoaded']),
};
</script>

<style scoped>
.devider {
  margin: 10px 0;
}
</style>