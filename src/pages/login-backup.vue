<template>
  <div class="content">
    <div class="login-content">
      <div class="login-content-inner">
        <div class="main-content login-main">
          <div class="main-content login-inner">
            <div class="login-inner-box" v-if="type=='register'">
              <div v-if="registerSuccess==false">
                <h3>注册米今商贷</h3>
                <div class="login-input">
                  <input v-model.trim="regPhone" @input="changeRegPhone" placeholder="请输入手机号">
                </div>
                <div class="login-input flex input-code">
                  <div class="the-code">
                    <input
                      v-model="regCode"
                      tabindex="-1"
                      @input="handleCheckRegCode"
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
                  <input
                    v-model.trim="regPassword"
                    type="password"
                    @input="changeRegPW"
                    placeholder="请输入密码"
                  >
                </div>
                <div class="login-input">
                  <input
                    v-model.trim="regAgainPassword"
                    type="password"
                    @input="changeRegAgainPW"
                    placeholder="请确认密码"
                  >
                </div>
                <p
                  style="color: #f19c00;font-size: 12px;margin-top: 10px;"
                  v-if="isRegError"
                >{{errorRegMsg}}</p>
                <button class="login-btn cursor" @click="register">注册</button>
                <p class="no-account">
                  已有账号？
                  <span @click="toLogin">登录</span>
                </p>
              </div>
              <div class="success-center" v-else>
                <p class="success">
                  <img src="../assets/imgs/success.png" alt>
                </p>
                <p class="tip">恭喜您，注册成功</p>
                <p class="login_btn" @click="toLogin">马上登录</p>
              </div>
            </div>
            <div class="login-inner-box" v-else-if="type=='pass'">
              <h3>欢迎登录米今商贷</h3>
              <div class="login-input">
                <input v-model.trim="userPhone" @input="changePassPhone" placeholder="请输入手机号">
              </div>
              <div class="login-input">
                <input
                  type="password"
                  v-model.trim="password"
                  @input="changePassPhone"
                  placeholder="请输入密码"
                >
              </div>
              <p
                style="color: #f19c00;font-size: 12px;margin-top: 10px;"
                v-if="isPassError"
              >{{errorPassMsg}}</p>
              <p class="pass-login">
                <span class="fl cursor" @click="handleMsgLogin">短信快捷登录</span>
                <span class="fr cursor" @click="handleForgetLogin">忘记密码</span>
              </p>
              <button class="login-btn cursor" @click="passLogin">登录</button>
              <p class="no-account">
                没有账号？
                <span @click="toRegister">注册</span>
              </p>
            </div>
            <div class="login-inner-box" v-else-if="type=='forget'">
              <div v-if="forgetSuccess==false">
                <h3>忘记密码</h3>
                <div class="login-input">
                  <input v-model.trim="forgetPhone" @input="changeForgetPhone" placeholder="请输入手机号">
                </div>
                <div class="login-input flex input-code">
                  <div class="the-code">
                    <input
                      v-model="forgetCode"
                      tabindex="-1"
                      @input="handleCheckForgetCode"
                      placeholder="请输入验证码"
                    >
                  </div>
                  <div class="get-code cursor" v-if="!disabledForgetCode" @click="handleForgetCode">
                    {{
                    btnForgetCountDown }}
                  </div>
                  <div class="get-code disabled-code" v-else>{{btnForgetCountDown}}</div>
                </div>
                <div class="login-input">
                  <input
                    v-model.trim="forgetPassword"
                    type="password"
                    @input="changeForgetPW"
                    placeholder="请输入密码"
                  >
                </div>
                <div class="login-input">
                  <input
                    v-model.trim="forgetAgainPassword"
                    type="password"
                    @input="changeForgetAgainPW"
                    placeholder="请确认密码"
                  >
                </div>
                <p
                  style="color: #f19c00;font-size: 12px;margin-top: 10px;"
                  v-if="isForgetError"
                >{{errorForgetMsg}}</p>
                <button class="login-btn cursor" @click="forget">提交</button>
                <button class="back-btn cursor" @click="toLogin">返回</button>
              </div>
              <div class="forget-center" v-else>
                <p class="success">
                  <img src="../assets/imgs/success.png" alt>
                </p>
                <p class="tip">修改成功</p>
                <p class="warning">请牢记新的登录密码</p>
                <p class="login_btn cursor" @click="toLogin">重新登录</p>
              </div>
            </div>
            <div class="login-inner-box" v-else>
              <h3>欢迎登录米今商贷</h3>
              <div class="login-input">
                <input v-model.trim="userPhone" @input="changePhone" placeholder="请输入手机号">
              </div>
              <div class="login-input flex input-code">
                <div class="the-code">
                  <input
                    v-model="userCode"
                    tabindex="-1"
                    @change="handleCheckCode"
                    placeholder="请输入验证码"
                  >
                </div>
                <div
                  class="get-code cursor"
                  v-if="!disabledCode"
                  @click="handleCode"
                >{{ btnCountDown }}</div>
                <div class="get-code disabled-code" v-else>{{btnCountDown}}</div>
              </div>
              <p
                style="color: #f19c00;font-size: 12px;margin-top: 10px;"
                v-if="isError"
              >{{errorMsg}}</p>
              <p class="pass-login">
                <span class="fl cursor" @click="handlePassLogin">密码登录</span>
              </p>
              <button class="login-btn cursor" @click="login">登录</button>
              <p class="no-account">
                没有账号？
                <span @click="toRegister">注册</span>
              </p>
            </div>
          </div>
        </div>
        <mijin-header></mijin-header>
      </div>
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
import MijinHeader from "../components/header.vue";
import MijinFootter from "../components/footter.vue";

import * as api from "../api/common";

export default {
  name: "LoginPage",
  components: {
    MijinHeader,
    MijinFootter
  },
  data() {
    return {
      // 计时器id
      loginId: null,
      regId: null,
      forgetId: null,
      // 注册成功显示
      registerSuccess: false,
      // 修改成功显示
      forgetSuccess: false,
      // 切换登录、注册、修改密码
      type: "login",
      // 短信登录信息
      userPhone: "",
      userCode: "",
      disabledCode: true,
      btnCountDown: "获取短信验证码",
      isError: false,
      errorMsg: "",
      // 密码登录信息
      password: "",
      isPassError: false,
      errorPassMsg: "",
      // 注册信息
      regPhone: "",
      regCode: "",
      regPassword: "",
      regAgainPassword: "",
      disabledRegCode: true,
      isRegError: false,
      errorRegMsg: "",
      btnRegCountDown: "获取短信验证码",
      // 忘记密码
      forgetPhone: "",
      forgetCode: "",
      forgetPassword: "",
      forgetAgainPassword: "",
      disabledForgetCode: true,
      isForgetError: false,
      errorForgetMsg: "",
      btnForgetCountDown: "获取短信验证码"
    };
  },
  created() {
    if (
      this.$getLocalStorage("token") &&
      this.$getLocalStorage("token") !== ""
    ) {
      this.$router.push({
        name: "HomePage"
      });
    }
  },
  methods: {
    // 短信登录模块
    changePhone() {
      const phone = this.userPhone;
      this.isError = false;
      this.disabledCode = !this.$valid.phoneRegexp13_19.test(phone);
    },
    handlePassLogin() {
      this.type = "pass";
      this.resetAll();
    },
    login() {
      if (this.userPhone === "") {
        this.isError = true;
        this.errorMsg = "请输入手机号!";
      } else if (!this.$valid.phoneRegexp13_19.test(this.userPhone)) {
        this.isError = true;
        this.errorMsg = "请输入正确的手机号!";
      } else if (this.userCode === "") {
        this.isError = true;
        this.errorMsg = "请输入验证码！";
      } else {
        this.doLogin(this.userPhone, this.userCode);
      }
    },
    doLogin(phone, phoneCode) {
      api.doMsgLogin(phone, phoneCode).then(
        res => {
          const _data = res.data;

          if (_data.code === 200) {
            clearTimeout(this.loginId);
            this.isError = false;
            this.errorMsg = "";
            if (_data.body.userStatus === "USABLE") {
              this.$setLocalStorage("loginInfo", JSON.stringify(_data.body));
              this.$setLocalStorage("token", _data.body.token);
              this.$router.push({
                name: "HomePage"
              });
            }
          }
        },
        res => {
          clearTimeout(this.loginId);
          if (res.data.code === 500) {
            this.errorMsg = "登录失败, 服务器错误!";
          } else {
            this.errorMsg = res.data.message;
          }
          this.isError = true;
        }
      );
    },
    handleCode() {
      api.sendCode(this.userPhone, "LOGIN").then(
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
    handleCheckCode() {
      if (this.userCode.length === 4) {
        this.isError = false;
        this.errorMsg = "";
      } else {
        this.isError = false;
      }
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
    toRegister() {
      document.title = "注册-米今官网";
      this.type = "register";
      this.userCode = "";
      this.userPhone = "";
      this.registerSuccess = false;
      this.forgetSuccess = false;
    },

    // 密码登录模块
    changePassPhone() {
      this.isPassError = false;
    },
    handleMsgLogin() {
      this.type = "login";
      this.resetAll();
    },
    handleForgetLogin() {
      this.type = "forget";
      this.resetAll();
    },
    passLogin() {
      if (this.userPhone === "") {
        this.isPassError = true;
        this.errorPassMsg = "请输入手机号!";
      } else if (!this.$valid.phoneRegexp13_19.test(this.userPhone)) {
        this.isPassError = true;
        this.errorPassMsg = "请输入正确的手机号!";
      } else if (this.password === "") {
        this.isPassError = true;
        this.errorPassMsg = "请输入密码！";
      } else {
        this.passwordLogin(this.userPhone, this.password);
      }
    },
    passwordLogin(phone, password) {
      api.doPassLogin(phone, password).then(
        res => {
          const _data = res.data;
          if (_data.code == 200) {
            this.isPassError = false;
            this.errorPassMsg = "";
            if (_data.body.userStatus === "USABLE") {
              this.$setLocalStorage("token", _data.body.token);
              this.$setLocalStorage("loginInfo", JSON.stringify(_data.body));
              this.$router.push({
                name: "HomePage"
              });
            }
          }
        },
        err => {
          if (err.data.code === 500) {
            this.errorMsg = "登录失败, 服务器错误!";
          } else {
            this.errorPassMsg = err.data.message;
          }
          this.isPassError = true;
        }
      );
    },

    // 注册模块
    changeRegPhone() {
      const phone = this.regPhone;
      this.isRegError = false;
      this.disabledRegCode = !this.$valid.phoneRegexp13_19.test(phone);
    },
    handleCheckRegCode() {
      if (this.regCode.length === 4) {
        this.isRegError = false;
        this.errorRegMsg = "";
      } else {
        this.isRegError = false;
      }
    },
    handleRegCode() {
      api.sendCode(this.regPhone, "REGISTER").then(
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
    },
    changeRegPW() {
      this.isRegError = false;
    },
    changeRegAgainPW() {
      this.isRegError = false;
    },
    register() {
      if (this.regPhone === "") {
        this.isRegError = true;
        this.errorRegMsg = "请输入手机号!";
      } else if (!this.$valid.phoneRegexp13_19.test(this.regPhone)) {
        this.isRegError = true;
        this.errorRegMsg = "请输入正确的手机号!";
      } else if (this.regCode === "" || this.regCode.length != 4) {
        this.isRegError = true;
        this.errorRegMsg = "请输入验证码！";
      } else if (this.regPassword == "" || this.regAgainPassword == "") {
        this.isRegError = true;
        this.errorRegMsg = "请输入密码！";
      } else if (this.regPassword != this.regAgainPassword) {
        this.isRegError = true;
        this.errorRegMsg = "两次输入的密码不相同，请重新输入！";
      } else {
        this.doRegister(this.regPhone, this.regCode, this.regPassword);
      }
    },
    doRegister(phone, phoneCode, password) {
      api.doRegister(phone, password, phoneCode).then(
        res => {
          const _data = res.data;
          if (_data.code === 200) {
            clearTimeout(this.regId);
            this.isRegError = false;
            this.errorRegMsg = "";
            this.registerSuccess = true;
          }
        },
        res => {
          clearTimeout(this.regId);
          if (res.data.code === 500) {
            this.errorRegMsg = "注册失败, 服务器错误!";
          } else {
            this.errorRegMsg = res.data.message;
          }
          this.isRegError = true;
        }
      );
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
    toLogin() {
      document.title = "登录-米今官网";
      this.type = "login";
      this.resetAll();
    },
    // 重置所有信息
    resetAll() {
      // 重置登录信息
      this.password = "";
      this.isPassError = "";
      this.errorPassMsg = "";
      // 重置短信登录信息
      this.userPhone = "";
      this.userCode = "";
      this.disabledCode = true;
      this.btnCountDown = "获取短信验证码";
      this.isError = false;
      this.errorMsg = "";
      // 重置注册信息
      this.regPhone = "";
      this.regCode = "";
      this.regPassword = "";
      this.regAgainPassword = "";
      this.disabledRegCode = true;
      this.isRegError = false;
      this.errorRegMsg = "";
      this.registerSuccess = false;
      this.btnRegCountDown = "获取短信验证码";
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
      // 清除定时器
      clearTimeout(this.loginId);
      clearTimeout(this.regId);
      clearTimeout(this.forgetId);
    },
    // 忘记密码模块
    changeForgetPhone() {
      const phone = this.forgetPhone;
      this.isForgetError = false;
      this.disabledForgetCode = !this.$valid.phoneRegexp13_19.test(phone);
    },
    handleCheckForgetCode() {
      if (this.forgetCode.length === 4) {
        this.isForgetError = false;
        this.errorForgetMsg = "";
      } else {
        this.isForgetError = false;
      }
    },
    handleForgetCode() {
      api.sendCode(this.forgetPhone, "RESET_PASSWORD").then(
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
    changeForgetPW() {
      this.isForgetError = false;
    },
    changeForgetAgainPW() {
      this.isForgetError = false;
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
    forget() {
      if (this.forgetPhone === "") {
        this.isForgetError = true;
        this.errorForgetMsg = "请输入手机号!";
      } else if (!this.$valid.phoneRegexp13_19.test(this.forgetPhone)) {
        this.isForgetError = true;
        this.errorForgetMsg = "请输入正确的手机号!";
      } else if (this.forgetCode === "" || this.forgetCode.length != 4) {
        this.isForgetError = true;
        this.errorForgetMsg = "请输入验证码！";
      } else if (this.forgetPassword == "" || this.forgetAgainPassword == "") {
        this.isForgetError = true;
        this.errorForgetMsg = "请输入密码！";
      } else if (this.forgetPassword != this.forgetAgainPassword) {
        this.isForgetError = true;
        this.errorForgetMsg = "两次输入的密码不相同，请重新输入！";
      } else {
        this.doForget(this.forgetPhone, this.forgetPassword, this.forgetCode);
      }
    },
    doForget(phone, password, phoneCode) {
      api.doForget(phone, password, phoneCode).then(
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login-content {
  width: 100%;
  height: 808px;
  background: url("../assets/imgs/banner/login_bg_01.jpg") no-repeat center top;

  .login-content-inner {
    position: relative;
    height: 100%;
    background: url("../assets/imgs/banner/login_bg_02.jpg") no-repeat center
      404px;

    .login-header {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}

.success-center {
  text-align: center;

  .success {
    margin-top: 50px;
  }

  .tip {
    font-size: 20px;
    color: #ff8c01;
    margin-top: 30px;
  }

  .login_btn {
    width: 318px;
    height: 38px;
    line-height: 38px;
    color: #ffffff;
    font-size: 16px;
    border-radius: 5px;
    margin: 30px auto 60px;
    background-color: #ff9c00;
  }
}

.forget-center {
  text-align: center;

  .success {
    margin-top: 50px;
  }

  .tip {
    font-size: 20px;
    color: #ff8c01;
    margin-top: 30px;
  }

  .warning {
    margin-top: 10px;
    font-size: 14px;
    color: #757575;
  }

  .login_btn {
    width: 318px;
    height: 38px;
    line-height: 38px;
    color: #ffffff;
    font-size: 16px;
    border-radius: 5px;
    margin: 30px auto 60px;
    background-color: #ff9c00;
  }
}

.login-main {
  position: relative;
  height: 100%;
  background: url("../assets/imgs/banner/login_pic_01.jpg") no-repeat center top;

  .login-inner {
    position: relative;
    height: 100%;
    background: url("../assets/imgs/banner/login_pic_02.jpg") no-repeat center
      404px;

    .login-inner-box {
      width: 350px;
      background: #fff;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -140px;
      padding: 0 20px;

      h3 {
        font-size: 18px;
        line-height: 80px;
        color: #666;
        font-weight: normal;
      }

      .pass-login {
        color: #ff9c00;
        margin-top: 10px;
        height: 25px;
        line-height: 25px;
        clear: both;
        font-size: 14px;

        .fl {
          float: left;
        }

        .fr {
          float: right;
        }
      }

      .no-account {
        text-align: center;
        color: #757575;
        font-size: 14px;
        margin: 15px auto;

        span {
          color: #ff9c00;
          cursor: pointer;
        }
      }

      .login-input {
        height: 40px;
        margin-top: 12px;

        input {
          width: 100%;
          height: 40px;
          border: 1px solid #ddd;
          padding-left: 10px;
        }

        input::-webkit-input-placeholder {
          color: #999;
          padding-left: 10px;
        }
      }

      .input-code {
        margin-top: 10px;

        > div {
          height: 40px;
          line-height: 40px;
        }

        .the-code {
          width: 180px;
        }

        .get-code {
          border: none;
          width: 120px;
          background: #ff9c00;
          color: #fff;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
        }

        .get-code.disabled-code {
          background: #ddd;
        }
      }

      .login-btn {
        border: none;
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: block;
        font-size: 16px;
        margin: 10px auto;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        background: #ff9c00;
        color: #fff;
        text-align: center;
        letter-spacing: 10px;
      }

      .back-btn {
        border: none;
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: block;
        font-size: 16px;
        margin: 10px auto 40px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        color: #757575;
        text-align: center;
        border: solid 1px #c9c9c9;
        letter-spacing: 10px;
      }
    }
  }
}
</style>
