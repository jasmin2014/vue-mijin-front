<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'usersAccountPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersAccountPage'"></mijin-left-menu>
        </div>
        <div class="main-right mr-recharge">
          <h3>充值到账户余额</h3>
          <div class="mr-recharge-content">
            <el-form
              ref="authBankForm"
              :model="authBankInfo"
              label-width="150px"
              :rules="rechargeFormRules"
            >
              <el-form-item label="充值金额：" prop="amount">
                <mj-input v-model="authBankInfo.amount" :unit="'元'" @blur="handleToChangeInit"></mj-input>
              </el-form-item>
              <el-form-item label="支付方式：">
                <div class="mr-recharge-ways flex">
                  <div
                    v-if="accountType === 0"
                    :class="{'active-item':activeWay === 'P_D'}"
                    class="cursor"
                    @click="activeWay = 'P_D'"
                  >认证支付</div>
                  <div class="isDisable" v-else>认证支付</div>
                  <div
                    :class="{'active-item':activeWay === 'P_W'}"
                    class="cursor"
                    @click="activeWay = 'P_W'"
                  >网银支付</div>
                </div>
              </el-form-item>
              <div v-if="activeWay === 'P_D' && accountType === 0">
                <el-form-item label="已认证银行">
                  <div class="flex mr-recharge-card">
                    <p>
                      <b>{{authBankInfo.bankName}}</b>
                    </p>
                    <p>
                      <b>尾号{{authBankInfo.bankCard}}</b>
                    </p>
                  </div>
                </el-form-item>
                <!-- <el-form-item label="手机号" prop="mobile">
                  <mj-input v-model="authBankInfo.mobile" :mode="'VIEW'"></mj-input>
                </el-form-item>
                <el-form-item label="短信验证码" prop="identifyCode">
                  <div class="flex mr-recharge-code">
                    <div class="mr-code-input">
                      <mj-input v-model="authBankInfo.identifyCode"></mj-input>
                    </div>
                    <div class="mr-code-get cursor" :class="{'disabled-code' : disabledCode}" @click="handleCode">{{ btnCountDown}}</div>
                  </div>
                </el-form-item>-->
              </div>

              <div class="step-btns">
                <div class="mj-button orange step-btn-next cursor" @click="handleSubmitRecharge">确认</div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div v-html="rechargeDatas" style="display: none;"></div>
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
  name: "usersRechargePage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinLeftMenu,
    MijinDialog
  },
  data() {
    return {
      rechargeDatas: "",
      showMessageDialog: false,
      isSuccess: false,
      messageInfo: "",
      accountType: 0,
      authBankInfo: {
        amount: "",
        bankName: "",
        bankCard: ""
        // mobile: '',
        // identifyCode: ''
      },
      rechargeFormRules: {
        amount: [
          {
            required: true,
            message: "请输入充值金额",
            trigger: "change"
          },
          {
            pattern: this.$valid.integer,
            message: "请输入正数，最多保留两位小数!",
            trigger: "blur"
          },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (Number(value) < 1.0) {
                callback("最低充值金额1.00元");
              } else {
                callback();
              }
            }
          }
        ]
        // 'mobile': [{
        //     required: true,
        //     message: '请输入手机号码',
        //     trigger: 'blur'
        //   },
        //   {
        //     pattern: this.$valid.mobile,
        //     message: '请输入正确的手机号码',
        //     trigger: 'blur'
        //   }
        // ],
        // 'identifyCode': [{ required: true, message: '请输入短信验证码', trigger: 'blur' }]
      },
      // btnCountDown: '获取短信验证码',
      // disabledCode: false,
      activeWay: "P_D"
    };
  },
  created() {
    this.getAuthBankInfo();
  },
  methods: {
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
    handleCode() {
      api.postPayCertCheck(this.authBankInfo.mobile).then(
        res => {
          if (res.data.code === 200) {
            this.countDown(60);
          }
        },
        res => {
          if (res.data.body) {
            let _msg = "";
            let index = 0;
            for (const key in res.data.body) {
              _msg += res.data.body[key] + ";";
            }
            if (_msg != "") {
              index = _msg.lastIndexOf(";");
              this.messageInfo = _msg.substring(0, index);
            }
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
    checkBankAccountType() {
      api.checkBankAccountType().then(res => {
        if (res.data.code === 200) {
          if (res.data.body && res.data.body.accountType) {
            this.accountType = res.data.body.accountType;
            if (this.accountType.toString() === "1") {
              this.activeWay = "P_W";
            }
          }
        }
      });
    },
    getAuthBankInfo() {
      const _params = {
        type: this.$enum.RECHARGE
      };
      api.getAuthBankInfo(_params).then(res => {
        if (res.data.code === 200) {
          this.authBankInfo.bankName = res.data.body.bankName;
          this.authBankInfo.bankCard = res.data.body.bankCard;
          this.authBankInfo.mobile = res.data.body.mobile;
          this.checkBankAccountType();
        }
      });
    },
    handleToChangeInit() {
      this.rechargeDatas = "";
    },
    handleSubmitRecharge() {
      this.handleToChangeInit();
      this.$refs["authBankForm"].validate(valid => {
        if (valid) {
          const _params = {
            amount: Number(this.authBankInfo.amount),
            // identifyCode: this.authBankInfo.identifyCode,
            transferMethod: this.activeWay
          };
          api.postAccountRecharge(_params).then(
            res => {
              if (res.data.code === 200) {
                if (res.data.body.execType === "form") {
                  this.rechargeDatas = res.data.body.execData;

                  this.$confirm("是否确认充值?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    closeOnClickModal: false,
                    closeOnPressEscape: false
                  })
                    .then(() => {
                      document.forms["targetSubmitFormId"].submit();
                    })
                    .catch(() => {
                      this.$message({
                        type: "info",
                        message: "已取消充值"
                      });
                    });
                } else if (res.data.body.execType === "url") {
                  this.$confirm("是否确认充值?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    closeOnClickModal: false,
                    closeOnPressEscape: false
                  })
                    .then(() => {
                      var tempOpenPage = window.open("_blank");
                      tempOpenPage.location = res.data.body.execData;
                      // window.open(res.data.body.execData);
                    })
                    .catch(() => {
                      this.$message({
                        type: "info",
                        message: "已取消充值"
                      });
                    });
                }
              } else {
                this.showMessageDialog = true;
                this.isSuccess = false;
                this.messageInfo = "充值失败!";
              }
            },
            response => {
              this.showMessageDialog = true;
              this.isSuccess = false;
              this.messageInfo = response.data.message
                ? response.data.message
                : "充值失败!";
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
</style>
