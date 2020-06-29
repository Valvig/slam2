<template>
  <div>
    <div class="text">Select item</div>
    <div class="itemsContainer">
      <div class="item" v-for="item in items" :key="item.iditems">
        <img
          v-on:click="selectItem(item)"
          :src="getImgUrlItems(item.id)"
          v-bind:alt="item.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "items-to-choosecard",
  data() {
    return {
      items: []
    };
  },
  methods: {
    getImgUrlItems(id) {
      var normalizedName = "";

      normalizedName = id <= 9 ? "0" + id + ".png" : id + ".png";

      return require("@/assets/set3update/items/" + normalizedName);
    },
    // Get the first 9 items
    getSmallItems() {
      var that = this;

      for (let i = 0; i < this.$store.state.itemsList.length; i++) {
        let value = this.$store.state.itemsList[i].id;
        if (
          value == 1 ||
          value == 2 ||
          value == 3 ||
          value == 4 ||
          value == 5 ||
          value == 6 ||
          value == 7 ||
          value == 8 ||
          value == 9
        ) {
          that.items.push(this.$store.state.itemsList[i]);
        }
      }
    },
    selectItem(item) {
      this.$store.commit("addItem", item);
    }
  },
  created() {
    this.getSmallItems();
  }
};
</script>

<style lang="scss" scoped>
.item {
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;

  img {
    border-radius: 15px;
    height: 75px;
  }
}

.itemsContainer {
  height: 80%;
  width: 80%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.text {
  position: absolute;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 2em;
  height: 10%;
}
</style>
