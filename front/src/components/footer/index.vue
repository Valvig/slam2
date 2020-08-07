<template>
  <div class="footer">
    <div class="container">
      © TACTIP. All Rights Reserved.
      TACTIP isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
    </div>
  </div>
</template>

<script>
export default {
  name: "footer-app",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>

.footer {
  clear: both;
  position: relative;
  margin-top: 10px;
  padding: 15px 0;
  bottom: 0;
  width: 100%;
  font-size: 12px;
}
.container {
  width: 100%;
  padding-right: 16px;
  padding-left: 16px;
  margin-right: auto;
  margin-left: auto;
  max-width: 1140px;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
</style>

