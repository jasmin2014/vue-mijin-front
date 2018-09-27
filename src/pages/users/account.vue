<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'usersAccountPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersAccountPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <div class="mr01 flex">
            <section class="mr01-left flex-start">
              <div class="sprites mr01-logo"></div>
              <div class="mr01-left-userinfo">
                <h3>{{accountInfo.partyPersonDTO.realName}}</h3>
                <p><i class="icon iconfont icon-shijian"></i>上次登录时间： {{accountInfo.partyPersonDTO.lastLoginTime}}</p>
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

          <div class="mr02 flex" v-if="repaymentSituationFlag">
            <section class="mr02-left">
              <h4 class="mr02-title">还款情况</h4>
              <div class="mr02-left-userinfo">
                <div class="mr02-info">
                  <span>当前未还期数</span>
                  <p>{{accountInfo.repaymentSituationDTO.restRepayTerms}}</p>
                </div>
                <div class="mr02-info">
                  <span>下一期应还金额</span>
                  <p>{{accountInfo.repaymentSituationDTO.planedTotalAmount}}</p>
                </div>
                <div class="mr02-info">
                  <span>下一期应还款时间</span>
                  <p>{{accountInfo.repaymentSituationDTO.planedRepayDate}}</p>
                </div>
              </div>
            </section>
            <section class="mr02-right flex">
              <div class="mr02-btn mr02-btn01 cursor" @click="handleRepayNow('now')">还款</div>
              <div class="mr02-btn mr02-btn02 cursor" @click="handleRepayNow('early')">提前还款</div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <!--提前还款  showConfirmDialog-->
    <mijin-repay-confirm :show-dialog="showConfirmDialog" :operate-type="operateType" :value="repayMentOrder" @confirm="handleRepayment"
      @cancel="showConfirmDialog = false;"></mijin-repay-confirm>
    <mijin-dialog v-show="showMessageDialog" :is-success="isSuccess" :message="messageInfo" @close="handleClose"></mijin-dialog>
    <mijin-dialog v-show="showConfirmMessageDialog" :is-success="isConfirmSuccess" :message="confirmMessageInfo"
      :is-direct="isDirect" @ok="handleSuccessRedirect" @close="handleCloseDirectDialog"></mijin-dialog>
  </div>
</template>

<script>
  import MijinHeader from '../../components/header.vue';
  import MijinFootter from '../../components/footter.vue';
  import MijinLeftMenu from './components/userLeft.vue';
  import MijinRepayConfirm from './components/twinceConfirm.vue';
  import * as api from '../api/users';
  import * as accountApi from '../api/account';
  import MijinDialog from '../../components/dialogBox.vue';
  export default {
    name: 'usersAccountPage',
    components: {
      MijinHeader,
      MijinFootter,
      MijinLeftMenu,
      MijinDialog,
      MijinRepayConfirm
    },
    computed: {
      creditLine() {
        return this.accountInfo.creditDTO.availableAmount < 0 ? 0 : this.accountInfo.creditDTO.availableAmount
      }
    },
    data() {
      return {
        showConfirmDialog: false,
        showMessageDialog: false,
        isSuccess: false,
        messageInfo: '',
        openStatus: '',
        reditFlag: false,
        showConfirmMessageDialog: false,
        isConfirmSuccess: false,
        confirmMessageInfo: '',
        isDirect: false,
        operateType: '',
        repaymentSituationFlag: false,
        accountFlag: false,
        accountInfo: {
          identityStatus: false,
          operatorStatus: false,
          operatorIsCan: false,
          partyPersonDTO: {
            realName: '',
            lastLoginTime: ''
          },
          creditDTO: {
            productName: '',
            creditAmount: '',
            availableAmount: '',
            startDate: '',
            endDate: '',
            creditId: '',
            productId: ''
          },
          accountPersonDTO: {
            availableBalance: '',
            freezeAmount: ''
          },
          repaymentSituationDTO: {
            restRepayTerms: '',
            planedTotalAmount: '',
            planedRepayDate: '',
            repayOrderId: ''
          }
        },
        repayMentOrder: {
          productName: '',
          loanApplication: '',
          interestDate: '',
          planedRepayDate: '',
          planedCapAmount: '',
          planedIntAmount: '',
          penaltyDays: '',
          planedTotalPenalty: '',
          defaultsFee: '',
          planedTotalAmount: ''
        }
      }
    },
    created() {
      this.getAccountInfo();
    },
    methods: {
      handleRepayment() {
        // this.showConfirmDialog = false;
        if (this.operateType === 'now') {
          this.handleRepaymentNow()
        } else {
          this.handleRepaymentEarly();
        }
      },
      handleRepaymentEarly() {
        if (this.repayMentOrder.loanApplication && this.repayMentOrder.loanApplication !== '') {
          const _params = {
            loanApplication: this.repayMentOrder.loanApplication
          }
          api.postEarlyRepayment(_params).then(res => {
            if (res.data.code === 200) {
              this.showConfirmMessageDialog = true;
              this.isConfirmSuccess = true;
              this.confirmMessageInfo = '恭喜你，提前还款成功！';
              this.isDirect = true;
              this.showConfirmDialog = false;
            } else {
              this.showMessageDialog = true;
              this.isSuccess = false;
              this.messageInfo = '还款失败！'
            }
          }, response => {
            this.showMessageDialog = true;
            this.isSuccess = false;
            this.messageInfo = response.data.message;
          })
        }

      },
      handleRepaymentNow() {
        const repayOrderId = this.accountInfo.repaymentSituationDTO && this.accountInfo.repaymentSituationDTO.repayOrderId !==
          null ? this.accountInfo.repaymentSituationDTO.repayOrderId : '';
        if (repayOrderId && repayOrderId !== '') {
          api.putNowRepayment(repayOrderId).then(res => {
            if (res.data.code === 200) {
              this.showConfirmMessageDialog = true;
              this.isConfirmSuccess = true;
              this.confirmMessageInfo = '恭喜你，还款成功！';
              this.isDirect = true;
              this.showConfirmDialog = false;
            } else {
              // this.showConfirmMessageDialog = false;
              this.showMessageDialog = true;
              this.isSuccess = false;
              this.messageInfo = '还款失败！'
            }
          }, response => {
            // this.showConfirmMessageDialog = false;
            this.showMessageDialog = true;
            this.isSuccess = false;
            this.messageInfo = response.data.message;
          })
        }
      },
      handleSuccessRedirect() {
        this.getAccountInfo();
        this.handleCloseDirectDialog();
      },
      handleCloseDirectDialog() {
        this.showConfirmMessageDialog = false;
        this.isConfirmSuccess = false;
        this.confirmMessageInfo = '';
        this.isDirect = false;
      },
      handleCheckedAccountOpen() {
        accountApi.getAccountStatus().then(res => {
          if (res.data.code === 200) {
            if (res.data.body.status === '0') {
              this.$router.push({
                name: 'accountOpenPage',
                query: {
                  'creditAmount': this.accountInfo.creditDTO.creditAmount,
                  'accountType': res.data.body.accountType
                }
              })
            } else if (res.data.body.status === '1') {
              /*调用开户之后的状态判断*/
              this.getCheckTheBankNumber();
            } else if (res.data.body.status === '2') {
              this.showMessageDialog = true;
              this.isSuccess = false;
              this.messageInfo = '账户正在开户中!';
            } else {
              this.showMessageDialog = true;
              this.isSuccess = false;
              this.messageInfo = res.data.message ? res.data.message : '未知错误!';
            }
          }
        }, res => {
          this.showMessageDialog = true;
          this.isSuccess = false;
          this.messageInfo = res.data.message ? res.data.message : '未知错误!';
        })
      },
      getCheckTheBankNumber() {
        accountApi.checkOpenBankNumber().then(res => {
          if (res.data.code === 200) {
            this.getOpenStatus();
          } else {
            this.showMessageDialog = true;
            this.isSuccess = false;
            this.messageInfo = res.data.message;
          }
        }, (response) => {
          this.showMessageDialog = true;
          this.isSuccess = false;
          this.messageInfo = response.data.message;
        })
      },
      getOpenStatus() {
        const params = {
          creditId: this.accountInfo.creditDTO.creditId,
          productId: this.accountInfo.creditDTO.productId
        }
        accountApi.checkOpenStatus(params).then(res => {
          if (res.data.code === 200) {
            this.$router.push({
              name: 'accountLoanPage'
            });
          } else if (res.data.code === 4002021) {
            this.$router.push({
              name: 'creditGuaranteePage'
            });
          } else {
            this.showMessageDialog = true;
            this.isSuccess = false;
            this.messageInfo = res.data.message;
          }
        }, res => {
          this.showMessageDialog = true;
          this.isSuccess = false;
          this.messageInfo = res.data.message;
        })
      },
      getAccountInfo() {
        //获取全部账户信息
        api.getAccountInfo().then(res => {
          if (res.data.code === 200) {
            this.accountInfo = res.data.body;
            this.accountInfo.identityStatus = res.data.body.identityStatus ? res.data.body.identityStatus : false;
            this.accountInfo.operatorStatus = res.data.body.operatorStatus ? res.data.body.operatorStatus : false;
            this.accountInfo.repaymentSituationDTO = this.accountInfo.repaymentSituationDTO ? this.accountInfo.repaymentSituationDTO :
              {};
            this.accountInfo.operatorIsCan = res.data.body.operatorIsCan ? res.data.body.operatorIsCan : false;
            this.openStatus = res.data.body.openStatus ? res.data.body.openStatus : '0';
            this.reditFlag = res.data.body.reditFlag ? res.data.body.reditFlag : false;
            this.repaymentSituationFlag = res.data.body.repaymentSituationFlag ? res.data.body.repaymentSituationFlag :
              false;
            this.accountFlag = res.data.body.accountFlag ? res.data.body.accountFlag : false;
            if (res.data.body.reditFlag) {
              if (!this.$getSessionStorage('checkedProducts')) {
                this.$setSessionStorage('checkedProducts', JSON.stringify({
                  creditId: res.data.body.creditDTO.creditId,
                  productId: res.data.body.creditDTO.productId,
                  productName: res.data.body.creditDTO.productName
                }))
              }
            }

          }
        })
      },
      getNowRepaymentOrderInfo(repayOrderId) {
        if (repayOrderId && repayOrderId !== '') {
          api.getNowRepaymentOrder(repayOrderId).then(res => {
            if (res.data.code === 200) {
              this.repayMentOrder = res.data.body ? res.data.body : {};
              this.showConfirmDialog = true;
            } else {
              this.showMessageDialog = true;
              this.isSuccess = false;
              this.messageInfo = '';
            }
          }, response => {
            this.showMessageDialog = true;
            this.isSuccess = false;
            this.messageInfo = response.data.message;
          })
        } else {
          this.showMessageDialog = true;
          this.isSuccess = false;
          this.messageInfo = '下一期还款账单id不能为空';
        }
      },
      getEarlyRepaymentOrderInfo(loanApplication) {
        if (loanApplication && loanApplication !== '') {
          const _param = {
            loanApplication: loanApplication
          };
          api.getEarlyRepaymentOrder(_param).then(res => {
            if (res.data.code === 200) {
              this.repayMentOrder = res.data.body ? res.data.body : {};
              this.showConfirmDialog = true;
            } else {
              this.showMessageDialog = true;
              this.isSuccess = false;
              this.messageInfo = '';
            }
          }, response => {
            this.showMessageDialog = true;
            this.isSuccess = false;
            this.messageInfo = response.data.message;
          });
        } else {
          this.showMessageDialog = true;
          this.isSuccess = false;
          this.messageInfo = '下一期还款账单id不能为空';
        }
      },
      handleRepayNow(type) {
        this.operateType = type;
        if (type === 'now') {
          const repayOrderId = this.accountInfo.repaymentSituationDTO && this.accountInfo.repaymentSituationDTO.repayOrderId ?
            this.accountInfo.repaymentSituationDTO.repayOrderId : '';
          this.getNowRepaymentOrderInfo(repayOrderId);
        } else {
          const loanApplication = this.accountInfo.repaymentSituationDTO && this.accountInfo.repaymentSituationDTO.loanApplication ?
            this.accountInfo.repaymentSituationDTO.loanApplication : '';
          this.getEarlyRepaymentOrderInfo(loanApplication);
        }
      },
      handleGoIdentity() {
        this.$router.push({
          name: 'creditAuthority',
          query: {
            pageFrom: 'usersAccountPage',
            operateType: 'AccountAuthority'
          }
        });
      },
      handleGoOperator() {
        if (this.accountInfo.operatorIsCan) {
          this.$router.push({
            name: 'authorityOperator',
            query: {
              'pageName': 'usersAccountPage'
            }
          })
        } else {
          this.showMessageDialog = true;
          this.isSuccess = false;
          this.messageInfo = '每日只能认证五次，请明日再来认证!';
        }
      },
      handleClose() {
        this.showMessageDialog = false;
        this.isSuccess = false;
        this.messageInfo = '';
      },
      handleGoRecharge() {
        this.$router.push({
          name: 'usersRechargePage'
        });
      },
      handleGoWithdraw() {
        if (this.accountFlag) {
          this.$router.push({
            name: 'usersWithdrawPage'
          });
        } else {
          this.messageInfo = '您还没有可提现的金额,请先充值!';
          this.isSuccess = false;
          this.showMessageDialog = true;
        }

      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
