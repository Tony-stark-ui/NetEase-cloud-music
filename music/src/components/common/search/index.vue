<template>
  <div class="main">
    <!-- 搜索框 -->
    <el-input
      class="search"
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="search"
      @blur="onBlur"
      @focus="onFocus"
      @input="inputChange"
      ref="input"
      @keyup.enter.native="keyDown"
    ></el-input>
    <!-- 搜索结果 -->
    <search
      class="result"
      v-show="isCreated"
      :isChange="isChange"
      :isShow="isShow"
      :isCreated="isCreated"
      :hot="hot"
      @searchClick="searchClick"
      :success="success"
      :value="search"
    ></search>
  </div>
</template>

<script>
// 引入热门搜索框
import Search from "@/views/search";

// 引入网络请求方法
import { getHostSearch, searchSucess } from "@/network/search";
// 引入防抖工具函数
import { debounce } from "@/utils/debounce";
export default {
  name: "NeteaseCloudMusicIndex",

  components: {
    Search, //热门搜索框
  },

  directives: {},

  data() {
    return {
      search: "", //搜索框内容
      isShow: false,
      isChange: false,
      isCreated: false,
      hot: [], //热搜数据
      clcik: false,
      success: {}, //搜索建议
      timer: "",
    };
  },
  created() {
    // 热搜数据
    this.getHostSearch();
  },

  mounted() {},

  methods: {
    onFocus() {
      this.isShow = true;
      this.isCreated = true;
    },

    onBlur() {
      setTimeout(() => {
        this.isShow = false;
        this.isCreated = false;
      }, 200);
    },

    inputChange() {
      if (this.search.trim() === "") {
        this.isShow = true;
        this.isChange = false;
      } else {
        this.isChange = true;
        this.isShow = false;
        this.isCreated = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.searchSucess();
        }, 500);
      }
    },
    // 搜索建议
    async searchSucess() {
      const { data } = await searchSucess(this.search);
      this.success = data.result;
    },
    // 点击搜索
    searchClick(value) {
      this.$router.push(`/searchDetail/${value}`);
    },

    // 热搜数据
    async getHostSearch() {
      const { data } = await getHostSearch();
      this.hot = data.data;
    },
    // 按下搜索
    keyDown() {
      if (this.search !== "") {
        this.searchClick(this.search);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
  .search {
    width: 200px;
    height: 32px;
  }
  .result {
    position: absolute;
    top: 70px;
    width: 400px;

    border: 1px solid #ccc;
    background-color: #fff;
    z-index: 4;
  }
}
</style>