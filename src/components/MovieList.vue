<script setup>
import { useStore } from 'vuex'
import NothingFound from '../shared/NothingFound.vue'
import CardItemFilm from './CardItemFilm.vue'
import LoadingIcon from "../shared/icons/LoadingIcon.vue";

const store = useStore()

</script>

<template>
  <NothingFound v-show="!store.state.films.length && !store.state.isLoading" />
  <div v-show="!!store.state.films.length && !store.state.isLoading" class="container">
    <card-item-film v-for="film in store.state.films" :key="film" :film="film" />
  </div>
  <loading-icon v-if="store.state.isLoading" />
</template>

<style scoped lang="scss">
@import '../assets/styles/variable';

.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 25px;
  position: relative;
  margin-left: 70px;
}

.icon{
  margin: auto;
  width: 40px;
  height: 40px;
}

</style>
