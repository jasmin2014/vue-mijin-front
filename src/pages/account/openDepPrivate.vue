<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'accountOpenPrivatePage'"></mijin-header>
    <div class="credit-content">
      <div class="main-content credit-form">
        <h3>存管开户</h3>
        <div class="open-private-inner">
          <!-- <dep-private @open="handleOpenNow"></dep-private>  -->
          <dep-private></dep-private>          
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import depPrivate from "../components/openPrivateComp.vue";

export default {
  name: "accountOpenPrivatePage",
  components: {
    MijinHeader,
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
