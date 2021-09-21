
<template>
  <!-- mv页面 -->
  <div class="article-mv">
    <!-- 最新mv -->
    <div class="newestMv">
      <div class="title">
        <span>最新MV</span>
        <ul>
          <li
            :style="{ color: item.value === area ? '#6A8CF1' : '' }"
            v-for="item in areas"
            :key="item.value"
            @click="changeArea(item.value)"
          >
            {{ item.content }}
          </li>
        </ul>
        <div class="right" @click="$router.push('/allmvs')">
          <div class="el-icon-arrow-right"></div>
        </div>
      </div>
      <!-- mv列表组件 -->
      <mv-item :artists="newMvs"></mv-item>
    </div>
    <!-- 推荐mv -->
    <div class="recommendMv">
      <div class="title">推荐MV</div>
      <!-- mv列表组件 -->
      <mv-item :artists="recoMv"></mv-item>
    </div>
    <!-- mv排行榜 -->
    <div class="ranking">
      <div class="title">
        <span>MV排行榜</span>
        <ul>
          <li
            :style="{ color: item.value === rarea ? '#6A8CF1' : '' }"
            v-for="item in areas"
            :key="item.value"
            @click="changerArea(item.value)"
          >
            {{ item.content }}
          </li>
        </ul>
      </div>
      <div class="ranklist">
        <!-- mv列表 -->
        <rank-mv-item :mvs="rmvs"></rank-mv-item>
      </div>
    </div>
  </div>
</template>

<script>
import { areas } from "./data";
// 引入网络请求方法
import { getNewMvs, getRecommendMv, getRankMv } from "@/network/mv";
// 引入mv列表组件
import MvItem from "./childComps/MvItem.vue";
import rankMvItem from "./childComps/RankMvs.vue";
export default {
  name: "NeteaseCloudMusicIndex",

  components: {
    MvItem, //mv列表
    rankMvItem, //mv排行列表
  },

  directives: {},

  data() {
    return {
      areas,
      area: "内地", //mv地区类型
      limit: "", //mv取出数量
      newMvs: [], //最新mv数据
      recoMv: [], //推荐mv
      rarea: "内地", //mv排行榜地区
      offset: 1, //排行榜分页
      rlimit: 10, //排行榜mv取出数量
      rmvs: [], //排行榜mv
    };
  },
  created() {
    // 获取最新mv
    this.getNewMvs();
    // 推荐mv
    this.getRecommendMvs();
    // mv排行榜
    this.getRankMv();
  },
  mounted() {},

  methods: {
    // 获取最新mv
    async getNewMvs() {
      const { data } = await getNewMvs(this.area, this.limit);
      this.newMvs = data.data;
    },
    // 获取推荐mv
    async getRecommendMvs() {
      const { data } = await getRecommendMv();
      this.recoMv = data.result;
    },
    // mv排行榜
    async getRankMv() {
      const { data } = await getRankMv(this.rarea, this.rlimit, this.roffset);
      this.rmvs = data.data;
    },
    // 点击切换地区
    changeArea(area) {
      this.area = area;
      this.getNewMvs();
    },
    changerArea(area) {
      this.rarea = area;
      this.getRankMv();
    },
  },
};
</script>

<style lang="less" scoped>
.article-mv {
  .newestMv {
    margin-top: 30px;
    .title {
      display: flex;
      span {
        line-height: 0;
        font-weight: 700;
      }
      ul {
        display: flex;
        li {
          margin-right: 5px;
          cursor: pointer;
        }
        li:hover {
          color: #6a8cf1;
        }
      }
      .right {
        cursor: pointer;
      }
    }
  }
  .recommendMv {
    margin-top: 10px;
    .title {
      font-weight: 700;
    }
  }
  .ranking {
    margin-top: 30px;
    .title {
      display: flex;
      span {
        line-height: 0;
        font-weight: 700;
      }
      ul {
        display: flex;
        li {
          margin-right: 5px;
          cursor: pointer;
        }
        li:hover {
          color: #6a8cf1;
        }
      }
    }
  }
}
</style>