<template>
  <v-app v-if="!loading" id="app">
    <menuApp />
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

import APIRoutes from "@/services/APIRoutes";

export default {
  name: "App",
  components: {
    itemsCard,
    chosenItems,
    itemsToChoose,
    ads,
    menuApp,
    footerApp
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
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap');

#app,
.app-container {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  color: #F8F0FB;
  background-color: #24252E;
  font-family: 'Catamaran', sans-serif;
}

.app-container {
  position: relative;
  display: flex;
  padding: 0px !important;
}

.ads {
  position: relative;
  height: 100%;
  width: 10%;
}

.middle-container {
  width: 100%;
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
