<template>
  <div class="hot">
    <div
      class="item"
      v-for="(item, index) in hot"
      :key="index"
      @click="searchClick(item.searchWord)"
    >
      <div class="left">{{ index + 1 }}</div>
      <div class="content">
        <div class="title">
          <div class="searchWord">{{ item.searchWord }}</div>
          <div class="score">{{ item.score }}</div>
          <div class="icon">
            <img :src="item.iconUrl || ''" alt="" />
          </div>
        </div>
        <div class="text">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NeteaseCloudMusicHotsearch",
  props: {
    // 热搜数据
    hot: {
      type: Array,
      required: true,
    },
  },

  components: {},

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
.hot {
  max-height: 600px;
  overflow-y: auto;
  .item {
    margin: 15px 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    .left {
      margin-right: 10px;
    }
    &:nth-child(-n + 3) .left {
      color: red;
    }
    .content {
      margin-left: 10px;
      .title {
        display: flex;
        .searchWord {
          color: #515a6e;
          font-size: 18px;
        }
        .score {
          color: #dedfe6;
          margin: 0 15px;
        }
        .icon {
          img {
            width: 30%;
          }
        }
      }
      .text {
        color: #b5adb5;
        margin-top: 5px;
      }
    }
  }
}
</style>