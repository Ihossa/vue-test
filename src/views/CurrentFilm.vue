<script setup>
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import CardFilmDetail from '../components/CardFilmDetail.vue'
import NavigationBackIcon from '../shared/icons/NavigationBackIcon.vue'
import LoadingIcon from "../shared/icons/LoadingIcon.vue";

const store = useStore()

onMounted(() => {
  if (store.state.films.length === 0) {
    store.dispatch('fetchFilms')
  }
})
</script>

<template>
  <div v-if="store.state.films.length !== 0" class="container">
    <router-link class="navLink" to="/">
      <navigation-back-icon class="icon" />
      Назад
    </router-link>
    <card-film-detail />
  </div>
  <loading-icon v-if="store.state.films.length === 0" />
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
