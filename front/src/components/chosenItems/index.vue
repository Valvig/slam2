<template>
  <div class="chosenItemsContainer">
    <div class="textChosen">My items</div>
    <div class="imgContainer items">
      <div
        class="chosenItem"
        v-for="item in this.$store.state.items"
        :key="item.iditems+'_'+getRandomNumber()"
      >
        <img class="cross" v-on:click="deleteItem(item)" src="@/assets/cross.svg" alt="delete item" />
        <img class="itemImg" :src="getImgUrlItems(item.id)" v-bind:alt="item.name" />
      </div>
    </div>

    <div class="imgContainer fullItems">
      <div
        class="chosenItem"
        v-for="fullItem in this.$store.state.fullItems"
        :key="fullItem.id+'_'+getRandomNumber()"
      >
        <img
          class="cross"
          v-on:click="deleteFullItem(fullItem)"
          src="@/assets/cross.svg"
          alt="delete item"
        />
        <img class="itemImg" :src="getImgUrlItems(fullItem.id)" v-bind:alt="fullItem.name" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chosen-items",
  methods: {
    getImgUrlItems(id) {
      var normalizedName = "";

      normalizedName = id <= 9 ? (id = "0" + id + ".png") : (id = id + ".png");

      return require("@/assets/set3update/items/" + normalizedName);
    },
    deleteItem(item) {
      this.$store.commit("deleteItem", item);
    },
    deleteFullItem(fullItem) {
      this.$store.commit("deleteFullItem", fullItem);
    },
    getRandomNumber() {
      return Math.floor(Math.random() * 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
$heightItem: 75px;

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
  margin: 10px;
  background: black;
}

.itemImg {
  height: 100%;
  width: 100%;
}

.cross {
  position: absolute;
  top: -10%;
  right: -10%;
  height: 20%;
  width: 20%;
  background: #ffffffd3;
  border-radius: 500px;
}

.textChosen {
  height: fit-content;
  width: 100%;
  font-weight: bold;
  font-size: 1.5em;
  // background-color: #1a535c;
  background: linear-gradient(#1a535c, #216a75);
  padding-left: 10px;
}
</style>
