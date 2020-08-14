<template>
  <div :class="'items-card-container ' + isActive()">
    <v-snackbar v-model="snackbar" :timeout="timeout" color="error" outlined>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>

    <v-container v-for="(item, index) in possibleItems" :key="item.name + index" fluid>
      <v-row>
        <v-tooltip
          :disabled="getIsEnableTutorial(index)"
          :top="isTop"
          :left="!isTop"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="box" v-bind="attrs" v-on="on">
              <v-col class="item-col">
                <div class="item-container">
                  <div class="possibleItem">
                    <v-img
                      :src="getImgUrlItems(item.id)"
                      class="white--text align-end"
                      height="76px"
                      width="76px"
                      v-bind:alt="item.name"
                    ></v-img>
                  </div>
                  <div class="receipe">
                    <v-img
                      :src="getImgUrlItems(item.item1.id)"
                      class="white--text align-end"
                      height="38px"
                      width="38px"
                      v-bind:alt="item.item1.name"
                    ></v-img>
                    <v-img
                      :src="getImgUrlItems(item.item2.id)"
                      class="white--text align-end"
                      height="38px"
                      width="38px"
                      v-bind:alt="item.item2.name"
                    ></v-img>
                  </div>
                  <div class="item-name-container">
                    <div class="center-text">
                      <p class="item-name">{{item.name}}</p>
                    </div>
                  </div>
                  <v-spacer></v-spacer>
                </div>
              </v-col>
            </div>
          </template>
          <span>Click on an champion to add it to your list.</span>
        </v-tooltip>
      </v-row>
      <v-row>
        <v-col class="colMobile">
          <p>S TIER</p>
          <div class="carrys-container stierBorder">
            <v-container
              class="carrys"
              v-for="champion in getChampForItem(item,0)"
              :key="champion.name"
              v-on:click="slamChamp(item, item.item1, item.item2,champion)"
            >
              <champion-card class="champion-card" :championObject="champion" />
            </v-container>
          </div>
        </v-col>
        <v-col class="colMobile">
          <p>A TIER</p>
          <div class="useful-container atierBorder">
            <v-container
              class="useful"
              v-for="champion in getChampForItem(item,1)"
              :key="champion.name"
              v-on:click="slamChamp(item, item.item1, item.item2,champion)"
            >
              <champion-card class="champion-card" :championObject="champion" />
            </v-container>
          </div>
        </v-col>
        <v-col class="colMobile">
          <p>OTHERS</p>
          <div class="others-container othersBorder">
            <v-container
              class="others"
              v-for="champion in getChampForItem(item,2)"
              :key="champion.name"
              v-on:click="slamChamp(item, item.item1, item.item2, champion)"
            >
              <champion-card class="champion-card" :championObject="champion" />
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";
import championCard from "@/components/championCard";

export default {
  name: "items-card",
  props: {
    isTop: Boolean,
  },
  components: {
    championCard,
  },
  data() {
    return {
      possibleItems: [],
      carrys: [],
      others: [],
      items: this.$store.state.itemsList,
      champions: this.$store.state.championsList,

      // SNACKBAR
      snackbar: false,
      text: "Maximum 3 items for each champions",
      timeout: 2000,
    };
  },
  watch: {
    itemsSelected() {
      this.getPossibleItems();
      this.sortPossibleItems();
    },
    fullItemsSelected() {
      this.getPossibleItems();
      this.sortPossibleItems();
    },
    tutorial(newValue) {
      this.tutorial = newValue;
    },
  },
  computed: {
    ...mapGetters({
      itemsSelected: "getItems",
      fullItemsSelected: "getFullItems",
    }),
    tutorial() {
      return this.$store.state.tutorial;
    },
  },
  methods: {
    getPossibleItems() {
      var items = [];
      this.possibleItems = [];

      _.forEach(this.$store.state.items, function (item) {
        items.push(item);
      });

      for (let i = 0; i < items.length; i++) {
        const item1name = items[i].name;
        const item1 = items[i];
        for (let j = 1; j < items.length; j++) {
          if (i !== j) {
            const item2name = items[j].name;
            const item2 = items[j];
            switch (item1name) {
              case "B.F. Sword":
                switch (item2name) {
                  case "B.F. Sword":
                    this.pushItemInArray(item1, item2, "Deathblade");
                    break;
                  case "Recurve Bow":
                    this.pushItemInArray(item1, item2, "Giant Slayer");
                    break;
                  case "Needlessly Large Rod":
                    this.pushItemInArray(item1, item2, "Hextech Gunblade");
                    break;
                  case "Tear of the Goddess":
                    this.pushItemInArray(item1, item2, "Spear of Shojin");
                    break;
                  case "Chain Vest":
                    this.pushItemInArray(item1, item2, "Guardian Angel");
                    break;
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Bloodthirster");
                    break;
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Zeke's Herald");
                    break;
                  case "Spatula":
                    this.pushItemInArray(
                      item1,
                      item2,
                      "Blade of the Ruined King"
                    );
                    break;
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Infinity Edge");
                    break;
                }
                break;
              case "Recurve Bow":
                switch (item2name) {
                  case "B.F. Sword":
                    this.pushItemInArray(item1, item2, "Giant Slayer");
                    break;
                  case "Recurve Bow":
                    this.pushItemInArray(item1, item2, "Rapid Firecannon");
                    break;
                  case "Needlessly Large Rod":
                    this.pushItemInArray(item1, item2, "Guinsoo's Rageblade");
                    break;
                  case "Tear of the Goddess":
                    this.pushItemInArray(item1, item2, "Statikk Shiv");
                    break;
                  case "Chain Vest":
                    this.pushItemInArray(item1, item2, "Titan's Resolve");
                    break;
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Runaan's Hurricane");
                    break;
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Zz'Rot Portal");
                    break;
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Infiltrator's Talons");
                    break;
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Last Whisper");
                    break;
                }
                break;
              case "Needlessly Large Rod":
                switch (item2name) {
                  case "B.F. Sword":
                    this.pushItemInArray(item1, item2, "Hextech Gunblade");
                    break;
                  case "Recurve Bow":
                    this.pushItemInArray(item1, item2, "Guinsoo's Rageblade");
                    break;
                  case "Needlessly Large Rod":
                    this.pushItemInArray(item1, item2, "Rabadon's Deathcap");
                    break;
                  case "Tear of the Goddess":
                    this.pushItemInArray(item1, item2, "Luden's Echo");
                    break;
                  case "Chain Vest":
                    this.pushItemInArray(
                      item1,
                      item2,
                      "Locket of the Iron Solari"
                    );
                    break;
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Ionic Spark");
                    break;
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Morellonomicon");
                    break;
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Battlecast Armor");
                    break;
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Jeweled Gauntlet");
                    break;
                }
                break;
              case "Tear of the Goddess":
                switch (item2name) {
                  case "B.F. Sword":
                    this.pushItemInArray(item1, item2, "Spear of Shojin");
                    break;
                  case "Recurve Bow":
                    this.pushItemInArray(item1, item2, "Statikk Shiv");
                    break;
                  case "Needlessly Large Rod":
                    this.pushItemInArray(item1, item2, "Luden's Echo");
                    break;
                  case "Tear of the Goddess":
                    this.pushItemInArray(item1, item2, "Seraph's Embrace");
                    break;
                  case "Chain Vest":
                    this.pushItemInArray(item1, item2, "Frozen Heart");
                    break;
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Chalice of Favor");
                    break;
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Redemption");
                    break;
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Star Guardian's Charm");
                    break;
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Hand Of Justice");
                    break;
                }
                break;
              case "Chain Vest":
                switch (item2name) {
                  case "B.F. Sword":
                    this.pushItemInArray(item1, item2, "Guardian Angel");
                    break;
                  case "Recurve Bow":
                    this.pushItemInArray(item1, item2, "Titan's Resolve");
                    break;
                  case "Needlessly Large Rod":
                    this.pushItemInArray(
                      item1,
                      item2,
                      "Locket of the Iron Solari"
                    );
                    break;
                  case "Tear of the Goddess":
                    this.pushItemInArray(item1, item2, "Frozen Heart");
                    break;
                  case "Chain Vest":
                    this.pushItemInArray(item1, item2, "Bramble Vest");
                    break;
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Sword Breaker");
                    break;
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Red Buff");
                    break;
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Rebel Medal");
                    break;
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Shroud of Stillness");
                    break;
                }
                break;
              case "Negatron Cloak":
                switch (item2name) {
                  case "B.F. Sword":
                    this.pushItemInArray(item1, item2, "Bloodthirster");
                    break;
                  case "Recurve Bow":
                    this.pushItemInArray(item1, item2, "Runaan's Hurricane");
                    break;
                  case "Needlessly Large Rod":
                    this.pushItemInArray(item1, item2, "Ionic Spark");
                    break;
                  case "Tear of the Goddess":
                    this.pushItemInArray(item1, item2, "Chalice of Favor");
                    break;
                  case "Chain Vest":
                    this.pushItemInArray(item1, item2, "Sword Breaker");
                    break;
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Dragon's Claw");
                    break;
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Zephyr");
                    break;
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Celestial Orb");
                    break;
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Quicksilver");
                    break;
                }
                break;
              case "Giant's Belt":
                switch (item2name) {
                  case "B.F. Sword":
                    this.pushItemInArray(item1, item2, "Zeke's Herald");
                    break;
                  case "Recurve Bow":
                    this.pushItemInArray(item1, item2, "Zz'Rot Portal");
                    break;
                  case "Needlessly Large Rod":
                    this.pushItemInArray(item1, item2, "Morellonomicon");
                    break;
                  case "Tear of the Goddess":
                    this.pushItemInArray(item1, item2, "Redemption");
                    break;
                  case "Chain Vest":
                    this.pushItemInArray(item1, item2, "Red Buff");
                    break;
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Zephyr");
                    break;
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Warmog's Armor");
                    break;
                  case "Spatula":
                    this.pushItemInArray(
                      item1,
                      item2,
                      "Protector's Chestguard"
                    );
                    break;
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Trap Claw");
                    break;
                }

                break;
              case "Spatula":
                switch (item2name) {
                  case "B.F. Sword":
                    this.pushItemInArray(
                      item1,
                      item2,
                      "Blade of the Ruined King"
                    );
                    break;
                  case "Recurve Bow":
                    this.pushItemInArray(item1, item2, "Infiltrator's Talons");
                    break;
                  case "Needlessly Large Rod":
                    this.pushItemInArray(item1, item2, "Battlecast Armor");
                    break;
                  case "Tear of the Goddess":
                    this.pushItemInArray(item1, item2, "Star Guardian's Charm");
                    break;
                  case "Chain Vest":
                    this.pushItemInArray(item1, item2, "Rebel Medal");
                    break;
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Celestial Orb");
                    break;
                  case "Giant's Belt":
                    this.pushItemInArray(
                      item1,
                      item2,
                      "Protector's Chestguard"
                    );
                    break;
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Force of Nature");
                    break;
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Dark Star's Heart");
                    break;
                }

                break;
              case "Sparring Gloves":
                switch (item2name) {
                  case "B.F. Sword":
                    this.pushItemInArray(item1, item2, "Infinity Edge");
                    break;
                  case "Recurve Bow":
                    this.pushItemInArray(item1, item2, "Last Whisper");
                    break;
                  case "Needlessly Large Rod":
                    this.pushItemInArray(item1, item2, "Jeweled Gauntlet");
                    break;
                  case "Tear of the Goddess":
                    this.pushItemInArray(item1, item2, "Hand Of Justice");
                    break;
                  case "Chain Vest":
                    this.pushItemInArray(item1, item2, "Shroud of Stillness");
                    break;
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Quicksilver");
                    break;
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Trap Claw");
                    break;
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Dark Star's Heart");
                    break;
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Thief's Gloves");
                    break;
                }
                break;
            }
          }
        }
      }

      // Double loop to add fullItems into possibleItems
      for (let i = 0; i < this.$store.state.fullItems.length; i++) {
        // If possibleItems array is empty then add it
        for (let j = 0; j < this.possibleItems.length; j++) {
          var add = true;
          if (
            this.$store.state.fullItems[i].name == this.possibleItems[j].name
          ) {
            add = false;
          }
        }

        if (add) {
          this.possibleItems.push(this.$store.state.fullItems[i]);
        }

        // If possibleItems array is empty then add it
        if (this.possibleItems.length == 0) {
          this.possibleItems.push(this.$store.state.fullItems[i]);
        }
      }
    },
    pushItemInArray(item1, item2, name) {
      this.items.forEach((item) => {
        if (item.name === name) {
          if (this.possibleItems.indexOf(item) === -1) {
            item.item1 = item1;
            item.item2 = item2;
            this.possibleItems.push(item);
          }
        }
      });
    },
    getImgUrlItems(name) {
      var normalizedName = "";
      if (name <= 9) {
        normalizedName = "0" + name + ".png";
      } else {
        normalizedName = name + ".png";
      }

      return require("@/assets/set3update/items/" + normalizedName);
    },
    slamChamp(item, item1, item2, champ) {
      // Get bestItems of champion
      var bestItemsForChamp = [];
      var itemsChamp = champ.items.split(";");
      for (let i = 0; i < itemsChamp.length; i++) {
        // Get item as JSON
        var itemValue = JSON.parse(itemsChamp[i]);
        bestItemsForChamp.push(itemValue);
      }

      var champion = {
        name: champ.name,
        bestItems: bestItemsForChamp,
        item: [item],
        item1: item1,
        item2: item2,
      };

      var add = true;

      for (let i = 0; i < this.$store.state.champWithItem.length; i++) {
        const element = this.$store.state.champWithItem[i];
        if (
          champion.name == element.name &&
          this.$store.state.champWithItem[i].item.length > 2
        ) {
          add = false;
        }
      }

      if (add) {
        this.$store.commit("addChampWithItem", champion);
        this.deleteItemsFromStore(item, champion.item1, champion.item2);
      } else {
        this.snackbar = true;
      }
    },
    deleteItemsFromStore(item, item1, item2) {
      var deleted = false;
      for (let i = 0; i < this.$store.state.fullItems.length; i++) {
        var element = this.$store.state.fullItems[i];

        if (element.name == item.name) {
          item.deleteToAddChamp = true;

          var payload = { item: item, deleteToAddToChamp: true };

          this.$store.commit("deleteFullItem", payload);
          deleted = true;
          break;
        }
      }

      if (!deleted) {
        this.$store.commit("deleteItem", item1);
        this.$store.commit("deleteItem", item2);
      }
    },
    checkIfChampionIsAlreadyPushed(arr, champion) {
      var add = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === champion.name) {
          add = true;
          break;
        }
      }
      return add;
    },
    getChampForItem(item, carrysUsefulOrOthers) {
      var carrys = [];
      var useful = [];
      var others = [];

      var that = this;

      _.forEach(this.champions, function (champion) {
        let itemsChamp = champion.items;
        itemsChamp = itemsChamp.split(";");
        for (let i = 0; i < itemsChamp.length; i++) {
          // Get item as JSON
          var itemChamp = JSON.parse(itemsChamp[i]);

          // If itemChamp has the same number as the item we are looking for then add it to the list
          if (itemChamp.name == item.id) {
            switch (champion.carry) {
              case 0:
                if (!that.checkIfChampionIsAlreadyPushed(carrys, champion)) {
                  carrys.push(champion);
                }
                break;
              case 1:
                if (!that.checkIfChampionIsAlreadyPushed(useful, champion)) {
                  useful.push(champion);
                }
                break;
              case 2:
                if (!that.checkIfChampionIsAlreadyPushed(others, champion)) {
                  others.push(champion);
                }
                break;
            }
          }
        }
      });

      if (carrysUsefulOrOthers == 0) {
        return carrys;
      } else if (carrysUsefulOrOthers == 1) {
        return useful;
      } else {
        return others;
      }
    },
    sortPossibleItems() {
      var itemsList = [];
      for (let i = 0; i < this.possibleItems.length; i++) {
        var tempObj = {};
        tempObj.item = this.possibleItems[i];

        var STIER = this.getChampForItem(this.possibleItems[i], 0);
        var ATIER = this.getChampForItem(this.possibleItems[i], 1);
        var OTHERS = this.getChampForItem(this.possibleItems[i], 2);

        if (STIER.length > 0) {
          tempObj.stier = {};
          tempObj.stier.carrysNb = STIER.length;
        }
        if (ATIER.length > 0) {
          tempObj.atier = {};
          tempObj.atier.carrysNb = ATIER.length;
        }
        if (OTHERS.length > 0) {
          tempObj.other = {};
          tempObj.other.carrysNb = OTHERS.length;
        }

        itemsList.push(tempObj);
      }

      var tempObjWithPonderateValue = [];

      for (let i = 0; i < itemsList.length; i++) {
        var valueToPush = 0;
        if ("stier" in itemsList[i]) {
          valueToPush = valueToPush + itemsList[i].stier.carrysNb * 1000;
        }

        if ("atier" in itemsList[i]) {
          valueToPush = valueToPush + itemsList[i].atier.carrysNb * 10;
        }

        if ("other" in itemsList[i]) {
          valueToPush = valueToPush + itemsList[i].other.carrysNb * 0.1;
        }

        tempObjWithPonderateValue.push(valueToPush);
      }

      this.possibleItems = [];

      for (let i = 0; i < tempObjWithPonderateValue.length; i++) {
        var indexToPush = 0;

        indexToPush = this.indexOfMax(tempObjWithPonderateValue);

        this.possibleItems.push(itemsList[indexToPush].item);

        tempObjWithPonderateValue[indexToPush] = 0;
      }
    },
    indexOfMax(arr) {
      if (arr.length === 0) {
        return -1;
      }

      var max = arr[0];
      var maxIndex = 0;

      for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
        }
      }

      return maxIndex;
    },
    isActive() {
      if (this.possibleItems.length > 0) {
        return "active";
      }
    },
    getIsEnableTutorial (index) {
      if (index == 0) {
        if (this.$store.state.tutorial == true) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
  },
  mounted() {
    this.getPossibleItems();
    this.sortPossibleItems();
  },
};
</script>

<style style="scss" scoped>
.items-card-container {
  opacity: 0;
  height: 0;
  transition: opacity 0.3s, height 0.3s 0.1s;
}

.active {
  opacity: 1;
  height: fit-content;
  transition: opacity 0.3s, height 0.3s 0.1s;
}

.item-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

p {
  text-align: center;
  font-weight: bold;
  background: #4d5061;
}

.stierBorder {
  /* border: 1px solid #FFFF00; */
  border: 1px solid #4d5061;
}

.atierBorder {
  /* border: 1px solid #E0E0E0; */
  border: 1px solid #4d5061;
}

.othersBorder {
  /* border: 1px solid #E65100; */
  border: 1px solid #4d5061;
}

.item-col {
  background-color: #4d5061;
}

.btn-container {
  width: 150px;
}

.possibleItem {
  margin-right: 5px;
}

.slamBtn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 5px;
}

.carrys-container,
.others-container,
.useful-container {
  display: flex;
  flex-wrap: wrap;
}

.carrys,
.useful,
.others {
  width: fit-content;
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.item-name-container {
  position: relative;
  width: 50%;
  margin-left: 15px;
}

.tip-container {
  position: relative;
  width: fit-content;
}

.center-text {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

p {
  margin: 0 !important;
}

.item-name {
  font-size: 1.8em;
  font-weight: bold;
}

.receipe {
  background: black;
}

.box {
  height: 100%;
  width: 100%;
}

@media (max-width: 425px) {
  .colMobile {
    width: 100% !important;
    flex-basis: auto;
  }
}
</style>
