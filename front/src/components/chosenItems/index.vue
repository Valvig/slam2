<template>
  <div :class="'chosenItemsContainer ' + isActive()">
    <div class="textChosen"><font-awesome-icon icon="box-open" /> My items</div>
    <div class="imgContainer items">
      <div
        class="chosenItem"
        v-for="item in this.$store.state.items"
        :key="item.iditems+'_'+getRandomNumber()"
      >
        <img class="cross" v-on:click="deleteItem(item)" src="@/assets/cross.svg" alt="delete item" />
        <img class="itemImg" :src="getImgUrlItems(item.id)" v-bind:alt="item.name" />
      </div>
      <div
        class="chosenFullItem"
        v-for="item in this.$store.state.fullItems"
        :key="item.iditems+'_'+getRandomNumber()"
      >
        <img
          class="cross"
          v-on:click="deleteFullItem(item)"
          src="@/assets/cross.svg"
          alt="delete item"
        />
        <img class="itemImg" :src="getImgUrlItems(item.id)" v-bind:alt="item.name" />
      </div>
    </div>

    <div class="imgContainer champs">
      <div
        class="chosenItem"
        v-for="champ in this.$store.state.champWithItem"
        :key="champ.id+'_'+getRandomNumber()"
      >
        <selectedChamp :champion="champ" />
      </div>
    </div>
  </div>
</template>

<script>
import selectedChamp from "@/components/selectedChamp";

export default {
  name: "chosen-items",
  components: {
    selectedChamp
  },
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
      var payload = { item: fullItem, deleteToAddToChamp: false };

      this.$store.commit("deleteFullItem", payload);
    },
    getRandomNumber() {
      return Math.floor(Math.random() * 1000);
    },
    isActive() {
      if (this.$store.state.items.length > 0 || this.$store.state.champWithItem.length > 0 || this.$store.state.fullItems.length > 0) {
        return "active"
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$heightItem: 75px;

.chosenItemsContainer {
  display: flex;
  flex-wrap: wrap;
  opacity: 0;
  height: 0;
  transition: opacity 0.3s, height 0.3s 0.1s;
}

.active{
  opacity: 1;
  height: fit-content;
  transition: opacity 0.3s, height 0.3s 0.1s;
}

.imgContainer {
  display: flex;
  flex-wrap: wrap;
  min-height: inherit;
}

.items,
.champs {
  width: 50%;
  min-width: 50%;
}

.chosenItem,
.chosenFullItem {
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
