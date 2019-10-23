<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'usersOpenWaitActivePage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersAccountPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <div class="bindbank-content cunguan">
            <h3 class="choose-dep-title">存管开户</h3>
            <div class="cg-innr">
              <open-tips :page-from="'usersOpenWaitActivePage'"></open-tips>        
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
export default {
  name: "usersOpenWaitActivePage",
  components: {
    MijinHeader,
    MijinLeftMenu,
    MijinFootter,
    openTips
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss">
</style>
