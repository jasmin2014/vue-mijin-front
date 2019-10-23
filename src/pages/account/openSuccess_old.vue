<template>
  <div class="content">
    <mijin-header :is-white="true"></mijin-header>
    <mijin-success :success-title="successTitle" :success-text="successText"></mijin-success>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import MijinSuccess from "../components/success.vue";
export default {
  name: "openSuccessPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinSuccess
  },
  data() {
    return {
      successTitle: "您的开户资料已提交",
      successText: "开户成功后，我们将以短信通知您"
    };
  },
  created() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
</style>
