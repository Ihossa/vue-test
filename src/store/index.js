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
      isLoading: false,
      generatedFilms: undefined,
    }
  },

  getters: {
    isChangedFilters(state) {
      return JSON.stringify(state.filters) !== JSON.stringify(state.appliedFilter)
    },

    isDefaultFilter(state) {
      return JSON.stringify(state.filters) === JSON.stringify(defaultFilter)
    }
  },

  mutations: {
    setFilter(state, payload) {
      state.filters[payload.type] = payload.value
    },

    generatedFilm(state) {
      state.generatedFilms = state.films[randomInteger(0, state.films.length - 1)];
    },

    generatedFilmDebounce(state) {
      state.isLoading = true;
      setTimeout(() => {
        state.generatedFilms = state.films[randomInteger(0, state.films.length - 1)];
        state.isLoading = false;
      }, 1000)
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
    fetchFilms({ commit }) {
      commit('setLoading', true)
      fetch('/movies_list.json')
        .then((data) =>
          data.json().then((data) => {
            commit('setFilms', data)
            let { listGenre, listYear } = parseForFilter(data)
            commit('generatedFilm')
            commit('setOptionsForGenre', listGenre)
            commit('setOptionsForYear', Array.from(listYear.values()).sort((a, b) => b - a))
          })
        )
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },

    async applyFilter({ state, commit }) {
      commit('setLoading', true)

      try {
        let data = await fetch('/movies_list.json').then((data) => {
          return data.json()
        })
        Object.keys(state.filters).forEach((filterItemKey) => {
          if (
            state.filters[filterItemKey]
          ) {
            data = data.filter((filterItem) => {
              return String(filterItem[filterItemKey]) === String(state.filters[filterItemKey])
            })
          }
        })
        commit('setFilms', data)
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
