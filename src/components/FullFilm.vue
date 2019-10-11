<template>
  <div>
    <v-container>
      <input type="submit" value="GGG" id="" @click="g">
      <v-card v-if="currentFilm" :key="currentFilm.id" class="mx-auto my-12" max-width="80%">
      <iframe v-if="currentFilm.video" class="mx-auto d-flex justify-content-center" width="420" height="315" :src="currentFilm.video"></iframe>
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
      <v-card else>Не удалось загрузить информацию. Попробуйте позже!</v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      currentFilm: null,
      imagePrefix: "https://image.tmdb.org/t/p/w600_and_h900_bestv2",
      defaultImage: "http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png"
    };
  },
  methods: {
    g() {
        const currentFilmId = parseInt(this.$route.params.id);
        console.log("ROUTE PARAMSE = ", currentFilmId);
        this.currentFilm = this.$store.getters.getFilmById(currentFilmId);
    }
    // const currentFilmId = parseInt(this.$route.params.id);
    // this.currentFilm = this.$store.getters.getFilm(currentFilmId);
  }
};
</script>

<style scoped>
.devider {
  margin: 10px 0;
}
</style>