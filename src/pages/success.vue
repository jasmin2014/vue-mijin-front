<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'QuotaPage'" :is-target="true"></mijin-header>
    <mijin-success v-if="pageName !== 'creditGuaranteePage'" :success-title="successTitle" :success-text="successText" :page-name="pageName"></mijin-success>
    <mijin-success v-else :success-title="successTitle" :success-text="successText" :page-name="pageName"></mijin-success>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
import MijinHeader from "../components/header.vue";
import MijinFootter from "../components/footter.vue";
import MijinSuccess from "./components/success.vue";
export default {
  name: "successPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinSuccess
  },
  data() {
    return {
      successTitle: "",
      successText: "",
      pageName: this.$route.query.pageName
    };
  },
  created() {
    if (this.pageName === "accountOpenPage") {
      this.successTitle = "您的开户资料已提交";
      this.successText = "开户成功后，我们将以短信通知您";
    } else if (this.pageName === "creditGuaranteePage") {
      this.successTitle = "您已成功提交担保人信息";
    } else if (this.pageName === "usersWithdrawPage") {
      this.successTitle = "提现处理中!";
    } else {
      this.successTitle = "您已成功提交申请";
      this.successText = "请保持手机畅通，我们的工作人员将在两个工作日内联系您";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
</style>
