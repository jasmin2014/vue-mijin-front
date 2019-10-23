<template>
  <div class="login-inner-box">
    <div v-if="registerSuccess === false">
      <h3>{{from === 'loginPage' ? "注册米今商贷" : '修改手机号'}}</h3>
      <div class="login-input">
        <input
          v-model.trim="phone"
          @input="validatePhone"
          @blur="validatePhone"
          placeholder="请输入手机号"
        >
      </div>
      <div class="login-input flex input-code">
        <div class="the-code">
          <input
            v-model="regCode"
            tabindex="-1"
            @input="validateCode"
            @blur="validateCode"
            placeholder="请输入验证码"
          >
        </div>
        <div
          class="get-code cursor"
          v-if="!disabledRegCode"
          @click="handleRegCode"
        >{{ btnRegCountDown }}</div>
        <div class="get-code disabled-code" v-else>{{btnRegCountDown}}</div>
      </div>
      <div class="login-input">
        <input v-model.trim="password" type="password" @blur="validatePass" placeholder="请输入密码">
      </div>
      <div class="login-input">
        <input
          v-model.trim="againPassword"
          type="password"
          @input="validatePass('again')"
          @blur="validatePass('again')"
          placeholder="请确认密码"
        >
      </div>
      <p class="error-warn" v-if="isError">{{errorMsg}}</p>
      <button class="login-btn cursor" v-if="from==='loginPage'" @click="register">注册</button>
      <div class="reg-btns" v-else>
        <button class="login-btn cursor" @click="register">确定</button>
        <button class="cursor" @click="handleCloseAlert('cancel')">取消</button>
      </div>
      <p class="no-account" v-if="from === 'loginPage'">
        已有账号？
        <span class="cursor" @click="toLogin">登录</span>
      </p>
    </div>
    <div class="success-center" v-else>
      <p class="success">
        <img src="../../../assets/imgs/success.png" alt>
      </p>
      <p class="tip">{{successMsg}}</p>
      <p class="login_btn cursor" @click="toLogin">马上登录</p>
    </div>
    <div
      class="icon iconfont icon-guanbi"
      v-if="from !=='loginPage'"
      @click="handleCloseAlert('close')"
    ></div>
  </div>
</template>
<script>
import { sendCode, doRegister, changeANewPhone } from "../../../api/common.js";

export default {
  props: {
    regPhone: String,
    from: {
      type: String,
      default: "loginPage"
    }
  },
  data() {
    return {
      registerSuccess: false,
      phone: "",
      regCode: "",
      password: "",
      againPassword: "",
      disabledRegCode: true,
      btnRegCountDown: "获取短信验证码",
      regId: null,
      isError: false,
      errorMsg: "",
      passCode: "",
      successMsg: "恭喜您，注册成功"
    };
  },
  created() {
    if (this.regPhone && this.regPhone !== "") {
      this.phone = this.regPhone;
      this.disabledRegCode = false;
    }
  },
  methods: {
    resetAll() {
      // 重置注册信息
      this.phone = "";
      this.regCode = "";
      this.password = "";
      this.againPassword = "";
      this.disabledRegCode = true;
      this.isError = false;
      this.errorMsg = "";
      this.registerSuccess = false;
      this.btnRegCountDown = "获取短信验证码";
      clearTimeout(this.regId);
    },
    countRegDown(sec, msg) {
      if (sec >= 0) {
        this.disabledRegCode = true;
        if (msg && msg !== "") {
          this.btnRegCountDown = msg + `${sec}s`;
          this.regId = setTimeout(() => {
            this.countRegDown(--sec, msg);
          }, 1000);
        } else {
          this.btnRegCountDown = `剩余${sec}s`;
          this.regId = setTimeout(() => {
            this.countRegDown(--sec);
          }, 1000);
        }
      } else {
        this.disabledRegCode = false;
        this.btnRegCountDown = "获取短信验证码";
      }
    },
    validatePhone() {
      if (this.phone === "") {
        this.isError = true;
        this.errorMsg = "请输入手机号！";
        this.disabledRegCode = true;
        return false;
      } else if (!this.$valid.userCenterPhone.test(this.phone)) {
        this.isError = true;
        this.errorMsg = "请输入正确的手机号!";
        this.disabledRegCode = true;
        return false;
      } else {
        this.isError = false;
        this.errorMsg = "";
        this.disabledRegCode = false;
        return true;
      }
    },
    validateCode() {
      if (this.regCode === "") {
        this.isError = true;
        this.errorMsg = "验证码不能为空！";
        return false;
      } else if (this.regCode.length !== 4) {
        this.isError = true;
        this.errorMsg = "请输入四位验证码！";
        return false;
      } else {
        this.isError = false;
        this.errorMsg = "";
        return true;
      }
    },

    validatePass(type) {
      if (type && type === "again") {
        if (this.againPassword === "") {
          this.isError = true;
          this.errorMsg = "密码不能为空！";
          return false;
        } else if (!this.$valid.psdRegex.test(this.againPassword)) {
          this.isError = true;
          this.errorMsg = "密码为6-20位,至少包含数字、字母、符合中的两种！";
          return false;
        } else if (this.againPassword !== this.password) {
          this.isError = true;
          this.errorMsg = "两次输入的密码不一致，请重新输入！";
          return false;
        } else {
          this.isError = false;
          this.errorMsg = "";
          return true;
        }
      } else {
        if (this.password === "") {
          this.isError = true;
          this.errorMsg = "密码不能为空！";
          return false;
        } else if (!this.$valid.psdRegex.test(this.password)) {
          this.isError = true;
          this.errorMsg = "密码为6-20位,至少包含数字、字母、符合中的两种！";
          return false;
        } else {
          this.isError = false;
          this.errorMsg = "";
          return true;
        }
      }
    },

    //调用获取验证码接口
    handleRegCode() {
      if (this.validatePhone()) {
        sendCode(this.phone, "REGISTER").then(
          res => {
            if (res.data.code === 200) {
              this.countRegDown(60, "剩余");
            }
          },
          res => {
            if (res.data.code === 4001000) {
              this.countRegDown(10, res.data.message);
            } else {
              if (res.data.message.search("格式错误") !== -1) {
                this.countRegDown(10, "手机号错误");
              } else {
                this.countRegDown(10, "稍后再试");
              }
            }
          }
        );
      }
    },
    register() {
      if (
        this.validatePhone() &&
        this.validateCode() &&
        this.validatePass() &&
        this.validatePass("again")
      ) {
        this.$getPubKey(this.againPassword, res => {
          if (res !== "") {
            this.isError = false;
            this.errorMsg = "";
            let params = {
              phone: this.phone,
              password: res,
              phoneCode: this.regCode,
              encryptFlag: true
            };
            if (this.from === "loginPage") {
              this.doRegister(params);
            } else {
              this.doChangePhone(params);
            }
          } else {
            this.isError = true;
            this.errorMsg = "密码加密失败！";
          }
        });
      }
    },
    doRegister(params) {
      doRegister(params).then(
        res => {
          const _data = res.data;
          if (_data.code === 200) {
            clearTimeout(this.regId);
            this.isError = false;
            this.errorMsg = "";
            this.registerSuccess = true;
            this.successMsg = "恭喜您，注册成功";
          }
        },
        res => {
          if (res.data.code === 500) {
            this.errorMsg = "注册失败, 服务器错误!";
          } else {
            this.errorMsg = res.data.message;
          }
          this.isError = true;
        }
      );
    },
    doChangePhone(params) {
      changeANewPhone(params).then(
        res => {
          if (res.data.code == 200 && res.data.body === "OK") {
            this.registerSuccess = true;
            this.successMsg = "恭喜您，手机号更换成功!";
          }
        },
        error => {
          this.$alert(error.data.message, "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        }
      );
    },
    toLogin() {
      document.title = "登录-米今官网";
      this.resetAll();
      this.$emit("loginNow");
    },
    handleCloseAlert(type) {
      let params = {
        type: type,
        success: this.registerSuccess
      };
      this.$emit("close", params);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./user.scss";
</style>
