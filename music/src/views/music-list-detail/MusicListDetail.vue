<template>
  <div class="musiclistdetail">
    <!-- 头部 -->
    <detail-header
      :musicList="musicList"
      :headerContent="headerContent"
    ></detail-header>
    <!-- 播放列表 -->
    <play-list
      class="list"
      :musicList="musicList"
      :id="id"
      :commentCount="commentCount"
    ></play-list>
  </div>
</template>

<script>
// 引入头部组件
import DetailHeader from "./childComps/DetailHeader.vue";
// 引入播放列表tab栏
import PlayList from "./childComps/PlayList.vue";

// 引入网络请求方法
import { getDetail, _getSongsDetail, songDetail } from "@/network/musicDetail";

export default {
  name: "NeteaseCloudMusicSonglistdetail",
  props: {
    // 歌单id
    id: {
      type: String,
      required: true,
    },
  },

  components: {
    DetailHeader, //头部组件
    PlayList, //播放列表
  },
  created() {
    // 获取歌单详情数据
    this.getDetail();
  },

  directives: {},

  data() {
    return {
      headerContent: {}, //头部详情信息
      playList: [], //歌曲列表
      musicList: [], //歌曲列表
      commentCount: 0, //歌曲评论数
    };
  },

  mounted() {},

  methods: {
    // 获取歌单详情数据
    async getDetail() {
      const { data } = await getDetail(this.id);
      console.log(data);
      this.commentCount = data.playlist.commentCount;
      this.headerContent = data.playlist;
      this.playList = data.privileges;
      // 获取歌曲列表
      const trackIds = data.playlist.trackIds;
      for (let i = 0, length = trackIds.length; i < length; i++) {
        _getSongsDetail(trackIds[i].id).then((res) => {
          let song = new songDetail(res.data.songs);
          this.musicList.push(song);
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  margin-top: 30px;
}
</style>