<template>
  <div class="aside">
    <el-row class="tac">
      <el-col>
        <el-menu class="el-menu-vertical-demo" text-color="#000">
          <el-menu-item
            v-for="(item, index) in menuList"
            :key="index"
            @click="itemClick(index, item.link)"
            :class="{ isActive: active === index }"
            class="tab-item"
          >
            <i :class="item.icon"></i>
            <span slot="title" class="content">{{ item.content }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "NeteaseCloudMusicIndex",

  components: {},

  directives: {},

  data() {
    return {
      // tab列表
      menuList: [
        {
          link: "/recmmend",
          icon: "iconfont icon-yinle",
          content: "个性推荐",
        },
        {
          link: "/songList",
          icon: "iconfont icon-songlist",
          content: "歌单",
        },
        {
          link: "/rankList",
          icon: "iconfont icon-31paixingbang",
          content: "排行榜",
        },
        {
          link: "/singer",
          icon: "iconfont icon-user-star-fill",
          content: "歌手",
        },
        {
          link: "/mv",
          icon: "iconfont icon-shexiangji",
          content: "MV",
        },
        {
          link: "/newMusic",
          icon: "iconfont icon-yinfu",
          content: "最新音乐",
        },
      ],
      active: 0, //判断是否选中
    };
  },
  created() {
    switch (this.$route.path) {
      case "/recmmend":
        this.active = 0;
        break;
      case "/songList":
        this.active = 1;
        break;

      case "/rankList":
        this.active = 2;
        break;

      case "/singer":
        this.active = 3;
        break;

      case "/mv":
        this.active = 4;
        break;
      case "/newMusic":
        this.active = 6;
        break;
    }
  },
  mounted() {},
  computed: {},

  methods: {
    // tab点击
    itemClick(index, path) {
      console.log(index);
      this.$router.push(path);

      this.active = index;
    },
  },
};
</script>

<style lang="less" scoped>
.aside {
  width: 220px;
  background-color: #f9f9f9;

  .el-menu-vertical-demo {
    background-color: #f9f9f9;
  }
  .isActive {
    color: #2d8cf0;
    border-left: 4px solid #2d8cf0;
  }

  .content {
    margin-left: 10px;
  }
}
</style>