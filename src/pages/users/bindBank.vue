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
            <h3>{{pageType === 'bindBank' ? '绑定银行卡':'更换银行卡'}}</h3>
            <bind-bank-inner
              :value="bankInfo"
              @submit="handleSubmit"
              @showBanklist="handleShowBanklist"
            ></bind-bank-inner>
          </div>
        </div>
      </div>
    </div>
    <bank-list :showbanklist="showBanklist" @close="handleCLosed"></bank-list>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import MijinLeftMenu from "./components/userLeft.vue";
import bindBankInner from "../components/bindBankComp.vue";
import bankList from "./components/bankList";
import * as api from "../api/users";
import { postBindBank, postChangeBank } from "../api/account.js";
import checkAccount from "../src/mixins/checkAccount.js";
export default {
  name: "userBindBankPage",
  mixins: [checkAccount],
  components: {
    MijinHeader,
    MijinFootter,
    MijinLeftMenu,
    bindBankInner,
    bankList
  },
  data() {
    return {
      showBanklist: false,
      bankInfo: {
        name: "",
        userCard: "",
        bankNumber: "",
        marriage: ""
      },
      pageType: this.$route.query.pageType || "bindBank"
    };
  },
  computed: {},
  created() {},
  methods: {
    handleSubmit(val) {
      console.log("fdafdsadf");
      if (this.pageType === "bindBank") {
        this.toBindBank(val);
      } else {
        this.toChangeBank(val);
      }
    },
    toBindBank(val) {
      postBindBank(val)
        .then(response => {
          if (response.data.code == 200) {
            this.$router.push({
              name: "depOperateSuccessPage",
              query: { pageFrom: "userBindBankPage" }
            });
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
    toChangeBank(val) {
      postChangeBank(val)
        .then(response => {
          if (response.data.code == 200) {
            this.$router.push({
              name: "depOperateSuccessPage",
              query: { pageFrom: "userChangeBankPage" }
            });
          } else {
            this.$confirm("更换卡失败,未知错误!", "提示", {
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
</style>
