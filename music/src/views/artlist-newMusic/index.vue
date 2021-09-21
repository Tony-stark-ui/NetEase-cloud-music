<template>
  <div class="new-music">
    <!-- 选项栏 -->
    <div class="title">
      <ul>
        <li
          :class="type === item.value ? 'active' : ''"
          v-for="item in types"
          :key="item.value"
          @click="itemClick(item.value)"
        >
          {{ item.content }}
        </li>
      </ul>
    </div>
    <!-- 歌曲列表 -->
    <song-list :musicList="songs"></song-list>
  </div>
</template>

<script>
// 引入网络请求方法
import { _getTopSongs } from "@/network/newMusic";
import { types } from "./data";
// 引入歌曲列表组件
import SongList from "./childComps/songList.vue";
export default {
  name: "NeteaseCloudMusicIndex",

  components: {
    SongList, //歌曲列表组件
  },

  directives: {},

  data() {
    return {
      type: 0, //歌曲类型
      types,
      songs: [], //歌曲列表
    };
  },
  created() {
    // 获取最新音乐
    this.getTopSongs();
  },

  mounted() {},

  methods: {
    // 获取最新音乐
    async getTopSongs() {
      const { data } = await _getTopSongs(this.type);
      this.songs = data.data;
    },
    // 点击切换地区
    itemClick(value) {
      this.type = value;
      this.getTopSongs();
    },
  },
};
</script>

<style lang="less" scoped>
.new-music {
  .active {
    color: #2d9af4;
    border-bottom: 2px solid #2d9af4;
  }
  .title {
    ul {
      display: flex;
      border-bottom: 1px solid #ececec;
      li:hover {
        color: #2d9af4;
      }
      li {
        padding: 3px 0;
        margin-right: 10px;
        font-size: 18px;
      }
    }
  }
}
</style>