<template>
  <div class="tactip-container">
    <!-- UPPER ADS -->
    <ads
      class="adsUpBottom"
      :className="'upBottomAds'"
      :dataAdClient="'ca-pub-3714641472243944'"
      :dataAdSlot="'2965759942'"
    />

    <!-- LEFT ADS -->
    <ads
      v-if="isAdShow()"
      class="ads"
      :className="'leftAds'"
      :dataAdClient="'ca-pub-3714641472243944'"
      :dataAdSlot="'1377346104'"
    />

    <!-- RIGHT ADS -->
    <ads
      v-if="isAdShow()"
      class="ads right"
      :className="'leftAds'"
      :dataAdClient="'ca-pub-3714641472243944'"
      :dataAdSlot="'3895698237'"
    />

    <!-- App container -->
    <v-container class="app-container">
      <div class="middle-container">
        <itemsToChoose class="itemToChoose" :isTop="isTooltipTop()" />
        <chosenItems class="chosenItems" />
        <itemsCard class="itemsCard" :isTop="isTooltipTop()" />
      </div>
    </v-container>

    <!-- Bottom ADS -->
    <ads
      class="adsUpBottom"
      :className="'upBottomAds'"
      :dataAdClient="'ca-pub-3714641472243944'"
      :dataAdSlot="'4195081132'"
    />
  </div>
</template>

<script>
/* App parts */
import itemsCard from "./itemsCard";
import chosenItems from "./chosenItems";
import itemsToChoose from "./itemsToChoose";
import ads from "./ads";

export default {
  name: "App",
  components: {
    itemsCard,
    chosenItems,
    itemsToChoose,
    ads,
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    getSizeWindow() {
      if (this.window.width > 1200) {
        return "XLARGE";
      } else if (this.window.width > 992) {
        return "LARGE";
      } else if (this.window.width > 768) {
        return "MEDIUM";
      } else if (this.window.width > 576) {
        return "SMALL";
      } else {
        return "XSMALL";
      }
    },
    isAdShow() {
      if (this.getSizeWindow() === "XLARGE") {
        return true;
      } else {
        return false;
      }
    },
    isTooltipTop() {
      if (this.getSizeWindow() !== "XLARGE") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
.tactip-container {
  width: 100%;
}

.app-container {
  color: #f8f0fb;
  font-family: "Catamaran", sans-serif;
}

.app-container {
  position: relative;
  display: flex;
  padding: 0px !important;
}

.ads {
  position: fixed;
  top: 0;
  height: 100vh;
  width: calc((100vw - 1160px) / 2);
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
  min-height: fit-content;
  // height: 20vh;
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
