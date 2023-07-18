<script setup>
import { useStore } from 'vuex'
import ButtonMain from '../shared/ButtonMain.vue'

const store = useStore()

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
  if(store.getters.isChangedFilters){
    store.dispatch('applyFilter')
    return;
  }
  store.commit('generatedFilmDebounce')
}

const getButtonLabel = () => {
  if(!store.state.isLoading ) return 'Генерувати'
  if(store.state.isLoading) return 'Генеруємоє...'
}

</script>

<template>
  <div class="sideBar">
    <el-form label-width="120px" label-position="left">
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
        :disable="store.state.isLoading"
        :label="getButtonLabel()"
        @onClick="applyFilter"
      />
    </el-form>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/variable.scss';
@import '../assets/styles/media.scss';

.sideBar {
  padding: 12px;
  width: 320px;
  min-width: 320px;
  position: relative;

  @include large{
    padding: 24px;
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

.label {
  font-size: 20px;
  font-weight: 500;
}

.select {
  width: 100%;
}
</style>
