import Vuex from 'vuex'
import Vue from 'vue'
import _ from 'lodash'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    championsList: [],
    itemsList: [],
    items: [],
    fullItems: []
  },
  mutations: {
    addItem(state, item) {
      // We need to create a unique ID for each items because items got same IDs
      // Example : First and second BF will have the ID = 1
      // But we need BF #1 and BF #2 to only delete the one we want to delete

      // First we get the most higher uniqueID

      var tempId = 0

      for (let index = 0; index < state.items.length; index++) {
        const element = state.items[index]
        if (element.uniqueId > tempId) {
          tempId = element.uniqueId
        }
      }

      item.uniqueId = tempId + 1
      state.items.push(Object.assign({}, item))
    },
    addFullItem(state, fullItem) {
      // We need to create a unique ID for each items because items got same IDs
      // Example : First and second BF will have the ID = 1
      // But we need BF #1 and BF #2 to only delete the one we want to delete

      // First we get the most higher uniqueID

      var tempId = 0

      for (let index = 0; index < state.fullItems.length; index++) {
        const element = state.fullItems[index]
        if (element.uniqueId > tempId) {
          tempId = element.uniqueId
        }
      }

      fullItem.uniqueId = tempId + 1
      state.fullItems.push(Object.assign({}, fullItem))
    },
    deleteItem(state, item) {
      if (state.items.Length !== -1) {
        for (let index = 0; index < state.items.length; index++) {
          const element = state.items[index]

          if (element.uniqueId == item.uniqueId) {
            if (state.items.length === 1) {
              state.items = []
            } else {
              state.items = _.reject(state.items, function (el) {
                return el.uniqueId === element.uniqueId
              })
            }
            break
          }
        }
      }
    },
    deleteFullItem(state, fullItem) {
      if (state.fullItems.Length !== -1) {
        for (let index = 0; index < state.fullItems.length; index++) {
          const element = state.fullItems[index]

          if (element.uniqueId == fullItem.uniqueId) {
            if (state.fullItems.length === 1) {
              state.fullItems = []
            } else {
              state.fullItems = _.reject(state.fullItems, function (el) {
                return el.uniqueId === element.uniqueId
              })
            }
            break
          }
        }
      }
    }
  },
  getters: {
    getItems: state => {
      return state.items
    },
    getFullItems: state => {
      return state.fullItems
    }
  }
})