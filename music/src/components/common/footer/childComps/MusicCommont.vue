<template>
  <div class="comment">
    <!-- 输入框 -->
    <div class="input">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <el-button @click="sendCom">评论</el-button>
    </div>
    <h3>精彩评论</h3>
    <!-- 评论内容区域 -->
    <div class="comment-body" v-for="(item, index) in comments" :key="index">
      <!-- 头像 -->
      <div class="icon">
        <img :src="item.user.avatarUrl" alt="" />
      </div>
      <!-- 内容 -->
      <div class="content">
        <div class="neir">
          <span class="name">{{ item.user.nickname }}:</span>
          <span class="value">{{ item.content }}</span>
        </div>

        <p class="timer">{{ item.time | relativeTime }}</p>
      </div>
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
// 引入网络方法
import { sendCommend } from "@/network/comment";
import { mapState } from "vuex";
export default {
  name: "NeteaseCloudMusicComment",
  props: {
    comments: {
      type: Array,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },

  components: {},
  computed: {
    ...mapState(["user"]),
  },

  directives: {},

  data() {
    return {
      textarea: "", //文本域内容
      show: false,
    };
  },
  created() {},
  mounted() {},

  methods: {
    // 上一页
    prevClick() {
      this.$emit("prevPag");
    },
    // 下一页
    nextClick() {
      this.$emit("nextPag");
    },
    currentChange(index) {
      this.$emit("nextPag", index);
    },
    // 发表评论
    async sendCom() {
      if (this.textarea.trim() == "") {
        this.$message({
          message: "内容不能为空",
          type: "warning",
        });
        return;
      }
      if (this.user) {
        await sendCommend(this.user.cookie, this.id, this.textarea);
      } else {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
      }
      this.$message({
        message: "评论成功",
        type: "success",
      });
      this.textarea = "";
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  margin-top: 30px;
  .input {
    background-color: #f0f0f2;
    padding: 20px 20px;
    .el-button {
      margin-top: 10px;
    }
  }
  h3 {
    font-weight: 400 !important;
    margin: 20px 0 !important;
    text-align: left;
  }
  & > .comment-body:nth-child(2n) {
    background-color: #f9f9f9;
  }
  .comment-body {
    display: flex;
    padding: 10px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      margin: 5px 15px 5px 0;
    }
    .neir {
      display: flex;
    }
    .name {
      color: #0c73c2;
      margin-right: 10px;
    }
    .value {
      text-align: left;
    }
    .timer {
      margin-top: 8px;
      text-align: left;
    }
  }
  .el-pagination {
    margin: 20px 0;
    text-align: center;
  }
}
</style>