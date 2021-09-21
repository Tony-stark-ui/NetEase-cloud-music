<template>
  <div class="loading">
    <div
      class="load"
      element-loading-background="transparent"
      v-loading="loading"
    ></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NeteaseCloudMusicIndex",

  components: {},
  computed: {
    ...mapState(["loading"]),
  },

  directives: {},

  data() {
    return {
      // loading: true,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.load {
  width: 100%;
  height: 100%;
}
</style>