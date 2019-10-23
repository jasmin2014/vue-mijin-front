<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'accountOpenPrivatePage'"></mijin-header>
    <div class="credit-content">
      <div class="main-content credit-form">
        <h3>存管开户</h3>
        <div class="open-private-inner">
          <open-tips :page-from="'accountOpenInfoSuccessPage'" @go-open-xa="handleGoOpenXA"></open-tips>        
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import openTips from "../components/openTipsComp.vue";
import openTip from "../src/mixins/openTip.js";
export default {
  name: "accountOpenInfoSuccessPage",
  components: {
    MijinHeader,
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
