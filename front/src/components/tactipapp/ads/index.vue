<template>
  <div>
    <div :class="className">
      <!-- Bottom and Top Ads -->
      <Adsense
        v-if="className == 'upBottomAds'"
        :data-ad-client="dataAdClient"
        :data-ad-slot="dataAdSlot"
        data-ad-format="auto"
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
    dataAdClient: String,
    dataAdSlot: String
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.leftAds {
  position: absolute;
  width: 160px;
  height: 600px;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.upBottomAds {
  position: absolute;
  width: 100%;
  max-width: 900px;
  height: 90px;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>

