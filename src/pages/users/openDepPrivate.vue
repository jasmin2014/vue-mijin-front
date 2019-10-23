<template>
<div class="content">
    <mijin-header :is-white="true" :active-page="'usersOpenPrivatePage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersAssetPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <div class="bindbank-content cunguan">
            <h3 class="choose-dep-title">存管开户</h3>
            <div class="cg-innr">
              <!-- <dep-private @open="handleOpenNow"></dep-private> -->
              <dep-private></dep-private>
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
import depPrivate from "../components/openPrivateComp.vue";
import { getAccountBankInfo } from "../api/users.js";

export default {
  name: "usersOpenPrivatePage",
  components: {
    MijinHeader,
    MijinLeftMenu,
    MijinFootter,
    depPrivate
  }
};
</script>

<style lang="scss">
.open-private-inner {
  width: 70%;
  margin: 0 auto;
  padding-bottom: 60px;
}
</style>
