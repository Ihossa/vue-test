<script setup>
  const props = defineProps({
    film: {
      type: Object,
      required: true
    }
  })

</script>

<template>
  <div class="card" v-if="props.film">
    <el-image fit="cover" contain class="img" lazy :src="props.film.image_path">
      <template #placeholder>
        <div class="image-slot">Loading<span class="dot">...</span></div>
      </template>
    </el-image>
    <div class="content">
      <div class="info">
        <span class="title">{{ props.film.title }}</span>
        <div class="detail">
          <span>{{ props.film.year }}</span>
          <span>рейтинг: {{ props.film.rating_score }}</span>
        </div>
        <div class="description">
          {{ props.film.description }}
        </div>
      </div>
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
  justify-content: center;
  background: $color-background-block;
  border-radius: 12px;
}

.img {
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 8px;
  height: 200px;
  width: 133px;

  @include small {
    height: 300px;
    width: 200px;
  }

  @include large {
    height: 400px;
    width: 260px;
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.title {
  font-size: 20px;
  color: black;
  text-decoration: none;
}

.detail {
  margin: 8px 0;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.btn {
  margin: 14px auto;

  @include small {
    margin: 0 !important;
  }
}
</style>
