<template>
  <div class="content credit-records">
    <mijin-header :is-white="true" :active-page="'usersAccountPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersCreditPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <section class="asset-mr02 no-top-margin credit-records-page">
            <div class="amr02-seach-inner">
              <div class="search-tabs-content">
                <div class="search-tabs-item">
                  <div class="amr02-search flex">
                    <el-form :model="search" class="amr02-flex flex">
                      <div>
                        <el-form-item label="申请日期">
                          <mj-date-picker-query v-model="appliedTime" :clearable="true"></mj-date-picker-query>
                        </el-form-item>
                      </div>
                      <div class="flex">
                        <el-form-item label="授信状态">
                          <mj-select
                            v-model="search.status"
                            :kind="$enum.CREDIT_STATUS"
                            :group="$enum.CREDIT_GROUP"
                            :clearable="true"
                          ></mj-select>
                        </el-form-item>
                        <div class="search-btn cursor" @click="handleSearchCreditDatas">搜索</div>
                      </div>
                    </el-form>
                  </div>

                  <el-table :data="accountCreditDatas" border style="width: 100%">
                    <el-table-column prop="applicationId" label="授信申请编号" align="center"></el-table-column>
                    <el-table-column prop="productName" label="产品名称" align="center"></el-table-column>
                    <el-table-column
                      prop="creditApplicationAmount"
                      align="center"
                      label="申请授信金额(元)"
                    ></el-table-column>
                    <el-table-column prop="creditAmount" align="center" label="审批授信金额(元)">
                      <template slot-scope="scope">
                        <span v-if="scope.row.status === 'PASS'">{{scope.row.creditAmount}}</span>
                        <span v-else>--</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="status"
                      align="center"
                      :formatter="(row, col, val) => (this.$filter(val, this.$enum.CREDIT_STATUS, this.$enum.CREDIT_GROUP))"
                      label="授信状态"
                    ></el-table-column>
                    <el-table-column prop="applicationTime" align="center" label="申请时间"></el-table-column>
                    <el-table-column align="center" prop="endDate" label="授信额度有效期">
                      <template slot-scope="scope">
                        <p>{{scope.row.startDate}} - {{scope.row.endDate}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                      <template slot-scope="scope">
                        <div class="operate" v-if="scope.row.needGuarantor">
                          <span @click="handleSeeGuarantee(scope.row)">查看担保信息</span>
                        </div>
                        <span v-else></span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </section>
          <section class="mj-pagination">
            <el-pagination
              layout="prev,pager, next,jumper"
              :total="pageTotal"
              :current-page="search.pageNumber"
              :page-size="search.pageSize"
              @current-change="handleChangePage"
            ></el-pagination>
          </section>
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <div class="users-message-confirm" v-if="showGuaranteeDialog">
      <div class="mask cursor" @click="showGuaranteeDialog = false;"></div>
      <section class="confirm-content gua-dialog-info">
        <header>
          <p>担保信息</p>
        </header>
        <div class="confirm-inner" v-if="guaranteeDetail.show === 2">
          <div class="flex-start">
            <label>关联授信编号:</label>
            <span>{{guaranteeDetail.creditId}}</span>
          </div>
          <div class="flex-start">
            <label>关联产品名称:</label>
            <span>{{guaranteeDetail.productName}}</span>
          </div>
          <div class="flex-start">
            <label>担保金额:</label>
            <span>{{guaranteeDetail.creditAmount}}</span>
          </div>
          <div class="flex-start">
            <label>担保人姓名:</label>
            <span>{{guaranteeDetail.guaranteeName}}</span>
          </div>
          <div class="flex-start">
            <label>担保人手机号:</label>
            <span>{{guaranteeDetail.guaranteeMobile}}</span>
          </div>
          <div class="flex-start">
            <label>担保人状态:</label>
            <span>{{$filter(guaranteeDetail.status, this.$enum.GUARANTEE_STATUS, this.$enum.GUARANTEE_GROUP)}}</span>
          </div>
          <div
            class="flex-start"
            v-if="guaranteeDetail.guaranteeProtocolUrl && guaranteeDetail.guaranteeProtocolUrl !==''"
          >
            <label>担保合同</label>
            <a :href="guaranteeDetail.guaranteeProtocolUrl" target="_blank">查看合同</a>
          </div>
          <div class="confirm-btns">
            <div
              class="cursor"
              v-if="guaranteeDetail.status === 'FAIL' || guaranteeDetail.status === 'REFUSE' || guaranteeDetail.status === 'INVALID' || guaranteeDetail.status === 'UNREGISTERED' || guaranteeDetail.status === 'BE_CERTIFIED'"
              @click="handleChangeGuarantor"
            >更换担保人</div>
            <div
              @click="showGuaranteeDialog = false;"
              class="gua-cancel cursor"
              style="margin-top: 20px;"
            >取消</div>
          </div>
        </div>
        <div class="confirm-inner" v-else-if="guaranteeDetail.show === 1">
          <div class="confirm-btns credit-records-btn">
            <div class="no-btn">暂无担保信息!</div>
            <!-- <div class="cursor" @click="handleGoAddGuarantor">添加担保人</div> -->
            <div @click="showGuaranteeDialog = false;creditAmount=''" class="gua-cancel cursor">取消</div>
          </div>
        </div>
        <div class="confirm-inner" v-else-if="guaranteeDetail.show === 0">
          <p class="credit-warnning-txt">授信已失效，无需添加担保信息!</p>
          <div class="confirm-btns credit-records-btn">
            <div @click="showGuaranteeDialog = false;" class="gua-cancel cursor">关闭</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import MijinLeftMenu from "./components/userLeft.vue";
import * as api from "../api/users";
export default {
  name: "usersCreditPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinLeftMenu
  },
  data() {
    return {
      activeItem: "first",
      showGuaranteeDialog: false,
      guaranteeDetail: {
        creditId: "",
        productName: "",
        creditAmount: "",
        guaranteeName: "",
        guaranteeMobile: "",
        status: "",
        guaranteeProtocolUrl: "",
        show: 2
      },
      currentCreditId: "",
      creditAmount: "",
      search: {
        minCreatedTime: "",
        maxCreatedTime: "",
        status: "",
        pageNumber: 1,
        pageSize: 10
      },
      pageTotal: 0,
      accountCreditDatas: []
    };
  },
  computed: {
    appliedTime: {
      get() {
        if (this.search.minCreatedTime && this.search.maxCreatedTime) {
          const dateRange = [];
          dateRange[0] = this.search.minCreatedTime;
          dateRange[1] = this.search.maxCreatedTime;
          return dateRange;
        } else {
          return null;
        }
      },
      set(val) {
        if (val) {
          this.search.minCreatedTime = val[0];
          this.search.maxCreatedTime = val[1];
        } else {
          this.search.minCreatedTime = "";
          this.search.maxCreatedTime = "";
        }
      }
    }
  },
  created() {
    this.getCreditApplicationList(1);
  },
  methods: {
    // handleGoAddGuarantor() {
    //   this.$router.push({
    //     name: "creditGuaranteePage",
    //     query: {
    //       pageName: "usersCreditPage",
    //       operateType: "Add",
    //       creditAmount: this.creditAmount
    //     }
    //   });
    // },
    handleSearchCreditDatas() {
      this.getCreditApplicationList(1);
    },
    handleChangePage(value) {
      this.getCreditApplicationList(value);
    },
    getCreditApplicationList(index) {
      const _search = this.$objFilter(
        this.$deepcopy(this.search),
        _ => _ !== ""
      );
      _search.pageNumber = index;
      api.getCreditApplicationList(_search).then(res => {
        if (res.data.code === 200) {
          this.accountCreditDatas = res.data.body.list
            ? res.data.body.list
            : [];
          this.pageTotal = res.data.body.totalRecord;
          this.search.pageNumber = res.data.body.pageNumber;
        }
      });
    },
    handleChangeGuarantor() {
      this.$router.push({
        name: "creditGuaranteePage",
        query: {
          pageName: "usersCreditPage",
          creditId: this.currentCreditId,
          creditAmount: this.creditAmount,
          operateType: "Change"
        }
      });
    },
    handleSeeGuarantee(row) {
      this.currentCreditId = row.applicationId;
      this.getGuaranteeDetail(row.applicationId);
      this.creditAmount = row.creditAmount;
      this.showGuaranteeDialog = true;
    },
    getGuaranteeDetail(creditId) {
      api.getGuaranteeDetail(creditId).then(res => {
        if (res.data.code === 200) {
          this.guaranteeDetail = res.data.body;
          this.guaranteeDetail.show = res.data.body.show;
        }
      });
    }
    // tableRowClassName({ row, rowIndex }) {
    //   if (rowIndex === 1) {
    //     return "warning-row";
    //   } else if (rowIndex === 3) {
    //     return "success-row";
    //   }
    //   return "";
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.credit-records-page {
  padding-top: 20px;
}
.confirm-inner {
  .credit-warnning-txt {
    text-align: center;
    line-height: 60px;
  }
}
</style>
