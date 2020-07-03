<template>
  <div>
    <v-container v-for="item in possibleItems" :key="item.name + 'possibleItem'" fluid>
      <v-row>
        <v-col class="item-col">
          <div class="item-container">
            <div class="possibleItem">
              <v-img
                :src="getImgUrlItems(item.name)"
                class="white--text align-end"
                height="76px"
                width="76px"
                v-bind:alt="item.name"
              ></v-img>
            </div>
            <div class="receipe">
              <v-img
                :src="getImgUrlItems(item.item1)"
                class="white--text align-end"
                height="38px"
                width="38px"
                v-bind:alt="item.item1"
              ></v-img>
              <v-img
                :src="getImgUrlItems(item.item2)"
                class="white--text align-end"
                height="38px"
                width="38px"
                v-bind:alt="item.item2"
              ></v-img>
            </div>
            <div class="item-name-container">
              <div class="center-text">
                <p class="item-name">{{item.name}}</p>
              </div>
            </div>
            <v-spacer></v-spacer>
            <div class="btn-container">
              <v-btn class="slamBtn" v-on:click="slamItem(item, item.item1, item.item2)">Slam Item</v-btn>
            </div>
          </div>
          <div>
            <p>
              (Click on a champ to save it with item)
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>S TIER</p>
          <div class="carrys-container">
            <v-container
              class="carrys"
              v-for="champion in getChampForItem(item,0)"
              :key="champion.name"
            >
              <champion-card class="champion-card" :championObject="champion" />
            </v-container>
          </div>
        </v-col>
        <v-col>
          <p>A TIER</p>
          <div class="useful-container">
            <v-container
              class="useful"
              v-for="champion in getChampForItem(item,1)"
              :key="champion.name"
            >
              <champion-card class="champion-card" :championObject="champion" />
            </v-container>
          </div>
        </v-col>
        <v-col>
          <p>OTHERS</p>
          <div class="others-container">
            <v-container
              class="others"
              v-for="champion in getChampForItem(item,2)"
              :key="champion.name"
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
  components: {
    championCard
  },
  data() {
    return {
      possibleItems: [],
      carrys: [],
      others: [],
      items: this.$store.state.itemsList,
      champions: this.$store.state.championsList
    };
  },
  watch: {
    itemsSelected() {
      this.getPossibleItems();
      this.sortPossibleItems();
    }
  },
  computed: {
    ...mapGetters({
      itemsSelected: "getItems"
    })
  },
  methods: {
    getPossibleItems() {
      var items = [];
      this.possibleItems = [];

      _.forEach(this.$store.state.items, function(item) {
        items.push(item);
      });

      for (let i = 0; i < items.length; i++) {
        const item1 = items[i].name;
        for (let j = 1; j < items.length; j++) {
          if (i !== j) {
            const item2 = items[j].name;
            switch (item1) {
              case "B.F. Sword":
                switch (item2) {
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
                switch (item2) {
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
                switch (item2) {
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
                switch (item2) {
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
                switch (item2) {
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
                switch (item2) {
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
                switch (item2) {
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
                switch (item2) {
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
                switch (item2) {
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
    },
    pushItemInArray(item1, item2, name) {
      this.items.forEach(item => {
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

      this.items.forEach(item => {
        if (item.name === name) {
          if (item.id <= 9) {
            normalizedName = "0" + item.id + ".png";
          } else {
            normalizedName = item.id + ".png";
          }
        }
      });

      return require("@/assets/set3update/items/" + normalizedName);
    },
    slamItem(item, item1, item2) {
      var that = this;
      _.forEach(this.$store.state.items, function(item) {
        if (item.name == item1) {
          that.$store.commit("deleteItem", item);
          return false;
        }
      });

      _.forEach(this.$store.state.items, function(item) {
        if (item.name == item2) {
          that.$store.commit("deleteItem", item);
          return false;
        }
      });

      this.$store.commit("addFullItem", item);
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

      _.forEach(this.champions, function(champion) {
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
    }
  },
  mounted() {
    this.getPossibleItems();
    this.sortPossibleItems();
  }
};
</script>

<style style="scss" scoped>
.item-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

p {
  text-align: center;
  font-weight: bold;
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
</style>
