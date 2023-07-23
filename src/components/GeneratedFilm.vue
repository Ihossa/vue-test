<script setup>
import NothingFound from '../shared/NothingFound.vue'
import CardItemFilm from './CardItemFilm.vue'
import LoadingIcon from "../shared/icons/LoadingIcon.vue";
import {mapState} from "@/store/hooks";

const {films, isLoading, generatedFilms} = mapState()

</script>

<template>
  <NothingFound v-if="!films.length && !isLoading" />
  <div v-if="generatedFilms && !isLoading" class="container">
    <card-item-film :film="generatedFilms" />
  </div>
  <loading-icon v-if="isLoading" />
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
