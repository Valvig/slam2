<template>
  <div>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <div class="box" v-bind="attrs" v-on="on">
          <div class="text">
            <font-awesome-icon class icon="hand-pointer" /> Select item
          </div>

          <div class="container">
            <div class="itemsContainer">
              <div
                v-on:click="selectItem(item)"
                class="item center"
                v-for="item in items"
                :key="item.iditems"
              >
                <img :src="getImgUrlItems(item.id)" v-bind:alt="item.name" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <span>Click on an item to add it to your list.</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "items-to-choosecard",
  data() {
    return {
      items: [],
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
    },
  },
  created() {
    this.getSmallItems();
  },
};
</script>

<style lang="scss" scoped>
$cyan: #60daaa;
$blue: #5c80bc;

.item {
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;

  // To avoid blue selection of HTML items
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  background: none;
  border: 0;
  box-sizing: border-box;
  margin: 0.1em;
  padding: 0.1em;

  // Using inset box-shadow instead of border for sizing simplicity
  box-shadow: inset 0 0 0 2px $blue;

  // Required, since we're setting absolute on pseudo-elements
  position: relative;
  vertical-align: middle;

  &::before,
  &::after {
    box-sizing: inherit;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
  }

  img {
    height: 75px;
    background: black;
  }
}

// Does not inherit
.center {
  &:hover {
    color: $cyan;
  }

  // Set up base styles, we're going to scale instead of animating width/height
  &::before,
  &::after {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform-origin: center; // Ensure scaling is done from the center (expands outwards)
  }

  // scale3d(<scale-horizontal>, <scale-vertical>, <scale-depth>);
  &::before {
    border-top: 2px solid $cyan;
    border-bottom: 2px solid $cyan;
    transform: scale3d(0, 1, 1); // Shrink only width
  }

  &::after {
    border-left: 2px solid $cyan;
    border-right: 2px solid $cyan;
    transform: scale3d(1, 0, 1); // Shrink only height
  }

  &:hover::before,
  &:hover::after {
    transform: scale3d(1, 1, 1); // Show full-size
    transition: transform 0.5s;
  }
}

.container {
  height: calc(100% - 36px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.itemsContainer {
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.text {
  width: 100%;
  font-weight: bold;
  font-size: 1.5em;
  // background-color: #1a535c
  background: linear-gradient(#1a535c, #216a75);
  padding-left: 10px;
}

.box {
  height: 100%;
}
</style>
