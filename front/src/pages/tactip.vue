<template>
  <v-app v-if="!loading" id="tactip">
    <adblock @passValue="add = $event"></adblock>

    <!-- AD BLOCK WARNING -->
    <div class="adBlockWarning" v-if="add == 'detected'">
      <adBlockWarning />
    </div>

    <!-- APP -->
    <tactipapp class="tactip" v-if="add !== 'detected'" />
  </v-app>
</template>

<script>
/* App parts */
import tactipapp from "@/components/tactipapp";

import adBlockWarning from "@/components/tactipapp/adBlockWarning";
import adblock from "vue-adblock";

import APIRoutes from "@/services/APIRoutes";

export default {
  name: "tactip",
  components: {
    tactipapp,
    adblock,
    adBlockWarning,
  },
  data() {
    return {
      loading: true,
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
    this.$store.state.championsList = await this.getChampionsList();
    this.$store.state.itemsList = await this.getItemsList();
    this.loading = false;
  },
};
</script>

<style lang="scss">

#tactip {
  width: 100%;
  height: 100%;
  color: #f8f0fb;
  font-family: "Catamaran", sans-serif;
}

.theme--light.v-label {
  color: white;
}

.adBlockWarning {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 200;
}
</style>
