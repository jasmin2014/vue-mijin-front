<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'usersAccountPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersMyLoansPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <section class="asset-mr02 no-top-margin myloan-rig-inner">
            <div class="mr-loan-detail">
              <p class="return"><span class="cursor" @click="routerBack">< 返回 </span></p>
              <div class="inner">
                <p class="flex">
                  <span class="loan-number">贷款订单号:{{loanRecordDTO.applicationId}}</span>
                  <span class="loan-status">{{$filter(loanRecordDTO.status, this.$enum.LOAN_STATUS, this.$enum.LOAN_GROUP)}}</span>
                </p>
                <section class="loan-info flex">
                  <div>
                    <p class="loan-info-name">{{loanRecordDTO.productName}}</p>
                    <p>产品名称</p>
                  </div>
                  <div>
                    <p class="loan-info-name">{{loanRecordDTO.paymentAmount}}</p>
                    <p>借款金额(元)</p>
                  </div>
                  <div>
                    <p class="loan-info-name">{{$filter(loanRecordDTO.repayWay, this.$enum.REPAY_WAY, this.$enum.REPAY_WAY)}}</p>
                    <p>还款方式</p>
                  </div>
                </section>
                <p class="flex loan-terms">
                  <span>借款期限:{{loanRecordDTO.repayTerms}}个月</span>
                  <span>起息日期:{{loanRecordDTO.interestDate}}</span>
                </p>
                <div v-if="loanRecordDTO.status !== this.$enum.LOAN_EARLY_REPAYMENT && loanRecordDTO.status !== this.$enum.LOAN_REIMBURSEMENT" class="mj-button orange step-btn-next loan-button cursor" @click="getEarlyRepaymentOrderInfo">提前还款</div>
              </div>
            </div>
            <div class="amr02-seach-inner">
              <div class="search-tabs-content">
                <div class="search-tabs-item">
                  <el-table :data="accountLoansDatas" border style="width: 100%">
                    <el-table-column prop="term" label="期数" width="80" align="center"></el-table-column>
                    <el-table-column prop="planedTotalAmount" label="当期待还金额(元)" align="center"></el-table-column>
                    <el-table-column prop="planedRepayDate" label="应还款日" align="center"></el-table-column>
                    <el-table-column prop="actRepayDate" align="center" label="实际还款日"></el-table-column>
                    <el-table-column prop="repayStatus" align="center" label="还款状态"
                      :formatter="(row, col, val) => (this.$filter(val, this.$enum.REPAY_STATUS, this.$enum.REPAY_STATUS))"></el-table-column>
                    <el-table-column align="center" label="操作">
                      <template slot-scope="scope">
                        <div class="operate"><span v-if="scope.row.repayStatus === 'UN_REPAY' || scope.row.repayStatus === 'OVERDUE'" @click="getNowRepaymentOrderInfo(scope.row)">还款</span></div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <mijin-repay-confirm :show-dialog="showConfirmDialog" :value="repayMentOrder" :operate-type="operateType" @confirm="handleRepayment" @cancel="showConfirmDialog = false;"></mijin-repay-confirm>
    <mijin-dialog v-show="showMessageDialog" :is-success="isSuccess" :message="messageInfo" @close="handleCloseDialog"></mijin-dialog>
    <mijin-dialog v-show="showConfirmMessageDialog" :is-success="isConfirmSuccess" :message="confirmMessageInfo" :is-direct="isDirect" @ok="handleSuccessRedirect" @close="handleCloseDirectDialog"></mijin-dialog>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import MijinLeftMenu from "./components/userLeft.vue";
import MijinDialog from "../../components/dialogBox.vue";
import MijinRepayConfirm from "./components/twinceConfirm.vue";
import * as api from "../api/users";
export default {
  name: "usersLoanRecordDetailPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinLeftMenu,
    MijinDialog,
    MijinRepayConfirm
  },
  data() {
    return {
      showMessageDialog: false,
      isSuccess: false,
      messageInfo: "",
      showConfirmDialog: false,
      showConfirmMessageDialog: false,
      isConfirmSuccess: false,
      confirmMessageInfo: "",
      isDirect: false,
      operateType: "",
      currentRepayOrderId: "",
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
      aIndex: 3,
      search: {
        pageNumber: 1,
        pageSize: 10
      },
      loanRecordDTO: {
        applicationId: "",
        status: "",
        productName: "",
        applicationAmount: "",
        repayWay: "",
        repayTerms: "",
        applicationTime: ""
      },
      pageTotal: 1,
      accountLoansDatas: []
    };
  },
  created() {
    this.getLoanApplicationDetail();
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    handleRepayment() {
      if (this.operateType === "now") {
        this.handleRepaymentNow();
      } else {
        this.handleRepaymentEarly();
      }
    },
    handleRepaymentEarly() {
      if (this.$route.params.id && this.$route.params.id !== "") {
        const _params = {
          loanApplication: this.$route.params.id
        };
        api.postEarlyRepayment(_params).then(
          res => {
            if (res.data.code === 200) {
              this.showConfirmMessageDialog = true;
              this.isConfirmSuccess = true;
              this.confirmMessageInfo = "恭喜你，还款成功！";
              this.isDirect = true;
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
    handleRepaymentNow() {
      const repayOrderId =
        this.currentRepayOrderId && this.currentRepayOrderId !== ""
          ? this.currentRepayOrderId
          : "";
      if (repayOrderId && repayOrderId !== "") {
        api.putNowRepayment(repayOrderId).then(
          res => {
            if (res.data.code === 200) {
              this.showConfirmMessageDialog = true;
              this.isConfirmSuccess = true;
              this.confirmMessageInfo = "恭喜你，还款成功！";
              this.isDirect = true;
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
      this.showConfirmDialog = false;
      this.getLoanApplicationDetail();
      this.handleCloseDirectDialog();
    },
    handleCloseDirectDialog() {
      this.showConfirmMessageDialog = false;
      this.isConfirmSuccess = false;
      this.confirmMessageInfo = "";
      this.isDirect = false;
    },
    getEarlyRepaymentOrderInfo() {
      this.operateType = "early";
      const loanApplication = this.loanRecordDTO
        ? this.loanRecordDTO.applicationId
        : "";
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
    getNowRepaymentOrderInfo(row) {
      this.operateType = "now";
      this.currentRepayOrderId = row.id;
      if (row.id && row.id !== "") {
        api.getNowRepaymentOrder(row.id).then(
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
        this.messageInfo = "还款Id不能为空";
      }
    },
    getLoanApplicationDetail() {
      //获取所有借款单条详情的方法
      const applicationId = this.$route.params.id;
      api.getLoanApplicationDetail(applicationId).then(res => {
        if (res.data.code === 200) {
          this.loanRecordDTO = res.data.body.loanRecordDTO
            ? res.data.body.loanRecordDTO
            : {};
          this.accountLoansDatas = res.data.body.repayOrderDTOList
            ? res.data.body.repayOrderDTOList
            : [];
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
.mr-loan-detail {
  margin-top: -10px;
  .inner {
    .loan-number {
      line-height: 50px;
      padding-left: 50px;
    }
    .loan-status {
      color: #ff8b01;
    }
    .loan-info {
      padding: 0 30px 20px 30px;
      border-bottom: 1px solid #ebeef5;
      > div {
        width: 33%;
        text-align: center;
        border-right: 1px solid #ebeef5;
        color: #999;
        .loan-info-name {
          color: #ff8b01;
          font-size: 120%;
          line-height: 40px;
        }
      }
      > div:last-child {
        border-right: none;
      }
    }
    .loan-terms {
      padding: 20px 70px;
    }
    .loan-button {
      width: 130px;
      padding: 0 30px;
      line-height: 40px;
      border-radius: 20px;
      margin: 0 auto 50px auto;
    }
  }
}
</style>
