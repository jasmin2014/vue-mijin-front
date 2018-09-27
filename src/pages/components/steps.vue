<template>
  <div class="main-content steps flex">
    <section :class="{'active-step':first}">
      <div class="step">
        <div class="step-icon step-icon1"></div>
      </div>
      <p class="step-txt">申请</p>
    </section>
    <section :class="{'active-step':second}">
      <div class="step">
        <div class="step-icon step-icon2"></div>
      </div>
      <p class="step-txt">信用认证</p>
    </section>
    <section :class="{'active-step':third}">
      <div class="step">
        <div class="step-icon step-icon3"></div>
      </div>
      <p class="step-txt">基本信息</p>
    </section>
    <section :class="{'active-step':forth}">
      <div class="step">
        <div class="step-icon step-icon4"></div>
      </div>
      <p class="step-txt">补充信息</p>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    first: Boolean,
    second: Boolean,
    third: Boolean,
    forth: Boolean
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
  .steps {
    margin-bottom: 20px;
    background: #fff;
    padding: 20px 60px;
    > section {
      position: relative;
      >div {
        padding-right: 190px;
      }
      .step {
        background: url("../../assets/imgs/stepline_1.png") no-repeat right center;
      }
      >p.step-txt {
        text-align: center;
        color: #999;
        width: 65px;
        line-height: 2em;
      }
      .step-icon {
        width: 65px;
        height: 65px;
      }
      .step-icon1 {
        background: url("../../assets/imgs/ico_1_g.png") no-repeat center center;
      }
      .step-icon2 {
        background: url("../../assets/imgs/ico_2_g.png") no-repeat center center;
      }
      .step-icon3 {
        background: url("../../assets/imgs/ico_3_g.png") no-repeat center center;
      }
      .step-icon4 {
        background: url("../../assets/imgs/ico_4_g.png") no-repeat center center;
      }
    }
    > section.active-step {
      .step {
        background: url("../../assets/imgs/stepline_1_r.png") no-repeat right center;
      }
      > p {
        color: #fd9f42;
      }
      .step-icon1 {
        background: url("../../assets/imgs/ico_1_r.png") no-repeat center center;
      }
      .step-icon2 {
        background: url("../../assets/imgs/ico_2_r.png") no-repeat center center;
      }
      .step-icon3 {
        background: url("../../assets/imgs/ico_3_r.png") no-repeat center center;
      }
      .step-icon4 {
        background: url("../../assets/imgs/ico_4_r.png") no-repeat center center;
      }
    }
    > section:last-child {
      background: none;
      .step {
        padding-right: 0;
        background: none;
      }
    }

  }
</style>
