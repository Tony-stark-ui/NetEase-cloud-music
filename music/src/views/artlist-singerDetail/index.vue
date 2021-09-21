<template>
  <!-- g歌手详情 -->
  <div class="singer-detail">
    <div class="header">
      <!-- 歌手图片 -->
      <div class="left">
        <img :src="singerDetail.cover" alt="" />
      </div>
      <!-- 歌手介绍 -->
      <div class="right">
        <div class="title">
          <span class="tag"><el-tag type="danger">歌手</el-tag></span>
          <span class="name">{{ singerDetail.name }}</span>
        </div>
        <div class="content">
          <ul>
            <li>
              <span>单曲数：</span>
              {{ singerDetail.musicSize }}
            </li>
            <li>
              <span>专辑数：</span>
              {{ singerDetail.albumSize }}
            </li>
            <li>
              <span>MV数：</span>
              {{ singerDetail.mvSize }}
            </li>
            <li>
              <span>简介：</span>
              {{ singerDetail.briefDesc }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="body">
      <!-- tab栏 -->
      <div class="tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="专辑" name="first">
            <!-- 歌曲列表 -->
            <album
              :hotAlbums="hotAlbums"
              :singer="singerDetail.name"
              :hotSongs="hotSongs"
            ></album>
          </el-tab-pane>
          <el-tab-pane label="MV" name="second">
            <mv :mvs="mvs"></mv>
          </el-tab-pane>
          <el-tab-pane label="歌手详情" name="third">
            <detail
              :singerDetail="singerDetail"
              :DescDetail="DescDetail"
            ></detail>
          </el-tab-pane>
          <el-tab-pane label="相似歌手" name="fourth">
            <similarity :artists="artists"></similarity>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// 引入网络请求方法
import {
  _getArtistDescDetail,
  getSingerDetail,
  getSingerAblum,
  _getAlbum,
  _getArtistHot50,
  _getArtistMv,
  getSimArist,
} from "@/network/artist";
// 引入tab子组件
import Album from "./childComps/Album.vue";
import Mv from "./childComps/Mv.vue";
import Detail from "./childComps/Detail.vue";
import Similarity from "./childComps/Similarity.vue";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  name: "NeteaseCloudMusicIndex",

  components: {
    Album, //专辑
    Mv, //mv
    Detail, //详情
    Similarity, //相似歌手
  },

  directives: {},

  data() {
    return {
      singerDetail: {}, //歌手详情数据
      activeName: "first", //tab栏选中状态
      hotAlbums: [], //专辑数据
      hotSongs: [], //热门50首歌
      mvs: [], //歌手mv
      DescDetail: {}, //歌手描述
      artists: [], //相似歌手
    };
  },
  created() {
    //歌手详情数据
    this.getSingerDetail();
    // 歌手专辑
    this.getSingerAblum();
    // 获取热门50首歌
    this.getArtistHot50();
    // 获取歌手mv
    this.getArtistMv();
    // 歌手描述
    this.getArtistDescDetail();
    // 获取相似歌手
    this.getSimArist();
  },
  mounted() {},
  computed: {},

  methods: {
    // 获取歌手详情
    async getSingerDetail() {
      const { data } = await getSingerDetail(this.id);
      console.log(data);
      this.singerDetail = data.data.artist;
    },
    // 获取歌手专辑
    async getSingerAblum() {
      const { data } = await getSingerAblum(this.id);
      this.hotAlbums = data.hotAlbums;
    },
    // 获取热门50首歌
    async getArtistHot50() {
      const { data } = await _getArtistHot50(this.id);
      this.hotSongs = data.songs;
    },
    // 获取歌手mv
    async getArtistMv() {
      const { data } = await _getArtistMv(this.id);
      this.mvs = data.mvs;
    },
    // 歌手描述
    async getArtistDescDetail() {
      const { data } = await _getArtistDescDetail(this.id);
      this.DescDetail = data;
    },
    // 相似歌手
    async getSimArist() {
      const { data } = await getSimArist(this.id);
      this.artists = data.artists;
    },
  },
};
</script>

<style lang="less" scoped>
.singer-detail {
  .header {
    display: flex;
    .left {
      img {
        width: 220px;
        height: 180px;
      }
    }
    .right {
      margin-left: 40px;
      .title {
        .el-tag {
          font-size: 16px;
          font-weight: 700;
        }
        .name {
          font-size: 16px;
          font-weight: 700;
          margin-left: 10px;
        }
      }
      .content {
        margin-top: 15px;
        ul {
          li {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            span {
              color: #0c73c2;
            }
            margin-top: 10px;
          }
        }
      }
    }
  }
  .body {
    margin-top: 30px;
    .tab {
      /deep/ .el-tabs__item {
        padding: 0 40px;
        font-size: 18px;
      }
    }
  }
}
</style>