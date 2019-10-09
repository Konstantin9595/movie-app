<template>
  <div>
    <v-row>
      <v-col v-for="film in films" :key="film.id" xs="12" sm="6" md="4">
        <v-card class="pa-2" outlined tile>
          <v-img height="200px" :src="film.src" />
          <v-card-title>{{ film.title }}</v-card-title>
          <v-card-text class="crop">{{ film.desc }}</v-card-text>
          <v-card-actions>
            <v-btn text to="/full-film">Подробнее...</v-btn>
          </v-card-actions>
          
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export default {
    props: {
        films: Array
    },
}

</script> 

<style scoped>

</style>