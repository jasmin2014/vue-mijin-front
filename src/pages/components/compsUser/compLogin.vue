<template>
  <div class="login-inner-box" v-if="loginType === 'login'">
    <h3>欢迎登录米今商贷</h3>
    <div class="login-input">
      <input
        v-model.trim="userPhone"
        @input="validatePhone"
        @blur="validatePhone"
        placeholder="请输入手机号"
      >
    </div>
    <div class="login-input flex input-code">
      <div class="the-code">
        <input
          v-model="userCode"
          tabindex="-1"
          @change="validateCode"
          @blur="validateCode"
          placeholder="请输入验证码"
        >
      </div>
      <div class="get-code cursor" v-if="!disabledCode" @click="handleCode">{{ btnCountDown }}</div>
      <div class="get-code disabled-code" v-else>{{btnCountDown}}</div>
    </div>
    <p class="error-warn" v-if="isPassError">{{errorPassMsg}}</p>
    <p class="pass-login">
      <span class="fl cursor" @click="handlePassLogin">密码登录</span>
    </p>
    <button class="login-btn cursor" @click="login">登录</button>
    <p class="no-account">
      没有账号？
      <span @click="toRegister">注册</span>
    </p>
  </div>
  <div class="login-inner-box" v-else-if="loginType==='pass'">
    <h3>欢迎登录米今商贷</h3>
    <div class="login-input">
      <input
        v-model.trim="userPhone"
        @input="validatePhone"
        @blur="validatePhone"
        placeholder="请输入手机号"
      >
    </div>
    <div class="login-input">
      <input
        type="password"
        v-model.trim="password"
        @input="validatePass"
        @blur="validatePass"
        placeholder="请输入密码"
      >
    </div>
    <p class="error-warn" v-if="isPassError">{{errorPassMsg}}</p>
    <p class="pass-login">
      <span class="fl cursor" @click="handleMsgLogin">短信快捷登录</span>
      <span class="fr cursor" @click="handleForgetLogin">忘记密码</span>
    </p>
    <button class="login-btn cursor" @click="login">登录</button>
    <p class="no-account">
      没有账号？
      <span @click="toRegister">注册</span>
    </p>
  </div>
</template>
<script>
import { sendCode, doMsgLogin, doPassLogin } from "../../../api/common.js";
export default {
  data() {
    return {
      loginType: "login",
      userPhone: "",
      password: "",
      userCode: "",
      isPassError: false,
      errorPassMsg: "",
      disabledCode: false,
      btnCountDown: "获取短信验证码",
      loginId: null
    };
  },
  methods: {
    resetAll() {
      this.password = "";
      this.userCode = "";
      this.isPassError = false;
      this.errorPassMsg = "";
      this.disabledCode = false;
      this.btnCountDown = "获取短信验证码";
      clearTimeout(this.loginId);
    },

    handleMsgLogin() {
      this.loginType = "login";
      this.resetAll();
    },
    handleForgetLogin() {
      this.$emit("toForget", this.userPhone);
    },
    validatePhone() {
      if (this.userPhone === "") {
        this.isPassError = true;
        this.errorPassMsg = "请输入手机号!";
        this.disabledCode = true;
        return false;
      } else if (!this.$valid.userCenterPhone.test(this.userPhone)) {
        this.isPassError = true;
        this.errorPassMsg = "请输入正确的手机号!";
        this.disabledCode = true;
        return false;
      } else {
        this.isPassError = false;
        this.errorPassMsg = "";
        if (!this.loginId) {
          this.disabledCode = false;
        }
        return true;
      }
    },
    validatePass() {
      if (this.password === "") {
        this.isPassError = true;
        this.errorPassMsg = "请输入密码！";
        return false;
      } else if (!this.$valid.psdRegex.test(this.password)) {
        this.isPassError = true;
        this.errorPassMsg = "密码未6-20位,至少包含数字、字母、符合中的两种！";
        return false;
      } else {
        this.isPassError = false;
        this.errorPassMsg = "";
        return true;
      }
    },
    validateCode() {
      if (this.userCode === "") {
        this.isPassError = true;
        this.errorPassMsg = "验证码不能为空！";
        return false;
      } else if (this.userCode.length !== 4) {
        this.isPassError = true;
        this.errorPassMsg = "请输入四位验证码！";
        return false;
      } else {
        this.isPassError = false;
        this.errorPassMsg = "";
        return true;
      }
    },
    handleCode() {
      sendCode(this.userPhone, "LOGIN").then(
        res => {
          if (res.data.code === 200) {
            this.countDown(60);
          }
        },
        res => {
          if (res.data.code == 4001000) {
            this.disabledCode = true;
            this.btnCountDown = res.data.message;
            setTimeout(() => {
              this.disabledCode = false;
              this.btnCountDown = "获取短信验证码";
            }, 10000);
          } else {
            this.disabledCode = true;
            this.btnCountDown = "稍后再试";
            setTimeout(() => {
              this.disabledCode = false;
              this.btnCountDown = "获取短信验证码";
            }, 10000);
          }
        }
      );
    },
    countDown(sec) {
      if (sec >= 0) {
        this.disabledCode = true;
        this.btnCountDown = `剩余${sec}s`;
        this.loginId = setTimeout(() => {
          this.countDown(--sec);
        }, 1000);
      } else {
        this.disabledCode = false;
        this.btnCountDown = "获取短信验证码";
      }
    },

    handlePassLogin() {
      this.loginType = "pass";
      this.resetAll();
    },
    toRegister() {
      document.title = "注册-米今官网";
      this.userCode = "";
      this.password = "";
      this.$emit("toRegister", this.userPhone);
    },
    login() {
      if (this.loginType === "login") {
        if (this.validatePhone() && this.validateCode()) {
          let $params = {
            phone: this.userPhone,
            phoneCode: this.userCode
          };
          this.doLogin($params);
        }
      } else {
        if (this.validatePhone() && this.validatePass()) {
          this.$getPubKey(this.password, res => {
            if (res !== "") {
              let $params = {
                phone: this.userPhone,
                password: res,
                encryptFlag: true
              };
              this.passwordLogin($params);
            }
          });
        }
      }
    },
    passwordLogin(params) {
      doPassLogin(params).then(
        res => {
          const _data = res.data;
          if (_data.code == 200) {
            this.isPassError = false;
            this.errorPassMsg = "";
            if (_data.body.userStatus === "USABLE") {
              this.$setLocalStorage("token", _data.body.token);
              this.$setLocalStorage("loginInfo", JSON.stringify(_data.body));
              if (sdk && sdk.storeUserId) sdk.storeUserId(_data.body.userId);
              this.$router.push({
                name: "HomePage"
              });
            }
          }
        },
        err => {
          if (err.data.code === 500) {
            this.errorPassMsg = "登录失败, 服务器错误!";
          } else {
            this.errorPassMsg = err.data.message;
          }
          this.isPassError = true;
        }
      );
    },

    doLogin(params) {
      doMsgLogin(params).then(
        res => {
          const _data = res.data;
          if (_data.code === 200) {
            clearTimeout(this.loginId);
            this.isPassError = false;
            this.errorPassMsg = "";
            if (_data.body.userStatus === "USABLE") {
              this.$setLocalStorage("loginInfo", JSON.stringify(_data.body));
              this.$setLocalStorage("token", _data.body.token);
              if (sdk && sdk.storeUserId) sdk.storeUserId(_data.body.userId);
              this.$router.push({
                name: "HomePage"
              });
            }
          }
        },
        res => {
          this.isPassError = true;
          if (res.data.code === 500) {
            this.errorPassMsg = "登录失败, 服务器错误!";
          } else {
            this.errorPassMsg = res.data.message;
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./user.scss";
</style>