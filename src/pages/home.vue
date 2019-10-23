<template>
  <div class="content home-bg">
    <topHeader/>
    <topNavigator :active-page="'HomePage'"/>
    <topBanner/>
    <publicShow/>
    <produceM/>
    <applyStep/>
    <productsM/>
    <featureProductM/>
    <advantageM/>
    <problemM/>
    <asideM/>
    <backTopM/>
    <MijinFootter/>
  </div>
</template>

<script>
import topHeader from "./components/compsHomeInV2.6.5/top";
import topNavigator from "./components/compsHomeInV2.6.5/header";
import topBanner from "./components/compsHomeInV2.6.5/banner";
import publicShow from "./components/compsHomeInV2.6.5/publicShow";
import produceM from "./components/compsHomeInV2.6.5/produce";
import applyStep from "./components/compsHomeInV2.6.5/applySteps";
import productsM from "./components/compsHomeInV2.6.5/products";
import featureProductM from "./components/compsHomeInV2.6.5/featureProducts";
import advantageM from "./components/compsHomeInV2.6.5/advantage";
import problemM from "./components/compsHomeInV2.6.5/problems";
import asideM from "./components/compsHomeInV2.6.5/aside";
import backTopM from "./components/compsHomeInV2.6.5/backTop";
import MijinFootter from "../components/footter.vue";

export default {
  name: "HomePage",
  components: {
    topHeader,
    topNavigator,
    topBanner,
    publicShow,
    produceM,
    applyStep,
    productsM,
    featureProductM,
    advantageM,
    problemM,
    asideM,
    backTopM,
    MijinFootter
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
