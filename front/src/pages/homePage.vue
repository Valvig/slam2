<template>
  <v-app id="homepage">
    <div class="textHomePage">
      <div class="test">
        <intro />
        <easyToUse />
      </div>
      <leftRightImg
        v-for="(block, index) in blocks"
        :key="block.title + index"
        :title="block.title"
        :text="block.text"
        :left="block.left"
        :img="block.img"
        :type="block.type"
        :imgAlt="block.imgAlt"
      />
    </div>
  </v-app>
</template>

<script>
import leftRightImg from "@/components/homePage/leftRightImg";
import intro from "@/components/homePage/intro";
import easyToUse from "@/components/homePage/easyToUse";

export default {
  name: "home-page",
  components: {
    leftRightImg,
    intro,
    easyToUse,
  },
  data() {
    return {
      blocks: {
        "1": {
          title: "Every day Analysis",
          text:
            "TACTIP's datas are updated every night with thousands of Diamonds/Masters/Grand Masters/Challengers games.",
          left: true,
          img: "analysis",
          type: ".png",
          imgAlt: "Furryhorn analysing the ladder",
        },
        "2": {
          title: "Best items",
          text:
            "Tactip's tool will help you to get the best items base on what teamfight tactics gave you.",
          left: false,
          img: "bestItems",
          type: ".png",
          imgAlt: "Pengu with his best sword",
        },
        "3": {
          title: "Riot Games Approved",
          text:
            "Tactip is 100% legit and won't get you ban ! Play better and play safe.",
          left: true,
          img: "riotGames",
          type: ".svg",
          imgAlt: "Riot Games Approved",
        },
      },
    };
  },
};
</script>

<style lang="scss">
#homepage {
  width: 100%;
  height: 100%;
  color: white;
  font-family: "Catamaran", sans-serif;
}

.test {
  background-image: url("../assets/homePage/floating2.png");
  background-position: right;
  background-size: 30%;
  height: fit-content;
}

.textHomePage {
  width: 100%;
}

@media (min-width: 576px) {
  .textHomePage {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .textHomePage {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .textHomePage {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .textHomePage {
    max-width: 1140px;
  }
}

.textHomePage {
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;

  p {
    font-size: 25px;
  }

  h1 {
    font-size: 35px;
    font-weight: bold;
  }
}
</style>
