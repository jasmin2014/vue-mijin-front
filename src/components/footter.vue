<template>
  <div class="footter">
    <div class="main-content footter-inner flex">
      <section>
        <ul class="clearfix">
          <li>
            <label></label>
            <router-link to="/about">关于我们</router-link>
          </li>
          <li>
            <label></label>
            <router-link to="/news">信息公告</router-link>
          </li>
        </ul>
        <div class="copy-right">
          <p>米今@360mijin.com 浙ICP备17037584号-1 版权所有</p>
          <p>浙江省杭州市滨江区江虹路611号上峰电商产业园2-1幢3楼</p>
        </div>
      </section>
      <section class="footter-connect">
        <p>客服电话</p>
        <p class="footter-tel">400-6690-108</p>
        <p class="footter-time">( 工作日：09:00-21:00 )</p>
        <div class="footter-btn">
          <a href="javascript:void(0);" @click="handleToChat">联系客服</a>
        </div>
      </section>
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.footter {
  width: 100%;
  height: 200px;
  background: #2f2e36;
  position: absolute;
  bottom: 0;
  left: 0;
  .footter-inner {
    height: 100%;
    background: url("../assets/imgs/logo_foot.png") no-repeat left center;
    padding-left: 200px;
    > * {
      color: #fff;
    }
    > section {
      ul {
        margin-top: 40px;
        display: block;
      }
      li {
        list-style: none;
        float: left;
        position: relative;
        padding-left: 10px;
        margin-right: 20px;
        label {
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -2px;
          display: block;
          width: 4px;
          height: 4px;
          background: #fff;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
        }
        a {
          color: #fff;
          font-size: 14px;
        }
      }
      .copy-right {
        margin-top: 42px;
        > * {
          line-height: 26px;
          font-size: 14px;
          color: #dfdfe2;
        }
      }
    }
    .footter-connect {
      padding-top: 35px;
      p:first-child {
        font-size: 14px;
      }
      .footter-tel {
        font-size: 25px;
        line-height: 40px;
      }
      .footter-time {
        color: #918ea0;
        font-size: 14px;
      }
      .footter-btn {
        width: 124px;
        text-align: center;
        line-height: 36px;
        font-size: 14px;
        margin-top: 16px;
        color: #8a8a8a;
        border: 1px solid #878787;
        a {
          color: #fff;
        }
      }
    }
  }
}
</style>
