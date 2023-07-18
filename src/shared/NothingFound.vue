<template>
  <div class="container">
    <h1 class="label">Нічого не знайдено</h1>
    <el-image class="img" src="/notFound.png" />
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/media';

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}

.label{
  font-size: 20px;

  @include medium{
    font-size: 40px;
  }
}

.img {
  max-width: 350px;
}
</style>
