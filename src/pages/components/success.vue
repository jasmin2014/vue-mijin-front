<template>
  <div class="credit-content">
    <div class="main-content credit-success">
      <div class="credit-success-pic">
        <img src="../../assets/imgs/auth_success_pic.png">
      </div>
      <div class="credit-success-txt">{{successTitle}}</div>
      <p v-if="pageName && pageName ==='creditGuaranteePage'">
        我们会以短信提示担保人完善信息，您可以通过
        <router-link to="/user/credit" target="_blank">授信申请记录</router-link>查看进度。
      </p>
      <p v-else class="credit-txt-mt40">{{successText}}</p>

      <p class="orange">
        温馨提醒: 米今平台除本金和利息外,不收取其它费用,如有个人或企业收取手续费或服务费,请拨打客服热线
        <a href="TEL:4006690108">4006690108</a>
      </p>
      <p class="credit-txt-mt40" v-if="pageName && pageName === 'usersWithdrawPage'">
        <span>{{time}}s</span>后将自动
        <router-link to="/user/account" target="_blank">我的账户</router-link>页
      </p>
      <!-- <p class="credit-txt-mt40" v-else-if="pageName && pageName === 'creditGuaranteePage'"><span>{{time}}s</span>后将自动<router-link to="/user/credit" target="_blank">授信申请记录</router-link>页</p> -->
      <p class="credit-txt-mt40" v-else>
        <span>{{time}}s</span>后将自动
        <router-link to="/" target="_blank">返回首页</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    successTitle: String,
    successText: String,
    pageName: String
  },
  data() {
    return {
      time: 5
    };
  },
  created() {
    this.countDown(5);
  },
  methods: {
    countDown(sec) {
      if (sec > 0) {
        this.time = `${sec}`;
        setTimeout(() => {
          this.countDown(--sec);
        }, 1000);
      } else {
        if (this.pageName === "usersWithdrawPage") {
          this.$router.push({ name: "usersAccountPage" });
        } else {
          this.$router.push({ name: "HomePage" });
        }
      }
    }
  }
};
</script>

