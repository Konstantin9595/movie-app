<template>
  <div>
    <v-container>
      <v-card v-for="film in currentFilm" :key="film.filmId" class="mx-auto my-12" max-width="80%">
        <v-img height="250" :src="film.video"></v-img>

        <v-card-title>{{ film.title }}</v-card-title>
        <v-card-text>
          <v-row align="center">
            <v-rating
              :value="4.5"
              color="amber"
              half-increments
              dense
              size="14"
              readonly
              class="ml-2"
            ></v-rating>
            <div class="grey--text ml-4">{{film.rate}} ({{film.peopleCountRate}})</div>
          </v-row>

          <v-divider class="mt-3 mb-3"></v-divider>

          <div>{{film.fullDesc}}</div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      currentFilm: null
    };
  },
  created() {
    const currentFilmId = parseInt(this.$route.params.id);
    this.currentFilm = this.$store.getters.getFilm(currentFilmId);
  }
};
</script>

<style scoped>
.devider {
  margin: 10px 0;
}
</style>