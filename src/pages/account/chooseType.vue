<template>
  <div class="content">
    <mijin-header :is-white="true"></mijin-header>
    <div class="credit-content">
      <div class="main-content credit-form account-step">
        <h3 class="choose-dep-title">存管开户</h3>
        <account-type :active-type="activeType" @next="handleNextStep"></account-type>        
      </div>
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import accountType from "../components/accountTypeChooseComp.vue";
import MijinFootter from "../../components/footter.vue";
import { getPublicOpenStatus } from "../api/account.js";
export default {
  name: "chooseTypePage",
  components: {
    MijinHeader,
    accountType,
    MijinFootter
  },
  data() {
    return {
      activeType: "0"
    };
  },
  created() {},
  methods: {
    handleNextStep(val) {
      if (val == "0") {
        this.$router.push({ name: "accountOpenPrivatePage" });
      } else if (val == "1") {
        this.getPublicOpenStatus();
      }
    },
    /**====开户类型为对公时的"下一步"操作的接口,用来判断存管对公户开户是否支持====**/
    getPublicOpenStatus() {
      getPublicOpenStatus()
        .then(response => {
          if (response.data.code == 200) {
            this.$router.push({ name: "accountOpenPublicPage" });
          } else {
            this.$confirm("未知错误?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              closeOnClickModal: false,
              closeOnPressEscape: false
            });
          }
        })
        .catch(Error => {
          this.$confirm(Error.data.message, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            closeOnClickModal: false,
            closeOnPressEscape: false
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.credit-content .credit-form.account-step {
  .dep {
    .credit-form-apply {
      width: 730px;
    }
  }
}
</style>
