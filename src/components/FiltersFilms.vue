<script setup>
import ButtonMain from '../shared/ButtonMain.vue'
import {mapActions, mapGetters, mapMutations, mapState} from "@/store/hooks";

const {filters, isLoading, optionsForGenre, optionsForYear} = mapState()
const {isChangedFilters} = mapGetters()
const {setFilter, generatedFilmDebounce} = mapMutations()
const {applyFilter} = mapActions()

const generateFilm = () => {
  console.log(isChangedFilters)

  if(isChangedFilters){
    applyFilter()
    return;
  }
  generatedFilmDebounce();
}

</script>

<template>
  <div class="sideBar">
    <el-form label-width="120px" label-position="left">
      <el-form-item class="label" label="Жанр">
        <el-select
          class="select"
          @update:modelValue="(genre) => {setFilter({ type: 'genre_type', value: genre })}"
          :model-value="filters.genre_type"
          placeholder="Виберіть жанр"
          clearable
        >
          <el-option
            text-color="green"
            class="item-select"
            v-for="genre in optionsForGenre"
            :key="genre"
            :label="genre.charAt(0).toUpperCase() + genre.slice(1)"
            :value="genre"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="label" label="Рік випуску">
        <el-select
          class="select"
          @update:modelValue="(year) => {setFilter({ type: 'year', value: year })}"
          :model-value="filters.year"
          placeholder="Виберіть рік випуску"
          clearable
        >
          <el-option
            v-for="year in optionsForYear"
            :key="year"
            :label="year"
            :value="year"
            class="option"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="label" label="Рейтинг">
        <el-input :model-value="filters.rating_score" @input="(value) => setFilter({ type: 'rating_score', value: value })" />
      </el-form-item>
      <button-main
        :disable="isLoading"
        :label="isLoading? 'Генеруємоє...' : 'Генерувати'"
        @onClick="generateFilm"
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
