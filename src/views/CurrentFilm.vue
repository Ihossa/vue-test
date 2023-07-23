<script setup>

import { onMounted } from 'vue'
import CardFilmDetail from '../components/CardFilmDetail.vue'
import NavigationBackIcon from '../shared/icons/NavigationBackIcon.vue'
import LoadingIcon from "../shared/icons/LoadingIcon.vue";
import {mapState, mapActions, mapMutations} from "@/store/hooks";
import {useRoute} from "vue-router";

const {films, currentFilm} = mapState();
const {setCurrentFilmById} = mapMutations()
const {fetchFilmsAndSetCurrent} = mapActions();
const route = useRoute();


onMounted(async () => {
  if(!films?.length){
    await fetchFilmsAndSetCurrent(route.params.id)
  } else {
    await setCurrentFilmById(route.params.id)
  }
})

</script>

<template>
  <div v-if="currentFilm" class="container">
    <router-link class="navLink" to="/">
      <navigation-back-icon class="icon" />
      Назад
    </router-link>
    <card-film-detail :film="currentFilm"/>
  </div>
  <loading-icon v-if="!currentFilm" />
</template>

<style scoped lang="scss">
@import '../assets/styles/variable';
@import '../assets/styles/media';

.container {
  max-width: 600px;
  margin: 15px;

  @include small {
    margin: 15px auto;
  }
}

.icon {
  max-width: 18px;
  max-height: 18px;
  color: white;
}

.navLink {
  text-decoration: none;
  color: white;
  margin: 18px 0;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 400;
}
</style>
