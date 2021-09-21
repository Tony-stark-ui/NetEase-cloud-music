<template>
  <div>
    <div class="songlist">
      <song-list :recommends="list.playlists"></song-list>
    </div>
  </div>
</template>

<script>
import SongList from "@/views/artlist-recommend/childComps/recomMusicItem";
export default {
  name: "NeteaseCloudMusicSingle",
  props: {
    list: {
      type: Object,
      required: true,
    },
  },

  components: {
    SongList,
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