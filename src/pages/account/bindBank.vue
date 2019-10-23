<template>
  <div class="content">
    <mijin-header :is-white="true"></mijin-header>
    <div class="credit-content">
      <div class="main-content credit-form account-step">
        <h3 class="choose-dep-title">绑定银行卡</h3>
        <bind-bank-inner :value="bankInfo" @submit="handleSubmit" @showBanklist="handleShowBanklist"></bind-bank-inner>            
      </div>
    </div>
    <bank-list :showbanklist="showBanklist" @close="handleCLosed"></bank-list>
    <mijin-footter></mijin-footter>   
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import bindBankInner from "../components/bindBankComp.vue";
import bankList from "../users/components/bankList.vue";
import * as api from "../api/users.js";
import checkAccount from "../src/mixins/checkAccount.js";
import { postBindBank } from "../api/account.js";

export default {
  name: "bindBankPage",
  mixins: [checkAccount],
  components: {
    MijinHeader,
    MijinFootter,
    bindBankInner,
    bankList
  },
  data() {
    return {
      showBanklist: false,
      bankInfo: {
        bankNumber: "",
        marriage: ""
      }
    };
  },
  computed: {},
  created() {},
  methods: {
    handleSubmit(val) {
      postBindBank(val)
        .then(response => {
          if (response.data.code == 200) {
            this.checkAccountFn();
          } else {
            this.$confirm("绑卡失败,未知错误!", "提示", {
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
    },
    handleShowBanklist() {
      this.showBanklist = true;
    },
    handleCLosed() {
      this.showBanklist = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.credit-content .credit-form.account-step {
  padding-bottom: 10vh;
}
</style>
