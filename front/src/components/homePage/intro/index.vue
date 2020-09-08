<template>
  <div class="row introHP">
    <div class="intro-logo">
      <img class="logo" src="@/assets/logo/tactipWhite.svg" alt="delete item" />
    </div>
    <div class="titleDiv">
      <h1 class="introTitle">TEAMFIGHT TACTICS BEST TOOL</h1>
    </div>
    <p class="middleText">Get the best items for your next win !</p>
    <p
      class="bottomText"
    >Tactip will help you to get the best strategy for your games. It will extract the best value of each items to create the perfect team comp !</p>
    <div class="buttonDiv">
      <v-btn class="btn start">
        <router-link class="router-btn" to="/tactip">Start NOW</router-link>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "intro",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.titleDiv {
  display: flex;
}

.buttonDiv {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.crown {
  height: 50px;

  .crownImg {
    height: 100%;
  }
}

.introHP {
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: center;
  border-radius: 5px;
  padding: 20px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}

.introTitle {
  font-size: 36px;
  text-align: center;
}

.middleText,
.bottomText {
  width: 100%;
  text-align: center;
}

.middleText {
  color: #4392f1;
  font-size: 21px;
}

.bottomText {
  font-size: 16px;
}

.start {
  width: 30%;
  height: 50px !important;
  background-color: #549af0 !important;
  font-size: 20px;
  font-weight: bold;
  color: white;
}

.intro-logo {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;

  img {
    height: 100%;
  }
}

.router-btn {
  text-decoration: none;
  color: white;
}

@media (max-width: 995px) {
  .start {
    width: 35%;
  }
}

@media (max-width: 768px) {
  .start {
    width: 50%;
  }
}

@media (max-width: 570px) {
  .start {
    font-size: 17px;
  }
}

@media (max-width: 425px) {
  .start {
    width: 70%;
  }
}
</style>

