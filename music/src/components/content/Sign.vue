<template>
  <div class="login">
    <div class="el-icon-mobile-phone"></div>
    <div class="login-input">
      <el-form :model="data" ref="login" :rules="rules">
        <!-- 昵称 -->
        <el-form-item prop="username">
          <el-input
            class="phone-input"
            placeholder="请输入昵称"
            v-model="data.username"
            clearable
          >
          </el-input
        ></el-form-item>

        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input
            class="phone-input"
            placeholder="请输入手机号"
            v-model="data.phone"
            clearable
          >
          </el-input
        ></el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            class="phone-input"
            placeholder="请输入密码"
            v-model="data.password"
            show-password
          ></el-input
        ></el-form-item>

        <!-- 验证码 -->
        <span>
          <el-form-item prop="captcha">
            <el-input
              class="phone-input verify-input"
              placeholder="请输入验证码"
              v-model="data.captcha"
              clearable
            >
            </el-input>
            <span>
              <el-button
                type="info"
                icon="el-icon-message"
                circle
                @click="sendCaptch"
                :disabled="isDisabled"
              ></el-button> </span
          ></el-form-item>
        </span>
      </el-form>
    </div>
    <div class="login-btn">
      <el-button round class="sign" @click="sign">注册</el-button>
    </div>
    <!-- 关闭按钮 -->
    <div class="el-icon-close close" @click="$emit('close')"></div>
    <!-- 错误警告 -->
    <el-alert v-if="isError" title="手机号已注册" type="error"> </el-alert>
    <el-alert v-if="isCaptchaErr" title="验证码不正确" type="error"> </el-alert>
  </div>
</template>

<script>
// 引入表单效验方法
import { phone, password, username, captcha } from "@/utils/rules";
//引入网络请求方法
import {
  sendCaptch,
  testPhoneNUmber,
  testCaptch,
  register,
} from "@/network/login";
export default {
  name: "NeteaseCloudMusicLogin",

  components: {},

  directives: {},

  data() {
    return {
      data: {
        username: "",
        phone: "",
        password: "",
        captcha: "",
      },
      // 表单效验规则
      // 效验规则
      rules: {
        phone: [{ trigger: "blur", validator: phone }],
        password: [{ trigger: "blur", validator: password }],
        username: [{ trigger: "blur", validator: username }],
        captcha: [{ trigger: "blur", validator: captcha }],
      },
      isDisabled: false, //禁用按钮
      isError: false, //已注册提示
      isCaptchaErr: false,
    };
  },

  mounted() {},

  methods: {
    // 发送验证码
    async sendCaptch() {
      await sendCaptch(this.data.phone);
      this.isDisabled = true;
      setTimeout(() => {
        this.isDisabled = false;
      }, 5000);
    },
    // 注册
    async sign() {
      // 效验验证码
      this.testCaptch();

      // // // 检测是否注册
      this.testPhoneNUmber();

      // 都符合了就注册
      await register(this.data);
      // 跳到登录页关闭注册页
      this.$emit("success");
    },

    // 效验验证码
    async testCaptch() {
      try {
        await testCaptch(this.data.phone, this.data.captcha);
      } catch (err) {
        this.isCaptchaErr = true;
        return;
      }
    },

    // 检测是否注册
    async testPhoneNUmber() {
      const { data } = await testPhoneNUmber(this.data.phone);
      if (data.exist === 1) {
        return (this.isError = true);
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

  .verify-input {
    width: 140px;
    margin-right: 20px;
  }
}
</style>