<template>
  <div class="mv-detail" v-if="detail != null">
    <div class="left">
      <!-- 标题 -->
      <div class="title">
        <el-tag type="danger" effect="plain">MV</el-tag>
        <span>{{ detail.name }}</span>
      </div>
      <!-- 视频 -->
      <video :src="mvUrl" controls class="mvdeo" autoplay></video>
      <div class="comment">
        <div class="h1">评论</div>
        <comment
          :id="iid"
          :comments="comments"
          @nextPag="nextPag"
          @prevPag="prevPag"
        ></comment>
      </div>
    </div>
    <div class="right">
      <!--mv介绍 -->
      <div class="introduce">
        <div class="title">MV介绍</div>
        <div class="time">
          <span>发布时间：{{ detail.publishTime }}</span>
          <span>播放次数：{{ detail.playCount }}</span>
        </div>
        <div class="brief"><span>简介：</span>{{ detail.desc }}</div>
      </div>
      <!-- 相关推荐 -->
      <div class="correlation">
        <div class="title">相关推荐</div>
        <mv-list :mvs="mvs"></mv-list>
      </div>
    </div>
  </div>
</template>

<script>
// 网络请求方法
import {
  getMvDetail,
  getMVUrl,
  getMVComment,
  getSimiMv,
  Mv,
} from "@/network/mv";

// 评论组件
import Comment from "../common/footer/childComps/Comment.vue";
// 相关推荐组件
import MvList from "./MvList.vue";
export default {
  name: "NeteaseCloudMusicMvdetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  components: {
    Comment, //评论组件

    MvList, //相关推荐
  },

  directives: {},

  data() {
    return {
      detail: null, //详情
      mvUrl: null, //mv地址
      limit: 20,
      offset: 1,
      comments: [], //评论列表
      iid: -this.id,
      mvs: [], //推荐mv
    };
  },
  created() {
    //  获取mv详情信息
    this.getMvDetail();
    // 获取mv地址
    this.getMVUrl();
    // 获取评论信息
    this.getMVComment();
    // 推荐mv数据
    this.getSimiMv();
  },
  mounted() {},

  methods: {
    // 获取mv详情
    async getMvDetail() {
      const { data } = await getMvDetail(this.id);
      this.detail = data.data;
    },
    // 获取mv地址
    async getMVUrl() {
      const { data } = await getMVUrl(this.id);
      this.mvUrl = data.data.url;
    },
    // 获取评论数据
    async getMVComment() {
      const { data } = await getMVComment(this.id, this.limit, this.offset);
      this.comments = data.comments;
    },
    // 推荐mv数据
    async getSimiMv() {
      const { data } = await getSimiMv(this.id);
      const mvs = data.mvs;
      for (let i in mvs) {
        let mv = new Mv(
          mvs[i].id,
          mvs[i].cover,
          mvs[i].name,
          mvs[i].artistName,
          mvs[i].playCount
        );
        this.mvs.push(mv);
      }
    },
    // 上一页评论
    prevPag() {
      if (this.offset > 1) {
        this.offset--;
      }
      this.getMVComment();
    },
    // 下一页评论
    nextPag(index) {
      if (index) {
        this.offset = index;
      } else {
        this.offset++;
      }

      this.getMVComment();
    },
  },
};
</script>

<style lang="less" scoped>
.mv-detail {
  display: flex;
  .left {
    flex: 3;
    padding-right: 25px;
    .title {
      font-size: 22px;
    }
    .mvdeo {
      width: 100%;
      height: 500px;
      margin-top: 10px;
    }
    .comment {
      .h1 {
        font-weight: 400;
        font-size: 26px;
        margin: 10px 0;
      }
    }
  }
  .right {
    flex: 1.5;
    .introduce {
      .title {
        font-size: 24px;
      }
      .time {
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
        span {
          font-size: 14px;
        }
      }
      .brief {
        span {
          font-size: 18px;
        }
      }
    }
    .correlation {
      .title {
        margin: 15px 0;
        font-size: 24px;
      }
    }
  }
}
</style>