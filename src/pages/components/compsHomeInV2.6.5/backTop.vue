<style lang="scss" scoped>
.qq {
  display: block;
  width: 82px;
  height: 82px;
  padding-top: 15px;
  transition: all 0.2s;
  border: 1px solid #f7f7f7;
  cursor: pointer;
  > span {
    display: block;
    width: 33px;
    height: 32px;
    margin: 0 0 0 25px;
    background-position: -10px -578px;
  }
  > p {
    line-height: 30px;
    text-align: center;
    font-size: 14px;
  }
}
.floatTop {
  position: fixed;
  width: 82px;
  height: 164px;
  transition: all 0.2s;
  right: 60px;
  bottom: 250px;
  background: #fff;
  z-index: 999;
  .goTop {
    width: 82px;
    height: 82px;
    background: #f6ac0f;
    cursor: pointer;
    transition: all 0.2s;
    padding-top: 10px;
    > span {
      display: block;
      width: 28px;
      height: 38px;
      margin: 0 auto;
      background-position: -63px -534px;
    }
    > p {
      color: #fff;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
<template>
  <div class="floatTop">
    <!-- <a
      href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDE3MTk4Nl80ODg2OTNfODAwMTcxOTg2Xw"
      class="qq"
      target="_blank"
    >
      <span class="home-pics"/>
      <p>QQ在线</p>
    </a>-->
    <a href="javascript:void(0);" class="qq" @click="handleToChat">
      <span class="home-pics"/>
      <p>在线客服</p>
    </a>

    <div class="goTop" @click="goTop">
      <span class="home-pics"/>
      <p>回到顶部</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lName: "",
      visitType: ""
    };
  },
  created() {
    // this.getLName();
  },
  watch: {
    lName(val) {
      this.lName = val;
    },
    visitType(val) {
      this.visitType = val;
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
      console.log("handleToChat:", _hrf);
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
      console.log(this.lName);
    },
    goTop() {
      let scrollFn = null;
      scrollFn = setInterval(() => {
        let nowScroll = document.body.scrollTop
          ? document.body.scrollTop
          : document.documentElement.scrollTop;
        if (nowScroll == 0) {
          clearInterval(scrollFn);
        } else {
          document.body.scrollTop -= 200;
          document.documentElement.scrollTop -= 200;
        }
      }, 35);
    }
  }
};
</script>

