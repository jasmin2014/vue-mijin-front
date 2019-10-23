<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'bindBankPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersAssetPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <div class="bindbank-content">
            <div class="bindbnak-success">
              <div class="success-inner" v-if="pageFrom === 'userBindBankPage'">
                <div class="credit-success-pic">
                  <img src="../../assets/imgs/auth_success_pic.png">
                </div>
                <div class="credit-success-txt">恭喜,您已绑卡成功!</div>
                <p class="credit-txt-mt40 status-rounterto">
                  <span>{{time}}</span>秒后将自动返回
                  <router-link to="/user/asset" target="_blank">资金管理页</router-link>
                </p>
              </div>
              <div class="success-inner" v-if="pageFrom === 'userChangeBankPage'">
                <div class="credit-success-pic">
                  <img src="../../assets/imgs/auth_success_pic.png">
                </div>
                <div class="credit-success-txt">恭喜,您已更换卡成功!</div>
                <p class="credit-txt-mt40 status-rounterto">
                  <span>{{time}}</span>秒后将自动返回
                  <router-link to="/user/asset" target="_blank">资金管理页</router-link>
                </p>
              </div>
              <div class="success-inner" v-else-if="pageFrom === 'usersDepWithdrawPage'">
                <div class="credit-success-pic">
                  <img src="../../assets/imgs/auth_fail_pic.png">
                </div>
                <div class="credit-success-txt">提现申请受理中!</div>
                <p class="credit-txt-mt40 status-rounterto">
                  <span>{{time}}</span>秒后将自动返回
                  <router-link to="/user/account" target="_blank">我的账户页</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import MijinLeftMenu from "./components/userLeft.vue";
import * as api from "../api/users";
export default {
  name: "depOperateSuccessPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinLeftMenu
  },
  data() {
    return {
      time: 3,
      pageFrom: this.$route.query.pageFrom
    };
  },
  computed: {},
  created() {
    this.countDown(3);
  },
  methods: {
    countDown(sec) {
      if (sec > 0) {
        this.time = `${sec}`;
        setTimeout(() => {
          this.countDown(--sec);
        }, 1000);
      } else {
        if (
          this.pageFrom === "userBindBankPage" ||
          this.pageFrom === "userChangeBankPage"
        ) {
          this.$router.push({ name: "usersAssetPage" });
        } else if (this.pageFrom === "usersDepWithdrawPage") {
          this.$router.push({ name: "usersAccountPage" });
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.status-rounterto {
  span,
  a {
    color: #f29900;
    font-size: 16px;
    margin: 0 5px;
  }
}
</style>
