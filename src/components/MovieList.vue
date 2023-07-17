<script setup>
import {useStore} from "vuex";
import NothingFound from "./NothingFound.vue";
import CardItemFilm from "./CardItemFilm.vue";

const store = useStore()

</script>

<template>
  <NothingFound v-show="!store.state.films.length" />
  <div v-show="!!store.state.films.length" class="container">
    <card-item-film v-for="film in store.state.films" :key="film" :film="film" />
  </div>
</template>

<style scoped lang="scss">
  @import "../assets/styles/variable";
  .container{
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 25px;
    position: relative;
    margin-left: 70px;
  }

</style>