<template>
  <v-app-bar dense class="menu-app">
    <img
      v-on:click="goToHomePage()"
      class="logo"
      src="@/assets/logo/tactipWhite.svg"
      alt="delete item"
    />
    <v-spacer></v-spacer>
    <v-switch v-if="show" v-model="tutorial" info class="ma-2 tutorial" label="Tutorial"></v-switch>
  </v-app-bar>
</template>

<script>
export default {
  name: "menu-app",
  watch: {
    tutorial() {
      this.$store.commit("tutorial");
    },
    $route(to) {
      if (to.path == "/tactip") {
        this.show = true;
      } else {
        this.show = false;
      }
    },
  },
  data() {
    return {
      tutorial: this.$store.state.tutorial,
      show: false,
    };
  },
  methods: {
    goToHomePage() {
      this.$router.push("/");
    }
  },
  mounted() {
    if (this.$route.path == "/tactip") {
      this.show = true;
    }
  },
};
</script>

<style lang="scss" scoped>
$menuHeight: 48px;

.menu-app {
  background-color: #4d5061 !important;
}

.menu-text {
  color: #f8f0fb;
}

.logo {
  height: 60%;
  cursor: pointer;
}

.tutorial {
  height: 25px;
}
</style>
