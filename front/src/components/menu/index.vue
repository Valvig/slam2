<template>
  <v-app-bar dense class="menu-app">
    <img class="logo" src="@/assets/logo/tactipWhite.svg" alt="delete item" />
    <v-spacer></v-spacer>
    <v-switch v-model="tutorial" info class="ma-2 tutorial" label="Tutorial"></v-switch>
  </v-app-bar>
</template>

<script>
export default {
  name: "menu-app",
  watch: {
    tutorial() {
      this.$store.commit("tutorial");
    },
  },
  data() {
    return {
      tutorial: this.$store.state.tutorial,
    };
  },
  mounted() {},
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
}

.tutorial {
  height: 25px;
}
</style>
