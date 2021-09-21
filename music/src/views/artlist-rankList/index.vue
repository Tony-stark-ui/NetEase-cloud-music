<template>
  <!-- 排行榜 -->
  <div class="rank-list">
    <!-- 官方榜 -->
    <div class="title">官方榜</div>
    <div class="rank-list-item">
      <hotlist :hots="hotlist[0]"></hotlist>
      <hotlist :hots="hotlist[1]" bgc="#4AB9C7"></hotlist>
      <hotlist :hots="hotlist[2]" bgc="#E2547F"></hotlist>
      <hotlist :hots="hotlist[3]" bgc="#CA684C"></hotlist>
      <hotlist :hots="hotlist[4]" bgc="#974BCA"></hotlist>
    </div>
    <!-- 全球榜 -->
    <div class="global">
      <div class="title">全球榜</div>
      <div class="global-item">
        <global-item :recommends="list.slice(4)"></global-item>
      </div>
    </div>
  </div>
</template>

<script>
// 引入网络请求方法
import { _getRankList } from "@/network/ranklist";

// 引入组件
import Hotlist from "./childComps/Hotlist.vue";
import GlobalItem from "@/views/artlist-recommend/childComps/recomMusicItem";

export default {
  name: "NeteaseCloudMusicIndex",

  components: {
    Hotlist, //前五个热门榜单组件
    GlobalItem, //全球榜组件
  },

  directives: {},

  data() {
    return {
      list: [], //所有排行榜
      hotlist: [], //官方榜
    };
  },
  created() {
    //  获取排行榜数据
    this.getRankList();
  },

  mounted() {},

  methods: {
    // 获取排行榜数据
    getRankList() {
      _getRankList().then((res) => {
        this.list = res.data.list;
        let hotlist = [];
        for (let i = 0; i < 5; i++) {
          hotlist.push(this.list[i]);
        }
        this.hotlist = hotlist;
        console.log(this.hotlist);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.rank-list {
  .title {
    font-size: 18px;
    font-weight: 700;
    padding-left: 20px;
  }
  .rank-list-item {
    display: flex;
    flex-wrap: wrap;
  }
  .global {
    .title {
      margin-top: 20px;
    }
    .global-item {
      margin-top: 20px;
    }
  }
}
</style>