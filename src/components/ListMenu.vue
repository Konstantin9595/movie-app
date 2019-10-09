<template>
  <div>
      <v-list dense>
        <v-list-item v-for="item in listMenu" :key="item.id">
          <v-list-item-action>
            <v-icon> {{ mdiMovieOpen }} </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-btn text small :href="item.href">{{ item.label }}</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mdiMovieOpen } from '@mdi/js';

export default {
    props: {
        listMenu: Array
    },

    data: function() {
      return {
        mdiMovieOpen
      }
    }
}

</script> 

<style scoped>

</style>