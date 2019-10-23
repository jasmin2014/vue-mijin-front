<template>
  <div class="login-inner-box">
    <div v-if="forgetSuccess==false">
      <h3>忘记密码</h3>
      <div class="login-input">
        <input
          v-model.trim="forgetPhone"
          @input="validatePhone"
          @blur="validatePhone"
          placeholder="请输入手机号"
        >
      </div>
      <div class="login-input flex input-code">
        <div class="the-code">
          <input
            v-model="forgetCode"
            tabindex="-1"
            @input="validateCode"
            @blur="validateCode"
            placeholder="请输入验证码"
          >
        </div>
        <div
          class="get-code cursor"
          v-if="!disabledForgetCode"
          @click="handleForgetCode"
        >{{btnForgetCountDown}}</div>
        <div class="get-code disabled-code" v-else>{{btnForgetCountDown}}</div>
      </div>
      <div class="login-input">
        <input
          v-model.trim="forgetPassword"
          type="password"
          @input="validatePass"
          @blur="validatePass"
          placeholder="请输入密码"
        >
      </div>
      <div class="login-input">
        <input
          v-model.trim="forgetAgainPassword"
          type="password"
          @input="validatePass"
          @blur="validatePass('again')"
          placeholder="请确认密码"
        >
      </div>
      <p class="error-warn" v-if="isForgetError">{{errorForgetMsg}}</p>
      <button class="login-btn cursor" @click="forget">提交</button>
      <button class="back-btn cursor" @click="toLogin">返回</button>
    </div>
    <div class="forget-center" v-else>
      <p class="success">
        <img src="../../../assets/imgs/success.png" alt>
      </p>
      <p class="tip">修改成功</p>
      <p class="warning">请牢记新的登录密码</p>
      <p class="login_btn cursor" @click="toLogin">重新登录</p>
    </div>
  </div>
</template>
<script>
import { sendCode, doForget } from "../../../api/common.js";
export default {
  props: {
    fgtPhone: String
  },
  data() {
    return {
      forgetSuccess: false,
      forgetPhone: "",
      forgetCode: "",
      disabledForgetCode: true,
      btnForgetCountDown: "获取手机验证码",
      forgetPassword: "",
      forgetAgainPassword: "",
      isForgetError: false,
      errorForgetMsg: "",
      forgetId: null
    };
  },
  created() {
    if (this.fgtPhone && this.fgtPhone !== "") {
      this.forgetPhone = this.fgtPhone;
      this.disabledForgetCode = false;
    }
  },
  methods: {
    resetAll() {
      // 重置忘记密码信息
      this.forgetPhone = "";
      this.forgetPassword = "";
      this.forgetAgainPassword = "";
      this.forgetCode = "";
      this.disabledForgetCode = true;
      this.isForgetError = false;
      this.errorForgetMsg = "";
      this.forgetSuccess = false;
      this.btnForgetCountDown = "获取短信验证码";
      clearTimeout(this.forgetId);
    },
    validatePhone() {
      if (this.forgetPhone === "") {
        this.isForgetError = true;
        this.errorForgetMsg = "请输入手机号!";
        this.disabledForgetCode = true;
        return false;
      } else if (!this.$valid.userCenterPhone.test(this.forgetPhone)) {
        this.isForgetError = true;
        this.errorForgetMsg = "请输入正确的手机号!";
        this.disabledForgetCode = true;
        return false;
      } else {
        this.isForgetError = false;
        this.errorForgetMsg = "";
        if (!this.forgetId) {
          this.disabledForgetCode = false;
        }
        return true;
      }
    },
    validatePass(type) {
      if (type && type === "again") {
        if (this.forgetAgainPassword === "") {
          this.isForgetError = true;
          this.errorForgetMsg = "密码不能为空！";
          return false;
        } else if (!this.$valid.psdRegex.test(this.forgetAgainPassword)) {
          this.isForgetError = true;
          this.errorForgetMsg =
            "密码为6-20位,至少包含数字、字母、符合中的两种！";
          return false;
        } else if (this.forgetAgainPassword !== this.forgetPassword) {
          this.isForgetError = true;
          this.errorForgetMsg = "两次输入的密码不一致，请重新输入！";
          return false;
        } else {
          this.isForgetError = false;
          this.errorForgetMsg = "";
          return true;
        }
      } else {
        if (this.forgetPassword === "") {
          this.isForgetError = true;
          this.errorForgetMsg = "密码不能为空！";
          return false;
        } else if (!this.$valid.psdRegex.test(this.forgetPassword)) {
          this.isForgetError = true;
          this.errorForgetMsg =
            "密码为6-20位,至少包含数字、字母、符合中的两种！";
          return false;
        } else {
          this.isForgetError = false;
          this.errorForgetMsg = "";
          return true;
        }
      }
    },
    validateCode() {
      if (this.forgetCode === "") {
        this.isForgetError = true;
        this.errorForgetMsg = "验证码不能为空！";
        return false;
      } else if (this.forgetCode.length !== 4) {
        this.isForgetError = true;
        this.errorForgetMsg = "请输入四位验证码！";
        return false;
      } else {
        this.isForgetError = false;
        this.errorForgetMsg = "";
        return true;
      }
    },
    countForgetDown(sec) {
      if (sec >= 0) {
        this.disabledForgetCode = true;
        this.btnForgetCountDown = `剩余${sec}s`;
        this.forgetId = setTimeout(() => {
          this.countForgetDown(--sec);
        }, 1000);
      } else {
        this.disabledForgetCode = false;
        this.btnForgetCountDown = "获取短信验证码";
      }
    },
    handleForgetCode() {
      sendCode(this.forgetPhone, "RESET_PASSWORD").then(
        res => {
          if (res.data.code === 200) {
            this.countForgetDown(60);
          }
        },
        res => {
          if (res.data.code == 4001000) {
            this.disabledForgetCode = true;
            this.btnForgetCountDown = res.data.message;
            setTimeout(() => {
              this.disabledForgetCode = false;
              this.btnForgetCountDown = "获取短信验证码";
            }, 10000);
          } else {
            this.disabledForgetCode = true;
            this.btnForgetCountDown = "稍后再试";
            setTimeout(() => {
              this.disabledForgetCode = false;
              this.btnForgetCountDown = "获取短信验证码";
            }, 10000);
          }
        }
      );
    },
    forget() {
      if (
        this.validatePhone() &&
        this.validateCode() &&
        this.validatePass() &&
        this.validatePass("again")
      ) {
        this.$getPubKey(this.forgetPassword, res => {
          if (res !== "") {
            let params = {
              phone: this.forgetPhone,
              newPassword: res,
              phoneCode: this.forgetCode,
              encryptFlag: true
            };
            this.doForget(params);
          }
        });
      }
    },
    doForget(params) {
      doForget(params).then(
        res => {
          const _data = res.data;
          if (_data.code == 200) {
            clearTimeout(this.forgetId);
            this.forgetSuccess = true;
            this.forgetPhone = "";
            this.forgetPassword = "";
            this.forgetAgainPassword = "";
            this.forgetCode = "";
            this.disabledForgetCode = true;
            this.isForgetError = false;
            this.errorForgetMsg = "";
            this.btnForgetCountDown = "获取短信验证码";
          }
        },
        res => {
          clearTimeout(this.forgetId);
          if (res.data.code == 500) {
            this.errorForgetMsg = "修改失败, 服务器错误!";
          } else {
            this.errorForgetMsg = res.data.message;
          }
          this.isForgetError = true;
        }
      );
    },
    toLogin() {
      document.title = "登录-米今官网";
      //   this.type = "login";
      this.resetAll();
      this.$emit("toLogin");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./user.scss";
</style>