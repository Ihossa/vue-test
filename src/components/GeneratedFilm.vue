<script setup>
import { useStore } from 'vuex'
import NothingFound from '../shared/NothingFound.vue'
import CardItemFilm from './CardItemFilm.vue'
import LoadingIcon from "../shared/icons/LoadingIcon.vue";

const store = useStore()

</script>

<template>
  <NothingFound v-if="!store.state.films.length && !store.state.isLoading" />
  <div v-if="store.state.generatedFilms && !store.state.isLoading" class="container">
    <card-item-film :film="store.state.generatedFilms" />
  </div>
  <loading-icon v-if="store.state.isLoading" />
</template>

<style scoped lang="scss">
@import '../assets/styles/variable';
@import '../assets/styles/media';

.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  position: relative;

  @include large{
    margin-left: 70px;
    padding: 24px;
  }
}

.icon{
  margin: auto;
  width: 40px;
  height: 40px;
}

</style>
