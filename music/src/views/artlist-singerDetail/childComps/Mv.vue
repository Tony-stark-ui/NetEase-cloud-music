<template>
  <div class="MvItem">
    <div
      class="item"
      v-for="(item, index) in mvs"
      :key="index"
      @mouseenter="handShow(index)"
      @mouseleave="handleLeave(index)"
      @click="onClick(item)"
    >
      <div class="img">
        <el-image
          class="img"
          style="width: 100%; height: 100%"
          :src="item.imgurl"
        ></el-image>
        <transition name="play">
          <span class="play" :class="{ isShow: mouseCurrent === index }"
            ><i class="el-icon-caret-right"></i></span
        ></transition>
      </div>

      <transition name="counts">
        <span class="counts" :class="{ isHidden: mouseCurrent === index }">
          <i class="el-icon-video-camera"></i>
          {{
            item.playCount > 10000
              ? parseInt(item.playCount / 10000) + "万"
              : item.playCount
          }}
        </span>
      </transition>

      <div class="text">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NeteaseCloudMusicAlbum",
  props: {
    mvs: {
      type: Array,
      required: true,
    },
  },

  components: {},

  directives: {},

  data() {
    return {
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      mouseCurrent: null,
    };
  },

  mounted() {},

  methods: {
    // 鼠标经过
    handShow(index) {
      this.mouseCurrent = index;
    },
    // 鼠标离开
    handleLeave() {
      this.mouseCurrent = null;
    },
    onClick(item) {
      this.$router.push(`/mv-detail/${item.id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.MvItem {
  justify-content: space-evenly;
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  .item {
    position: relative;
    width: 18%;
    height: 20%;
    margin-bottom: 13px;
    transition: all 1s;
    cursor: pointer;
    .counts,
    .hot {
      padding: 5px 5px;
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.4)
      );
      color: #f6f6f6;
      text-align: right;
    }

    .hot {
      visibility: hidden;
      text-align: left;
    }
  }
  .img {
    position: relative;
    .play {
      visibility: hidden;
      background: rgba(255, 255, 255, 0.5);
      position: absolute;
      font-size: 30px;
      bottom: 15px;
      left: 8px;
      color: rgba(232, 60, 60);
      width: 30px;
      height: 30px;
      border-radius: 30px;
      line-height: 30px;
    }
  }
  .isShow {
    visibility: visible !important;
    transition: all 1s;
  }
  .isHidden {
    visibility: hidden;
  }
}
</style>