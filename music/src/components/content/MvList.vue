<template>
  <div>
    <div
      class="mvList"
      v-for="(item, index) in mvs"
      :key="index"
      @click="goMvDetail(item.id)"
    >
      <div class="left">
        <div class="img">
          <div class="icon">
            <span class="el-icon-video-camera-solid"></span>
            <span>{{ item.count }}</span>
          </div>
          <img :src="item.cover" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="title">
          <el-tag type="danger" effect="plain">MV</el-tag>
          <span>{{ item.name }}</span>
        </div>

        <div class="songer">{{ item.artist }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NeteaseCloudMusicMvlist",
  props: {
    mvs: {
      type: Array,
      default: [],
    },
  },

  components: {},

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {
    goMvDetail(id) {
      this.$router.push(`/mv-detail/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.mvList {
  cursor: pointer;
  display: flex;
  margin: 20px 0;
  .left {
    .img {
      width: 195px;
      height: 100px;
      position: relative;
      .icon {
        width: 100%;
        position: absolute;
        text-align: right;
        color: #fff;
        font-size: 15px;
        padding-right: 5px;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25));
      }
      span {
        margin-left: 3px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right {
    margin-left: 15px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    .title {
      .el-tag {
        margin-right: 5px;
      }
    }
    .songer {
      font-size: 14px;
    }
  }
}
</style>