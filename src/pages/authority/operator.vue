<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'QuotaPage'"></mijin-header>
    <div class="credit-content">
      <mijin-steps first second v-if="fromPage !== 'usersAccountPage'"></mijin-steps>
      <div class="main-content credit-form">
        <h3>运营商认证</h3>
        <el-form
          ref="operatorForm"
          :model="creditForm"
          label-width="150px"
          :rules="creditFormRules"
        >
          <div class="credit-form-inner auth-operator-inner right">
            <el-form-item label="注册手机号：" class="custom-width" prop="mobile">
              <mj-input v-model="creditForm.mobile" :mode="'VIEW'"></mj-input>
            </el-form-item>
            <el-form-item label="服务密码：" class="custom-width cus-spassword" prop="password">
              <mj-input v-model="creditForm.password" type="password" @blur="handleBlur"></mj-input>
              <p
                v-if="isNormal"
                style="display:blcok;color: #f56c6c; font-size:12px; line-height: 20px;"
              >用户请致电运营商客服电话获取服务密码</p>
            </el-form-item>
            <div class="operate-item flex-start" v-show="showDynamic">
              <p class="special-label" style="text-align:right;padding-right:12px;">
                <span>*</span>动态密码：
              </p>
              <div>
                <div class="dcode">
                  <mj-input
                    class="d-input"
                    type="password"
                    v-model="creditForm.captcha"
                    @blur="handleCaptchaBlur"
                  ></mj-input>
                  <div class="d-getcode cursor" v-if="!isGetting" @click="handleGetDyCode">获取动态密码</div>
                  <div class="d-countdown" v-else>{{timer}}s后重新获取</div>
                </div>
                <!-- <el-row>
                  <el-col :span="16">
                   
                  </el-col>
                  <el-col :span="8">
                    
                  </el-col>
                </el-row>-->
                <p
                  style="color: rgb(245, 108, 108);font-size: 12px;line-height: 20px;"
                  v-show="hasDynamicPassword"
                >{{dynamicText}}</p>
              </div>
            </div>
            <div class="step-btns">
              <div class="mj-button orange step-btn-next cursor" @click="handleAuthorityOperator">提交</div>
              <div v-if="fromPage !== 'usersAccountPage'" class="step-next margin-top10 cursor">
                <span @click="handleRedirect">跳过此步骤></span>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <mijin-dialog
      v-show="showAuthDialog"
      :is-success="isSuccess"
      :message="messageInfo"
      :is-direct="isDirect"
      :button-name="btnName"
      @ok="handleSuccessRedirect"
      @close="handleClose"
    ></mijin-dialog>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import MijinSteps from "../components/steps.vue";
import MijinDialog from "../../components/dialogBox.vue";
import * as api from "../api/authority";
import showAlert from "../src/mixins/showAlert.js";
export default {
  name: "authorityOperator",
  components: {
    MijinHeader,
    MijinFootter,
    MijinSteps,
    MijinDialog
  },
  mixins: [showAlert],
  data() {
    return {
      //获取动态密码按钮参数
      isGetting: false,
      timer: 60,
      isNormal: true,
      fromPage: this.$route.query.pageName,
      disabledCode: false,
      showDynamic: false,
      hasDynamicPassword: false,
      dynamicText: "",
      timeOut: null,
      creditForm: {
        mobile: "",
        password: "",
        captcha: "",
        taskId: ""
      },
      creditFormRules: {
        mobile: [
          {
            required: true,
            message: "请输入联系人手机号",
            trigger: "blur"
          },
          {
            pattern: this.$valid.phone11,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "用户请致电运营商客服电话获取服务密码！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    if (
      this.$getLocalStorage("users") &&
      this.$getLocalStorage("users") !== ""
    ) {
      const users = JSON.parse(this.$getLocalStorage("users"));
      this.creditForm.mobile = users.mobile;
    } else {
      this.$router.push({
        name: "LoginPage"
      });
    }
  },
  methods: {
    handleCaptchaBlur() {
      this.hasDynamicPassword =
        this.creditForm.captcha && this.creditForm.captcha !== ""
          ? false
          : true;
    },
    handleBlur() {
      if (this.creditForm.password !== "") {
        this.isNormal = true;
      } else {
        this.isNormal = false;
      }
    },
    //通过服务密码以及动态密码验证运营商认证接口
    apiOperatorAuthCode(params) {
      // clearTimeout(this.timeOut);
      api.operatorAuthCode(params).then(
        res => {
          let result = res.data;
          if (result.code === 201) {
            if (result.body.code === "SUCCESS") {
              this.showAlert({
                type: "operate",
                msg: "运营商认证成功！"
              });
            } else if (result.body.code === "AUTOPASSWORD") {
              this.showDynamic = true;
              this.hasDynamicPassword = true;
              this.dynamicText = result.body.data.content
                ? result.body.data.content
                : "";
              this.countDown(60);
            } else if (result.body.code === "FAIL") {
              if (result.body.data.content && result.body.data.content !== "") {
                this.showAlert({
                  type: "error",
                  msg: result.body.data.content
                });
              }
            } else {
              this.showAlert({
                type: "error",
                msg:
                  result.body.data && result.body.data.content
                    ? result.body.data.content
                    : "数据异常"
              });
            }
          }
        },
        response => {
          this.showAlert({
            type: "error",
            msg:
              response.data && response.data.message
                ? response.data.message
                : "未知错误"
          });
        }
      );
    },
    //通过服务密码获取动态密码接口
    apiOperatorAuthPassword(params, callback) {
      // clearTimeout(this.timeOut);
      api.operatorAuthPassword(params.password).then(
        res => {
          let result = res.data;
          if (result.code === 201) {
            if (result.body.code === "SUCCESS") {
              this.showAlert({
                type: "operate",
                msg: "运营商认证成功！"
              });
            } else if (result.body.code === "AUTOPASSWORD") {
              this.creditForm.taskId = result.body.data.taskId;
              this.showDynamic = true;
              this.hasDynamicPassword = true;
              this.dynamicText = result.body.data.content;

              this.countDown(60);

              if (callback && callback()) {
                callback();
              }
            } else if (result.body.code === "FAIL") {
              if (result.body.data.content && result.body.data.content !== "") {
                this.showAlert({
                  type: "error",
                  msg: result.body.data.content
                });
              }
            } else {
              this.showAlert({
                type: "error",
                msg:
                  result.body.data && result.body.data.content
                    ? result.body.data.content
                    : "数据异常！"
              });
            }
          }
        },
        response => {
          this.showAlert({
            type: "error",
            msg:
              response.data && response.data.message
                ? response.data.message
                : "未知错误"
          });
        }
      );
    },
    handleAuthorityOperator() {
      const _params = {
        password: this.creditForm.password,
        captcha: this.creditForm.captcha,
        taskId: this.creditForm.taskId,
        type: "1"
      };
      this.$refs["operatorForm"].validate(valid => {
        if (valid) {
          if (this.showDynamic) {
            if (!this.hasDynamicPassword) {
              this.apiOperatorAuthCode(_params);
            } else {
              this.hasDynamicPassword = true;
              this.dynamicText = "请输入动态密码!";
            }
          } else {
            this.apiOperatorAuthPassword(_params);
          }
        } else {
          this.isNormal = false;
          return false;
        }
      });
    },
    countDown(sec) {
      if (sec > 0) {
        this.isGetting = true;
        this.timer = `${sec}`;
        this.timeOut = setTimeout(() => {
          this.countDown(--sec);
        }, 1000);
      } else {
        this.isGetting = false;
        clearTimeout(this.timeOut);
      }
    },
    //点击"获取动态密码"按钮触发事件
    handleGetDyCode() {
      const _params = {
        password: this.creditForm.password,
        captcha: this.creditForm.captcha,
        taskId: this.creditForm.taskId,
        type: "2"
      };
      this.$refs["operatorForm"].validate(valid => {
        if (valid) {
          this.apiOperatorAuthCode(_params);
        }
      });
    },
    handleSuccessRedirect() {
      if (!this.isSuccess) {
        this.handleClose();
      } else {
        if (this.fromPage === "usersAccountPage") {
          this.$router.push({
            name: "usersAccountPage"
          });
        } else {
          this.$router.push({
            name: "creditBasePage"
          });
        }
      }
    },
    handleRedirect() {
      this.$router.push({
        name: "creditBasePage"
      });
    },
    handleClose() {
      if (this.isSuccess) {
        if (this.fromPage === "usersAccountPage") {
          this.$router.push({
            name: "usersAccountPage"
          });
        } else {
          this.$router.push({
            name: "creditBasePage"
          });
        }
      } else {
        this.showAlert({
          type: "close",
          msg: ""
        });
      }
    }
  }
};
</script>

<style lang="scss">
.operate-item {
  position: relative;
  .special-label {
    display: block;
    width: 150px;
    line-height: 40px;
    span {
      color: #f56c6c;
    }
  }
  .dcode {
    display: flex;
    width: 320px;
    .d-input {
      flex: 1;
    }
    .d-getcode,
    .d-countdown {
      width: 120px;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      position: absolute;
      right: 0;
    }
    .d-countdown {
      background: #f2f2f2;
      color: #999;
    }
  }
}
</style>
