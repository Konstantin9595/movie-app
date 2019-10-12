<template>
  <div class="counter">
    <h1>Counter: {{ counter }}</h1>
    <h3>Category = {{$route.params.category}}</h3>
    <h3>ID = {{$route.params.id}}</h3>
    <input type="submit" value="add" @click="counter++">
    <input type="submit" value="sub" @click="counter--">
    {{name}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export default {
  // @Prop() private test!: string;

  data: () => {
    return {
      counter: 0,
      name: '',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
