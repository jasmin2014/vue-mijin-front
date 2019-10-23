<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'usersAccountPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content flex-start">
        <div class="main-left">
          <mijin-left-menu :active-index="0" :page-name="'usersAssetPage'"></mijin-left-menu>
        </div>
        <div class="main-right mr-recharge">
          <h3>存管账户提现</h3>
          <div class="mr-recharge-content cunguan-recharge-content">
            <el-form
              ref="authBankForm"
              :model="authBankInfo"
              label-width="150px"
              :rules="rechargeFormRules"
            >
              <el-form-item label="存管绑定银行卡：">
                <div class="flex mr-recharge-card">
                  <p>
                    <b class="txt-bankname">{{CGBankValue.bankName}}</b>
                  </p>
                  <p>
                    <b>{{CGBankValue.bankCardNo}}</b>
                  </p>
                </div>
              </el-form-item>
              <el-form-item label="可提现金额：">
                <p>{{CGBankValue.availableBalance}}</p>
              </el-form-item>
              <el-form-item label="提现金额：" prop="amount" class="ava-lable">
                <mj-input v-model="authBankInfo.amount"></mj-input>
                <p class="all-withdraw cursor" @click="handleWithdrawAll">全部提现</p>
              </el-form-item>
            </el-form>
            <div class="dep-widthdraw-limit">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <th>提现时间</th>
                  <th>时间段</th>
                  <th>单笔额度（个人/企业）</th>
                  <th>到账时间</th>
                </tr>
                <tr v-for="(item,index) in LimitData" :key="index">
                  <td>{{item.workTime}}</td>
                  <td>{{item.timeArea}}</td>
                  <td>{{item.amount}}</td>
                  <td>{{item.arriveTime}}</td>
                </tr>
              </table>
            </div>
            <div class="step-btns dep-btns ava-btn">
              <div class="mj-button orange step-btn-next cursor" @click="handleSubmitWithDraw">提现</div>
              <p class="dep-with-wraning">*存管业务由泰然金融提供相关支持</p>
            </div>
          </div>
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
export default {
  name: "usersDepWithdrawPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinLeftMenu
  },
  data() {
    return {
      LimitData: [
        {
          workTime: "工作日",
          timeArea: "0:00-17:00",
          amount: ">0万",
          arriveTime: "两小时内"
        },
        {
          workTime: "工作日",
          timeArea: "17:00-24:00",
          amount: "<=5万",
          arriveTime: "两小时内"
        },
        {
          workTime: "非工作日",
          timeArea: "0:00-24:00",
          amount: "<=50万",
          arriveTime: "两小时内"
        }
      ],
      authBankInfo: {
        amount: ""
      },
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
        ]
      },
      CGBankValue: {
        bankName: "",
        bankCardNo: "",
        availableBalance: ""
      }
    };
  },
  created() {
    this.getCGInfo();
  },
  methods: {
    getCGInfo() {
      api.getCGInfo().then(response => {
        if (response.data.code == 200) {
          this.CGBankValue.bankName =
            response.data.body && response.data.body.bankName
              ? response.data.body.bankName
              : "";
          this.CGBankValue.bankCardNo =
            response.data.body && response.data.body.bankCardNo
              ? response.data.body.bankCardNo
              : "";
          this.CGBankValue.availableBalance =
            response.data.body && response.data.body.availableBalance
              ? response.data.body.availableBalance
              : "0";
        }
      });
    },
    handleWithdrawAll() {
      this.authBankInfo.amount = this.CGBankValue.availableBalance;
    },
    handleSubmitWithDraw() {
      this.$refs["authBankForm"].validate(valid => {
        if (valid) {
          api
            .postWithdrawXiAn(this.authBankInfo.amount)
            .then(response => {
              if (
                response.data.code == 200 &&
                response.data.body &&
                response.data.body != ""
              ) {
                this.$alert("您即将跳转到银行页面进行提现操作", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {
                    window.open(response.data.body);
                  }
                });
              }
            })
            .catch(Error => {
              this.$confirm(Error.data.message, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                closeOnClickModal: false,
                closeOnPressEscape: false
              });
            });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.step-btns .mj-button.is-disable {
  background: #ccc;
}
.all-withdraw {
  position: absolute;
  right: 10px;
  top: 0;
  color: orange;
}
.dep-with-wraning {
  color: orange;
  margin-top: 15px;
  font-size: 14px;
}
.dep-btns {
  width: 300px;
  margin-left: 130px;
}
.mr-recharge-content.cunguan-recharge-content {
  .el-form {
    width: 520px;
  }
  .dep-widthdraw-limit {
    width: 600px;
    table {
      border-top: 1px solid #dcdfe6;
      border-left: 1px solid #dcdfe6;
      tr {
        th,
        td {
          border-bottom: 1px solid #dcdfe6;
          border-right: 1px solid #dcdfe6;
          line-height: 30px;
          font-size: 14px;
          text-align: center;
        }
        th {
          background: #fff2e8;
          color: #ff7301;
          font-weight: normal;
        }
      }
    }
  }
}
.mr-recharge-content .step-btns.ava-btn {
  margin-top: 60px;
  margin-left: 160px;
}
</style>
