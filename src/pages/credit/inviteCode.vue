<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'QuotaPage'"></mijin-header>
    <div class="credit-content">
      <mijin-steps first></mijin-steps>
      <div class="main-content credit-form operate">
        <el-form ref="applyForm" :model="creditForm" label-width="150px" :rules="creditFormRules">
          <div class="credit-form-inner credit-form-apply">
            <el-form-item label="进件邀请码：" prop="inviteCode">
              <mj-input v-model="creditForm.inviteCode" placeholder="请输入进件邀请码"></mj-input>
            </el-form-item>            
            <div class="step-btns">
              <div class="mj-button orange step-btn-next cursor" @click="handleNextStep">下一步</div>
              
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <mijin-dialog v-show="showRedirectDialog" :is-success="isRedirectSuccess" :message="messageRedirectInfo" @ok="handleRedirect" @close="handleClose"></mijin-dialog>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import MijinSteps from "../components/steps.vue";
import MijinDialog from "../../components/dialogBox.vue";
import * as Api from "../api/authority";
import * as api from "../api/account";
export default {
  name: "creditApplyInviteCOde",
  components: {
    MijinHeader,
    MijinFootter,
    MijinSteps,
    MijinDialog
  },
  data() {
    return {
      showDialog: false,
      isSuccess: false,
      messageInfo: "",
      creditForm: {
        inviteCode: ""
      },
      creditFormRules: {
        inviteCode: [
          { required: true, message: "请输入渠道邀请码", trigger: "blur" },
          {
            pattern: this.$valid.fourCode,
            message: "请输入四位数字渠道邀请码!",
            trigger: "blur"
          }
        ]
      },
      showRedirectDialog: false,
      isRedirectSuccess: false,
      messageRedirectInfo: ""
    };
  },
  created() {},
  methods: {
    handleNextStep() {
      this.$refs["applyForm"].validate(valid => {
        if (valid) {
          /**这儿调用渠道邀请码的接口,成功的话跳入到运营商认证页 */
          Api.checkInviteCode(this.creditForm.inviteCode).then(
            res => {
              const _data = res.data;
              if (_data.code == 200) {
                this.$setSessionStorage(
                  "inviteCode",
                  this.creditForm.inviteCode
                );
                Api.checkIdCardCredit().then(res => {
                  const _data = res.data;
                  if (_data.code === 200) {
                    if (_data.body) {
                      this.$router.push({ name: "authorityOperator" }); //跳转到运营商认证页面
                    } else {
                      this.$router.push({ name: "creditAuthority" });
                    }
                  }
                });
              } else {
                this.showRedirectDialog = true;
                this.isRedirectSuccess = false;
                this.messageRedirectInfo = res.data.message;
              }
            },
            error => {
              this.showRedirectDialog = true;
              this.isRedirectSuccess = false;
              this.messageRedirectInfo = error.data.message;
            }
          );
        } else {
          return false;
        }
      });
    },
    handleRedirect() {
      this.$router.push({ name: "usersCreditPage" });
      this.handleClose();
    },
    handleClose() {
      this.showRedirectDialog = false;
      this.isRedirectSuccess = false;
      this.messageRedirectInfo = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.step-content {
  width: 100%;
  background: #eee;
  padding: 20px 0 60px 0;
  .step-form {
    background: #fff;
    padding: 60px 0 120px 0;
    .step-form-inner {
      width: 440px;
      margin: 0 auto;
      h3 {
        text-align: center;
        font-size: 30px;
        font-weight: normal;
      }

      .step-btns {
        margin-top: 80px;
        text-align: center;
        .step-btn-next {
          display: inline-block;
          font-size: 14px;
        }
        > .step-tips {
          font-size: 12px;
          color: red;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
