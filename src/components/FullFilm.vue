<template>
  <div>
    <v-container>
      <v-card v-if="isLoaded" :key="currentFilm.id" class="mx-auto my-12" max-width="80%">
        <iframe
          v-if="trailer"
          class="mx-auto d-flex justify-content-center"
          width="420"
          height="315"
          :src="videoPrefix + trailer"
        ></iframe>
        <v-img v-else height="200px" :src="imagePrefix + currentFilm.backdrop_path" />
        <v-card-title>{{ currentFilm.title || currentFilm.name }}</v-card-title>
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
      <v-card v-else>Идет загрузка...</v-card>
    </v-container>
  </div>
</template>

<script lang='ts'>
import { mapState } from "vuex";
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class FullFilm extends Vue {
  data() {
    return {
      trailer: '',
      videoPrefix: 'https://www.youtube.com/embed/',
      isLoaded: false,
      currentFilm: {},
      routeCategory: this.$route.params.category,
      routeId: parseInt(this.$route.params.id, 10),
      imagePrefix: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2',
      defaultImage:
        'http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png',
    }
  }

  getFilmInfo() {
    this.$store
      .dispatch("getFullMovieInfoAction", this.routeId)
      .then((res: any) => {
        this.currentFilm = res;
        this.isLoaded = !this.isLoaded;
      })
      .catch((err: any) => {
        this.isLoaded = false;
        throw new Error(err);
      });
    this.$store
      .dispatch("getFilmTrailersAction", this.routeId)
      .then((res: any) => (this.trailer = res.source))
      .catch(err => {
        throw new Error(err);
      });
  }
  getTvInfo() {
    this.$store
      .dispatch("getFullTvInfoAction", this.routeId)
      .then((res: any) => {
        this.currentFilm = res;
        this.isLoaded = !this.isLoaded;
      })
      .catch((err: any) => {
        this.isLoaded = false;
        throw new Error(err);
      });
  }
  matchCategory(category: any) {
    switch (category) {
      case "tv":
        this.getTvInfo();
        break;
      case "films":
        this.getFilmInfo();
        break;
      default:
        this.getFilmInfo();
        break;
    }
  }

  created() {
    const {category}: any = this.$route.params;
    this.matchCategory(category);
  }

}

// ------------------------------------------
</script>

<style scoped>
.devider {
  margin: 10px 0;
}
</style>