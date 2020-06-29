<template>
  <v-app v-if="!loading" id="app">
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
    async getItemsList() {
      const tempItemsList = await APIRoutes.getAllItems();

      return tempItemsList;
    }
  },
  async mounted() {
    // Create cookie with Champions and items
    this.$store.state.championsList = await this.getChampionsList();
    this.$store.state.itemsList = await this.getItemsList();
    this.loading = false;
    // this.getProPlayerListName();
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
