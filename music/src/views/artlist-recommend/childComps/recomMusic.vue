<template>
  <div class="recomMusic">
    <h4>推荐歌单</h4>
    <recom-music-item :recommends="recommends"></recom-music-item>
  </div>
</template>

<script>
// 网络请求
import { getRecommend } from "@/network/recommend";

// 列表组件
import RecomMusicItem from "./recomMusicItem";
export default {
  name: "NeteaseCloudMusicRecommusic",

  components: {
    RecomMusicItem, //推荐歌单列表
  },

  directives: {},

  data() {
    return {
      recommends: [], //推荐歌单
    };
  },
  created() {
    //  推荐歌单
    this.getRecommend();
  },
  mounted() {},

  methods: {
    // 推荐歌单数据
    async getRecommend() {
      const { data } = await getRecommend(10);
      // console.log(data.result);
      this.recommends = data.result;
      console.log(this.recommends);
    },
  },
};
</script>

<style lang="less" scoped>
.recomMusic {
  margin-bottom: 15px;
}
h4 {
  font-weight: 700;
  margin-bottom: 13px;
}
</style>