<template>
  <div class="easyToUse">
    <v-row class="easyToUseRow">
      <v-col class="col">
        <h2 class="easyToUse-title">Easy to use and powerful</h2>
      </v-col>
    </v-row>
    <v-row class="easyToUseRow">
      <v-col class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
        <div class="easyToUse-icon">
          <img class="img" src="@/assets/homePage/click.svg" alt="Crown" />
        </div>
        <h2>Select your items</h2>
      </v-col>
      <v-col class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
        <div class="easyToUse-icon">
          <img class="img" src="@/assets/homePage/bestChoice.svg" alt="Crown" />
        </div>
        <h2>Get best items for your team</h2>
      </v-col>
      <v-col class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
        <div class="easyToUse-icon">
          <img class="img" src="@/assets/homePage/winner.svg" alt="Crown" />
        </div>
        <h2>Win more games !</h2>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "easy-to-use",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.easyToUse {
  margin-top: 100px;
  margin-bottom: 100px;
}

.col h2,
.col p {
  text-align: center;
  color: white;
}

.col p {
  font-size: 70px;
  font-weight: bolder;
  margin: 0;
}

.easyToUse-title {
  font-size: 28px;
  line-height: 1.3em;
}

.easyToUse-icon {
  height: 120px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .img {
    height: 100%;
  }
}

.easyToUseRow {
  display: flex;
  flex-wrap: wrap;
}

</style>

