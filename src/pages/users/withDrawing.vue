<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'withDrawingPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersAccountPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <div class="bind-success-content">
            <!-- <h3>绑定银行卡</h3> -->
            <section class="bind-success">
              <p class="tip-img"></p>
              <p>提现申请受理中!</p>
            </section>
            <p class="bind-return"><span>{{time}}</span>秒后将自动返回<router-link to="/user/account">我的账户</router-link>页</p>
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
import bankList from "./components/bankList";
import * as api from "../api/users";
export default {
  name: "withDrawingPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinLeftMenu
  },
  data() {
    return {
      time: 3
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
        this.$router.push({ name: "usersAccountPage" });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.bind-success-content {
  padding: 100px 0;
  background: #fff;
  .section-custom {
    margin-top: 0;
    padding-top: 50px;
  }
}
.bind-success {
  text-align: center;
  .tip-img {
    width: 138px;
    height: 138px;
    margin: 0 auto;
    background: url("../../assets/imgs/auth_fail_pic.png") no-repeat center
      center;
  }
}
.bind-return {
  text-align: center;
  margin-top: 20px;
  span {
    margin: 0 10px;
    color: orange;
  }
  a {
    font-size: 18px;
    color: orange;
    margin: 0 10px;
  }
}
</style>
