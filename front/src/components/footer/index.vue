<template>
  <div>
    <div class="row container-links">
      <div class="col border-col"><btn v-on:click="routeTo('tactip')" class="link">TFT Tool</btn></div>
      <div class="col border-col"><btn v-on:click="routeTo('privacy')" class="link">Privacy Policy</btn></div>
      <div class="col "><btn v-on:click="routeTo('contact')" class="link">Contact</btn></div>
    </div>
    <div class="container">
      <div class="footer-text">
        © TACTIP. All Rights Reserved.
        TACTIP isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
      </div>
      <div class="footer-img">
        <img class="img" src="@/assets/footer/platform.png" alt="Teamfight Tactics platform" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer-app",
  data() {
    return {};
  },
  methods: {
    routeTo(name) {
      window.scrollTo(0,0); 
      this.$router.push(name)
    }
  },
};
</script>

<style lang="scss" scoped>
.footer {
  clear: both;
  position: relative;
  padding: 15px 0;
  bottom: 0;
  width: 100%;
  font-size: 14px;
  color: white;
}

.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 1140px;
  display: flex;
  flex-wrap: wrap;
  height: 125px;
}

.footer-text {
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
}

.footer-img {
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;

  img {
    height: 100%;
  }
}

.container-links {
  margin: auto;

  .col {
    display: flex;
    justify-content: center;

    .link {
      text-decoration: none;
      color: white;
      background: none;
      cursor: pointer;
    }
  }

  .border-col {
    border-right: 1px solid rgba(255, 255, 255, 0.37);
  }
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }

  .container-links {
    max-width: 270px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }

  .container-links {
    max-width: 360px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }

  .container-links {
    max-width: 480px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }

  .container-links {
    max-width: 570px;
  }
}
</style>

