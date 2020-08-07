<template>
  <div>
    <div :class="'possibleChamp ' + getClassChamp(championObject)">
      <div :class="'price ' + getClassPrice(championObject) ">
        {{championObject.cost}}
      </div>
      <img class="champion" :src="getImgUrlChampion(championObject.name)" />
    </div>

    <div class="bestItems">
      <div class="itemCol" v-for="item in bestItems" :key="item.name +'_'+getRandomNumber()">
        <img class="item" :src="getImgUrlItems(item.name)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "champion-card",
  props: {
    championObject: Object
  },
  data() {
    return {
      loading: true,
      bestItems: [],
      items: this.$store.state.itemsList,
      champions: this.$store.state.championsList
    };
  },
  methods: {
    getBestItems() {
      var bestItemsForChamp = []
      var itemsChamp = this.championObject.items.split(";");
      for (let i = 0; i < itemsChamp.length; i++) {
        // Get item as JSON
        var itemValue = JSON.parse(itemsChamp[i])
        bestItemsForChamp.push(itemValue)
      }
    
      return bestItemsForChamp
    },
    getItemByName(name) {
      var itemTemp;

      this.items.forEach(item => {
        if (name == item.name) {
          itemTemp = item;
        }
      });

      return itemTemp;
    },
    getImgUrlItems(name) {
      var normalizedName = "";

      this.bestItems.forEach(item => {
        if (item.name === name) {
          if (item.name <= 9) {
            normalizedName = "0" + item.name + ".png";
          } else {
            normalizedName = item.name + ".png";
          }
        }
      })

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
    getClassChamp(champ) {
      switch (champ.cost) {
        case 1:
          return "greyBorder";
        case 2:
          return "blueBorder";
        case 3:
          return "greenBorder";
        case 4:
          return "purpleBorder";
        case 5:
          return "yellowBorder";
        default:
          return "greyBorder";
      }
    },
    getClassPrice(champ) {
      switch (champ.cost) {
        case 1:
          return "greyBackground";
        case 2:
          return "blueBackground";
        case 3:
          return "greenBackground";
        case 4:
          return "purpleBackground";
        case 5:
          return "yellowBackground";
        default:
          return "greyBackground";
      }
    },
    getRandomNumber() {
      return Math.floor(Math.random() * 1000);
    }
  },
  mounted() {
    this.bestItems = this.getBestItems()
  }
};
</script>

<style lang="scss" scoped>
$heightChamp: 72px;
$heightItems: $heightChamp/3;

$borderChampSize: 2px;

.possibleChamp {
  height: $heightChamp;
  width: $heightChamp;
  position: relative;
  cursor: pointer;
}

.possibleChamp:hover {
  height: $heightChamp;
  width: $heightChamp;
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

.blueBorder {
  border: $borderChampSize solid blue;
}

.greenBorder {
  border: $borderChampSize solid green;
}

.greyBorder {
  border: $borderChampSize solid grey;
}

.purpleBorder {
  border: $borderChampSize solid purple;
}

.yellowBorder {
  border: $borderChampSize solid yellow;
}

.blueBackground {
  background: blue;
}

.greenBackground {
  background: green;
}

.greyBackground {
  background: grey;
}

.purpleBackground {
  background: purple;
}

.yellowBackground {
  background: yellow;
  color: black !important;
}

.price {
  position: absolute;
  right: -$borderChampSize / 2;
  bottom: -$borderChampSize / 2;
  width: $heightChamp / 5;
  height: $heightChamp / 5;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 0.75em;
}
</style>
