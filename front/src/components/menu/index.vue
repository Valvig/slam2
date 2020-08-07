<template>
  <v-app-bar dense class="menu-app">
    <img class="logo" src="@/assets/logo/tactipWhite.svg" alt="delete item" />
    <v-spacer></v-spacer>
    <v-switch v-model="disabled" class="ma-2" label="Tutorial"></v-switch>
  </v-app-bar>
</template>

<script>
export default {
  name: "menu-app",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.menu-app {
  background-color: #4d5061 !important;
}

.menu-text {
  color: #f8f0fb;
}

.logo {
  height: 60%;
}
</style>
