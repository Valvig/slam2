   <template>
  <div>
    <div class="adsContainer">
      <Adsense data-ad-client="2567669200157304" data-ad-slot="1234567890"></Adsense>
    </div>
  </div>
</template>

<script>
export default {
  name: "ads",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.adsContainer {
  position: absolute;
  background: red;
  width: 160px;
  height: 600px;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

