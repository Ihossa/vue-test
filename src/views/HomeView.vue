<script setup>
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import FiltersFilms from '../components/FiltersFilms.vue'
import MovieList from '../components/MovieList.vue'

const store = useStore()

onMounted(() => {
  store.dispatch('fetchFilms')
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
