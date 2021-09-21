<template>
  <div class="album">
    <song-list :musicList="hotSongs" :singer="singer"></song-list>
  </div>
</template>

<script>
// 引入歌曲列表组件
import SongList from "./MusicList.vue";

export default {
  name: "NeteaseCloudMusicAlbum",
  props: {
    // 专辑内容
    hotAlbums: {
      type: Array,
      required: true,
    },
    // 歌手
    singer: {
      type: String,
      required: true,
    },
    // 热门50首歌
    hotSongs: {
      type: Array,
      required: true,
    },
  },

  components: {
    SongList, //歌曲列表组件
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