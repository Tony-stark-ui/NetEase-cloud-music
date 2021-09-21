<template>
  <div class="allMvs">
    <div class="title">
      <div class="text">全部MV</div>
      <div class="language">
        <span>语种：</span>
        <ul>
          <li
            :style="{ color: item.value === allareas ? '#6A8CF1' : '' }"
            v-for="item in allarea"
            :key="item.value"
            @click="areaClick(item.value)"
          >
            {{ item.content }}
          </li>
        </ul>
      </div>
      <div class="type">
        <span>分类：</span>
        <ul>
          <li
            :style="{ color: item.value === types ? '#6A8CF1' : '' }"
            v-for="item in type"
            :key="item.value"
            @click="typeClick(item.value)"
          >
            {{ item.content }}
          </li>
        </ul>
      </div>
      <div class="order">
        <span>排序：</span>
        <ul>
          <li
            :style="{ color: item.value === orders ? '#6A8CF1' : '' }"
            v-for="item in order"
            :key="item.value"
            @click="orderClick(item.value)"
          >
            {{ item.content }}
          </li>
        </ul>
      </div>
    </div>
    <div class="list">
      <mvs-item :artists="allmvs"></mvs-item>
    </div>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      @next-click="nextClick"
      @prev-click="prevClick"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { allarea, type, order } from "../data";

import { getNewMvs, getRecommendMv, getRankMv, getAllmvs } from "@/network/mv";

import MvsItem from "./MvItem.vue";
export default {
  name: "NeteaseCloudMusicAllmvs",

  components: {
    MvsItem,
  },

  directives: {},

  data() {
    return {
      allarea,
      type,
      order,
      allareas: "全部",
      types: "全部",
      orders: "上升最快",
      limit: 40,
      offset: 1,
      allmvs: [],
    };
  },
  created() {
    // 获取全部mv数据
    this.getAllmvs();
  },

  mounted() {},

  methods: {
    // 全部mv
    async getAllmvs() {
      const area = this.allareas;
      const type = this.types;
      const order = this.orders;
      const limit = this.limit;
      const offset = this.offset;
      const { data } = await getAllmvs(area, type, order, limit, offset);
      this.allmvs = data.data;
    },
    areaClick(value) {
      this.allareas = value;
      this.getAllmvs();
    },
    typeClick(value) {
      this.types = value;
      this.getAllmvs();
    },
    orderClick(value) {
      this.orders = value;
      this.getAllmvs();
    },
    nextClick() {
      this.offset++;
      this.getAllmvs();
    },
    prevClick() {
      if (this.offset > 1) {
        this.ofset--;
        this.getAllmvs();
      }
    },
    currentChange(index) {
      this.offset = index;
      this.getAllmvs();
    },
  },
};
</script>

<style lang="less" scoped>
.allMvs {
  .title {
    .text {
      font-size: 18px;
      font-weight: 700;
      padding-bottom: 10px !important;
      border-bottom: 1px solid #ddd;
    }
    .language,
    .type,
    .order {
      display: flex;
      margin: 10px 0;
      font-size: 16px;
    }
    ul {
      display: flex;
      li {
        margin-right: 5px;
        cursor: pointer;
        padding: 0 15px;
      }
      li:hover {
        color: #6a8cf1;
      }
    }
  }
  .list {
    margin-top: 20px;
  }
  .el-pagination {
    margin: 15px 0;
    text-align: center;
  }
}
</style>