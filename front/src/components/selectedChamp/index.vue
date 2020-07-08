<template>
  <div>
    <div class="possibleChamp">
      <img class="champion" :src="getImgUrlChampion(champion.name)" />
    </div>
    <img
      class="cross"
      v-on:click="deleteChampWithItem(champion)"
      src="@/assets/cross.svg"
      alt="delete champ from list"
    />

    <div class="bestItems">
      <div
        class="itemCol"
        v-for="item in champion.bestItems"
        :key="item.name +'_'+getRandomNumber()"
      >
        <img :class="'item ' + getClassForItemChamp(item)" :src="getImgUrlItems(item.name)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selected-champ",
  props: {
    champion: Object
  },
  data() {
    return {};
  },
  methods: {
    getImgUrlItems(id) {
      var normalizedName = "";

      if (id <= 9) {
        normalizedName = "0" + id + ".png";
      } else {
        normalizedName = id + ".png";
      }

      return require("@/assets/set3update/items/" + normalizedName);
    },
    getImgUrlChampion(name) {
      var normalizedName = name.replace(" ", "");
      normalizedName = normalizedName.replace("'", "");
      normalizedName = normalizedName.toLowerCase();

      // Delete "TFT3_" to the name
      normalizedName = normalizedName.substr(5);

      // Add PNG extension to get the file
      normalizedName = normalizedName + ".png";

      return require("@/assets/set3update/champions/" + normalizedName);
    },
    getRandomNumber() {
      return Math.floor(Math.random() * 1000);
    },
    deleteChampWithItem(champion) {
      this.$store.commit("deleteChampWithItem", champion);
    },
    getClassForItemChamp(item) {
      console.log("item = " + JSON.stringify(item));
      console.log("this.champion = " + JSON.stringify(this.champion));
      for (let i = 0; i < this.champion.item.length; i++) {
        if (this.champion.item[i].id == item.name) {
          return "itemSelected";
        }
      }

      return "greyScale";
    }
  }
};
</script>

<style lang="scss" scoped>
$heightChamp: 75px;
$heightItems: $heightChamp/3;

.possibleChamp {
  height: $heightChamp;
  width: $heightChamp;
  position: relative;
  margin: 0 !important;
}

.champion {
  height: 100%;
  width: 100%;
}

.bestItems {
  height: $heightItems;
  width: $heightChamp;
  display: flex;
  flex-wrap: wrap;

  .itemCol {
    position: relative;
    height: 100%;
    width: $heightItems;
  }

  .item {
    height: 100%;
  }
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

// .itemSelected {
// }

.greyScale {
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
  opacity: 70%;
}
</style>
