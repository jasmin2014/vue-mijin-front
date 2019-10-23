<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'usersAccountPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersAccountPage'"></mijin-left-menu>
        </div>
        <div class="main-right" v-if="alterShow==false">
          <div class="mr01 flex">
            <section class="mr01-left flex-start">
              <div class="sprites mr01-logo"></div>
              <div class="mr01-left-userinfo">
                <div class="alter cursor" @click="alterPassword">修改密码</div>
                <div class="alter change-phone cursor" @click="handleCheckPhone">修改手机号</div>
                <h3>{{accountInfo.partyPersonDTO.realName}}</h3>
                <p>
                  <i class="icon iconfont icon-shijian"></i>
                  上次登录时间： {{accountInfo.partyPersonDTO.lastLoginTime}}
                </p>
              </div>
            </section>
            <section class="mr01-right flex">
              <div v-if="accountInfo.identityStatus">
                <div class="sprites mr01-right-pic rig-pic1">
                  <i class="sprites success"></i>
                </div>
                <p>实名认证</p>
              </div>
              <div v-else class="cursor" @click="handleGoIdentity">
                <div class="sprites mr01-right-pic rig-pic1">
                  <i class="sprites no-auth"></i>
                </div>
                <p>实名认证</p>
              </div>
              <div class="cursor" @click="handleGoOperator">
                <div class="sprites mr01-right-pic rig-pic2">
                  <i class="sprites success" v-if="accountInfo.operatorStatus"></i>
                  <i class="sprites no-auth" v-else></i>
                </div>
                <p>运营商认证</p>
              </div>
            </section>
          </div>
          <div class="mr02 flex" v-if="reditFlag">
            <section class="mr02-left">
              <h4 class="mr02-title">授信情况</h4>
              <div class="mr02-left-userinfo">
                <div class="mr02-info">
                  <span>产品名称：</span>
                  <p>{{accountInfo.creditDTO.productName}}</p>
                </div>
                <div class="mr02-info">
                  <span>授信额度(元)：</span>
                  <p>{{accountInfo.creditDTO.creditAmount}}</p>
                </div>
                <div class="mr02-info">
                  <span>当前可用授信额度(元)：</span>
                  <p>{{creditLine}}</p>
                </div>
                <div class="mr02-info">
                  <span>授信额度有效期：</span>
                  <p>{{accountInfo.creditDTO.startDate}}～</p>
                  <p>{{accountInfo.creditDTO.endDate}}</p>
                </div>
              </div>
            </section>
            <section class="mr02-right">
              <div class="mr02-btn mr02-btn01 cursor" @click="handleCheckedAccountOpen">申请借款</div>
            </section>
          </div>
          <div class="mr02 flex" v-if="accountFlag">
            <section class="mr02-left">
              <h4 class="mr02-title">账户资金</h4>
              <div class="mr02-left-userinfo">
                <div class="mr02-info">
                  <span>可用余额(元)</span>
                  <p>{{accountInfo.accountPersonDTO.availableBalance}}</p>
                </div>
                <div class="mr02-info">
                  <span>已冻结余额(元)</span>
                  <p>{{accountInfo.accountPersonDTO.freezeAmount}}</p>
                </div>
              </div>
            </section>
            <section class="mr02-right flex">
              <div class="mr02-btn mr02-btn01 cursor" @click="handleGoRecharge">充值</div>
              <div class="mr02-btn mr02-btn02 cursor" @click="handleGoWithdraw">提现</div>
            </section>
          </div>
          <div class="mr02 flex" v-if="xaAccountFlag">
            <section class="mr02-left">
              <h4 class="mr02-title">存管账户资金</h4>
              <div class="mr02-left-userinfo">
                <div class="mr02-info">
                  <span>可用提现金额(元)</span>
                  <p>{{accountInfo.accountXAPersonDTO.availableBalance}}</p>
                </div>
                <div class="mr02-info">
                  <span>已冻结金额(元)</span>
                  <p>{{accountInfo.accountXAPersonDTO.freezeAmount}}</p>
                </div>
              </div>
            </section>
            <section class="mr02-right flex">
              <div class="mr02-btn mr02-btn03 cursor" @click="handleGoDepWithdraw">提现</div>
            </section>
          </div>
          <div class="mr02 loan-content" v-if="repaymentSituationFlag">
            <h4 class="mr02-title">还款情况</h4>
            <div
              class="mr02-loan-info flex"
              v-for="(item,index) in accountInfo.repaymentSituationDTO"
              :key="index"
            >
              <section class="mr02-left">
                <div class="mr02-left-userinfo">
                  <div class="mr02-info">
                    <span>贷款订单号:</span>
                    <p>{{item.loanApplication}}</p>
                  </div>
                  <div class="mr02-info">
                    <span>当前未还期数:</span>
                    <p>{{item.restRepayTerms}}</p>
                  </div>
                  <div class="mr02-info">
                    <span>下一期应还金额:</span>
                    <p>{{item.planedTotalAmount}}</p>
                  </div>
                  <div class="mr02-info">
                    <span>下一期应还款时间:</span>
                    <p>{{item.planedRepayDate}}</p>
                  </div>
                </div>
              </section>
              <section class="mr02-right flex">
                <div class="mr02-btn mr02-btn01 cursor" @click="handleRepayNow('now',item)">还款</div>
                <div class="mr02-btn mr02-btn02 cursor" @click="handleRepayNow('early',item)">提前还款</div>
              </section>
            </div>
          </div>
        </div>
        <div class="main-right alterbg" v-else>
          <h3 class="alter_title">修改密码</h3>
          <el-form
            v-if="alter_success"
            ref="alterForm"
            :model="alterData"
            :rules="alterRules"
            label-width="250px"
          >
            <el-form-item label="手机号码：" prop="showMobile">
              <div class="width450">
                <mj-input v-model="alterData.showMobile" :mode="'VIEW'"></mj-input>
              </div>
            </el-form-item>
            <div class="flex-start">
              <el-form-item label="验证码：" prop="phoneCode">
                <div class="width300">
                  <mj-input v-model="alterData.phoneCode"></mj-input>
                </div>
              </el-form-item>
              <p
                class="code"
                v-if="!alterData.disabledCode"
                @click="handleCode"
              >{{alterData.btnCountDown}}</p>
              <p class="code noclick" v-else>{{alterData.btnCountDown}}</p>
            </div>
            <el-form-item label="新密码：" prop="password">
              <div class="width450">
                <mj-input type="password" v-model="alterData.password"></mj-input>
              </div>
            </el-form-item>
            <el-form-item label="确认密码：" prop="newPassword">
              <div class="width450">
                <mj-input type="password" v-model="alterData.newPassword"></mj-input>
              </div>
            </el-form-item>
            <div class="step-btns">
              <div class="mj-button orange step-btn-next cursor" @click="handleAlter">提交</div>
              <div class="mj-button orange step-btn-next ml20 cursor" @click="handleBack">返回</div>
            </div>
          </el-form>
          <div class="alter-success" v-else>
            <p class="success-tip">修改成功，请牢记新的登录密码！</p>
            <div class="mj-button orange step-btn-next cursor reLogin" @click="handleRelogin">重新登录</div>
          </div>
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <!--提前还款  showConfirmDialog-->
    <mijin-repay-confirm
      :show-dialog="showConfirmDialog"
      :operate-type="operateType"
      :value="repayMentOrder"
      @confirm="handleRepayment"
      @cancel="showConfirmDialog = false;"
    ></mijin-repay-confirm>
    <mijin-dialog
      v-show="showMessageDialog"
      :is-success="isSuccess"
      :message="messageInfo"
      @close="handleClose"
    ></mijin-dialog>
    <mijin-dialog
      v-show="showConfirmMessageDialog"
      :is-success="isConfirmSuccess"
      :message="confirmMessageInfo"
      :is-direct="isDirect"
      @ok="handleSuccessRedirect"
      @close="handleCloseDirectDialog"
    ></mijin-dialog>
    <mijin-dialog
      v-show="showAlterDialog"
      :is-success="isAlterSuccess"
      :message="alterMessageInfo"
      @close="handleAlterClose"
    ></mijin-dialog>

    <div class="alert-form" v-if="showAlert">
      <div class="alert-mask"></div>
      <compReg
        :from="'usersAccountPage'"
        @close="handleCloseChangePhone"
        @loginNow="handleLoginNow"
      />
    </div>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import MijinLeftMenu from "./components/userLeft.vue";
import MijinRepayConfirm from "./components/twinceConfirm.vue";

import compReg from "../components/compsUser/compRegister";

import * as api from "../api/users";
import * as login from "../../api/common";
import * as accountApi from "../api/account";
import MijinDialog from "../../components/dialogBox.vue";
import checkAccount from "../src/mixins/checkAccount.js";
export default {
  mixins: [checkAccount],
  name: "usersAccountPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinLeftMenu,
    MijinDialog,
    MijinRepayConfirm,
    compReg
  },
  computed: {
    creditLine() {
      return this.accountInfo.creditDTO.availableAmount < 0
        ? 0
        : this.accountInfo.creditDTO.availableAmount;
    }
  },
  data() {
    return {
      changeSuccess: false,
      successMsg: "",
      showAlert: false,
      timeId: null,
      alterShow: false,
      alter_success: true,
      alterData: {
        showMobile: "",
        mobile: JSON.parse(this.$getLocalStorage("loginInfo")).mobile,
        phoneCode: "",
        password: "",
        newPassword: "",
        disabledCode: false,
        btnCountDown: "获取短信验证码"
      },
      xaAccountFlag: false, //判断是否是存管账户参数
      showConfirmDialog: false,
      showAlterDialog: false,
      showMessageDialog: false,
      isSuccess: false,
      isAlterSuccess: false,
      messageInfo: "",
      alterMessageInfo: "",
      openStatus: "",
      reditFlag: false,
      showConfirmMessageDialog: false,
      isConfirmSuccess: false,
      confirmMessageInfo: "",
      isDirect: false,
      operateType: "",
      repaymentSituationFlag: false,
      accountFlag: false,
      accountInfo: {
        identityStatus: false,
        operatorStatus: false,
        operatorIsCan: false,
        accountXAPersonDTO: {
          availableBalance: "0",
          freezeAmount: "0"
        },
        partyPersonDTO: {
          realName: "",
          lastLoginTime: ""
        },
        creditDTO: {
          productName: "",
          creditAmount: "",
          availableAmount: "",
          startDate: "",
          endDate: "",
          creditId: "",
          productId: ""
        },
        accountPersonDTO: {
          availableBalance: "",
          freezeAmount: ""
        },
        repaymentSituationDTO: []
      },
      repaymentSituationItem: {},
      repayMentOrder: {
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
      },
      alterRules: {
        phoneCode: [
          {
            required: true,
            message: "请输入短信验证码",
            trigger: "blur"
          },
          {
            pattern: /^[0-9]{4}$/,
            message: "请输入4位短信验证码",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          },
          {
            pattern: /^\S{6,20}$/,
            message: "请输入6-20位新密码",
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            message: "请输入确认新密码",
            trigger: "blur"
          },
          {
            pattern: /^\S{6,20}$/,
            message: "请输入6-20位确认密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getAccountInfo();
  },
  methods: {
    handleCloseChangePhone(values) {
      if (values.type === "close" && values.success) {
        this.handleLoginNow();
      } else {
        this.showAlert = false;
      }
    },
    handleLoginNow() {
      this.$removeAllStorage();
      this.$router.push({
        name: "LoginPage"
      });
    },
    handleCheckPhone() {
      login.checkPhone().then(
        res => {
          if (res.data.code == 200) {
            this.showAlert = true;
          }
        },
        error => {
          this.$alert(error.data.message, "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        }
      );
    },

    // 修改密码跳转
    alterPassword() {
      this.alterShow = true;
      this.alterData.password = "";
      this.alterData.newPassword = "";
      this.alterData.disabledCode = false;
      this.alterData.phoneCode = "";
      this.alterData.btnCountDown = "获取短信验证码";
    },
    // 提交修改密码
    handleAlter() {
      this.$refs["alterForm"].validate(valid => {
        if (valid) {
          if (this.alterData.password === this.alterData.newPassword) {
            this.$getPubKey(this.alterData.password, res => {
              if (res !== "") {
                let params = {
                  phone: this.alterData.mobile,
                  newPassword: res,
                  phoneCode: this.alterData.phoneCode,
                  encryptFlag: true
                };
                this.doAlter(params);
              }
            });
          } else {
            this.showAlterDialog = true;
            this.isAlterSuccess = false;
            this.alterMessageInfo = "两次密码不一致，请重新输入!";
          }
        }
      });
    },
    doAlter(params) {
      login.doForget(params).then(
        res => {
          const _data = res.data;
          if (_data.code == 200) {
            this.$removeAllStorage();
            this.alter_success = false;
          }
        },
        res => {
          if (res.data.code == 500) {
            this.showAlterDialog = true;
            this.isAlterSuccess = false;
            this.alterMessageInfo = "修改失败，服务器错误!";
          } else {
            this.showAlterDialog = true;
            this.isAlterSuccess = false;
            this.alterMessageInfo = res.data.message;
          }
        }
      );
    },
    handleAlterClose() {
      this.showAlterDialog = false;
      this.isAlterSuccess = false;
      this.alterMessageInfo = "";
    },
    // 重新登录
    handleRelogin() {
      this.$removeAllStorage();
      this.$router.push({
        name: "LoginPage"
      });
    },
    // 返回按钮
    handleBack() {
      this.alterShow = false;
    },
    // 短信验证码
    handleCode() {
      login.sendCode(this.alterData.mobile, "RESET_PASSWORD").then(
        res => {
          if (res.data.code === 200) {
            this.countDown(60);
          }
        },
        res => {
          this.alterData.disabledCode = true;
          this.alterData.btnCountDown = "稍后再试";
          setTimeout(() => {
            this.alterData.disabledCode = false;
            this.alterData.btnCountDown = "获取短信验证码";
          }, 30000);
        }
      );
    },
    countDown(sec) {
      if (sec >= 0) {
        this.alterData.disabledCode = true;
        this.alterData.btnCountDown = `剩余${sec}s`;
        this.timeId = setTimeout(() => {
          this.countDown(--sec);
        }, 1000);
      } else {
        this.alterData.disabledCode = false;
        this.alterData.btnCountDown = "获取短信验证码";
      }
    },

    handleRepayment() {
      if (this.operateType === "now") {
        this.handleRepaymentNow(this.repaymentSituationItem);
      } else {
        this.handleRepaymentEarly();
      }
    },
    handleRepaymentEarly() {
      if (
        this.repayMentOrder.loanApplication &&
        this.repayMentOrder.loanApplication !== ""
      ) {
        const _params = {
          loanApplication: this.repayMentOrder.loanApplication
        };
        api.postEarlyRepayment(_params).then(
          res => {
            if (res.data.code === 200) {
              this.showConfirmMessageDialog = true;
              this.isConfirmSuccess = true;
              this.confirmMessageInfo = "恭喜你，提前还款成功！";
              this.isDirect = true;
              this.showConfirmDialog = false;
            } else {
              this.showMessageDialog = true;
              this.isSuccess = false;
              this.messageInfo = "还款失败！";
            }
          },
          response => {
            this.showMessageDialog = true;
            this.isSuccess = false;
            this.messageInfo = response.data.message;
          }
        );
      }
    },
    handleRepaymentNow(item) {
      const repayOrderId =
        item && item.repayOrderId !== null ? item.repayOrderId : "";
      if (repayOrderId && repayOrderId !== "") {
        api.putNowRepayment(repayOrderId).then(
          res => {
            if (res.data.code === 200) {
              this.showConfirmMessageDialog = true;
              this.isConfirmSuccess = true;
              this.confirmMessageInfo = "恭喜你，还款成功！";
              this.isDirect = true;
              this.showConfirmDialog = false;
            } else {
              this.showMessageDialog = true;
              this.isSuccess = false;
              this.messageInfo = "还款失败！";
            }
          },
          response => {
            this.showMessageDialog = true;
            this.isSuccess = false;
            this.messageInfo = response.data.message;
          }
        );
      }
    },
    handleSuccessRedirect() {
      this.getAccountInfo();
      this.handleCloseDirectDialog();
    },
    handleCloseDirectDialog() {
      this.showConfirmMessageDialog = false;
      this.isConfirmSuccess = false;
      this.confirmMessageInfo = "";
      this.isDirect = false;
    },
    handleCheckedAccountOpen() {
      this.checkAccountFn();
    },
    getAccountInfo() {
      //获取全部账户信息
      api.getAccountInfo().then(res => {
        if (res.data.code === 200) {
          let _aInfo = res.data.body;
          this.accountInfo = _aInfo;
          this.alterData.showMobile = _aInfo.partyPersonDTO.mobile;
          // console.log("_aInfo.identityStatus:", _aInfo.identityStatus);
          // console.log(
          //   "this.accountInfo.identityStatus:",
          //   this.accountInfo.identityStatus
          // );
          this.accountInfo.identityStatus = _aInfo.identityStatus;
          this.accountInfo.operatorStatus = _aInfo.operatorStatus
            ? _aInfo.operatorStatus
            : false;
          this.accountInfo.repaymentSituationDTO = _aInfo.repaymentSituationDTO
            ? _aInfo.repaymentSituationDTO
            : [];
          this.accountInfo.operatorIsCan = _aInfo.operatorIsCan
            ? _aInfo.operatorIsCan
            : false;
          this.openStatus = _aInfo.openStatus ? _aInfo.openStatus : "0";
          this.reditFlag = _aInfo.reditFlag ? _aInfo.reditFlag : false;
          this.repaymentSituationFlag = _aInfo.repaymentSituationFlag
            ? _aInfo.repaymentSituationFlag
            : false;
          this.accountFlag = _aInfo.accountFlag ? _aInfo.accountFlag : false;

          this.accountInfo.accountXAPersonDTO = !_aInfo.accountXAPersonDTO
            ? { availableBalance: "0", freezeAmount: "0" }
            : _aInfo.accountXAPersonDTO;

          if (_aInfo.reditFlag) {
            if (!this.$getSessionStorage("checkedProducts")) {
              this.$setSessionStorage(
                "checkedProducts",
                JSON.stringify({
                  creditId: _aInfo.creditDTO.creditId,
                  productId: _aInfo.creditDTO.productId,
                  productName: _aInfo.creditDTO.productName
                })
              );
            }
          }
          this.xaAccountFlag = _aInfo.xaAccountFlag;
          if (_aInfo.accountXAPersonDTO) {
            this.accountInfo.accountXAPersonDTO.availableBalance = _aInfo
              .accountXAPersonDTO.availableBalance
              ? _aInfo.accountXAPersonDTO.availableBalance
              : "0";
            this.accountInfo.accountXAPersonDTO.freezeAmount = _aInfo
              .accountXAPersonDTO.freezeAmount
              ? _aInfo.accountXAPersonDTO.freezeAmount
              : "0";
          } else {
            this.accountInfo.accountXAPersonDTO.availableBalance = "0";
          }
        }
      });
    },
    getNowRepaymentOrderInfo(repayOrderId) {
      if (repayOrderId && repayOrderId !== "") {
        api.getNowRepaymentOrder(repayOrderId).then(
          res => {
            if (res.data.code === 200) {
              this.repayMentOrder = res.data.body ? res.data.body : {};
              this.showConfirmDialog = true;
            } else {
              this.showMessageDialog = true;
              this.isSuccess = false;
              this.messageInfo = "";
            }
          },
          response => {
            this.showMessageDialog = true;
            this.isSuccess = false;
            this.messageInfo = response.data.message;
          }
        );
      } else {
        this.showMessageDialog = true;
        this.isSuccess = false;
        this.messageInfo = "下一期还款账单id不能为空";
      }
    },
    getEarlyRepaymentOrderInfo(loanApplication) {
      if (loanApplication && loanApplication !== "") {
        const _param = {
          loanApplication: loanApplication
        };
        api.getEarlyRepaymentOrder(_param).then(
          res => {
            if (res.data.code === 200) {
              this.repayMentOrder = res.data.body ? res.data.body : {};
              this.showConfirmDialog = true;
            } else {
              this.showMessageDialog = true;
              this.isSuccess = false;
              this.messageInfo = "";
            }
          },
          response => {
            this.showMessageDialog = true;
            this.isSuccess = false;
            this.messageInfo = response.data.message;
          }
        );
      } else {
        this.showMessageDialog = true;
        this.isSuccess = false;
        this.messageInfo = "下一期还款账单id不能为空";
      }
    },
    handleRepayNow(type, item) {
      this.operateType = type;
      this.repaymentSituationItem = item;
      if (type === "now") {
        const repayOrderId = item && item.repayOrderId ? item.repayOrderId : "";
        this.getNowRepaymentOrderInfo(repayOrderId);
      } else {
        const loanApplication =
          item && item.loanApplication ? item.loanApplication : "";
        this.getEarlyRepaymentOrderInfo(loanApplication);
      }
    },
    handleGoIdentity() {
      this.$router.push({
        name: "creditAuthority",
        query: {
          pageFrom: "usersAccountPage",
          operateType: "AccountAuthority"
        }
      });
    },
    handleGoOperator() {
      if (this.accountInfo.operatorIsCan) {
        this.$router.push({
          name: "authorityOperator",
          query: {
            pageName: "usersAccountPage"
          }
        });
      } else {
        this.showMessageDialog = true;
        this.isSuccess = false;
        this.messageInfo = "每日只能认证五次，请明日再来认证!";
      }
    },
    handleClose() {
      this.showMessageDialog = false;
      this.isSuccess = false;
      this.messageInfo = "";
    },
    handleGoRecharge() {
      this.$router.push({
        name: "usersRechargePage"
      });
    },
    handleGoWithdraw() {
      if (this.accountFlag) {
        this.checkAmountBalance("fund");
      } else {
        this.messageInfo = "您还没有可提现的金额,请先充值!";
        this.isSuccess = false;
        this.showMessageDialog = true;
      }
    },
    checkAmountBalance(type) {
      const phone = this.alterData.mobile;
      api.checkBalance(phone).then(
        response => {
          let result = response.data;
          if (result.code === 200) {
            if (type === "fund" && result.body.fundCenterStatus === "NORMAL") {
              this.$router.push({
                name: "usersWithdrawPage"
              });
            } else if (
              type === "xa" &&
              result.body.xaDepositStatus === "NORMAL"
            ) {
              this.$router.push({ name: "usersDepWithdrawPage" });
            } else {
              this.messageInfo =
                "您的账户已冻结，需要提现请联系客服 400-6690-108";
              this.isSuccess = false;
              this.showMessageDialog = true;
            }
          }
        },
        response => {
          this.messageInfo = response.data.message
            ? response.data.message
            : "异常错误！";
          this.isSuccess = false;
          this.showMessageDialog = true;
        }
      );
    },
    handleGoDepWithdraw() {
      this.checkAmountBalance("xa");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.loan-content {
  .mr02-title {
    font-size: 16px;
    color: #a9a9a9;
    padding-left: 20px;
  }
}
.mr02.loan-content .mr02-left {
  padding-bottom: 10px;
}
.mr02.loan-content {
  .mr02-loan-info {
    width: 97%;
    margin: 0 auto;
    border-bottom: 1px dashed #ccc;
  }
  .mr02-loan-info:last-child {
    border-bottom: none;
    padding-top: 20px;
  }
}
.mr01 .mr01-left {
  flex: 1;
}
.mr01 .mr01-left .mr01-left-userinfo {
  position: relative;
  flex: 1;
  h3 {
    height: 50px;
  }
}

.alterbg {
  background: #fff;
}

.alter {
  width: 120px;
  height: 36px;
  top: 0;
  right: 165px;
  color: #ff8c00;
  line-height: 34px;
  position: absolute;
  margin-top: 9px;
  border: 1px solid #ff8c00;
  border-radius: 18px;
  text-align: center;
}
.alter.change-phone {
  right: 20px;
}

.main-right .alter_title {
  color: #494949;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 50px;
}

.code {
  height: 40px;
  line-height: 40px;
  border: none;
  width: 140px;
  background: #ff9c00;
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.width300 {
  width: 300px;
}

.noclick {
  background: #ddd;
}

.ml20 {
  margin-left: 20px;
}

.alter-success {
  text-align: center;
  margin-top: 150px;
  color: #494949;
  font-size: 20px;

  .reLogin {
    width: 130px;
    font-size: 16px;
    line-height: 25px;
    padding: 5px 10px;
    border-radius: 20px;
    margin-top: 20px;
  }
}
.alert-form {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  .alert-mask {
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
  }
  .login-inner-box {
    right: auto;
    left: 50%;
    margin-left: -175px;
    margin-top: -210px;
  }
}
</style>
