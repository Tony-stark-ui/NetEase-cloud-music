<template>
  <div class="result">
    <div class="title">
      搜索<span>{{ value }}</span
      >相关的结果
    </div>
    <!-- 单曲 -->
    <div v-if="success.songs" class="single">
      <div class="title"><span class="el-icon-ice-cream-round"></span>单曲</div>
      <div class="content">
        <ul>
          <li v-for="(item, index) in success.songs" @click="singleClick(item)">
            {{ item.name }}---{{ item.artists[0].name }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 歌手 -->
    <div v-if="success.artists" class="singer">
      <div class="title"><span class="el-icon-place"></span>歌手</div>
      <div class="content">
        <ul>
          <li
            v-for="(item, index) in success.artists"
            @click="singerClick(item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 专辑 -->
    <div v-if="success.albums" class="album">
      <div class="title"><span class="el-icon-bangzhu"></span>专辑</div>
      <div class="content">
        <ul>
          <li
            v-for="(item, index) in success.album"
            @click="albumClick(item.id)"
          >
            {{ item.name }}---{{ item.artist.name }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 歌单 -->
    <div v-if="success.playlists" class="songlist">
      <div class="title"><span class="el-icon-finished"></span>歌单</div>
      <div class="content">
        <ul>
          <li
            v-for="(item, index) in success.playlists"
            @click="songlistClick(item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 引入网络请求方法
import { getSongURl } from "@/network/musicDetail";
export default {
  name: "NeteaseCloudMusicSearchresult",
  props: {
    success: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },

  components: {},

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {
    async singleClick(item) {
      console.log(item);
      const { data } = await getSongURl(item.id);
      const url = data.data[0].url;
      const name = item.name;
      const artist = item.artists[0].name;
      const pic = item.artists[0].img1v1Url;
      const songid = item.id;
      const player = { name, url, artist, pic };
      this.$store.dispatch("player", player);
      this.$store.commit("songid", songid);
    },
    singerClick(id) {
      console.log(id);
      this.$router.push(`/artlist/${id}`);
    },

    songlistClick(id) {
      this.$router.push(`/musiclistdetail/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.result {
  font-size: 16px;
  color: #515a6e;
  ul {
    padding-left: 2em;
    li {
      margin: 5px 0;
      cursor: pointer;
    }
    li:hover {
      color: #0c73c2;
    }
  }
  .title {
    margin: 10px 0;
    span {
      color: #0c73c2;
      margin-right: 5px;
    }
  }
}
</style>