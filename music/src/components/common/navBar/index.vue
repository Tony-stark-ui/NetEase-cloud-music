<template>
  <div class="nav-bar">
    <div class="left">
      <!-- 左边按钮 -->
      <div class="left-btn">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-platform-eleme"
          circle
          @click="homeClick"
        ></el-button>
        <el-button
          size="mini"
          type="success"
          icon="el-icon-s-custom"
          circle
          @click="isLoginShow = true"
        ></el-button>
        <el-button
          size="mini"
          type="info"
          icon="el-icon-s-unfold"
          circle
          @click="isSignShow = true"
        ></el-button>
      </div>
      <!-- 前进后退箭头 -->
      <el-button-group class="arrows-content">
        <el-button class="arrows-btn" @click="$router.go(-1)">
          <i class="el-icon-arrow-left el-icon--left"></i>
        </el-button>
        <el-button class="arrows-btn" @click="$router.go(2)"
          ><i class="el-icon-arrow-right el-icon--right"></i
        ></el-button>
      </el-button-group>
      <search></search>
    </div>
    <div class="right">
      <!-- 头像 -->
      <el-avatar :size="35" :src="profile" class="head-portrait"></el-avatar>
      <!-- 链接 -->
      <a href="https://gitee.com/">
        <i class="iconfont icon-gitee2"></i>
      </a>
      <a href="https://github.com/Tony-stark-ui">
        <i class="iconfont icon-icon-test"></i>
      </a>
    </div>
    <!-- login登录页 -->
    <transition name="login"
      ><login
        @sign="sign"
        v-show="isLoginShow"
        class="login"
        @close="isLoginShow = false"
        @login="login"
    /></transition>
    <!-- 注册页面 -->
    <transition name="sign"
      ><sign
        v-show="isSignShow"
        @success="success"
        class="sign"
        @close="isSignShow = false"
    /></transition>
  </div>
</template>

<script>
// 搜索框组件
import Search from "../search";
// 登录组件
import Login from "../../content/Login.vue";
// 注册组件
import Sign from "../../content/Sign.vue";
export default {
  name: "NeteaseCloudMusicIndex",

  components: {
    Search, //搜索框组件
    Login, //登录组件
    Sign, //注册组件
  },

  directives: {},

  data() {
    return {
      isLoginShow: false, //登录页面状态
      isSignShow: false, //注册页面组件
      profile: null,
    };
  },
  mounted() {},

  methods: {
    // 点击主页按钮跳转回主页
    homeClick() {
      window.location.replace("/recmmend");
    },
    // 注册按钮点击事件
    sign() {
      this.isLoginShow = false;
      this.isSignShow = true;
    },
    // 注册成功关闭注册页面，打开的登录页
    success() {
      this.isSignShow = false;
      this.isLoginShow = true;
    },
    // 登陆成功
    login() {
      this.profile =
        "https://p4.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg";
    },
  },
};
</script>

<style lang="less" scoped>
.nav-bar {
  height: 100%;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    padding: 0 20px;
    display: flex;
    align-items: center;
    .arrows-content {
      margin: 0 50px;
      .arrows-btn {
        border: none;
        background-color: #f9f9f9;
      }
      .el-icon-arrow-left,
      .el-icon-arrow-right {
        font-size: 30px;
      }
    }
  }
  .right {
    width: 300px;
    padding-right: 50px;
    display: flex;
    justify-content: space-between;
    .iconfont {
      font-size: 32px;
      color: black;
    }
    .head-portrait {
      margin-right: 100px;
    }
  }
  .login {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
  }
  .login-enter-active {
    animation: fadeInDown var(--animation-base-time);
  }
  .login-leave-active {
    animation: zoomOutUp var(--animation-base-time);
  }

  .sign {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
  }
  .sign-enter-active {
    animation: fadeInDown var(--animation-base-time);
  }
  .sign-leave-active {
    animation: zoomOutUp var(--animation-base-time);
  }
}
</style>