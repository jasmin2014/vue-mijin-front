<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.no-open {
  width: 100%;
  height: 140px;
  background: #fff;
  text-align: center;
  line-height: 140px;
}
.whitebg {
  background: #fff;
}
</style>
<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'usersAccountPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersAssetPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <section class="asset-mr01 flex whitebg" v-if="centerFlag == '1'">
            <div class="asset-bb-inner">
              <h3>米今绑卡信息</h3>
              <div class="asset-bankbind">
                <span
                  class="banklogo"
                  :style="'background:url('+accountInfo.bankLogoPic+') no-repeat center center;'"
                ></span>
                <div>
                  <p class="bankname">
                    {{accountInfo.bankName}}
                    <!-- <span v-if="accountInfo.accountType === 0">对私</span><span v-if="accountInfo.accountType === 1">对公</span> -->
                  </p>
                  <p class="bankinfo">
                    <label>银行卡号：</label>
                    {{accountInfo.bankCardNo}}
                  </p>
                  <p class="bankinfo">
                    <label>银行预留手机号：</label>
                    {{accountInfo.bankMobile}}
                  </p>
                </div>
                <div class="mr02-btn asset-bb-btns cursor" @click="handleToChangeBank">更换银行卡</div>
              </div>
            </div>
          </section>
          <section class="asset-mr01 flex whitebg" v-else>
            <div class="asset-bb-inner">
              <h3>米今绑卡信息</h3>
              <div class="asset-bankbind">
                <span class="bank-default-icon"></span>
              </div>
              <div class="mr02-btn asset-bb-btns cursor" @click="getBindStatus">绑定银行卡</div>
            </div>
          </section>

          <!--存管账户信息-->
          <section class="asset-mr01 flex mt20 whitebg" v-if="xaFlag == '1'">
            <div class="asset-bb-inner">
              <h3>银行存管账户信息</h3>
              <div class="asset-bankbind">
                <span>
                  <img src="../../assets/imgs/xian_band.png">
                </span>
                <div class="mr20">
                  <p class="bankinfo">
                    <label>电子账户：</label>
                    {{xaInfo.custNo}}
                  </p>
                  <p class="bankinfo">
                    <label>存管绑定银行卡：</label>
                    {{xaInfo.bankCardNo}}
                  </p>
                  <p class="bankinfo">
                    <label>可提现金额：{{xaInfo.availableBalance}}</label>
                  </p>
                </div>
                <div>
                  <p class="bankinfo">
                    <label>账户性质：</label>
                    {{xaInfo.accountType == 0 ? '个人':'对公'}}
                  </p>
                  <p class="bankinfo">
                    <label>所属银行：</label>
                    {{xaInfo.bankName}}
                  </p>
                  <p class="bankinfo">
                    <label>已冻结金额：{{xaInfo.freezeAmount}}</label>
                  </p>
                </div>
              </div>
              <div class="mr02-btn asset-bb-btns cursor" @click="handleCGWithdraw">提现</div>
            </div>
          </section>
          <!-- <section class="asset-mr01 flex mt20" v-else-if="xaFlag == '0'">
            <div class="asset-bb-inner">
              <h3>银行存管账户信息</h3>
              <div class="asset-bankbind">
                <span class="bank-cg-default-icon"></span>  
                <div class="asset-bb-blank">您尚未开通存管账户,请在完成银行卡绑定后进行存管开户!</div>              
              </div> 
              <div class="mr02-btn asset-bb-btns cursor" @click="handleOpenCunguan">开通存管账户</div>           
            </div>
          </section>-->
          <section class="asset-mr01 flex mt20 whitebg" v-else-if="xaFlag == '2'">
            <div class="asset-bb-inner">
              <h3>银行存管账户信息</h3>
              <div class="asset-bankbind">
                <span class="bank-cg-default-icon"></span>
                <div class="asset-bb-blank">
                  <b>您的存管账户资料正在审核中...</b>
                </div>
              </div>
            </div>
          </section>
          <section class="asset-mr01 flex mt20 whitebg" v-else-if="xaFlag == '3'">
            <div class="asset-bb-inner">
              <h3>银行存管账户信息</h3>
              <div class="asset-bankbind">
                <span class="bank-cg-default-icon"></span>
                <div class="xian-success">
                  <p class="asset-bb-blank">
                    <b>您的存管账户资料已审核通过!</b>
                  </p>
                  <!-- <p class="xian-suc-txt">提示:您即将跳转至西安存管银行页面进行开户操作。</p>
                  <p class="xian-suc-txt">西安银行控件支持的浏览器：IE8、9、10，谷歌50以下版本。</p>-->
                </div>
              </div>
              <div class="mr02-btn asset-bb-btns cursor" @click="handleOpenPublic">去开户</div>
            </div>
          </section>
          <section class="asset-mr01 flex mt20 whitebg" v-else-if="xaFlag == '4'">
            <div class="asset-bb-inner">
              <h3>银行存管账户信息</h3>
              <div class="asset-bankbind">
                <span class="bank-cg-default-icon"></span>
                <div class="asset-bb-blank">
                  <b>您的存管账户待激活!</b>
                  <p class="active-msg">请线下给您西安银行账户打款以激活账户!</p>
                </div>
              </div>
            </div>
          </section>
          <section class="asset-mr02">
            <h3>资金流水</h3>
            <div class="amr02-search flex">
              <el-form :model="search" class="amr02-flex flex">
                <div>
                  <el-form-item label="日期">
                    <mj-date-picker-query v-model="appliedTime" :clearable="true"></mj-date-picker-query>
                  </el-form-item>
                </div>
                <div class="flex">
                  <el-form-item label="交易类型">
                    <mj-select
                      v-model="search.feeType"
                      :kind="$enum.FEE_TYPE"
                      :group="$enum.FEE_TYPE"
                      :sequence="[0,1,2,3,8,12,14,19,22,23,24]"
                      :clearable="true"
                    ></mj-select>
                  </el-form-item>
                  <div class="search-btn cursor" @click="handleSeachDatas">搜索</div>
                </div>
              </el-form>
            </div>
            <div class="amr02-seach-inner">
              <div class="search-tabs-header flex">
                <div
                  :class="{'search-tab-active': activeItem === 'first'}"
                  class="cursor"
                  @click="handleChangeDatas('first')"
                >资金流水1</div>
                <div
                  :class="{'search-tab-active': activeItem === 'second'}"
                  class="cursor"
                  @click="handleChangeDatas('second')"
                >资金流水2</div>
                <div
                  :class="{'search-tab-active': activeItem === 'three'}"
                  @click="handleChangeDatas('three')"
                >资金流水3</div>
              </div>
              <div class="search-tabs-content">
                <div class="search-tabs-item" v-if="activeItem === 'first'">
                  <el-table :data="assetAccountDatas" border style="width: 100%">
                    <el-table-column prop="successTime" label="交易成功时间" align="center" width="180"></el-table-column>
                    <el-table-column prop="flowId" label="流水号" align="center" width="180"></el-table-column>
                    <el-table-column prop="feeTypeName" align="center" label="类型"></el-table-column>
                    <el-table-column prop="transAmount" align="center" label="收入（元）">
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.flowType === 1"
                          :class="{'warning-row': scope.row.flowType === 1}"
                        >{{scope.row.transAmount}}</span>
                        <span v-else>---</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="transAmount" align="center" label="支出（元）">
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.flowType === 0"
                          :class="{'warning-row': scope.row.flowType === 0}"
                        >{{scope.row.transAmount}}</span>
                        <span v-else>---</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <section class="mj-pagination">
                    <el-pagination
                      layout="prev,pager, next,jumper"
                      :total="assetPageTotal"
                      :current-page="search.pageNumber"
                      :page-size="search.pageSize"
                      @current-change="getAssetFlowRecords"
                    ></el-pagination>
                  </section>
                </div>
                <div class="search-tabs-item" v-else-if="activeItem === 'second'">
                  <el-table :data="assetDepositDatas" border style="width: 100%">
                    <el-table-column prop="successTime" label="交易成功时间" align="center" width="180"></el-table-column>
                    <el-table-column prop="flowId" label="流水号" align="center" width="180"></el-table-column>
                    <el-table-column prop="feeTypeName" align="center" label="类型"></el-table-column>
                    <el-table-column prop="transAmount" align="center" label="收入（元）">
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.flowType === 1"
                          :class="{'warning-row': scope.row.flowType === 1}"
                        >{{scope.row.transAmount}}</span>
                        <span v-else>---</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="transAmount" align="center" label="支出（元）">
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.flowType === 0"
                          :class="{'warning-row': scope.row.flowType === 0}"
                        >{{scope.row.transAmount}}</span>
                        <span v-else>---</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <section class="mj-pagination">
                    <el-pagination
                      layout="prev,pager, next,jumper"
                      :total="depositPageTotal"
                      :current-page="search.pageNumber"
                      :page-size="search.pageSize"
                      @current-change="handleChangeDepositPage"
                    ></el-pagination>
                  </section>
                </div>
                <div class="search-tabs-item" v-else-if="activeItem === 'three'">
                  <el-table :data="assetDepositDatas3" border style="width: 100%">
                    <el-table-column prop="successTime" label="交易成功时间" align="center" width="180"></el-table-column>
                    <el-table-column prop="flowId" label="流水号" align="center" width="180"></el-table-column>
                    <el-table-column prop="feeTypeName" align="center" label="类型"></el-table-column>
                    <el-table-column prop="transAmount" align="center" label="收入（元）">
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.flowType === 1"
                          :class="{'warning-row': scope.row.flowType === 1}"
                        >{{scope.row.transAmount}}</span>
                        <span v-else>---</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="transAmount" align="center" label="支出（元）">
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.flowType === 0"
                          :class="{'warning-row': scope.row.flowType === 0}"
                        >{{scope.row.transAmount}}</span>
                        <span v-else>---</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <section class="mj-pagination">
                    <el-pagination
                      layout="prev,pager, next,jumper"
                      :total="depositPageTotal3"
                      :current-page="search.pageNumber"
                      :page-size="search.pageSize"
                      @current-change="handleChangeDepositPage3"
                    ></el-pagination>
                  </section>
                </div>
              </div>
            </div>
          </section>
          <!--<section class="mj-pagination">
            <el-pagination
              @current-change="getAssetFlowRecords"
              :current-page.sync="search.pageNumber"
              :page-size="search.pageSize"
              layout="prev, pager, next, jumper"
              :total="pageTotal">
            </el-pagination>
          </section>-->
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import MijinLeftMenu from "./components/userLeft.vue";
import * as api from "../api/users";
import { getBankLogo } from "../api/account.js";
// import openTip from "../src/mixins/openTip.js";
export default {
  name: "usersAssetPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinLeftMenu
  },
  data() {
    return {
      centerFlag: "0",
      xaFlag: "0",
      xaOpenUrl: "",
      depositPageTotal3: 0,
      assetDepositDatas3: [],
      xaInfo: {
        custNo: "",
        bankCardNo: "",
        availableBalance: "",
        freezeAmount: "",
        accountType: "",
        bankName: ""
      },
      accountInfo: {
        bankCode: "",
        bankLogoPic: "",
        fundsStatus: 0,
        accountType: 0,
        bankName: "",
        bankCardNo: "",
        availableBalance: 0,
        freezeAmount: 0,
        status: 0,
        bankMobile: ""
      },
      activeItem: "first",
      search: {
        successTimeB: "",
        successTimeE: "",
        pageNumber: 1,
        pageSize: 10,
        feeType: ""
      },
      assetPageTotal: 0,
      depositPageTotal: 0,
      assetAccountDatas: [],
      assetDepositDatas: []
    };
  },
  computed: {
    appliedTime: {
      get() {
        if (this.search.successTimeB && this.search.successTimeE) {
          const dateRange = [];
          dateRange[0] = this.search.successTimeB;
          dateRange[1] = this.search.successTimeE;
          return dateRange;
        } else {
          return null;
        }
      },
      set(val) {
        if (val) {
          this.search.successTimeB = val[0];
          this.search.successTimeE = val[1];
        } else {
          this.search.successTimeB = "";
          this.search.successTimeE = "";
        }
      }
    }
  },
  created() {
    this.getAccountBankInfo();
    this.getAssetFlowRecords(1);
    this.getAssetDepositRecords(1);
    this.getAssetLawcertRecords(1);
  },
  methods: {
    initSearch() {
      this.search.successTimeB = "";
      this.search.successTimeE = "";
      this.search.pageNumber = 1;
      this.search.pageSize = 10;
      this.search.feeType = "";
    },
    /** 资金流水tab切换标签修改**/
    handleChangeDatas(active) {
      this.activeItem = active;
      this.initSearch();
      this.handleSeachDatas();
    },
    /**===========我的账户-资金管理-存管账户提现==============**/
    handleCGWithdraw() {
      this.$router.push({ name: "usersDepWithdrawPage" });
    },
    /**===========我的账户- 资金管理-资金流水接口调用==============**/
    getAssetFlowRecords(index) {
      const _search = this.$objFilter(
        this.$deepcopy(this.search),
        _ => _ !== ""
      );
      _search.pageNumber = index;
      api.getAssetFlowRecords(_search).then(
        res => {
          if (res.data.code === 200) {
            this.assetAccountDatas = res.data.body.list || [];
            this.assetPageTotal = res.data.body.totalRecord;
            this.search.pageNumber = res.data.body.pageNumber;
          } else {
            this.list = [];
            this.assetPageTotal = 0;
          }
        },
        () => {
          this.list = [];
          this.assetPageTotal = 0;
        }
      );
    },
    /**==========我的账户-资金管理-资金存管接口调通===========**/
    getAssetDepositRecords(index) {
      const _search = this.$objFilter(
        this.$deepcopy(this.search),
        _ => _ !== ""
      );
      _search.pageNumber = index;

      /**==========我的账户-资金管理-资金存管接口调通===========**/

      api.getAssetDepositRecords(_search).then(
        res => {
          if (res.data.code === 200) {
            this.assetDepositDatas = res.data.body.list || [];
            if (res.data.body.totalRecord && res.data.body.totalRecord !== 0) {
              this.depositPageTotal = res.data.body.totalRecord;
              this.search.pageNumber = res.data.body.pageNumber;
            }
          } else {
            this.list = [];
            this.depositPageTotal = 0;
          }
        },
        () => {
          this.list = [];
          this.depositPageTotal = 0;
        }
      );
    },
    /**============================*/
    getAssetLawcertRecords(index) {
      const _search = this.$objFilter(
        this.$deepcopy(this.search),
        _ => _ !== ""
      );
      _search.pageNumber = index;
      api.getAssetLawcertRecords(_search).then(res => {
        if (res.data.code === 200) {
          this.assetDepositDatas3 = res.data.body.list || [];
          if (res.data.body.totalRecord && res.data.body.totalRecord !== 0) {
            this.depositPageTotal3 = res.data.body.totalRecord;
            this.search.pageNumber = res.data.body.pageNumber;
          }
        } else {
          this.list = [];
          this.depositPageTotal = 0;
        }
      });
    },
    handleSeachDatas() {
      if (this.activeItem === "first") {
        this.getAssetFlowRecords(1);
      } else if (this.activeItem === "second") {
        this.getAssetDepositRecords(1);
      } else if (this.activeItem === "three") {
        this.getAssetLawcertRecords(1);
      }
    },
    /**=========资金流水2分页事件调用===========**/
    handleChangeDepositPage(value) {
      this.getAssetDepositRecords(value);
    },
    handleChangeDepositPage3(value) {
      this.getAssetLawcertRecords(value);
    },

    /**==========资金信息获取接口调用============**/
    getAccountBankInfo() {
      api.getAccountBankInfo().then(res => {
        if (res.data.code === 200) {
          let _mydata = res.data.body.centerInfo;
          this.centerFlag = res.data.body.centerFlag;
          this.accountInfo = _mydata;

          if (_mydata.bankCode) {
            this.getBankLogoPic(_mydata.bankCode);
          }

          this.xaFlag = res.data.body.xaFlag;
          this.xaOpenUrl = res.data.body.xaOrgOpenUrl;
          let xaData = res.data.body.xaInfo;
          if (res.data.body.xaFlag == "1" && xaData) {
            this.xaInfo = xaData;
          }
        }
      });
    },
    /**=============根据银行卡的code获取银行卡的logo相关信息=============**/
    getBankLogoPic(bankCode) {
      getBankLogo(bankCode).then(response => {
        if (response.data.code == 200) {
          this.accountInfo.bankLogoPic = response.data.body.appLogo;
        }
      });
    },
    /**===========去开户按钮-对公==============**/
    handleOpenPublic() {
      if (this.xaOpenUrl && this.xaOpenUrl !== "") {
        this.$confirm(
          "您即将跳转至西安存管银行页面进行开户操作。西安银行控件支持的浏览器：IE8、9、10，谷歌50以下版本。",
          "提示",
          {
            confirmButtonText: "确定",
            type: "warning",
            closeOnClickModal: false,
            closeOnPressEscape: false
          }
        ).then(() => {
          var tempOpenPage = window.open("", "_blank");
          tempOpenPage.location = this.xaOpenUrl;
        });
      }
    },
    handleToChangeBank() {
      this.$router.push({
        name: "userBindBankPage",
        query: { fromPageName: "usersAssetPage", pageType: "changeBank" }
      });
    },
    /**==========去绑定银行卡事件==========**/
    getBindStatus() {
      api
        .getBindStatus()
        .then(response => {
          if (response.data.code == 200) {
            this.$router.push({
              name: "userBindBankPage",
              query: { fromPageName: "usersAssetPage", pageType: "bindBank" }
            });
          }
        })
        .catch(Error => {
          this.$confirm(Error.data.message, "提示", {
            confirmButtonText: "确定",
            type: "warning",
            closeOnClickModal: false,
            closeOnPressEscape: false
          });
        });
    },
    /** =========开通存管账户=========**/
    handleOpenCunguan() {
      api
        .gettCheckOpenStatus()
        .then(response => {
          if (response.data.code == 200) {
            if (!response.data.body.bankBind) {
              this.$confirm("您还没有绑定银行卡,不能开存管户,去绑卡?", "提示", {
                confirmButtonText: "去绑卡",
                type: "warning",
                closeOnClickModal: false,
                closeOnPressEscape: false
              }).then(() => {
                this.getBindStatus();
              });
            } else {
              if (response.data.body.xiAnStatus == "0") {
                if (response.data.body.accountType == "-1") {
                  this.$router.push({ name: "userChooseTypePage" });
                } else if (response.data.body.accountType == "0") {
                  this.$router.push({ name: "usersOpenPrivatePage" });
                } else if (response.data.body.accountType == "1") {
                  this.$router.push({ name: "usersOpenPublicPage" });
                }
              } else if (response.data.body.xiAnStatus == "2") {
                this.$confirm("您的存管账户资料审核中!", "提示", {
                  confirmButtonText: "确定",
                  type: "warning",
                  closeOnClickModal: false,
                  closeOnPressEscape: false
                });
              }
            }
          }
        })
        .catch(Error => {
          this.$confirm(Error.data.message, "提示", {
            confirmButtonText: "确定",
            type: "warning",
            closeOnClickModal: false,
            closeOnPressEscape: false
          });
        });
    }
  }
};
</script>


