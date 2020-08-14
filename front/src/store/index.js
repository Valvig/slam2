import Vuex from 'vuex'
import Vue from 'vue'
import _ from 'lodash'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    championsList: [],
    itemsList: [],
    items: [],
    fullItems: [],
    champWithItem: [],
    tutorial: true
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
    addChampWithItem(state, champ) {
      var add = true;

      for (let i = 0; i < state.champWithItem.length; i++) {
        const element = state.champWithItem[i];
        if (champ.name == element.name) {
          add = false;
          element.item.push(champ.item[0])
        }
      }

      if (add) {
        state.champWithItem.push(Object.assign({}, champ))
      }
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
      } else {
        state.items = []
      }
    },
    deleteFullItem(state, payload) {
      var that = this

      if (state.fullItems.Length !== -1) {
        for (let index = 0; index < state.fullItems.length; index++) {
          const element = state.fullItems[index]

          if (element.uniqueId == payload.item.uniqueId) {
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


      if (!payload.deleteToAddToChamp == true) {
        // Add items back to list
        that.commit("addItem", payload.item.item1)
        that.commit("addItem", payload.item.item2)
      }
    },
    deleteChampWithItem(state, champ) {
      var that = this
      if (state.champWithItem.Length !== -1) {
        for (let index = 0; index < state.champWithItem.length; index++) {
          const element = state.champWithItem[index]
          if (element.name == champ.name) {
            // Add full items back to list
            for (let j = 0; j < element.item.length; j++) {
              that.commit("addFullItem", element.item[j])
            }

            if (state.champWithItem.length === 1) {
              state.champWithItem = []
            } else {
              state.champWithItem = _.reject(state.champWithItem, function (el) {
                return el.name === element.name
              })
            }
            break
          }
        }
      }
    },
    tutorial(state) {
      state.tutorial = !state.tutorial
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