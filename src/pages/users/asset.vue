<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'usersAccountPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersAssetPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <section class="asset-mr01 no-open" v-if="accountInfo.fundsStatus == 0">
            您暂未开通资金账户
          </section>
          <section class="asset-mr01 flex" v-else-if="accountInfo.fundsStatus == 1">
            <div>
              <p class="bankname"><!--<span class="sprites cmb"></span>-->{{accountInfo.bankName}}<span v-if="accountInfo.accountType === 0">对私</span><span v-if="accountInfo.accountType === 1">对公</span></p>
              <!--<p><label>{{accountInfo.bankName}}</label> <span v-if="accountInfo.accountType === 0">对私</span><span v-if="accountInfo.accountType === 1">对公</span></p>-->
              <p><label>卡号</label> {{accountInfo.bankCardNo}}</p>
            </div>
            <div>
              <h3>资金账户</h3>
              <div class="amr01-rig-item flex">
                <div>
                  <p>账户可用余额（元）</p>
                  <p>{{accountInfo.availableBalance}}</p>
                </div>
                <div>
                  <p>冻结金额（元）</p>
                  <p>{{accountInfo.freezeAmount}}</p>
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
                    <mj-select v-model="search.feeType" :kind="$enum.FEE_TYPE" :group="$enum.FEE_TYPE" :sequence="[0,1,2,3,8,12,13,14]"  :clearable="true"></mj-select>
                  </el-form-item>
                  <div class="search-btn cursor" @click="handleSeachDatas">搜索</div>
                </div>
              </el-form>
            </div>
            <div class="amr02-seach-inner">
              <div class="search-tabs-header flex">
                <div :class="{'search-tab-active': activeItem === 'first'}" class="cursor" @click="activeItem = 'first';">资金流水1</div>
                <div :class="{'search-tab-active': activeItem === 'second'}" class="cursor" @click="activeItem = 'second';">资金流水2</div>
              </div>
              <div class="search-tabs-content">
                <div class="search-tabs-item" v-if="activeItem === 'first'">
                  <el-table
                    :data="assetAccountDatas"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="successTime"
                      label="交易成功时间"
                      align="center"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="flowId"
                      label="流水号"
                      align="center"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="feeTypeName"
                      align="center"
                      label="类型">
                    </el-table-column>
                    <el-table-column
                      prop="transAmount"
                      align="center"
                      label="收入（元）">
                      <template slot-scope="scope">
                        <span v-if="scope.row.flowType === 1" :class="{'warning-row': scope.row.flowType === 1}">{{scope.row.transAmount}}</span>
                        <span v-else>---</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="transAmount"
                      align="center"
                      label="支出（元）">
                      <template slot-scope="scope">
                        <span v-if="scope.row.flowType === 0" :class="{'warning-row': scope.row.flowType === 0}">{{scope.row.transAmount}}</span>
                        <span v-else>---</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <section class="mj-pagination">
                    <el-pagination layout="prev,pager, next,jumper" :total="assetPageTotal" :current-page="search.pageNumber" :page-size="search.pageSize"
                                   @current-change="getAssetFlowRecords"></el-pagination>
                  </section>
                </div>
                <div class="search-tabs-item" v-else-if="activeItem === 'second'">
                  <el-table
                    :data="assetDepositDatas"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="successTime"
                      label="交易成功时间"
                      align="center"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="flowId"
                      label="流水号"
                      align="center"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="feeTypeName"
                      align="center"
                      label="类型">
                    </el-table-column>
                    <el-table-column
                      prop="transAmount"
                      align="center"
                      label="收入（元）">
                      <template slot-scope="scope">
                        <span v-if="scope.row.flowType === 1" :class="{'warning-row': scope.row.flowType === 1}">{{scope.row.transAmount}}</span>
                        <span v-else>---</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="transAmount"
                      align="center"
                      label="支出（元）">
                      <template slot-scope="scope">
                        <span v-if="scope.row.flowType === 0" :class="{'warning-row': scope.row.flowType === 0}">{{scope.row.transAmount}}</span>
                        <span v-else>---</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <section class="mj-pagination">
                    <el-pagination layout="prev,pager, next,jumper" :total="depositPageTotal" :current-page="search.pageNumber" :page-size="search.pageSize"
                                   @current-change="handleChangeDepositPage"></el-pagination>
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
  import MijinHeader from '../../components/header.vue';
  import MijinFootter from '../../components/footter.vue';
  import MijinLeftMenu from './components/userLeft.vue';
  import * as api from '../api/users';
  export default {
    name: 'usersAssetPage',
    components: {
      MijinHeader,
      MijinFootter,
      MijinLeftMenu
    },
    data () {
      return {
        accountInfo: {
          fundsStatus: 0,
          accountType: 0,
          bankName: '',
          bankCardNo: '',
          availableBalance: 0,
          freezeAmount: 0,
          status: 0
        },
        activeItem:'first',
        search: {
          successTimeB: '',
          successTimeE: '',
          pageNumber: 1,
          pageSize: 10,
          feeType: ''
        },
        assetPageTotal: 0,
        depositPageTotal: 0,
        assetAccountDatas: [],
        assetDepositDatas: []
      }
    },
    computed: {
      appliedTime: {
        get() {
          if (this.search.successTimeB && this.search.successTimeE) {
            const dateRange = [];
            dateRange[0] = this.search.successTimeB;
            dateRange[1] = this.search.successTimeE;
            return dateRange
          } else {
            return null;
          }
        },
        set(val) {
          if (val) {
            this.search.successTimeB = val[0];
            this.search.successTimeE = val[1]
          } else {
            this.search.successTimeB = '';
            this.search.successTimeE = ''
          }
        }
      }
    },
    created(){
      this.getAccountBankInfo();
      this.getAssetFlowRecords(1);
      this.getAssetDepositRecords(1)
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      getAssetFlowRecords(index){
        const _search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        _search.pageNumber = index;

        /**===========我的账户- 资金管理-资金流水接口调用==============**/
        api.getAssetFlowRecords(_search).then(res => {
          if(res.data.code === 200) {
            this.assetAccountDatas = res.data.body.list || [];
            this.assetPageTotal = res.data.body.totalRecord;
            this.search.pageNumber = res.data.body.pageNumber;
          }else{
            this.list = [];
            this.assetPageTotal = 0;
          }
        },() => {
          this.list = [];
          this.assetPageTotal = 0;
        })
      },
      /*handleChangeAssetsPage(value){
        this.getAssetFlowRecords(value);
      },*/
      getAssetDepositRecords(index){
        const _search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        _search.pageNumber = index;

        /**==========我的账户-资金管理-资金存管接口调通===========**/
        api.getAssetDepositRecords(_search).then(res => {
          if(res.data.code === 200) {
            this.assetDepositDatas = res.data.body.list || [];
            if(res.data.body.totalRecord && res.data.body.totalRecord !== 0) {
              this.depositPageTotal = res.data.body.totalRecord;
              this.search.pageNumber = res.data.body.pageNumber;
            }
          }else{
            this.list = [];
            this.depositPageTotal = 0;
          }
        },() => {
          this.list = [];
          this.depositPageTotal = 0;
        })
      },
      handleChangeDepositPage(value){
        this.getAssetDepositRecords(value);
      },
      getAccountBankInfo(){
        api.getAccountBankInfo().then(res => {
          if(res.data.code === 200) {
            this.accountInfo.fundsStatus = res.data.body.fundsStatus;
            this.accountInfo.accountType = res.data.body.accountType;
            this.accountInfo.bankName = res.data.body.bankName ? res.data.body.bankName : '';
            this.accountInfo.bankCardNo = res.data.body.bankCardNo ? res.data.body.bankCardNo: '';
            this.accountInfo.availableBalance = res.data.body.availableBalance ? res.data.body.availableBalance : 0;
            this.accountInfo.freezeAmount = res.data.body.freezeAmount ? res.data.body.freezeAmount : 0;
            this.accountInfo.status = res.data.body.status ? res.data.body.status : 0
          };
        })
      },
      handleSeachDatas() {
        console.log("this.activeItem:",this.activeItem);
        if(this.activeItem === 'first'){
          this.getAssetFlowRecords(1);
        }else if(this.activeItem === 'second'){
          this.getAssetDepositRecords(1);
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .no-open{
    width: 100%;
    height: 140px;
    background: #fff;
    text-align: center;
    line-height: 140px;
  }
</style>
