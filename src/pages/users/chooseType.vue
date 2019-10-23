<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'bindBankPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersAssetPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <div class="bindbank-content cunguan">
            <h3 class="choose-dep-title">存管开户</h3>
            <div class="cg-innr">
              <account-type :active-type="activeType" @next="handleNextStep"></account-type>
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
import MijinLeftMenu from "./components/userLeft.vue";
import accountType from "../components/accountTypeChooseComp.vue";
import MijinFootter from "../../components/footter.vue";
import { getPublicOpenStatus } from "../api/account.js";
export default {
  name: "userChooseTypePage",
  components: {
    MijinHeader,
    MijinLeftMenu,
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
        this.$router.push({ name: "usersOpenPrivatePage" });
      } else if (val == "1") {
        this.getPublicOpenStatus();
      }
    },
    /**====开户类型为对公时的"下一步"操作的接口,用来判断存管对公户开户是否支持====**/
    getPublicOpenStatus() {
      getPublicOpenStatus()
        .then(response => {
          if (response.data.code == 200) {
            this.$router.push({ name: "usersOpenPublicPage" });
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
// .users-content .main-right .bindbank-content {}
// .bindbank-content.cunguan {
//   .cg-innr {
//     padding: 30px 0 10vh 0;
//     .dep .el-form-item__content {
//       > div {
//         width: 160px;
//         height: 80px;
//         line-height: 80px;
//       }
//     }
//   }
// }
</style>
