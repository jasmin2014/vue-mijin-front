<template>
  <div class="content signature">
    <mijin-header :is-white="true" :active-page="'usersAccountPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersMyLoansPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <section class="asset-mr02 no-top-margin myloan-rig-inner">
            <div class="amr02-search flex">
              <el-form :model="search" class="amr02-flex flex">
                <div>
                  <el-form-item label="日期">
                    <mj-date-picker-query v-model="appliedTime" :clearable="true"></mj-date-picker-query>
                  </el-form-item>
                </div>
                <div class="flex">
                  <el-form-item label="状态">
                    <mj-select v-model="search.status" :kind="$enum.LOAN_STATUS" :group="$enum.LOAN_GROUP" :clearable="true"></mj-select>
                  </el-form-item>
                  <div class="search-btn cursor" @click="handleSearchLoansList">搜索</div>
                </div>
              </el-form>
            </div>
            <div class="amr02-seach-inner">
              <div class="search-tabs-content">
                <div class="search-tabs-item">
                  <el-table :data="accountLoansDatas" :default-sort="{prop: 'applicationTime', order: 'descending'}" border style="width: 100%">
                    <el-table-column prop="applicationId" label="借款申请编号" align="center">
                    </el-table-column>
                    <el-table-column prop="productName" label="产品名称" align="center">
                    </el-table-column>
                    <el-table-column prop="applicationAmount" align="center" label="申请金额(元)">
                    </el-table-column>
                    <el-table-column prop="paymentAmount" align="center" label="审批金额(元)"></el-table-column>
                    <el-table-column prop="repayWay" align="center" :formatter="(row, col, val) => (this.$filter(val, this.$enum.REPAY_WAY, this.$enum.REPAY_WAY))"
                      label="还款方式">
                    </el-table-column>
                    <el-table-column prop="repayTerms" align="center" label="借款期限">
                      <template slot-scope="scope">
                        <span>{{scope.row.repayTerms}}个月</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="status" align="center" :formatter="(row, col, val) => (this.$filter(val, this.$enum.LOAN_STATUS, this.$enum.LOAN_GROUP))"
                      label="状态">
                    </el-table-column>
                    <el-table-column prop="applicationTime" align="center" label="申请时间">
                    </el-table-column>
                    <el-table-column align="center" width="200px" label="操作">
                      <template slot-scope="scope">
                        <div class="operate" v-if="scope.row.status === $enum.LOAN_BE_SIGN">
                          <span @click="handlePreview(scope.row)">签约</span>
                          <span @click="handleRefuseSigning(scope.row)">拒绝签约</span>
                          <!--<span @click="handleGoDetail(scope.row)">查看</span>-->
                        </div>
                        <div class="operate" v-else-if="scope.row.status === $enum.LOAN_SIGNED
                            || scope.row.status === $enum.LOAN_IN_LOAN
                            || scope.row.status === $enum.LOAN_REPAYMENTS
                            || scope.row.status === $enum.LOAN_EARLY_REPAYMENT
                            || scope.row.status === $enum.LOAN_OVERDUE
                            || scope.row.status === $enum.LOAN_REIMBURSEMENT">
                          <a :href="scope.row.contractUrl" target="_blank">合同</a>
                          <!-- <span @click="(scope.row)">合同</span> -->
                          <span v-if="scope.row.status === $enum.LOAN_REPAYMENTS
                                || scope.row.status === $enum.LOAN_REIMBURSEMENT
                                || scope.row.status === $enum.LOAN_EARLY_REPAYMENT
                                || scope.row.status === $enum.LOAN_OVERDUE" @click="handleGoDetail(scope.row)">查看</span>
                        </div>
                        <div class="operate" v-else-if="scope.row.status === $enum.LOAN_REFUSING_SIGN
                          || scope.row.status === $enum.LOAN_AUDIT
                          || scope.row.status === $enum.LOAN_BE_SIGN
                          || scope.row.status ===$enum.LOAN_INVALID
                          || scope.row.status === $enum.LOAN_TERMINATE_LOAN"></div>
                        <!--<div class="operate" v-else><span @click="handleGoDetail(scope.row)">查看</span></div>-->
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </section>
          <section class="mj-pagination">
            <el-pagination layout="prev,pager, next,jumper" :total="pageTotal" :current-page="search.pageNumber" :page-size="search.pageSize"
              @current-change="getLoanApplicationList"></el-pagination>
          </section>
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <mijin-dialog v-show="showRefuseSignDialog" :is-success="isRefuseSuccess" :message="refuseMessageInfo" :double-button="doubleButton"
      :ok-button-name="okButtonName" @ok="handleSuccessRedirect" @close="handleCloseRefuseDialog"></mijin-dialog>
    <!--签约合同-->
    <el-dialog title="签约合同" top="0vh" :visible.sync="contractDialog" lock-scroll class="contract-dialog" @close="handleCloseRefuseDialog"
      :close-on-click-modal="false">
      <div class="dialog-img-box">
        <img :src="contractUrl" alt="签约合同" width="100%">
      </div>
      <div class="dialog-contract-btn">
        <el-button v-if="this.dialogType === this.$enum.LOAN_BE_SIGN" type="warning" round class="contract-btn" @click="handleContract">签约</el-button>
      </div>
      <!--身份验证-->
      <el-dialog width="500px" title="身份认证" :visible.sync="validateDialog" @close="closeValidateDialog" :close-on-click-modal="false"
        append-to-body center>
        <div class="validate-box clearfix">
          <p>手机号码：</p> {{contractMobile}}
        </div>
        <div class="validate-box clearfix">
          <p>短信验证码: </p>
          <el-input style="width:150px;" placeholder="请输入验证码" v-model="contractMessageCode" clearable></el-input>
          <div class="mr-code-get cursor" :class="{'disabled-code' : disabledCode}" @click="handleCode">{{ btnCountDown}}</div>
        </div>
        <p class="validateCode" v-if="this.validateCode==true">请输入验证码</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitContractValidate" :disabled="disabledOperate">提交</el-button>
          <el-button @click="closeValidateDialog" :disabled="disabledOperate">取消</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import MijinHeader from '../../components/header.vue';
  import MijinFootter from '../../components/footter.vue';
  import MijinLeftMenu from './components/userLeft.vue';
  import MijinDialog from '../../components/dialogBox.vue';
  import * as api from '../api/users';
  export default {
    name: 'usersMyLoansPage',
    components: {
      MijinHeader,
      MijinFootter,
      MijinLeftMenu,
      MijinDialog
    },
    data() {
      return {
        showRefuseSignDialog: false,
        isRefuseSuccess: false,
        refuseMessageInfo: '',
        doubleButton: false,
        okButtonName: '确定',
        dialogType: '',
        aIndex: 3,
        search: {
          applicationTimeB: '',
          applicationTimeE: '',
          pageNumber: 1,
          pageSize: 10,
          status: ''
        },
        pageTotal: 1,
        accountLoansDatas: [],
        contractRow: '',
        contractDialog: false,
        contractBtn: false,
        contractUrl: '',
        codeInterval: null,
        validateDialog: false,
        disabledCode: false,
        validateCode: false,
        btnCountDown: '获取短信验证码',
        contractMobile: JSON.parse(this.$getLocalStorage('loginInfo')).nickName,
        contractMessageCode: '',
        currentAppItem: {},
        disabledOperate: false,
      }
    },
    computed: {
      appliedTime: {
        get() {
          if (this.search.applicationTimeB && this.search.applicationTimeE) {
            const dateRange = [];
            dateRange[0] = this.search.applicationTimeB;
            dateRange[1] = this.search.applicationTimeE;
            return dateRange
          } else {
            return null;
          }
        },
        set(val) {
          if (val) {
            this.search.applicationTimeB = val[0];
            this.search.applicationTimeE = val[1]
          } else {
            this.search.applicationTimeB = '';
            this.search.applicationTimeE = ''
          }
        }
      }
    },
    created() {
      this.getLoanApplicationList(1);
    },
    methods: {
      /*handleChangePage(value){
        this.getLoanApplicationList(value);
      },*/
      handleSearchLoansList() {
        this.getLoanApplicationList(1);
      },
      getLoanApplicationList(index) {
        const _search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        _search.pageNumber = index;
        api.getLoanApplicationList(_search).then(res => {
          if (res.data.code === 200) {
            this.accountLoansDatas = res.data.body.list ? res.data.body.list : [];
            this.pageTotal = res.data.body.totalRecord;
            this.search.pageNumber = res.data.body.pageNumber;
          }
        })
      },
      handlePreview(row) {
        const _params = {
          applicationId: row.applicationId,
          status: row.status
        };
        api.getDownloadContractPreview(_params).then(res => {
          if (res.status === 200) {
            let data = res.data;
            this.contractRow = row
            this.dialogType = row.status
            this.contractDialog = true
            this.contractUrl = this.$createObjectURL(data);
          }
        })
      },
      handleCode() {
        if (this.disabledCode == true) {
          return false;
        }
        this.disabledCode = true
        const applicationId = {
          'applicationId': this.currentAppItem.applicationId
        }
        api.getContractMessageCode(applicationId).then((res) => {
          if (res.data.code === 200) {
            this.countDown(60);
          }
        }, res => {
          this.disabledCode = true;
          this.btnCountDown = '稍后再试';
          setTimeout(() => {
            this.disabledCode = false;
            this.btnCountDown = '获取短信验证码';
          }, 30000)
        })
      },

      countDown(sec) {
        if (sec >= 0) {
          this.disabledCode = true;
          this.btnCountDown = `剩余${sec}s`;
          this.codeInterval = setTimeout(() => {
            this.countDown(--sec);
          }, 1000)
        } else {
          this.disabledCode = false;
          this.btnCountDown = '获取短信验证码';
          this.codeInterval = null
        }
      },

      submitContractValidate() {
        if (this.contractMessageCode == '') {
          this.validateCode = true
        } else {
          api.ValidateContractMessageCode(this.contractMessageCode).then((res) => {
            if (res.data.code === 200) {
              this.putLoanApplicationSiging();
            }
          }, res => {
            this.$notify.error({
              title: '错误',
              message: '验证码错误，请重新填写验证码'
            });
          })
        }
      },
      closeValidateDialog() {
        this.validateDialog = false
        this.disabledCode = false
        this.disabledOperate = false
        this.validateCode = false
        this.contractMessageCode = ''
        window.clearTimeout(this.codeInterval)
        this.codeInterval=null
        this.btnCountDown = '获取短信验证码'
      },
      putLoanApplicationSiging() {
        this.disabledOperate = true
        api.putLoanApplicationSiging(this.currentAppItem).then(res => {
          if (res.data.code === 200) {
            this.$notify({
              title: '成功',
              message: '签约成功',
              type: 'success'
            });
            this.handleCloseRefuseDialog();
            this.getLoanApplicationList(1);
          } else {
            this.disabledOperate = false
            this.showRefuseSignDialog = true;
            this.isRefuseSuccess = false;
            this.doubleButton = false;
            this.disabledCode = false;
            this.btnCountDown = '获取短信验证码';
            this.codeInterval = null;
            this.refuseMessageInfo = res.data.message ? res.data.message : '签约失败，稍后再试';
          }
        }, response => {
          if (response.data.body) {
            let _msg = '';
            for (const key in response.data.message) {
              _msg += response.data.message[key] + ';  ';
            }
            this.refuseMessageInfo = _msg;
          } else {
            this.disabledOperate = true
            this.refuseMessageInfo = response.data.message ? response.data.message : '签约失败，稍后再试!';
          }
          this.showRefuseSignDialog = true;
          this.isRefuseSuccess = false;
          this.doubleButton = false;
        })
      },
      handleContract() {
        this.validateDialog = true
        this.dialogType = this.$enum.LOAN_BE_SIGN;
        this.currentAppItem = {
          applicationId: this.contractRow.applicationId,
          status: this.contractRow.status
        }
      },
      contractUrlEmpty() {
        this.contractUrl = ''
      },
      handleRefuseSigning(row) {
        this.dialogType = this.$enum.LOAN_REFUSING_SIGN;
        this.showRefuseSignDialog = true;
        this.isRefuseSuccess = false;
        this.refuseMessageInfo = '拒签是不可恢复操作，是否继续？';
        this.doubleButton = true;
        this.currentAppItem = {
          applicationId: row.applicationId,
          status: row.status
        }
      },
      putCancelLoanApplicationSiging() {
        api.putCancelLoanApplicationSiging(this.currentAppItem).then(res => {
          if (res.data.code === 200) {
            this.handleCloseRefuseDialog();
            this.getLoanApplicationList(1);
          } else {
            this.showRefuseSignDialog = true;
            this.isRefuseSuccess = false;
            this.doubleButton = false;
            this.refuseMessageInfo = res.data.message ? res.data.message : '操作失败，稍后再试';
          }
        }, response => {
          if (response.data.body) {
            let _msg = '';
            for (const key in response.data.body) {
              _msg += response.data.body[key] + ';  ';
            }
            this.refuseMessageInfo = _msg;
          } else {
            this.refuseMessageInfo = response.data.message ? response.data.message : '拒绝签约失败,请稍后再试!';
          }
          this.showRefuseSignDialog = true;
          this.isRefuseSuccess = false;
          this.doubleButton = false;
        })
      },
      handleSuccessRedirect() {
        if (this.dialogType === 'BE_SIGN') {
          this.putLoanApplicationSiging()
        } else if (this.dialogType === 'REFUSING_SIGN') {
          this.putCancelLoanApplicationSiging();
        }
      },
      handleCloseRefuseDialog() {
        this.showRefuseSignDialog = false;
        this.isRefuseSuccess = false;
        this.doubleButton = false;
        this.refuseMessageInfo = '';
        this.closeValidateDialog();
        this.contractRow = '';
        this.contractDialog = false;
        this.contractBtn = false;
      },
      handleGoDetail(row) {
        this.$router.push({
          name: 'usersLoanRecordDetailPage',
          params: {
            id: row.applicationId
          }
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" socped>
  .search-tabs-item .el-table .descending .sort-caret.descending {
    border-top-color: #ff8b01;
  }

  .search-tabs-item .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #ff8b01;
  }

  .signature .mj-message-box {
    z-index: 3300;
  }

  .contract-dialog {
    height: 90%;
    margin-top: 3%;
    text-align: center;
    overflow: hidden;
    .el-dialog{
      height:100%;
      .dialog-img-box {
        height: 650px;
        width: 100%;
        overflow-y: auto;
      }
      .dialog-contract-btn {
        width: 100%;
        background: #fff;
        position: absolute;
        bottom: 0px;
        left: 0px;
        padding-bottom:15px;
        .contract-btn {
          margin: 10px auto 0 auto;
          font-size: 16px;
          width: 120px;
        }
      }
    }
  }

  .validate-box {
    width: 90%;
    margin: 0 auto;
    font-size: 16px;
    p {
      display: inline-block;
      height: 45px;
      line-height: 45px;
      width: 100px;
      margin: 0 10px 10px 0;
      text-align: right;
    }
    .mr-code-get {
      border: none;
      width: 120px;
      height: 40px;
      line-height: 40px;
      background: #fe8c00;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      display: inline-block;
    }
    .mr-code-get.disabled-code {
      color: #fff;
      background: #ddd;
    }
  }

  .validateCode {
    font-size: 12px;
    color: #ff8b01;
    text-align: center;
    margin: 10px auto 0 auto;
  }

</style>
