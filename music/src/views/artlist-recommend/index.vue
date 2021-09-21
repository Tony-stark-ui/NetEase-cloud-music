<template>
  <!-- 推荐 -->
  <div class="recommend">
    <!-- 轮播图 -->
    <swiper :banners="banners"></swiper>

    <!-- 推荐歌单 -->
    <recom-music></recom-music>

    <!-- 独家放送 -->
    <exclusive :exclusive="exclusive"></exclusive>

    <!-- 最新音乐 -->
    <new-west-music :newMusic="newMusic"></new-west-music>
  </div>
</template>

<script>
//网络请求方法
import { banner, Exclusive, getNewMusic } from "@/network/recommend";

// 引入轮播图
import Swiper from "../../components/common/swiper";
// 推荐歌单
import RecomMusic from "./childComps/recomMusic.vue";
// 独家放送
import exclusive from "./childComps/Exclusive.vue";
// 最新音乐
import NewWestMusic from "./childComps/NewWestMusic.vue";

export default {
  name: "NeteaseCloudMusicIndex",

  components: {
    Swiper, //轮播图
    RecomMusic, //推荐歌单
    exclusive, //独家放送
    NewWestMusic, //最新音乐
  },

  directives: {},

  data() {
    return {
      banners: [], //轮播图数据
      exclusive: [], //独家放送数据
      newMusic: [], //最新音乐
    };
  },
  created() {
    // 轮播图数据
    this.getBanner();

    //  独家放送数据
    this.getExclusive();

    // 最新音乐
    this.getNewMusic();
  },
  mounted() {},

  methods: {
    // 获取轮播图数据
    async getBanner() {
      const { data } = await banner();
      this.banners = data.banners;
    },
    // 独家放送数据
    async getExclusive() {
      const { data } = await Exclusive();
      this.exclusive = data.result;
    },
    // 每日新歌数据
    async getNewMusic() {
      const { data } = await getNewMusic();
      this.newMusic = data.result;
    },
  },
};
</script>

<style lang="less" scoped>
</style>