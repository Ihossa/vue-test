<script setup>
import { useStore } from 'vuex'
import ButtonMain from '../shared/ButtonMain.vue'
import BtnMenu from '../shared/BtnMenu.vue'
import { ref } from 'vue'

const store = useStore()

let isOpenMenu = ref(false)

const chooseGenre = (value) => {
  store.commit('setFilter', { type: 'genre_type', value: value })
}

const chooseYear = (value) => {
  store.commit('setFilter', { type: 'year', value: value })
}

const chooseRate = (value) => {
  store.commit('setFilter', { type: 'rating_score', value: value })
}

const applyFilter = () => {
  store.dispatch('applyFilter')
}

const changeVisible = () => {
  isOpenMenu.value = !isOpenMenu.value
}
</script>

<template>
  <div class="sideBar">
    <btn-menu class="burger" :open-menu="isOpenMenu" @onClick="changeVisible" />
    <el-form label-width="120px" label-position="left" :class="isOpenMenu ? 'form' : 'form-hidden'">
      <el-form-item class="label" label="Жанр">
        <el-select
          class="select"
          @update:modelValue="chooseGenre"
          :model-value="store.state.filters.genre_type"
          placeholder="Виберіть жанр"
          clearable
        >
          <el-option
            text-color="green"
            class="item-select"
            v-for="genre in store.state.optionsForGenre"
            :key="genre"
            :label="genre.charAt(0).toUpperCase() + genre.slice(1)"
            :value="genre"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="label" label="Рік випуску">
        <el-select
          class="select"
          @update:modelValue="chooseYear"
          :model-value="store.state.filters.year"
          placeholder="Виберіть рік випуску"
          clearable
        >
          <el-option
            v-for="year in store.state.optionsForYear"
            :key="year"
            :label="year"
            :value="year"
            class="option"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="label" label="Рейтинг">
        <el-input :model-value="store.state.filters.rating_score" @input="chooseRate" />
      </el-form-item>
      <button-main
        :disable="!store.getters.isChangedFilters"
        label="Застосувати фільтр"
        @onClick="applyFilter"
      />
    </el-form>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/variable.scss';
@import '../assets/styles/media.scss';

.sideBar {
  background: $color-background-menu;
  padding: 20px 25px;
  min-height: 100dvh;
  position: fixed;
  z-index: 100;

  @include large {
    width: 400px;
    min-width: 320px;
    position: relative;
    background: $color-background-block;
  }
}

.burger {
  display: block;

  @include large {
    display: none;
  }
}

.form {
  margin-top: 50px;

  @include large {
    margin: 0;
  }
}

.option{
  text-transform: capitalize;
}

.form-hidden {
  display: none;

  @include large {
    display: block;
  }
}

.label {
  font-size: 20px;
  font-weight: 500;
}

.select {
  width: 100%;
}
</style>
