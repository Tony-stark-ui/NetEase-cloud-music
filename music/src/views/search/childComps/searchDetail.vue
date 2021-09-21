<template>
  <div class="searchDetail">
    <div class="title">
      <span>{{ value }}</span>
      共找到
      <span>{{ list.length }}</span>
      个
      <span>{{ text }}</span>
    </div>

    <!-- tab组件 -->
    <div class="tab-item" @tab-click="tabClick">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="单曲" name="first">
          <single :list="list"></single>
        </el-tab-pane>

        <el-tab-pane label="专辑" name="second">
          <album :list="list"></album>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="third">
          <singer :list="list"></singer>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="fourth ">
          <song-list :list="list"></song-list>
        </el-tab-pane>
        <el-tab-pane label="MV" name="five">
          <mv :list="list"></mv>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { types } from "@/components/common/search/data";
// 引入网络请求方法
import { _Search } from "@/network/search";
// 引入tab组件
import Single from "./Single.vue";
import Singer from "./Singer.vue";
import SongList from "./SongList.vue";
import Album from "./Album.vue";
import Mv from "./Mv.vue";
export default {
  name: "NeteaseCloudMusicSearchdetail",
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  components: {
    Mv,
    Album,
    SongList,
    Singer,
    Single,
  },

  directives: {},

  data() {
    return {
      type: 1,
      types,
      list: {}, //搜索列表
      text: "单曲",
      activeName: "first",
    };
  },

  created() {
    // 获取搜索数据
    this.Search();
  },
  computed: {},

  mounted() {},

  methods: {
    // 搜索数据
    async Search() {
      const data = await _Search(this.value, this.type);
      console.log(data);
      this.list = data.data.result;
    },
    // 切换tab栏
    tabClick(event) {
      this.type = parseInt(this.types[event.index].value);
      this.text = this.types[event.index].content;
      this.Search();
    },
  },
};
</script>

<style lang="less" scoped>
.searchDetail {
  .active {
    color: #4277c2;
    border-bottom: 2px solid #4277c2;
  }
  .title {
    span {
      color: #4277c2;
      margin: 0 3px;
    }
    span:nth-child(-n + 1) {
      font-size: 20px;
    }
  }
  .tab-item {
    margin-top: 20px;
  }
}
</style>