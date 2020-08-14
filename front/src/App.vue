<template>
  <v-app v-if="!loading" id="app">
    <adblock @passValue="add = $event"></adblock>

    <!-- AD BLOCK WARNING -->
    <div class="adBlockWarning" v-if="add == 'detected'">
      <adBlockWarning />
    </div>

    <!-- MENU -->
    <menuApp class="menu" />

    <!-- TUTO -->
    <tuto v-if="firstTime" class="tuto" />

    <!-- APP -->
    <tactip class="tactip" v-if="!firstTime && add !== 'detected'" />

    <!-- FOOTER -->
    <footerApp class="footer" />
  </v-app>
</template>

<script>
/* App parts */
import tactip from "@/components/tactip";
import menuApp from "@/components/menu";
import footerApp from "@/components/footer";
import tuto from "@/components/tuto";

import adBlockWarning from "@/components/adBlockWarning";
import adblock from "vue-adblock";

import APIRoutes from "@/services/APIRoutes";

export default {
  name: "App",
  components: {
    tuto,
    tactip,
    menuApp,
    footerApp,
    adblock,
    adBlockWarning,
  },
  data() {
    return {
      loading: true,
      firstTime: false,
      add: "",
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
    },
  },
  async mounted() {
    // Create cookie with Champions and items
    this.$store.state.championsList = await this.getChampionsList();
    this.$store.state.itemsList = await this.getItemsList();
    this.loading = false;
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap");

$menuHeight: 48px;

.menu {
  z-index: 1;
}

#app {
  width: 100%;
  height: 100%;
  color: #f8f0fb;
  background-color: #24252e;
  font-family: "Catamaran", sans-serif;
}

.adBlockWarning {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 200;
}

.tuto {
  min-height: 100vh;
  width: 100vw;
}

.footer {
  background-color: #4d5061;
}

.theme--light.v-label {
  color: white;
}
</style>
