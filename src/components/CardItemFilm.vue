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
  padding: 10px;
  transition: 0.1s;
  flex-direction: column;
  align-items: center;
  background: $color-background-block;
  border-radius: 12px;

  @include small {
    flex-direction: row;
    background: none;

    &:hover {
      transition: 0.1s;
      background: $color-background-block;
    }
  }
}

.img {
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 8px;

  @include small {
    margin-bottom: 0;
    min-width: 120px;
    height: 160px;
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

  @include small {
    margin: 0 !important;
  }
}
</style>
