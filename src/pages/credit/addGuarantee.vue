<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'QuotaPage'"></mijin-header>
    <div class="credit-content">
      <div class="main-content credit-form">
        <h3 v-if="pageFromName === 'usersCreditPage' && operateType === 'Change'">更换担保人</h3>
        <h3 v-else>添加担保人</h3>
        <div class="credit-form-inner credit-form-guarantee">
          <div class="credit-form-toptext">
            <p
              v-if="pageFromName === 'usersCreditPage' && operateType === 'Change'"
              style="height: 40px;width: 100px;"
            ></p>
            <!-- <p v-else>您的授信额度超过20万，需添加担保人信息！</p> -->
          </div>
          <el-form
            ref="guaranteeForm"
            :model="guaranteeForm"
            label-width="150px"
            :rules="guaranteeFormRules"
          >
            <el-form-item label="担保人姓名：" prop="guaranteeName">
              <mj-input v-model="guaranteeForm.guaranteeName"></mj-input>
            </el-form-item>
            <el-form-item label="担保人手机号：" prop="guaranteeMobile">
              <mj-input v-model="guaranteeForm.guaranteeMobile"></mj-input>
            </el-form-item>
            <div class="step-btns">
              <div class="mj-button orange step-btn-next cursor" @click="handleAddGuarantee">提交</div>
              <p class="gurantee-tip">注：担保人需以此手机号在米今注册，进行认证并签订担保协议。 若您无法提供担保人，请联系客服。</p>
              <!--<mj-button text="提交" height="38" type="orange" class="step-btn-next"></mj-button>-->
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <mijin-dialog
      v-show="showOpenDialog"
      :is-success="isOpenSuccess"
      :message="messageOpenInfo"
      :double-button="doubleButton"
      :ok-button-name="okButtonName"
      @ok="handleRedirectOpen"
      @close="handleNoOpenClose"
    ></mijin-dialog>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import MijinDialog from "../../components/dialogBox.vue";
import * as api from "../api/account";
import * as userApi from "../api/users";
export default {
  name: "creditGuaranteePage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinDialog
  },
  data() {
    return {
      showOpenDialog: false,
      isOpenSuccess: false,
      messageOpenInfo: "",
      doubleButton: false,
      okButtonName: "去开户",
      guaranteeForm: {
        guaranteeMobile: "",
        guaranteeName: ""
      },
      currentcreditId: this.$route.query.creditId,
      pageFromName: this.$route.query.pageName,
      operateType: this.$route.query.operateType,
      accountType: "",
      guaranteeFormRules: {
        guaranteeMobile: [
          { required: true, message: "请输入担保人手机号", trigger: "blur" },
          {
            pattern: this.$valid.userCenterPhone,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        guaranteeName: [
          { required: true, message: "请输入担保人姓名", trigger: "blur" },
          {
            pattern: this.$valid.errorChar,
            min: 2,
            max: 20,
            message: "2～20个字，不可输入特殊字符和空格",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    handleNoOpenClose() {
      this.messageOpenInfo = "";
      this.showOpenDialog = false;
      this.isOpenSuccess = false;
      this.doubleButton = false;
      this.okButtonName = "确定";
    },
    getOpennedStatus(callback) {
      api.getAccountStatus().then(res => {
        if (res.data.code === 200) {
          this.accountType = res.data.body.accountType;
          callback && callback();
        }
      });
    },
    handleRedirectOpen() {
      this.handleNoOpenClose();
      let creditAmount = 0; //添加额度传值用
      if (
        this.$route.query.creditAmount &&
        this.$route.query.creditAmount != ""
      ) {
        creditAmount = Number(this.$route.query.creditAmount);
      }
      this.getOpennedStatus(() => {
        this.$router.push({
          name: "accountOpenPage",
          query: { accountType: this.accountType, creditAmount: creditAmount }
        });
      });
    },
    postAddGuarantee() {
      const params = this.$deepcopy(this.guaranteeForm);
      this.$refs["guaranteeForm"].validate(valid => {
        if (valid) {
          api.postAddGuarantee(params).then(
            res => {
              if (res.data.code === 201) {
                this.handleNoOpenClose();
                this.$router.push({
                  name: "successPage",
                  query: { pageName: "creditGuaranteePage" }
                });
              }
            },
            response => {
              if (response.data.code === 4002024) {
                this.messageOpenInfo = response.data.message;
                this.doubleButton = true;
                this.okButtonName = "去开户";
              } else {
                let _msg = "";
                if (response.data.body) {
                  for (const key in response.data.body) {
                    _msg += response.data.body[key] + " ";
                  }
                  this.messageOpenInfo = _msg;
                } else {
                  this.messageOpenInfo = response.data.message
                    ? response.data.message
                    : "添加担保人失败!";
                }
                this.doubleButton = false;
              }
              this.showOpenDialog = true;
              this.isOpenSuccess = false;
            }
          );
        } else {
          return false;
        }
      });
    },
    putChangeGuarantee() {
      const _params = this.$deepcopy(this.guaranteeForm);
      userApi.putChangeGuarantee(this.currentcreditId, _params).then(
        res => {
          if (res.data.code === 200) {
            this.$router.push({ name: "usersCreditPage" });
          }
        },
        response => {
          if (response.data.code === 4002024) {
            this.messageOpenInfo = response.data.message;
            this.doubleButton = true;
            this.okButtonName = "去开户";
          } else {
            let _msg = "";
            if (response.data.body) {
              for (const key in response.data.body) {
                _msg += response.data.body[key] + " ";
              }
              this.messageOpenInfo = _msg;
            } else {
              this.messageOpenInfo = response.data.message
                ? response.data.message
                : "添加担保人失败!";
            }
            this.doubleButton = false;
          }
          this.showOpenDialog = true;
          this.isOpenSuccess = false;
        }
      );
    },
    handleAddGuarantee() {
      if (this.pageFromName === "usersCreditPage") {
        if (this.operateType === "Add") {
          this.postAddGuarantee();
        } else if (this.operateType === "Change") {
          this.putChangeGuarantee();
        }
      } else {
        this.postAddGuarantee();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.gurantee-tip {
  font-size: 12px;
  color: red;
  line-height: 24px;
  margin-top: 10px;
}
</style>
