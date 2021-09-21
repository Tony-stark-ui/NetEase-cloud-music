
<template>
  <div id="app">
    <router-view></router-view>
    <loading class="loading"></loading>
  </div>
</template>

<script>
import Loading from "./components/common/loading";
export default {
  name: "App",

  components: { Loading },

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
@import url("./style/index.css");
* {
  background-color: #fff;
}
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>