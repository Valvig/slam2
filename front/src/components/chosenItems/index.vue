<template>
  <div class="chosenItemsContainer">
    <div class="textChosen">
      My items
    </div>
    <div class="imgContainer items">
      <div class="chosenItem" v-for="item in this.$store.state.items" :key="item.iditems">
        <img class="cross" v-on:click="deleteItem(item)" src="@/assets/cross.svg" alt="delete item">
        <img
          class="itemImg"
          :src="getImgUrlItems(item.iditems)" v-bind:alt="item.name"
        >
      </div>
    </div>

    <div class="imgContainer fullItems">
      <div class="chosenItem" v-for="fullItem in this.$store.state.fullItems" :key="fullItem.id">
        <img class="cross" v-on:click="deleteFullItem(fullItem)" src="@/assets/cross.svg" alt="delete item">
        <img
          class="itemImg"
          :src="getImgUrlItems(fullItem.iditems)" v-bind:alt="fullItem.name"
        >
      </div>
    </div>
  </div>
    
</template>

<script>

export default {
  name: 'chosen-items',
  methods : {
    getImgUrlItems (id) {
      console.log("ID = " + id)
      var normalizedName = ""

      normalizedName = id <= 9 ? id = "0" + id + ".png" : id = id + ".png" 

      return require('@/assets/set3EN/items/' + normalizedName)
    },
    deleteItem(item){
      this.$store.commit('deleteItem', item)
    },
    deleteFullItem(fullItem){
      this.$store.commit('deleteFullItem', fullItem)
    }
  }
}
</script>

<style lang="scss" scoped>
  $heightItem:80px;

  .imgContainer {
    display: flex;
    flex-wrap: wrap;
  }

  .items,
  .fullItems {
    width: 50%;
  }

  .chosenItem {
    position: relative;
    height: $heightItem;
    width: $heightItem;
    margin: 5px;
  }

  .itemImg{
    height: 100%;
    width: 100%;
    border-radius: 15px;
    height: 75px;
  }

  .cross {
    position: absolute;
    top:-12%;
    right:-12%;
    height: 25%;
    width: 25%;
    background: white;
    border-radius: 500px;
  }

  .textChosen {
    height: fit-content;
    width: 100%;
    font-weight: bold;
    font-size: 2em;
  }
</style>
