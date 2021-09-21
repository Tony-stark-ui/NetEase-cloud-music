<template>
  <div class="detail">
    <div
      class="left"
      @mouseover="isShow"
      @mouseleave="isHidden"
      @click="showDetail"
    >
      <div class="el-icon-finished" ref="icon"></div>
      <img :src="allList[0].pic" alt="" />
    </div>
    <div class="right">
      <h4>{{ allList[0].name }}</h4>
      <p>{{ allList[0].artist }}</p>
    </div>
    <transition name="player-pure-side">
      <music-detail
        ref="musicDetail"
        @close="isCreate = false"
        v-if="isCreate"
        class="music-detail"
        :allList="allList"
      ></music-detail>
    </transition>
  </div>
</template>

<script>
import MusicDetail from "./MusicDetail.vue";
export default {
  name: "NeteaseCloudMusicSongdetail",
  props: {
    allList: {
      type: Array,
      required: true,
    },
  },

  components: {
    MusicDetail,
  },

  directives: {},

  data() {
    return {
      isCreate: false,
    };
  },

  mounted() {},

  methods: {
    // 鼠标移动显示隐藏图标
    isShow() {
      this.$refs.icon.style.visibility = "visible";
    },
    isHidden() {
      this.$refs.icon.style.visibility = "hidden";
    },
    // 点击详情页出现
    showDetail() {
      this.isCreate = true;
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  display: flex;
  .left {
    position: relative;
    cursor: pointer;
    .el-icon-finished {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      font-size: 34px;
      color: #fefefe;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.3);
      visibility: hidden;
    }
    img {
      width: 70px;
      height: 70px;
    }
  }
  .right {
    margin-left: 20px;
    h4 {
      padding: 0;
      margin-bottom: 20px;
    }
    align-items: center;
    justify-content: center;
  }
  .music-detail {
    position: fixed;
    padding-left: 200px;
    z-index: 2;
    width: 440%;
    height: 83%;
    overflow-y: auto;
    top: 9%;
    left: -2%;
    background-color: #fff;
    text-align: center;
  }
  .player-pure-side-enter-active {
    animation: slideInUp var(--animation-base-time);
  }
  .player-pure-side-leave-active {
    animation: slideInUp var(--animation-base-time) reverse;
  }
}
</style>