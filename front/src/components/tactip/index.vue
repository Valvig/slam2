<template>
  <div class="tactip-container">
    <!-- UPPER ADS -->
    <ads class="adsUpBottom" :className="'upBottomAds'" />

    <!-- LEFT ADS -->
    <ads class="ads" :className="'leftAds'" />

    <!-- App container -->
    <v-container class="app-container">
      <div class="middle-container">
        <itemsToChoose class="itemToChoose" />
        <chosenItems class="chosenItems" />
        <itemsCard class="itemsCard" />
      </div>
    </v-container>

    <!-- RIGHT ADS -->
    <ads class="ads right" :className="'leftAds'" />

    <!-- UPPER ADS -->
    <ads class="adsUpBottom" :className="'upBottomAds'" />
  </div>
</template>

<script>
/* App parts */
import itemsCard from "@/components/itemsCard";
import chosenItems from "@/components/chosenItems";
import itemsToChoose from "@/components/itemsToChoose";
import ads from "@/components/ads";

export default {
  name: "App",
  components: {
    itemsCard,
    chosenItems,
    itemsToChoose,
    ads
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.tactip-container {
  width: 100%;
}

.app-container {
  color: #f8f0fb;
  background-color: #24252e;
  font-family: "Catamaran", sans-serif;
}

.app-container {
  position: relative;
  display: flex;
  padding: 0px !important;
}

.tuto {
  min-height: 100vh;
  width: 100vw;
}

.ads {
  position: fixed;
  top:0;
  height: 100vh;
  width: calc((100vw - 1200px) / 2);
}

.adsUpBottom {
  margin-top: 10px;
  min-height: 90px;
  width: 100%;
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
