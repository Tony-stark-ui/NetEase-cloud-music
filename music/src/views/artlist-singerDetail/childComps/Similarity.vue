<template>
  <div class="similarity">
    <singer-item :artists="artists"></singer-item>
  </div>
</template>

<script>
// 引入歌手组件
import SingerItem from "../../artlist-singer/childComps/SingerItem.vue";
export default {
  name: "NeteaseCloudMusicAlbum",
  props: {
    artists: {
      type: Array,
      required: true,
    },
  },

  components: {
    SingerItem, //歌手组件
  },

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
</style>