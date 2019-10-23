<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'usersAccountPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersAccountPage'"></mijin-left-menu>
        </div>
        <div class="main-right mr-recharge">
          <h3>提现到银行卡</h3>
          <div class="mr-recharge-content withdraw">
            <el-form
              ref="authBankForm"
              :model="authBankInfo"
              label-width="110px"
              :rules="rechargeFormRules"
            >
              <el-form-item label="提现金额" prop="amount">
                <mj-input v-model="authBankInfo.amount" :unit="'元'"></mj-input>
                <div class="flex mr-withdraw-txt cus-withdraw">
                  <p>可提现余额:{{authBankInfo.totalAmount}}元</p>
                  <p class="all-withdraw cursor" @click="handleWithdrawAll">全部提现</p>
                </div>
              </el-form-item>
              <el-form-item label="已认证银行">
                <div class="flex mr-recharge-card">
                  <p>
                    <b>{{authBankInfo.bankName}}</b>
                  </p>
                  <p>
                    <b>尾号{{authBankInfo.bankCard}}</b>
                  </p>
                </div>
                <div class="mr-withdraw-txt">提现金额预计1小时内到账</div>
              </el-form-item>
              <el-form-item label="短信验证码" prop="identifyCode">
                <div class="flex mr-recharge-code">
                  <div class="mr-code-input">
                    <mj-input v-model="authBankInfo.identifyCode"></mj-input>
                  </div>
                  <div
                    class="mr-code-get cursor"
                    :class="{'disabled-code' : disabledCode}"
                    @click="handleCode(authBankInfo.phone)"
                  >{{ btnCountDown}}</div>
                </div>
                <div class="mr-withdraw-txt">短信验证码将发送至您手机{{authBankInfo.phone}}</div>
              </el-form-item>
              <div class="step-btns">
                <div class="mj-button orange step-btn-next cursor" @click="handleSubmitRecharge">确认</div>
              </div>
            </el-form>
          </div>
        </div>
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
import MijinLeftMenu from "./components/userLeft.vue";
import MijinDialog from "../../components/dialogBox.vue";
import * as api from "../api/users";
export default {
  name: "usersWithdrawPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinLeftMenu,
    MijinDialog
  },
  data() {
    return {
      showMessageDialog: false,
      isSuccess: false,
      messageInfo: "",
      authBankInfo: {
        amount: "",
        bankName: "",
        bankCard: "",
        phone: "",
        identifyCode: "",
        totalAmount: 0
      },
      isWithDrawed: false,
      rechargeFormRules: {
        amount: [
          { required: true, message: "请输入提现金额", trigger: "blur" },
          {
            pattern: this.$valid.integer,
            message: "请输入正数，最多保留两位小数!",
            trigger: "blur"
          },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (Number(value) < 1.0) {
                callback("最低提现金额1.00元");
              } else {
                callback();
              }
            }
          }
        ],
        phone: [
          { required: true, message: "请输入联系人手机号码", trigger: "blur" },
          {
            pattern: this.$valid.phone11,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        identifyCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" }
        ]
      },
      btnCountDown: "获取短信验证码",
      disabledCode: false,
      activeWay: "P_D"
    };
  },
  created() {
    this.getAuthBankInfo();
  },
  methods: {
    handleWithdrawAll() {
      this.authBankInfo.amount = this.authBankInfo.totalAmount;
    },
    countDown(sec) {
      if (sec >= 0) {
        this.disabledCode = true;
        this.btnCountDown = `剩余${sec}s`;
        setTimeout(() => {
          this.countDown(--sec);
        }, 1000);
      } else {
        this.disabledCode = false;
        this.btnCountDown = "获取短信验证码";
      }
    },
    handleCode(phone) {
      api.postWithdrawCheckCode(phone).then(
        res => {
          if (res.data.code === 200) {
            this.countDown(60);
          }
        },
        res => {
          if (res.data.body) {
            let _msg = "";
            for (const key in res.data.body) {
              _msg += res.data.body[key] + "  ";
            }
            this.messageInfo = _msg;
          } else {
            this.messageInfo = res.data.message
              ? res.data.message
              : "获取短信验证码失败!";
          }
          this.showMessageDialog = true;
          this.isSuccess = false;
        }
      );
    },

    getAuthBankInfo() {
      const _params = {
        type: this.$enum.WITHDRAW
      };
      api.getAuthBankInfo(_params).then(res => {
        if (res.data.code === 200) {
          this.authBankInfo.totalAmount = res.data.body.amount;
          this.authBankInfo.bankName = res.data.body.bankName;
          this.authBankInfo.bankCard = res.data.body.bankCard;
          this.authBankInfo.phone = res.data.body.mobile
            ? res.data.body.mobile
            : "";
        }
      });
    },
    handleSubmitRecharge() {
      this.$refs["authBankForm"].validate(valid => {
        if (valid) {
          const _params = {
            amount: Number(this.authBankInfo.amount),
            identifyCode: this.authBankInfo.identifyCode
          };
          api.postWithDrawForFund(_params).then(
            res => {
              if (res.data.code === 200) {
                this.$router.push({
                  name: "successPage",
                  query: { pageName: "usersWithdrawPage" }
                });
              }
            },
            res => {
              if (res.data.body) {
                let _msg = "";
                for (const key in res.data.body) {
                  _msg += res.data.body[key] + ";  ";
                }
                this.messageInfo = _msg;
              } else {
                this.messageInfo = res.data.message
                  ? res.data.message
                  : "提现失败!";
              }
              this.showMessageDialog = true;
              this.isSuccess = false;
            }
          );
        } else {
          return false;
        }
      });
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
<style lang="scss">
.step-btns .mj-button.is-disable {
  background: #ccc;
}
.cus-withdraw {
  .all-withdraw {
    position: relative;
    right: auto;
    left: auto;
  }
}
.mr-recharge-content.withdraw {
  .el-form-item {
    .el-form-item__label {
      text-align: right;
    }
  }
}
</style>
