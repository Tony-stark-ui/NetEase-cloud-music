<template>
  <div class="index">
    <div class="icon"></div>

    <hot-search
      @searchClick="searchClick"
      v-show="isShow"
      :hot="hot"
    ></hot-search>
    <search-result
      :value="value"
      :success="success"
      v-show="isChange"
    ></search-result>
  </div>
</template>

<script>
// 引入子组件
import HotSearch from "./childComps/HotSearch.vue";
import SearchResult from "./childComps/SearchResult.vue";
export default {
  name: "NeteaseCloudMusicIndex",
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    isChange: {
      type: Boolean,
      required: true,
    },
    // 热搜数据
    hot: {
      type: Array,
      required: true,
    },
    success: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },

  components: {
    HotSearch, //热门搜索
    SearchResult, //搜索组件
  },

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {
    searchClick(value) {
      this.$emit("searchClick", value);
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  padding: 20px 30px;
}
.icon {
  position: absolute;
  top: -11px;
  left: 20px;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  transform: rotate(-45deg);
  z-index: -1;
}
</style>