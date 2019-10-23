<template>
  <div class="new-top">
    <div class="new-top-content flex">
      <div class="new-top-left">
        客服热线：400-6690-108（09:00～21:00）
        <a href="javascript:void(0);" @click="handleToChat">在线客服</a>
      </div>
      <div class="new-top-right">
        欢迎来到米今商贷！您好，
        <span v-if="!isLogin">
          请
          <router-link to="/login" target="_blank" v-if="isTarget">登录</router-link>
          <router-link to="/login" v-else>登录</router-link>
        </span>
        <label v-else>
          <span class="header-top-user">{{userName}}</span>
          <span class="logo-out cursor" @click="doLogOut('doLogOut')">退出</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from "../../../api/common.js";
export default {
  props: {
    isTarget: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pageName: this.$route.name,
      isLogin: false,
      userName: "",
      lName: "",
      visitType: ""
    };
  },
  watch: {
    lName(val) {
      this.lName = val;
    },
    visitType(val) {
      this.visitType = val;
    }
  },
  created() {
    // this.getLName();
    const _logInfo =
      this.$getLocalStorage("loginInfo") &&
      this.$getLocalStorage("loginInfo") !== ""
        ? JSON.parse(this.$getLocalStorage("loginInfo"))
        : {};
    if (
      this.$getLocalStorage("token") &&
      this.$getLocalStorage("token") !== ""
    ) {
      this.isLogin = true;
      this.userName = _logInfo.mobile ? _logInfo.mobile : _logInfo.name;
      if (!this.$getLocalStorage("users")) {
        this.getUserInfo();
      }
    } else {
      if (
        this.pageName === "HomePage" ||
        this.pageName === "NewsPage" ||
        this.pageName === "NewsDetailPage" ||
        this.pageName === "AboutUsPage"
      ) {
        return;
      } else {
        this.$router.push({
          name: "LoginPage"
        });
      }
    }
  },
  methods: {
    handleToChat() {
      this.getLName();
      var _url = process.env.CHAT_URL;
      let _hrf =
        _url +
        "webchat/jsp/standard/interfacePools.jsp?from=web&queue=5&loginName=" +
        this.lName +
        "&password=&visit=" +
        this.visitType +
        "&device=pc";
      console.log("handleToChat_top=====", _hrf);
      window.open(_hrf, "_blank");
    },
    getLName() {
      if (
        this.$getLocalStorage("token") &&
        this.$getLocalStorage("token") !== ""
      ) {
        this.visitType = "0";
        this.lName = JSON.parse(this.$getLocalStorage("loginInfo")).mobile;
      } else {
        this.visitType = "1";
        if (!this.$store.state.deviceIp) {
          if (sdk && sdk.getDeviceId) {
            var deviceId = sdk.getDeviceId();
            this.$store.commit("saveDeviceIp", deviceId);
            this.lName = deviceId;
          }
        } else {
          this.lName = this.$store.state.deviceIp;
        }
      }
    },
    getUserInfo() {
      getUserInfo().then(res => {
        if (res.data.code === 200) {
          const _users = JSON.stringify(res.data.body);
          this.$setLocalStorage("users", _users);
        }
      });
    },
    doLogOut() {
      this.$logout(() => {
        if (this.isTarget) {
          let routeData = this.$router.resolve({
            name: "LoginPage"
          });
          window.open(routeData.href, "_blank");
        } else {
          this.$router.push({
            name: "LoginPage"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.new-top {
  width: 100%;
  height: 33px;
  line-height: 33px;
  background-color: #e9e7e5;
  .new-top-content {
    width: 1200px;
    margin: 0 auto;
    color: #8a8990;
    .new-top-left,
    .new-top-right {
      font-size: 14px;
      > span a:hover,
      .logo-out:hover {
        color: #ffa812;
      }
    }
  }
}
</style>
