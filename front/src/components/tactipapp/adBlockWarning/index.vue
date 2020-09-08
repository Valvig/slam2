<template>
  <div class="adblockcontainer">
    <div class="adblock">
      <div class="logocontainer">
        <img class="logo" src="@/assets/logo/tactip.svg" alt="delete item" />
      </div>
      <div class="red">
        <font-awesome-icon icon="exclamation-triangle" />YOUR ADBLOCKER IS ON
        <font-awesome-icon icon="exclamation-triangle" />
      </div>
      <div class="message">
        TACTIP only survive with your love and some ads.
        To enjoy TACTIP please disable your adblocker and reload this page using button below.
      </div>
      <div class="reloadbutton">
        <v-btn v-on:click="reloadPage()" class="btn success">RELOAD PAGE</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu-app",
  data() {
    return {};
  },
  methods: {
    reloadPage() {
      document.location.reload(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.adblockcontainer {
  position: relative;
  height: 100%;
  width: 100%;
}

.adblock {
  position: absolute;
  background: white;
  height: 80%;
  width: 80%;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid black;
}

.red {
  text-align: center;
  font-size: 50px;
  margin-top: 35px;
  margin-bottom: 35px;
}

.message {
  height: 50%;
  font-size: 60px;
  color: black;
  text-align: center;
}

.logocontainer {
  padding: 5px;
  height: 10%;
  margin-top: 35px;
  margin-bottom: 35px;
}

.logo {
  height: 100%;
  display: block;
  margin: auto;
}

.reloadbutton {
  position: relative;
  width: 100%;
  height: 10%;
}

.btn {
  display: block;
  margin: auto;
  width: 30%;
  height: 100% !important;
}

@media (max-width: 1024px) {
  .message {
    font-size: 50px;
  }
}

@media (max-width: 1024px) {
  .message {
    font-size: 45px;
  }

  .red {
    font-size: 40px;
  }
}

@media (max-width: 425px) {
  .message {
    font-size: 30px;
  }

  .red {
    font-size: 30px;
  }

  .btn {
    width: 100%;
  }
}

@media (max-width: 414px) {
  .message {
    font-size: 20px !important;
  }

  .red {
    font-size: 15px;
  }
}

@media (max-height: 800px) {
  .message {
    font-size: 50px;
  }

  .logocontainer {
    margin-top: 15px;
  }
}

@media (max-height: 732px) {
  .message {
    font-size: 27px;
  }
}

@media (max-height: 640px) {
  .message {
    font-size: 25px;
  }

  .logocontainer {
    margin-top: 15px;
  }
}

@media (max-height: 480px) {
  .red {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .logocontainer {
    margin-top: 15px;
    margin-bottom: 15px;
  }
}

@media (max-width: 280px) {
  .message {
    font-size: 20px;
  }

  .red {
    font-size: 15px;
  }
}
</style>
