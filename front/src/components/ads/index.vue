<template>
  <div>
    <div :class="className">
      <Adsense
        data-ad-client="2567669200157304"
        data-ad-slot="1234567890"
        data-full-width-responsive="true"
      ></Adsense>
    </div>
  </div>
</template>

<script>
export default {
  name: "ads",
  props: {
    className: String,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.leftAds {
  position: absolute;
  background: red;
  width: 160px;
  height: 600px;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.upBottomAds {
  position: absolute;
  background: red;
  width: 100%;
  max-width: 900px;
  height: 90px;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>

