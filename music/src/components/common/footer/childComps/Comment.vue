<template>
  <div>
    <comment
      :comments="comments"
      @nextPag="nextClick"
      @prevPag="prevPag"
      :id="id"
    ></comment>
  </div>
</template>

<script>
// 评论组件
import Comment from "./MusicCommont.vue";

// 网络请求方法
// import { musicRecommend } from "@/network/comment";
export default {
  name: "NeteaseCloudMusicSonglist",
  props: {
    id: {
      type: Number,
      default: null,
    },
    comments: {
      type: Array,
      required: true,
    },
  },

  components: {
    Comment, //评论组件
  },

  directives: {},

  data() {
    return {};
  },
  created() {},

  mounted() {},

  methods: {
    // 点击获取下一页数据
    nextClick(index) {
      this.$emit("nextPag", index);
    },
    // 上一页
    prevPag() {
      this.$emit("prevPag");
    },
  },
};
</script>

<style lang="less" scoped>
</style>