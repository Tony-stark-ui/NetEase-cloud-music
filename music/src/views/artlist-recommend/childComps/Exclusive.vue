<template>
  <div class="">
    <h4>独家放送</h4>
    <div class="exclusive">
      <div
        class="item"
        v-for="(item, index) in exclusive"
        :key="index"
        @click="getMvDetail(item.id)"
      >
        <img :src="item.picUrl" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NeteaseCloudMusicExclusive",
  props: {
    exclusive: {
      type: Array,
      required: true,
    },
  },

  components: {},

  directives: {},

  data() {
    return {};
  },
  created() {},
  mounted() {},

  methods: {
    getMvDetail(id) {
      this.$router.push(`/mv-detail/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
h4 {
  margin-bottom: 13px;
}
.exclusive {
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  .item {
    width: 32%;
    img {
      width: 100%;
    }
  }
}
</style>