<template>
  <v-app id="whatIsTactip">
    <div class="textWIT">
      <p>Tactip is a useful tool for Teamfight Tactics players. With Tactip you can get the best strategy for your games. You can find a lot of information and guide about Teamfight Tactics himself in our different pages but our most powerful tool is the "Item Finder".</p>

      <h1>What is "Item Finder" ?</h1>
      <p>"Item Finder" will help you to get the best value of the items given in game. While playing Teamfight Tactics, it can be hard to make a choice about which items to craft and which character to use them on.</p>
      <p></p>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "what-is-tactip",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
#whatIsTactip {
  width: 100%;
  height: 100%;
  color: #f8f0fb;
  font-family: "Catamaran", sans-serif;
}

@media (min-width: 576px) {
  .textWIT {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .textWIT {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .textWIT {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .textWIT {
    max-width: 1140px;
  }
}

.textWIT {
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
