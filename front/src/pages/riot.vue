<template>
  <div>{{riotTxt}}</div>
</template>

<script>
import riot from "../../public/riot.txt";

export default {
  data() {
    return {
      riotTxt: riot,
    };
  },
};
</script>