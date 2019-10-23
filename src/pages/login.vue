<template>
  <div class="content">
    <mijin-header></mijin-header>
    <div class="login-content">
      <div class="login-content-inner">
        <div class="main-content login-main">
          <div class="main-content login-inner">
            <compRegister @loginNow="toLogin" :reg-phone="regPhone" v-if="type === 'register'"/>
            <compLogin
              @toForget="handleForgetLogin"
              @toRegister="toRegister"
              v-else-if="type === 'login'"
            />
            <compForget @toLogin="toLogin" :fgt-phone="forgetPhone" v-else-if="type==='forget'"/>
          </div>
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
import MijinHeader from "../components/header.vue";
import MijinFootter from "../components/footter.vue";
import compLogin from "./components/compsUser/compLogin";

import compRegister from "./components/compsUser/compRegister";
import compForget from "./components/compsUser/compForget";

import * as api from "../api/common";

export default {
  name: "LoginPage",
  components: {
    MijinHeader,
    compLogin,
    compRegister,
    compForget,
    MijinFootter
  },
  data() {
    return {
      // 切换登录、注册、修改密码
      type: "login",
      regPhone: "",
      forgetPhone: ""
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
    toRegister(data) {
      this.regPhone = data;
      document.title = "注册-米今官网";
      this.type = "register";
    },

    handleForgetLogin(data) {
      this.forgetPhone = data;
      this.type = "forget";
    },
    toLogin() {
      document.title = "登录-米今官网";
      this.type = "login";
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
  }
}
</style>