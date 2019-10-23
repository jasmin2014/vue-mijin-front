<template>
  <el-form ref="applyForm" class="dep" label-width="150px">
    <div class="credit-form-inner credit-form-apply">
      <el-form-item label="选择开户类型" class="choose-type">
        <div :class="{'active':active === '0'}" @click="active = '0'">对私</div>
        <div :class="{'active':active === '1'}" @click="active = '1'">对公</div>
      </el-form-item>            
      <div class="step-btns mt30">
        <div class="mj-button orange step-btn-next cursor choose-btn-mg" @click="handleNextStep">下一步</div>
        <p class="step-tips">应监管要求,个人借款不得超过20万,公司借款不得超过100万,账户属性一经认定,不得修改，请慎重开户!</p>
      </div>
    </div>
  </el-form>
</template>

<script>
export default {
  name: "accountChooseTypeComp",
  props: {},
  data() {
    return {
      active: "0"
    };
  },
  created() {},
  methods: {
    handleNextStep() {
      this.$emit("next", this.active);
    }
  }
};
</script>

<style lang="scss">
.dep {
  margin-top: 5vh;
  .credit-form-inner.credit-form-apply {
    width: 730px;
    margin: 0 auto;
    .el-form-item__label {
      font-size: 16px;
    }
    .choose-type {
      width: 600px;
      margin: 0 auto;
    }
  }
  h3 {
    margin: 0;
    padding: 0;
    text-align: left;
    font-size: 18px;
    color: #666;
    border-bottom: 1px dashed #666;
    width: 100%;
    height: auto;
  }
  .el-form-item__content {
    > div {
      width: 200px;
      height: 90px;
      float: left;
      text-align: center;
      line-height: 90px;
      box-shadow: 4px 5px 10px #eee;
      border-top: 1px solid #f5f5f5;
      border-left: 1px solid #f5f5f5;
      margin-right: 20px;
      font-size: 20px;
      color: #666;
      border-radius: 5px;
      cursor: pointer;
    }
    > div.active {
      color: #fff;
      background: -webkit-linear-gradient(
        right,
        #fac51d,
        #ff8a00
      ); /* Safari 5.1 - 6.0 */

      background: -o-linear-gradient(
        right,
        #fac51d,
        #ff8a00
      ); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(
        right,
        #fac51d,
        #ff8a00
      ); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #fac51d, #ff8a00);
      /* 标准 */
    }
  }
  .step-btns.mt30 {
    margin-top: 100px;
    .step-tips {
      font-size: 16px;
      color: #ff8a00;
      margin-top: 20px;
    }
    .choose-btn-mg {
      margin-top: 60px;
      // margin-left: 60px;
    }
  }
}
</style>
