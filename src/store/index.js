import { createStore } from 'vuex'
import { parseForFilter } from '../helpers/parseForFilter'
import {randomInteger} from "../helpers/randomInteger";

export const defaultFilter = {
  genre_type: '',
  year: '',
  rating_score: ''
}

export const store = createStore({
  state() {
    return {
      films: [],
      filters: {...defaultFilter},
      appliedFilter: {...defaultFilter},
      optionsForGenre: [],
      optionsForYear: [],
      currentFilm: Object,
      isLoading: false,
      generatedFilms: undefined,
    }
  },

  getters: {
    isChangedFilters(state) {
      return JSON.stringify(state.filters) !== JSON.stringify(state.appliedFilter)
    },
  },

  mutations: {
    setFilter(state, payload) {
      const newFilter = {...state.filters}
      newFilter[payload.type] = payload.value;
      state.filters = newFilter;
    },

    generatedFilm(state) {
      state.generatedFilms = state.films[randomInteger(0, state.films.length - 1)];
    },

    generatedFilmDebounce(state) {
      state.isLoading = true;
      setTimeout(() => {
        state.generatedFilms = state.films[randomInteger(0, state.films.length - 1)];
        state.isLoading = false;
      }, 2000)
    },

    setCurrentFilmById(state, payload) {
      state.currentFilm = state.films.find((film) => String(film.id) === String(payload))
    },

    setOptionsForGenre(state, payload) {
      state.optionsForGenre = payload
    },

    setOptionsForYear(state, payload) {
      state.optionsForYear = payload
    },

    setFilms(state, films) {
      state.films = films
    },

    setAppliedFilter(state) {
      state.appliedFilter = { ...state.filters }
    },

    setLoading(state, payload) {
      state.isLoading = payload
    }
  },

  actions: {

    async fetchFilms() {
      try {
        return await fetch('/movies_list.json').then((data) => data.json())
      } catch(err) {
        console.error(err)
      }
    },

    async fetchFilmsAndSetCurrent({dispatch, commit}, idFilm) {
      try {
        commit('setLoading', true)
        const listFilms = await dispatch('fetchFilms')
        commit('setFilms', listFilms)
        commit('setCurrentFilmById', idFilm)
      } catch (err){
        console.log(err)
      } finally {
        commit('setLoading', false)
      }
    },

    async fetchFilmsWithFilter({ commit, dispatch}) {
      try {
        commit('setLoading', true)
        const listFilms = await dispatch('fetchFilms')
        let { listGenre, listYear } = parseForFilter(listFilms)
        commit('setFilms', listFilms)
        commit('generatedFilm')
        commit('setOptionsForGenre', listGenre);
        commit('setOptionsForYear', Array.from(listYear.values()).sort((a, b) => b - a))
      } catch (err){
        console.log(err)
      } finally {
        commit('setLoading', false)
      }
    },


    async applyFilter({ state, commit, dispatch }) {
      try {
        commit('setLoading', true)
        let listFilms = await dispatch('fetchFilms')
        Object.keys(state.filters).forEach((filterItemKey) => {
          if (
            state.filters[filterItemKey]
          ) {
            listFilms = listFilms.filter((filterItem) => {
              return String(filterItem[filterItemKey]) === String(state.filters[filterItemKey])
            })
          }
        })
        commit('setFilms', listFilms)
        commit('setAppliedFilter')
        commit('generatedFilm')
      } catch (err){
        console.error(err)
      } finally {
        commit('setLoading', false)
      }
    }
  }
})
