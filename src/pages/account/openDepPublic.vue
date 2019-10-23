<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'accountOpenPublicPage'"></mijin-header>
    <div class="credit-content">
      <div class="main-content credit-form">
        <h3>存管开户</h3>
        <div class="credit-form-inner auth-idcard-inner" style="width: 970px;">
          <div class="credit-tab-content">
            <div class="credit-tab-pane">
              <open-public></open-public>              
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
import MijinSteps from "../components/steps.vue";
import openPublic from "../components/openPublicComp.vue";
import bankList from "../users/components/bankList";

export default {
  name: "accountOpenPublicPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinSteps,
    openPublic
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.mt20 {
  margin-top: 20px;
}

.special-label {
  display: block;
  width: 180px;

  span {
    color: #f56c6c;
  }
}
.banks-box {
  width: 620px;
  overflow: hidden;
  top: 5%;
  margin: 0 0 0 -310px;
}
</style>
