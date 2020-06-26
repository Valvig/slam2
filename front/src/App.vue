<template>
  <v-app v-if="!loading" id="app">
    {{listName}}
    <menuSlamming />
    <v-container class="app-container">
      <!-- LEFT ADS -->
      <ads class="ads" />

      <!-- App container -->
      <div class="middle-container">
        <itemsToChoose class="itemToChoose" />
        <chosenItems class="chosenItems" />
        <itemsCard class="itemsCard" />
      </div>

      <!-- RIGHT ADS -->
      <ads class="ads" />
    </v-container>
  </v-app>
</template>

<script>
/* App parts */
import itemsCard from "@/components/itemsCard";
import chosenItems from "@/components/chosenItems";
import itemsToChoose from "@/components/itemsToChoose";
import ads from "@/components/ads";
import menuSlamming from "@/components/menu";

import APIRoutes from "@/services/APIRoutes";

import itemsJson from "@/assets/set3EN/items.json";

import _ from "lodash";

export default {
  name: "App",
  components: {
    itemsCard,
    chosenItems,
    itemsToChoose,
    ads,
    menuSlamming
  },
  data() {
    return {
      loading: true,
      listName: []
    };
  },
  methods: {
    async getChampionsList() {
      const champList = await APIRoutes.getAllChamp();

      return champList;
    },
    async getChampionsByName(name) {
      const tempChamp = await APIRoutes.findChampByName(name);

      return tempChamp;
    },
    async updateChampion() {
      var champion = {
        name: "ahri",
        cost: 2,
        traits: "Star Guardian;Sorcerer",
        items: "",
        carry: 1
      };

      APIRoutes.updateChamp(champion);
    },
    async getItemsList() {
      const tempItemsList = await APIRoutes.getAllItems();

      return tempItemsList;
    },
    async createItemsList() {
      _.forEach(itemsJson, async function(item) {
        // eslint-disable-next-line
        const test = await APIRoutes.createItem(item);
      });
    },
    async getProPlayerListName() {
      var that = this;

      var winners = [];

      const tempItemsList = await APIRoutes.getGMList();

      _.forEach(tempItemsList.data.entries, function(player) {
        that.listName.push(player.summonerName);
      });

      const test = await APIRoutes.getPuuidByName("crazer491");
      const matchsData = await APIRoutes.getMatchsForPuuid(
        "SKxjAuPBl-t89GEs5hRF9DCnunGK0JFhVZEkdSSr4gEKGp9mDQ2CmildsAATPQ9X1WAx2yaY_SuAcA"
      );

      const test2 = await APIRoutes.getMatchInfo("EUW1_4675296995");
      console.log(test.data.puuid);
      console.log(matchsData.data);
      // Date time today                            - 24 hours in milliseconds
      var yesterdaySeconds = new Date().getTime() - 24 * 60 * 60 * 1000;

      console.log("yesterdaySeconds = " + yesterdaySeconds);
      console.log(
        "test2.data.info.game_datetime = " + test2.data.info.game_datetime
      );
      console.log(
        "test2.data.info.participants = " + JSON.stringify(test2.data.info.participants
      ));

      // Check if match was done the last 24 hours
      if (test2.data.info.game_datetime > yesterdaySeconds) {
        console.log("yes")
        _.forEach(test2.data.info.participants, function(participant) {
          
          console.log("participant " + JSON.stringify(participant))
          if (participant.placement === 1) {
            console.log("paritipant 1 = " + participant)
            winners.push(participant)
          }
          return false;
        });
      }

      console.log("winner = " + winners)
    }


  },
  async mounted() {
    this.$store.state.championsList = await this.getChampionsList();
    this.$store.state.itemsList = await this.getItemsList();
    this.loading = false;
    this.getProPlayerListName();
  },
  //Rate limiter example
  rateLimit() {
    // const RateLimiter = require("request-rate-limiter");
    // const limiter = new RateLimiter(120); // 120 requests per minute
    // const sendMessage = params => limiter.request(params);
    // sendMessage("/sendMessage?text=hi")
    //   .then(response => {
    //     console.log("hello!", response);
    //   })
    //   .catch(err => {
    //     console.log("oh my", err);
    //   });
  }
};
</script>

<style lang="scss" scoped>
#app,
.app-container {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  background: #161326;
  color: #f9dbbd;
}

.app-container {
  position: relative;
  display: flex;
  padding: 0px !important;
}

.middle-container {
  width: 80%;
  background: blue;
}

.ads {
  position: relative;
  height: 100%;
  width: 10%;
}

.itemToChoose {
  position: relative;
  height: 20vh;
  background: grey;
}

.chosenItems,
.itemsCard {
  width: 100%;
  height: fit-content;
}

.chosenItems {
  min-height: 25vh;
}

.itemsCard {
  min-height: 55vh;
}

.chosenItems {
  background: yellow;
}

.itemsCard {
  background: red;
}
</style>
