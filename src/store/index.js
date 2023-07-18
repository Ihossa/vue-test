import { createStore } from 'vuex'
import { parseForFilter } from '../helpers/parseForFilter'

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
      optionsForYear: []
    }
  },

  getters: {
    isChangedFilters(state) {
      return JSON.stringify(state.filters) !== JSON.stringify(state.appliedFilter)
    }
  },

  mutations: {
    setFilter(state, payload) {
      state.filters[payload.type] = payload.value
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
    }
  },

  actions: {
    fetchFilms({ commit }) {
      fetch('/movies_list.json')
        .then((data) =>
          data.json().then((data) => {
            commit('setFilms', data)
            let { listGenre, listYear } = parseForFilter(data)
            commit('setOptionsForGenre', listGenre)
            commit('setOptionsForYear', Array.from(listYear.values()).sort((a, b) => b - a))
          })
        )
        .catch((err) => {
          console.error(err)
        })
    },

    async applyFilter({ state, commit }) {
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
    }
  }
})
