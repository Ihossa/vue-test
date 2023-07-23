<script setup>
import {mapState, mapActions} from "@/store/hooks";
import { onMounted } from 'vue'
import FiltersFilms from '../components/FiltersFilms.vue'
import GeneratedFilm from "../components/GeneratedFilm.vue";

const {generatedFilms} = mapState()
const {fetchFilmsWithFilter} = mapActions()

onMounted( () => {
  if(!generatedFilms.value){
    fetchFilmsWithFilter()
  }
})

</script>

<template>
  <div class="container">
    <filters-films />
    <generated-film />
  </div>
</template>

<style scoped lang="scss">
  @import '../assets/styles/variable.scss';
  @import '../assets/styles/media.scss';

  .container {
    margin: 12px;
    border-radius: 12px;
    display: flex;
    background: $color-background-block;
    flex-direction: column;
    align-items: center;
    min-height: 260px;

    @include medium{
      flex-direction: row;
      margin: 8px;
    }

    @include large{
      margin: 24px;
    }
  }
</style>
