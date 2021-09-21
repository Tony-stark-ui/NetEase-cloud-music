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
import Comment from "@/components/content/Comment";

// 网络请求方法
import { getSongsComment } from "@/network/comment";
export default {
  name: "NeteaseCloudMusicSonglist",
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  components: {
    Comment, //评论组件
  },

  directives: {},

  data() {
    return {
      limit: 20,
      offset: 1,
      comments: [], //评论列表
    };
  },
  created() {
    // 获取评论信息
    this.getSongsComment();
  },

  mounted() {},

  methods: {
    // 获取评论信息
    async getSongsComment() {
      const { data } = await getSongsComment(this.id, this.limit, this.offset);

      this.comments = data.comments;
    },

    // 点击获取下一页数据
    nextClick(index) {
      if (index) {
        this.offset = index;
      } else {
        this.offset++;
      }

      this.getSongsComment();
    },
    // 上一页
    prevPag() {
      if (this.offset > 1) {
        this.offset--;
      }
      this.getSongsComment();
    },
  },
};
</script>

<style lang="less" scoped>
</style>