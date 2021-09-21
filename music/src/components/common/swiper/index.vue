<template>
  <div class="swiper">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img class="image" :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "NeteaseCloudMusicIndex",
  props: {
    // 轮播图数据
    banners: {
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

  methods: {},
};
</script>

<style lang="less" scoped>
.image {
  width: 100%;
  height: 100%;
}
</style>