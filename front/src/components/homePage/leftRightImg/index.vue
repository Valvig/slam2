<template>
  <v-row>
    <v-col v-if="left" cols="12" sm="6" class="imgdiv left">
      <img class="img" :src="getImgUrl(img,type)" :alt="imgAlt" />
    </v-col>
    <v-col cols="12" sm="6" class="texts">
      <h2>{{title}}</h2>
      <p>{{text}}</p>
    </v-col>
    <v-col v-if="!left" cols="12" sm="6" class="imgdiv right">
      <img class="img" :src="getImgUrl(img,type)" :alt="imgAlt" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "home-page-block",
  props: {
    title: String,
    text: String,
    left: Boolean,
    img: String,
    type: String,
    imgAlt: String,
  },
  data() {
    return {};
  },
  methods: {
    getImgUrl(name, type) {
      return require("@/assets/homePage/" + name + type);
    },
  },
};
</script>

<style lang="scss" scoped>
.imgdiv {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.right {
  justify-content: flex-end;
}

.left {
  justify-content: flex-start;
}

.img {
  width: 80%;
}

.texts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  p {
    color: #88a0a7;
    line-height: 1.8em;
  }

  h2 {
    color: #fff;
    font-size: 28px;
    font-weight: 600;
  }
}

.row {
  margin-top: 25px;
  margin-bottom: 25px;
}

@media (max-width: 600px) {
  .img {
    margin: auto;
  }

  .texts {
    text-align: center;

    h2 {
      margin: auto;
    }
  }

  // .imgdiv {
  //   height: 200px;
  // }

  // .img {
  //   height: 100%;
  //   width: auto;
  // }
}
</style>

