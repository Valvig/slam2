<template>
  <v-app id="app">
    <!-- MENU -->
    <menuApp class="menu" />

    <router-view class="app"></router-view>

    <!-- FOOTER -->
    <footerApp class="footer" />

    <footer>
      <cookie-law theme="blood-orange">
        <div slot="message">
          <p>We use cookies to understand how you use our site and to improve your experience.</p>
          <div class="cookie-text">
            <p>This includes personalizing content and advertising. To learn more about our privacy policy : </p>
            <router-link to="privacy" class="link"><v-btn>Privacy politics</v-btn></router-link>
          </div>
        </div>
      </cookie-law>
    </footer>
  </v-app>
</template>

<script>
import menuApp from "@/components/menu";
import footerApp from "@/components/footer";
import CookieLaw from "vue-cookie-law";

export default {
  name: "app",
  watch: {
    $route() {
      document.title = "TFT Tool - Tactip";
    },
  },
  components: {
    menuApp,
    footerApp,
    CookieLaw,
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap");

$menuHeight: 48px;

.menu {
  z-index: 1;
}

.footer {
  background-color: #4d5061;
}

.app {
  background-color: #041c39;
}

.cookie-text {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  p {
    margin: 0px !important;
  }

  .link {
    margin-left: 5px;
    text-decoration: none;
  }
}
</style>