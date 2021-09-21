<template>
  <div>
    <div class="mv">
      <mv-item :artists="list.mvs"></mv-item>
    </div>
  </div>
</template>

<script>
import MvItem from "@/views/artlist-mv/childComps/MvItem";
export default {
  name: "NeteaseCloudMusicSingle",
  props: {
    list: {
      type: Object,
      required: true,
    },
  },

  components: {
    MvItem,
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