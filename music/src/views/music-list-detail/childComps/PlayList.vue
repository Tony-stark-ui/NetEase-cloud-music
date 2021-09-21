<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in tabs"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
        <router-view :musicList="musicList" :id="id"> </router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "NeteaseCloudMusicPlaylist",
  props: {
    musicList: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    commentCount: {
      type: Number,
      required: true,
    },
  },

  components: {},

  directives: {},

  data() {
    return {
      activeName: "first",
      path: "",
      tabs: [
        {
          label: "歌曲列表",
          name: "first",
        },
        {
          label: "评论",
          name: "second",
        },
        {
          label: "收藏者",
          name: "third",
        },
      ],
    };
  },

  mounted() {},

  methods: {
    handleClick() {
      switch (this.activeName) {
        case "first":
          this.path = "songlist";
          break;
        case "second":
          this.path = "comment";
          break;
        case "third":
          this.path = "collector";
          break;
      }
      this.$router.push(this.path);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-tabs__item {
  width: 125px;
  height: 45px;
  text-align: center;
  font-size: 18px;
}
</style>