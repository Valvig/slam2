<template>
  <v-app v-if="!loading" id="app">
    <adblock @passValue="add = $event"></adblock>
    
    <div class="adBlockWarning" v-if="add == 'detected'">
      <adBlockWarning />
    </div>
    <menuApp class="menu" />

    <!-- LEFT ADS -->
    <ads class="ads" />

    <v-container class="app-container">
      <!-- App container -->
      <div class="middle-container">
        <itemsToChoose class="itemToChoose" />
        <chosenItems class="chosenItems" />
        <itemsCard class="itemsCard" />
      </div>
    </v-container>

    <!-- RIGHT ADS -->
    <ads class="ads right" />

    <footerApp class="footer" />
  </v-app>
</template>

<script>
/* App parts */
import itemsCard from "@/components/itemsCard";
import chosenItems from "@/components/chosenItems";
import itemsToChoose from "@/components/itemsToChoose";
import ads from "@/components/ads";
import menuApp from "@/components/menu";
import footerApp from "@/components/footer";
import adBlockWarning from "@/components/adBlockWarning";
import adblock from "vue-adblock";

import APIRoutes from "@/services/APIRoutes";

export default {
  name: "App",
  components: {
    itemsCard,
    chosenItems,
    itemsToChoose,
    ads,
    menuApp,
    footerApp,
    adblock,
    adBlockWarning
  },
  data() {
    return {
      loading: true,
      listName: [],
      add: ""
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
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap");

$menuHeight: 48px;

.menu {
  z-index: 1;
}

.adBlockWarning{
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 2;
}

#app,
.app-container {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  color: #f8f0fb;
  background-color: #24252e;
  font-family: "Catamaran", sans-serif;
}

.app-container {
  position: relative;
  display: flex;
  padding: 0px !important;
}

.ads {
  position: fixed;
  height: 100vh;
  width: calc((100vw - 1200px) / 2);
}

.right {
  right: 0px;
}

.middle-container {
  width: 100%;
  padding-top: 10px;
}

.itemToChoose {
  position: relative;
  height: 20vh;
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

.itemToChoose,
.chosenItems,
.itemsCard {
  background-color: #30323d;
  border: 1px solid #414352;

  .container.container--fluid {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
}

.footer {
  background-color: #4d5061;
}

@media (min-width: 576px) {
  .app-container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .app-container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .app-container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .app-container {
    max-width: 1140px;
  }
}
</style>
