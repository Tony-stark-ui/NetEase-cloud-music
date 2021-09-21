<template>
  <div class="header">
    <!-- 左边图片 -->
    <div class="leftImg">
      <img :src="headerContent.coverImgUrl" alt="" />
    </div>
    <!-- 中间内容 -->
    <div class="content">
      <!-- 标题 -->
      <div class="title">
        <span><el-tag type="danger">歌单</el-tag></span>
        <span>{{ headerContent.name }}</span>
      </div>
      <!-- 歌单创作者 -->
      <div class="user">
        <img :src="headerContent.creator.avatarUrl" alt="" />
        <span class="text">{{ headerContent.creator.nickname }}</span>
        <span class="createTime"
          >创建时间：{{ headerContent.createTime | relativeTime }}</span
        >
      </div>
      <!-- 按钮 -->
      <div class="btns">
        <!-- 播放全部 -->
        <el-button
          type="danger"
          class="player"
          icon="el-icon-video-play"
          @click="playMusic"
          >播放全部</el-button
        >
        <!-- 收藏 -->
        <el-button icon="el-icon-folder-add"
          >收藏({{ headerContent.subscribedCount }})</el-button
        >
        <!-- 分享 -->
        <el-button icon="el-icon-thumb">分享</el-button>
      </div>
      <!-- 标签 -->
      <div class="tags">
        标签：<span v-for="(tages, index) in headerContent.tags" :key="index"
          >{{ tages }}/</span
        >
      </div>
      <div class="brief">简介：{{ headerContent.description }}</div>
    </div>
    <div class="right">
      <span>
        <div>歌曲数</div>
        <div>{{ headerContent.trackCount }}</div>
      </span>
      <i></i>
      <span>
        <div>播放数</div>
        <div>{{ getPlayCount }}</div>
      </span>
    </div>
  </div>
</template>

<script>
import { getSongURl } from "@/network/musicDetail";
export default {
  name: "NeteaseCloudMusicDetailheader",
  props: {
    headerContent: {
      type: Object,
      required: true,
    },
    musicList: {
      type: Array,
      required: true,
    },
  },

  components: {},

  directives: {},

  data() {
    return {
      playList: [],
    };
  },
  created() {
    console.log(this.headerContent);
  },
  mounted() {},
  computed: {
    getPlayCount() {
      return this.headerContent.trackCount.toString().slice(0, 2) + "万";
    },
  },

  methods: {
    // 播放全部
    async playMusic() {
      for (let i = 0; i < this.musicList.length; i++) {
        const { data } = await getSongURl(this.musicList[i].id);
        this.playList.push({
          name: this.musicList[i].name,
          url: data.data[0].url,
          artist: this.musicList[i].artist,
          pic: this.musicList[i].pic,
        });
      }
      this.$store.dispatch("playList", this.playList);
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  .leftImg {
    width: 240px;
    height: 240px;
    img {
      width: 100%;
    }
  }
  .content {
    margin: 0 50px;
    .user {
      display: flex;
      align-items: center;
      margin: 10px 0;
      img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin-right: 15px;
      }
    }
    .title {
      span {
        margin-right: 5px;
      }
      font-size: 18px;
      font-weight: 700;
    }
    .btns {
      margin-bottom: 18px;
      .el-button {
        width: 150px;
        border-radius: 10px;
      }
      .player {
        background-color: red;
      }
    }
    .tags {
      span {
        color: #0c89d4;
      }
      margin-bottom: 5px;
    }
  }
  .right {
    display: flex;
    flex-wrap: nowrap;
    div {
      width: 50px;
    }
    i {
      display: inline-block;
      width: 2px;
      height: 40px;
      background-color: #ccc;
      margin: 0 5px;
    }
  }
}
</style>