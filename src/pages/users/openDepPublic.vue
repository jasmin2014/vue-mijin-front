<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'usersOpenPublicPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersAssetPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <div class="bindbank-content cunguan">
            <h3 class="choose-dep-title">存管开户</h3>
            <div class="cg-innr">
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
import MijinLeftMenu from "./components/userLeft.vue";
import MijinFootter from "../../components/footter.vue";
import MijinSteps from "../components/steps.vue";
import openPublic from "../components/openPublicComp.vue";
import { getPicUrls, getRegionEnum } from "../../api/common";
import * as api from "../api/account";

export default {
  name: "usersOpenPublicPage",
  components: {
    MijinHeader,
    MijinLeftMenu,
    MijinFootter,
    MijinSteps,
    openPublic
  },
  data() {
    return {};
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
</style>
