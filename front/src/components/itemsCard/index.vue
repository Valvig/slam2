<template>
  <div>
    <v-container 
      v-for="item in possibleItems" 
      :key="item"
      fluid
    >
      <v-row>
        <v-col>
          <div class="item-container">
            <div class="possibleItem">
              <v-img
                :src="getImgUrlItems(item.name)"
                class="white--text align-end"
                height="76px"
                width="76px"
                v-bind:alt="item.name"
              >
              </v-img>
            </div>
            <div class="receipe">
              <v-img
                :src="getImgUrlItems(item.item1)"
                class="white--text align-end"
                height="38px"
                width="38px"
                v-bind:alt="item.item1"
              >
              </v-img>
              <v-img
                :src="getImgUrlItems(item.item2)"
                class="white--text align-end"
                height="38px"
                width="38px"
                v-bind:alt="item.item2"
              >
              </v-img>
            </div>
            <div class="btn-container">
              <v-btn class="slamBtn" v-on:click="slamItem(item, item.item1, item.item2)">Slam Item</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          Carry
          <div class="carrys-container">
            <v-container class="carrys" v-for="champion in getCarrysAndOthersForItem(item)[0]" :key="champion">
              <champion-card class="champion-card" :championObject="champion"/>
            </v-container>
          </div>
        </v-col>
        <v-col>
          Others
          <div class="others-container">
            <v-container class="others" v-for="champion in getCarrysAndOthersForItem(item)[1]" :key="champion">
              <champion-card class="champion-card" :championObject="champion"/>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import championCard from '@/components/championCard'

export default {
  name: 'items-card',
  components : {
    championCard
  },
  data() {
    return {
      possibleItems: [],
      carrys: [],
      others: [],
      items: this.$store.state.itemsList,
      champions: this.$store.state.championsList
    }
  },
  watch: {
    itemsSelected () {
      this.getPossibleItems()
    }
  },
  computed: {
    ...mapGetters({
      itemsSelected: 'getItems'
    })
  },
  methods : {
    getPossibleItems () {
      var items = []
      this.possibleItems = []

      _.forEach(this.$store.state.items, function(item) {
        items.push(item)
      })

      for (let i = 0; i < items.length; i++) {
        const item1 = items[i].name
        for (let j = 1; j < items.length; j++) {
          if (i !== j) {
            const item2 = items[j].name
            switch (item1) {
              case "B.F. Sword":
                switch (item2) {
                  case "B.F. Sword":
                    this.pushItemInArray(item1, item2, "Deathblade")
                    break
                  case "Recurve Bow":
                    this.pushItemInArray(item1, item2, "Giant Slayer")
                    break
                  case "Needlessly Large Rod":
                    this.pushItemInArray(item1, item2, "Hextech Gunblade")
                    break
                  case "Tear of the Goddess":
                    this.pushItemInArray(item1, item2, "Spear of Shojin")
                    break
                  case "Chain Vest":
                    this.pushItemInArray(item1, item2, "Guardian Angel")
                    break
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Bloodthirster")
                    break
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Zeke's Herald")
                    break
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Blade of the Ruined King")
                    break
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Infinity Edge")
                    break
                }
              break
              case "Recurve Bow":
                switch (item2) {
                  case "Recurve Bow":
                    this.pushItemInArray(item1, item2, "Rapid Firecannon")
                    break
                  case "Needlessly Large Rod":
                    this.pushItemInArray(item1, item2, "Guinsoo's Rageblade")
                    break
                  case "Tear of the Goddess":
                    this.pushItemInArray(item1, item2, "Statikk Shiv")
                    break
                  case "Chain Vest":
                    this.pushItemInArray(item1, item2, "Titan's Resolve")
                    break
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Runaan's Hurricane")
                    break
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Zz'Rot Portal")
                    break
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Infiltrator's Talons")
                    break
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Last Whisper")
                    break
                }
              break
              case "Needlessly Large Rod":
                switch (item2) {
                  case "Needlessly Large Rod":
                    this.pushItemInArray(item1, item2, "Rabadon's Deathcap")
                    break
                  case "Tear of the Goddess":
                    this.pushItemInArray(item1, item2, "Luden's Echo")
                    break
                  case "Chain Vest":
                    this.pushItemInArray(item1, item2, "Ionic Spark")
                    break
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Morellonomicon")
                    break
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Demolitionist's Charge")
                    break
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Demolitionist's Charge")
                    break
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Jeweled Gauntlet")
                    break
                }
              break
              case "Tear of the Goddess":
                switch (item2) {
                  case "Tear of the Goddess":
                    this.pushItemInArray(item1, item2, "Seraph's Embrace")
                    break
                  case "Chain Vest":
                    this.pushItemInArray(item1, item2, "Frozen Heart")
                    break
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Chalice of Favor")
                    break
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Redemption")
                    break
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Star Guardian's Charm")
                    break
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Hand Of Justice")
                    break
                }
              break
              case "Chain Vest":
                switch (item2) {
                  case "Chain Vest":
                    this.pushItemInArray(item1, item2, "Bramble Vest")
                    break
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Sword Breaker")
                    break
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Red Buff")
                    break
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Rebel Medal")
                    break
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Shroud of Stillness")
                    break
                }
              break
              case "Negatron Cloak":
                switch (item2) {
                  case "Negatron Cloak":
                    this.pushItemInArray(item1, item2, "Dragon's Claw")
                    break
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Zephyr")
                    break
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Celestial Orb")
                    break
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Quicksilver")
                    break
                }
              break
              case "Giant's Belt":
                switch (item2) {
                  case "Giant's Belt":
                    this.pushItemInArray(item1, item2, "Warmog's Armor")
                    break
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Protector's Chestguard")
                    break
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Trap Claw")
                    break
                }

              break
              case "Spatula":
                switch (item2) {
                  case "Spatula":
                    this.pushItemInArray(item1, item2, "Force of Nature")
                    break
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Dark Star's Heart")
                    break
                }

              break
              case "Sparring Gloves":
                switch (item2) {
                  case "Sparring Gloves":
                    this.pushItemInArray(item1, item2, "Thief's Gloves")
                    break
                }
              break
            }
          }
        }
      }
    },
    pushItemInArray (item1, item2, name) {
      this.items.forEach(item => {
        if(item.name === name){
          if(this.possibleItems.indexOf(item) === -1) {
            item.item1 = item1
            item.item2 = item2
            this.possibleItems.push(item)
          }
        }
      })
    },
    getImgUrlItems(name) {
      var normalizedName = ""

      this.items.forEach(item => {
        if(item.name === name){
          if (item.iditems <= 9) {
            normalizedName = "0" + item.iditems + ".png"
          } else {
            normalizedName = item.iditems + ".png"
          }
        }
      })

      return require('@/assets/set3EN/items/' + normalizedName)
    },
    slamItem (item, item1, item2) {
      var that = this
      _.forEach(this.$store.state.items, function(item) {
        if (item.name == item1) {
          that.$store.commit('deleteItem', item)
          return false
        }
      })
      
      _.forEach(this.$store.state.items, function(item) {
        if (item.name == item2) {
          that.$store.commit('deleteItem', item)
          return false
        }
      })
      
      this.$store.commit('addFullItem', item)
    },
    getCarrysAndOthers() {
      var that = this
      _.forEach(this.champions, function(champion) {
        if (champion.carry == true) {
          that.carrys.push(champion)
        } else {
          that.others.push(champion)
        }
      })
    },
    getChampItems (champion) {
      var res = champion.items.split(";")

      return res
    },
    getCarrysAndOthersForItem (item) {
      var carrysChamp = []
      var othersChamp = []
      var that = this

      var carrysAndOthers = []

      _.forEach(this.champions, function(champion) {
        if (champion.carry == true) {
          carrysChamp = that.pushCarryOrOtherinArray(carrysChamp, champion, item)
        } else {
          othersChamp = that.pushCarryOrOtherinArray(othersChamp, champion, item)
        }
      })

      carrysAndOthers.push(carrysChamp)
      carrysAndOthers.push(othersChamp)

      return carrysAndOthers
    },
    pushCarryOrOtherinArray (carryOrOther, champion, item) {
      _.forEach(this.getChampItems(champion), function(itemChamp) {
        if (itemChamp == item.name){
          carryOrOther.push(champion)
          return false
        }
      })
      
      return carryOrOther
    }
  },
  mounted () {
    this.getPossibleItems()
  }
}
</script>

<style style="scss" scoped>
  .item-container {
    display: flex;
    flex-wrap: wrap;
  }

  .possibleItem {
    margin-right: 5px;
  }

  .btn-container {
    position: relative;
  }

  .slamBtn {
    position: absolute;
    top: 50%; 
    transform: translateY(-50%);
    margin-left: 5px;
  }

  .carrys-container,
  .others-container {
    display: flex;
    flex-wrap: wrap;
  }

  .carrys,
  .others {
    width: fit-content;
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
</style>
