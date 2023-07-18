<script setup>
import ButtonMain from '../shared/ButtonMain.vue'

const props = defineProps({
  film: Object
})
</script>

<template>
  <div class="card">
    <el-image fit="cover" contain class="img" lazy :src="props.film.image_path">
      <template #placeholder>
        <div class="image-slot">Loading<span class="dot">...</span></div>
      </template>
    </el-image>
    <div class="content">
      <div class="info">
        <router-link class="title" :to="'/' + props.film.id">{{ props.film.title }}</router-link>
        <div class="detail">
          <span>{{ props.film.year }}</span>
          <span>рейтинг: {{ props.film.rating_score }}</span>
        </div>
        <div class="description">
          {{ props.film.description }}
        </div>
      </div>
      <button-main
        class="btn"
        label="Подивитись зараз"
        @onClick="
          () => {
            $router.push({ path: `/${props.film.id}` })
          }
        "
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/variable';
@import '../assets/styles/media';

.card {
  display: flex;
  transition: 0.1s;
  flex-direction: column;
  border-radius: 12px;

  @include small {
    flex-direction: row;
    align-items: start;
    background: none;
  }
}

.img {
  border-radius: 12px;
  object-fit: cover;
  min-width: 160px;
  width: fit-content;
  height: 200px;
  margin: 12px auto;

  @include small {
    min-width: 160px;
    height: 200px;
    margin: 0;
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @include small {
    height: 100%;
    margin-left: 16px;
  }
}

.title {
  font-size: 20px;
  color: black;
  text-decoration: none;
}

.detail {
  margin: 8px 0;
  display: flex;
  gap: 8px;
}

.btn {
  margin: 14px auto;
  width: 100%;
}
</style>
