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
  margin: 0;
}

.img {
  max-width: 100px;
}
</style>
