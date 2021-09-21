<template>
  <div>
    <div
      class="singer"
      @click="itemClick(item.id)"
      v-for="(item, index) in list.albums"
      :key="index"
    >
      <div class="left">
        <img :src="item.picUrl" alt="" />
      </div>
      <div class="content">
        <div class="top">
          {{ item.artist.name }}
        </div>

        <div class="foot">
          发行时间：<span>{{ item.publishTime | relativeTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NeteaseCloudMusicSingle",
  props: {
    list: {
      type: Object,
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
    itemClick(id) {
      this.$router.push(`/musiclistdetail/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.singer:hover {
  background-color: #efefef;
}
.singer {
  cursor: pointer;
  margin: 10px 0;
  display: flex;
  .left {
    margin-right: 10px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 6px;
    }
  }
  .content {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    span {
      color: #4277c2;
    }

    .foot {
      font-size: 14px;
    }
  }
}
</style>