<template>
  <!-- 歌单 -->
  <div class="song-list">
    <div class="title">热门标签：</div>
    <div class="narbar">
      <!-- 分类标签 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ pitch === "" ? "全部" : pitch
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in sub"
            :key="index"
            @click.native="optionClick(item.name)"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 热门菜单 -->
      <div class="hots">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) in hot"
            :key="index"
            :label="item.name"
            :name="index.toString()"
          >
            <music-item :recommends="playlists"></music-item
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 分页器 -->
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @next-click="nextClick"
        @prev-click="prevClick"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 引入网络请求方法
import {
  _getCatList,
  _getMusicListHot,
  _getHighquality,
  _getPlayList,
} from "@/network/song-list";

// 引入歌单列表组件
import MusicItem from "@/views/artlist-recommend/childComps/recomMusicItem";

export default {
  name: "NeteaseCloudMusicIndex",

  components: {
    MusicItem, //歌单列表组件
  },

  directives: {},

  data() {
    return {
      activeName: "0",
      language: {}, //语种
      sub: [], //全部风格分类
      hot: [], //热门歌单
      pitch: "华语", //选中的标签
      limit: 50, //取出歌单数量
      playlists: [], //tag歌单
      offset: 0, //页数
    };
  },
  created() {
    //  歌单分类
    this.getCatList();
    // 热门歌单
    this.getMusicListHot();
    // 不同tag的歌单
    // this.getHighquality();
    // 全部歌单
    this.getPlayList();
  },

  mounted() {},

  methods: {
    // 获取歌单分类
    async getCatList() {
      const { data } = await _getCatList();
      this.language = data.categories;
      this.sub = data.sub;
    },
    // 获取热门歌单
    async getMusicListHot() {
      const { data } = await _getMusicListHot();
      this.hot = data.tags;
    },
    // 获取不同tag歌单
    // async getHighquality() {
    //   const { data } = await _getHighquality(this.pitch, this.limit);
    //   console.log(data);
    //   this.playlists = data.playlists;
    // },
    // 获取全部精选歌单
    async getPlayList() {
      const { data } = await _getPlayList(this.pitch, this.limit, this.offset);

      this.playlists = data.playlists;
    },
    // 点击tab栏
    handleClick(e) {
      this.pitch = e.label;
      this.getPlayList();
    },
    // 选择分类
    optionClick(name) {
      this.pitch = name;
      this.getPlayList();
    },
    // 上一页
    prevClick() {
      if (this.offset > 1) {
        this.offset -= 50;
      }
      this.getPlayList();
    },
    // 下一页
    nextClick(index) {
      this.offset += 50;

      this.getPlayList();
    },
  },
};
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
/deep/ .el-tabs__item {
  font-size: 18px;
  margin-bottom: 5px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.song-list {
  position: relative;
  .title {
    position: absolute;
    left: -100px;
    top: 45px;
  }
  .narbar {
    .hots {
      margin-top: 15px;
    }
  }
  .page {
    margin: 10px 0;
    text-align: center;
  }
}
</style>