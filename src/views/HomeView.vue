<script setup>
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import FiltersFilms from '../components/FiltersFilms.vue'
import MovieList from '../components/MovieList.vue'
import {defaultFilter} from "../store";

const store = useStore()

onMounted(() => {
  if(JSON.stringify(store.state.filters) !== JSON.stringify(defaultFilter)){
    store.dispatch('applyFilter')
  } else {
    store.dispatch('fetchFilms')
  }
})
</script>

<template>
  <div class="container">
    <filters-films />
    <movie-list />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
