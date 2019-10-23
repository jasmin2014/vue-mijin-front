<template>
  <div class="users-message-confirm" v-show="showDialog">
    <div class="mask"></div>
    <section class="confirm-content">
      <header>
        <p>信息确认</p>
        <!--<div>{{currentValue.productName}}{{currentValue.loanApplication}}</div>-->
        <p class="product-name">{{currentValue.productName}}</p>
        <!-- <p class="product-name">定额本息-电商通</p> -->
        <p>{{currentValue.loanApplication}}</p>
      </header>
      <div class="confirm-inner">
        <div class="flex-start">
          <label>起息日</label>
          {{currentValue.interestDate}}
        </div>
        <div class="flex-start" v-if="operateType !== 'early'">
          <label>应还日期</label>
          {{currentValue.planedRepayDate}}
        </div>
        <div class="flex-start">
          <label>待还本金(元)</label>
          {{currentValue.planedCapAmount}}
        </div>
        <div class="flex-start">
          <label>待还利息(元)</label>
          {{currentValue.planedIntAmount}}
        </div>
        <div class="flex-start" v-if="operateType !== 'early'">
          <label>逾期天数</label>
          {{currentValue.penaltyDays}}
        </div>
        <div class="flex-start">
          <label>逾期费(元)</label>
          {{currentValue.planedTotalPenalty}}
        </div>
        <div class="flex-start">
          <label>违约金(元)</label>
          {{currentValue.defaultsFee}}
        </div>
        <div class="flex-start">
          <label>待还款总额(元)</label>
          {{currentValue.planedTotalAmount}}
        </div>
        <div class="confirm-btns flex">
          <div class="cursor" @click="handleConfirmRepay">确认还款</div>
          <div class="cursor gua-cancel" @click="handleCancelRepay">取消</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    showDialog: Boolean,
    value: Object,
    operateType: String
  },
  data() {
    return {
      currentValue: {
        productName: "",
        loanApplication: "",
        interestDate: "",
        planedRepayDate: "",
        planedCapAmount: "",
        planedIntAmount: "",
        penaltyDays: "",
        planedTotalPenalty: "",
        defaultsFee: "",
        planedTotalAmount: ""
      }
    };
  },
  watch: {
    value(val, oldval) {
      this.currentValue = val;
    }
  },
  created() {
    this.currentValue = this.value ? this.$deepcopy(this.value) : {};
  },
  methods: {
    handleConfirmRepay(value) {
      value = this.$deepcopy(this.currentValue);
      this.$emit("confirm", value);
    },
    handleCancelRepay() {
      this.$emit("cancel");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
</style>
