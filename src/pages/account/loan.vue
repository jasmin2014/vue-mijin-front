<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'QuotaPage'"></mijin-header>
    <div class="credit-content">
      <div class="main-content credit-form">
        <h3>{{productName}}</h3>
        <el-form ref="creditForm" :model="creditForm" label-width="150px" :rules="creditFormRules">
          <div class="credit-form-inner loan-form-inner">
            <div class="loan-form-item">
              <el-form-item label="可借款金额(元)：">
                <mj-input v-model="availableAmount" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </div>
            <div class="loan-form-item">
              <el-form-item label="借款金额：" prop="applicationAmount">
                <mj-input
                  v-model="creditForm.applicationAmount"
                  :placeholder="'至少10000，最多'+availableAmount"
                  @blur="handleBlur"
                ></mj-input>
              </el-form-item>
            </div>
            <el-form-item label="还款方式：" class="loan-check-items" prop="repayWay">
              <ul>
                <!-- v-model="creditForm.repayWay"-->
                <li
                  v-for="item in strategyList"
                  :class="{'activeItems': creditForm.repayWay === item.repayWay}"
                  :key="item.kind"
                  @click="handleSetCurrentRepayWay(item)"
                >
                  <label></label>
                  {{$filter(item.repayWay, $enum.REPAY_WAY, $enum.REPAY_WAY)}}{{item.plusName}}
                </li>
              </ul>
            </el-form-item>
            <el-form-item
              v-if="repayTermsList.length > 0"
              label="借款期限："
              class="loan-check-items"
              prop="repayTerms"
            >
              <ul class="flex-start">
                <!-- v-model="creditForm.repayTerms"-->
                <li
                  v-for="item in repayTermsList"
                  :class="{'activeItems': creditForm.repayTerms === item}"
                  :key="item"
                  @click="handleSetCurrentRepayTerm(item)"
                >
                  <label></label>
                  {{item}}个月
                </li>
              </ul>
            </el-form-item>
            <el-form-item label="还款总额：" class="loan-check-items">
              <span class="desc">
                <span class="total">{{repayTatol}}</span>元，具体还款额以实际账单为准
              </span>
              <span class="mj-button orange cursor calculate" @click="handleBackTotal">
                <img src="../../assets/imgs/cal.png" alt>
                <span>计算</span>
              </span>
            </el-form-item>
            <div class="step-agreement flex-start">
              <label :class="{'checked': isChecked}">
                <i class="cursor" @click="handleChecked"></i>
              </label>
              <div>
                我已阅读，并同意
                <router-link to="/user/person-auth" target="_blank">《借款合同相关内容》</router-link>及
                <router-link to="/user/person-content" target="_blank">《个人信息查询授权书》</router-link>
              </div>
            </div>
            <div class="step-btns">
              <div class="mj-button orange step-btn-next cursor" @click="handleLoanApplication">提交</div>
              <!--<mj-button text="下一步" height="38" type="orange" class="step-btn-next" @click="handleNextStep"></mj-button>-->
              <!--<p class="step-tips">提示语</p>-->
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <mijin-dialog
      v-show="showMessageDialog"
      :is-success="isSuccess"
      :message="messageInfo"
      @close="handleCloseDialog"
    ></mijin-dialog>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import MijinSteps from "../components/steps.vue";
import MijinDialog from "../../components/dialogBox.vue";
import * as api from "../api/account";
export default {
  name: "accountLoanPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinSteps,
    MijinDialog
  },
  data() {
    return {
      showMessageDialog: false,
      isSuccess: false,
      messageInfo: "",
      creditForm: {
        applicationAmount: "",
        repayTerms: "",
        repayWay: ""
      },
      repayTatol: "--",
      minLoanAmount: 0,
      availableAmount: 0,
      creditId: "",
      productId: "",
      strategyList: [],
      repayTermsList: [],
      creditFormRules: {
        applicationAmount: [
          {
            required: true,
            message: "请输入借款金额",
            trigger: "blur"
          },
          {
            trigger: "blur",
            type: "number",
            validator: (rule, value, callback) => {
              if (
                this.$valid.integer.test(value) &&
                Number(value) >= this.minLoanAmount &&
                Number(value) <= Number(this.availableAmount)
              ) {
                callback();
              } else if (!this.$valid.integer.test(value)) {
                callback("请输入正整数！");
              } else if (Number(value) < this.minLoanAmount) {
                callback("借款金额不得少于" + this.minLoanAmount);
              } else if (Number(value) > Number(this.availableAmount)) {
                callback("您填写的借款金额超过可借额度");
              } else {
                callback("输入有误！");
              }
            }
          }
        ],
        repayWay: [
          {
            required: true,
            message: "请选择还款方式",
            trigger: "change"
          }
        ],
        repayTerms: [
          {
            required: true,
            message: "请选择借款期限",
            trigger: "change"
          }
        ]
      },
      isChecked: false,
      productName: ""
    };
  },
  created() {
    this.productName = this.$getSessionStorage("checkedProducts")
      ? JSON.parse(this.$getSessionStorage("checkedProducts")).productName
      : "";
    this.getLoanInformation();
    this.getMasLoanAmount();
  },
  methods: {
    getMasLoanAmount() {
      api.getMaxCreditAmount(this.$enum.LOAN_AMOUNT_MIN).then(res => {
        if (res.data.code === 200) {
          this.minLoanAmount = res.data.body;
        }
      });
    },
    getLoanInformation() {
      api.getLoanInformation().then(res => {
        if (res.data.code === 200) {
          this.availableAmount = res.data.body.availableAmount;
          this.creditId = res.data.body.creditId;
          this.productId = res.data.body.productId;
          this.strategyList = res.data.body.strategyList;
        }
      });
    },
    handleBackTotal() {
      this.$refs["creditForm"].validate(valid => {
        if (valid) {
          const calParams = {
            productId: this.productId,
            strategyId: this.strategyId,
            paymentAmount: this.creditForm.applicationAmount,
            repayTerms: this.creditForm.repayTerms,
            repayWay: this.creditForm.repayWay
          };
          api.calculateTotal(calParams).then(res => {
            if (res.data.code === 200) {
              this.repayTatol = res.data.body || "--";
            }
          });
        }
      });
    },
    handleBlur(val) {
      this.$setSessionStorage(
        "applicationAmount",
        this.creditForm.applicationAmount
      );
    },
    handleChecked() {
      this.isChecked = !this.isChecked;
    },
    handleLoanApplication() {
      if (this.isChecked) {
        this.$refs["creditForm"].validate(valid => {
          if (valid) {
            const params = Object.assign(this.creditForm, {
              creditId: this.$getSessionStorage("checkedProducts")
                ? JSON.parse(this.$getSessionStorage("checkedProducts"))
                    .creditId
                : this.creditId,
              productId: this.$getSessionStorage("checkedProducts")
                ? JSON.parse(this.$getSessionStorage("checkedProducts"))
                    .productId
                : this.productId,
              strategyId: this.strategyId ? this.strategyId : ""
            });
            api.postLoanApplication(params).then(
              res => {
                if (res.data.code === 201) {
                  this.$router.push({
                    name: "successPage",
                    query: {
                      pageName: "accountLoanPage"
                    }
                  });
                } else {
                  this.showMessageDialog = true;
                  this.isSuccess = false;
                  this.messageInfo = res.data.message
                    ? res.data.message
                    : "借款失败!";
                }
              },
              response => {
                this.showMessageDialog = true;
                this.isSuccess = false;
                this.messageInfo = response.data.message;
              }
            );
          } else {
            return false;
          }
        });
      } else {
        this.showMessageDialog = true;
        this.isSuccess = false;
        this.messageInfo = "请先勾选并同意相关协议!";
      }
    },
    handleSetCurrentRepayWay(row) {
      this.creditForm.repayTerms = "";
      this.creditForm.repayWay = row.repayWay;
      this.repayTermsList = row.repayTermsList;
      this.strategyId = row.strategyId;
    },
    handleSetCurrentRepayTerm(item) {
      this.creditForm.repayTerms = item;
    },
    handleCloseDialog() {
      this.showMessageDialog = false;
      this.isSuccess = false;
      this.messageInfo = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.step-content {
  width: 100%;
  background: #eee;
  padding: 20px 0 60px 0;
  .step-form {
    background: #fff;
    padding: 60px 0 120px 0;
    .step-form-inner {
      width: 440px;
      margin: 0 auto;
      h3 {
        text-align: center;
        font-size: 30px;
        font-weight: normal;
      }

      .step-btns {
        margin-top: 80px;
        text-align: center;
        .step-btn-next {
          display: inline-block;
          font-size: 14px;
        }
        > .step-tips {
          font-size: 12px;
          color: red;
          line-height: 30px;
        }
      }
    }
  }
}

.calculate {
  padding: 5px 15px;
  border-radius: 15px;
  margin-left: 20px;
  margin-right: 60px;
  font-size: 14px;
  img {
    position: relative;
    top: 7px;
  }
}

.desc {
  font-size: 14px;
  .total {
    color: #ff0000;
  }
}
</style>
