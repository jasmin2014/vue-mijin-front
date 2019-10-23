<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'accountOpenPrivatePage'"></mijin-header>
    <div class="credit-content">
      <div class="main-content credit-form">
        <h3>存管开户</h3>
        <div class="open-private-inner">
          <open-tips :page-from="'accountOpenStatusActivePage'"></open-tips>        
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
export default {
  name: "accountOpenStatusActivePage",
  components: {
    MijinHeader,
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
