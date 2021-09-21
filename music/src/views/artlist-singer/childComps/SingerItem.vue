<template>
  <div class="singer-item">
    <div
      class="item"
      v-for="(item, index) in artists"
      :key="index"
      @click="itemClick(item.id)"
    >
      <img :src="item.img1v1Url || item.cover" alt="" />
      <div class="name">{{ item.name }}</div>
      <div class="shade">查看详情</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artists: {
      type: Array,
      required: true,
    },
  },
  name: "NeteaseCloudMusicSingeritem",

  components: {},

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {
    // 点击跳转歌手详情页
    itemClick(id) {
      this.$router.push(`/artlist/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.singer-item {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  .item {
    padding: 5px 10px 10px 0;
    margin-right: 10px;
    position: relative;
    cursor: pointer;
    img {
      width: 190px;
      border-radius: 8px;
    }
    .name {
      padding-top: 5px;
    }
    .shade {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%);
      padding: 5px 10px;
      border: 1px solid #2d8cf1;
      color: #2d8cf1;
      border-radius: 15px;
      font-size: 12px;
      visibility: hidden;
    }
  }
  .item:hover .shade {
    visibility: inherit;
  }
}
</style>