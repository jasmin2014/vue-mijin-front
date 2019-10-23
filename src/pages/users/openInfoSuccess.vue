<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'userOpenInfoSuccessedPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersAssetPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <div class="bindbank-content cunguan">
            <h3 class="choose-dep-title">存管开户</h3>
            <div class="cg-innr">
              <open-tips :page-from="'userOpenInfoSuccessedPage'"  @go-open-xa="handleGoOpenXA"></open-tips>        
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
import MijinFootter from "../../components/footter.vue";
import openTips from "../components/openTipsComp.vue";
import openTip from "../src/mixins/openTip.js";
export default {
  name: "userOpenInfoSuccessedPage",
  components: {
    MijinHeader,
    MijinLeftMenu,
    MijinFootter,
    openTips
  },
  mixins: [openTip],
  data() {
    return {
      xaOpenUrl: this.$route.params.xaOpenUrl
    };
  },
  created() {},
  methods: {
    handleGoOpenXA() {
      if (this.xaOpenUrl && this.xaOpenUrl != "") {
        // var tempOpenPage = window.open("", "_blank");
        // tempOpenPage.location = this.xaOpenUrl;
        this.openTip(this.xaOpenUrl);
      }
    }
  }
};
</script>

<style lang="scss">
</style>
