<template>
  <div class="layout">
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header height="98px">
        <nav-bar></nav-bar>
      </el-header>
      <el-container class="container">
        <!-- 侧边栏 -->
        <el-aside class="aside">
          <aside-bar></aside-bar>
        </el-aside>
        <!-- 内容区域 -->
        <el-main class="main">
          <router-view :key="$route.fullPath"></router-view>
        </el-main>
      </el-container>
      <el-footer class="footer">
        <play></play>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// 顶部导航兰
import NavBar from "@/components/common/navBar";
// 侧边栏
import AsideBar from "../../components/common/aside";
// 底部
import Play from "../../components/common/footer";
export default {
  name: "layout",

  components: {
    NavBar, //顶部导航栏
    AsideBar, //侧边栏
    Play, //底部
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
}

.container {
  height: calc(100vh - 100px - 60px);
  overflow: hidden;
}
.main {
  padding: 20px 145px 0 100px;
}
.aside {
  height: 100%;
}
.footer {
  height: 6px;
}
</style>