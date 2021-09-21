<template>
  <div class="login">
    <div class="el-icon-mobile-phone"></div>
    <el-form :model="data" ref="login" :rules="rules">
      <div class="login-input">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input
            type="tel"
            class="phone-input"
            placeholder="请输入手机号"
            v-model="data.phone"
            clearable
          >
          </el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="data.password"
            show-password
          ></el-input
        ></el-form-item>
      </div>
      <div class="login-btn">
        <el-button round class="isLogin" @click="login">登录</el-button>
        <el-button round class="sign" @click="$emit('sign')">注册</el-button>
      </div>
      <!-- 关闭按钮 -->
      <div class="el-icon-close close" @click="$emit('close')"></div>
    </el-form>
    <!-- 登陆成功提示 -->
    <!-- 错误警告 -->
    <el-alert v-if="loginErr" title="手机号或密码错误" type="error"> </el-alert>
    <el-alert
      v-else-if="loginSuccess"
      title="登陆成功"
      type="success"
      show-icon
    >
    </el-alert>
  </div>
</template>

<script>
// 引入表单效验方法
import { phone, password } from "@/utils/rules";

// 网络请求方法
import { userLogin } from "@/network/login";
export default {
  name: "NeteaseCloudMusicLogin",

  components: {},

  directives: {},

  data() {
    return {
      data: {
        phone: "18238109405",
        password: "ltjsix66",
      },
      // 表单效验规则
      // 效验规则
      rules: {
        phone: [{ trigger: "blur", validator: phone }],
        password: [{ trigger: "blur", validator: password }],
      },
      loginErr: false, //错误警告
      loginSuccess: false, //登陆成功
    };
  },

  mounted() {},

  methods: {
    // 登录
    async login() {
      const { data } = await userLogin(this.data);
      if (data.code !== 200) {
        this.loginErr = true;
      } else {
        this.loginSuccess = true;
        this.$emit("close");
        this.$store.dispatch("actionsSetUser", data);
        this.$emit("login");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 400px;
  height: 580px;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 3;

  .el-icon-mobile-phone {
    color: #e83c3c;
    font-size: 80px;
    margin-top: 70px;
  }
  .login-input {
    width: 200px;
    margin: 30px 0 20px 0;
    .phone-input {
      margin-bottom: 10px;
    }
  }
  .login-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    .isLogin {
      background-color: #e83c3c;
      color: #fff;
    }
    .isLogin,
    .sign {
      margin: 0;
      border: none;
      padding: 10px 100px;
      margin-bottom: 10px;
    }
  }
  .close {
    position: absolute;
    font-size: 25px;
    top: 10px;
    right: 10px;
  }
}
</style>