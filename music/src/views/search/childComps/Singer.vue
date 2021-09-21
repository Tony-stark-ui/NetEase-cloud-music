<template>
  <div>
    <div
      class="singer"
      @click="itemClick(item.id)"
      v-for="(item, index) in list.artists"
      :key="index"
    >
      <div class="left">
        <img :src="item.img1v1Url" alt="" />
      </div>
      <div class="content">
        <div class="top">
          {{ item.name }}
        </div>
        <div class="center">
          专辑数：<span>{{ item.albumSize }}</span>
        </div>
        <div class="foot">
          MV数：<span>{{ item.mvSize }}</span>
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
      this.$router.push(`/artlist/${id}`);
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
      border-radius: 6px;
    }
  }
  .content {
    span {
      color: #4277c2;
    }

    .center {
      font-size: 14px;
      margin: 5px 0;
    }
    .foot {
      font-size: 14px;
    }
  }
}
</style>