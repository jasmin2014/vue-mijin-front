<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'QuotaPage'"></mijin-header>
    <div class="credit-content">
      <div class="main-content credit-form">
        <h3 v-if="pageFrom !== 'usersGuaranteesPage' || operateType === 'AccountAuthority'">实名认证</h3>
        <h3 v-else>修改资料</h3>
        <!--<form>-->
        <div class="credit-form-inner auth-idcard-inner">
          <el-form
            ref="authorityform"
            :model="creditForm"
            label-width="150px"
            :rules="pageFrom !== 'usersGuaranteesPage' || operateType === 'AccountAuthority' ? creditFormRules : {}"
          >
            <div v-if="pageFrom !== 'usersGuaranteesPage' ||  operateType === 'AccountAuthority'">
              <el-form-item class="custom-width" label="姓名：" prop="realName">
                <div class="width450">
                  <mj-input v-model.trim="creditForm.realName" placeholder="请输入姓名"></mj-input>
                </div>
              </el-form-item>
              <el-form-item class="custom-width" label="身份证号：" prop="ident" v-if="!isIdentDisable">
                <div class="width450">
                  <mj-input v-model="creditForm.ident" placeholder="请输入身份证号"></mj-input>
                </div>
              </el-form-item>
              <el-form-item
                class="custom-width"
                :class="{'isIdentDisable':isIdentDisable}"
                label="身份证号："
                v-else
              >
                <div class="width450">
                  <mj-input v-model="creditForm.ident" placeholder="请输入身份证号" :mode="'VIEW'"></mj-input>
                </div>
              </el-form-item>
            </div>
            <div class="flex-start credit-idCode credit-idCodes mt20">
              <div class="flex authority-item">
                <p class="special-label">
                  <span>*</span>身份证正面照：
                </p>
                <div class="auth-upload" v-if="hasIDcode_M">
                  <mj-upload
                    v-model="IDcodes_pic"
                    :limit="1"
                    accept="image/*"
                    :upload-title="'个人信息页'"
                    :max-size="'10M'"
                    :placeholder="tipMessage"
                    @success="handleIDcodePositiveSuccess"
                    @remove="handleIDcodePositiveRemove"
                  ></mj-upload>
                  <p class="pic-error-msg" v-if="isIDcodesNull">{{IDcodeErrorMsg}}</p>
                </div>
                <div class="auth-upload" v-else>
                  <mj-upload
                    v-model="IDcodes_new"
                    :limit="1"
                    accept="image/*"
                    :upload-title="'个人信息页'"
                    :max-size="'10M'"
                    :placeholder="tipMessage"
                    @success="handleIDcodePositiveSuccess"
                    @remove="handleIDcodePositiveRemove"
                  ></mj-upload>
                  <p class="pic-error-msg" v-if="isIDcodesNull">{{IDcodeErrorMsg}}</p>
                </div>
              </div>
              <div class="upload-example">
                <p class="upload-txt">查看示例</p>
                <p>
                  <img src="../../assets/imgs/idCard-front.jpg">
                </p>
              </div>
            </div>
            <div class="flex-start credit-idCode credit-idCodes mt20">
              <div class="flex authority-item">
                <p class="special-label">
                  <span>*</span>身份证反面照：
                </p>
                <div class="auth-upload" v-if="hasIDcodeBack_M">
                  <mj-upload
                    v-model="IDcodeOtherSide_pic"
                    accept="image/*"
                    :limit="1"
                    :upload-title="'国徽页'"
                    :max-size="'5M'"
                    :placeholder="tipMessage"
                    @success="handleOtherSideSuccess"
                    @remove="handleOtherSideRemove"
                  ></mj-upload>
                  <p class="pic-error-msg" v-if="isOtherSideNull">{{OtherSideErrorMsg}}</p>
                </div>
                <div class="auth-upload" v-else>
                  <mj-upload
                    v-model="IDcodeOtherSide_new"
                    accept="image/*"
                    :limit="1"
                    :upload-title="'国徽页'"
                    :max-size="'5M'"
                    :placeholder="tipMessage"
                    @success="handleOtherSideSuccess"
                    @remove="handleOtherSideRemove"
                  ></mj-upload>
                  <p class="pic-error-msg" v-if="isOtherSideNull">{{OtherSideErrorMsg}}</p>
                </div>
              </div>
              <div class="upload-example">
                <p class="upload-txt">查看示例</p>
                <p>
                  <img src="../../assets/imgs/idCard-behind.jpg">
                </p>
              </div>
            </div>
            <div class="flex-start credit-idCode credit-idCodes mt20">
              <div class="flex authority-item">
                <p class="special-label">
                  <span>*</span>手持身份证照：
                </p>
                <div class="auth-upload" v-if="hasIDcodeHand_M">
                  <mj-upload
                    v-model="IDhandle_pic"
                    accept="image/*"
                    :limit="1"
                    :upload-title="' '"
                    :max-size="'5M'"
                    :placeholder="tipMessage"
                    @success="handleIDcodeSuccess"
                    @remove="handleIDcodeRemove"
                  ></mj-upload>
                  <p class="pic-error-msg" v-if="HandIDCodeNull">{{HandIDCodeErrorMsg}}</p>
                </div>
                <div class="auth-upload" v-else>
                  <mj-upload
                    v-model="handIDCode_new"
                    accept="image/*"
                    :limit="1"
                    :upload-title="' '"
                    :max-size="'5M'"
                    :placeholder="tipMessage"
                    @success="handleIDcodeSuccess"
                    @remove="handleIDcodeRemove"
                  ></mj-upload>
                  <p class="pic-error-msg" v-if="HandIDCodeNull">{{HandIDCodeErrorMsg}}</p>
                </div>
              </div>
              <div class="upload-example">
                <p class="upload-txt">查看示例</p>
                <p>
                  <img src="../../assets/imgs/idCard-handle.jpg">
                </p>
              </div>
            </div>
            <div
              v-if="pageFrom === 'usersGuaranteesPage' && operateType === 'Edit'"
              class="flex-start credit-idCode credit-reports authority-item mt20"
            >
              <p class="special-label">
                <span>*</span>人行征信报告：
              </p>
              <div v-if="hasBankCredit_M">
                <mj-upload
                  v-model="reports_pic"
                  :limit="5"
                  @success="handleReportsSuccess"
                  :max-size="'10M'"
                  :placeholder="'支持png/pdf/jpg和jpeg格式，大小不超过10M,最多上传5张'"
                  @remove="handleReportsRemove"
                ></mj-upload>
                <p class="pic-error-msg" v-if="ReportsNull">{{ReportsErrorMsg}}</p>
              </div>
              <div v-else>
                <mj-upload
                  v-model="reports_new"
                  :limit="5"
                  @success="handleReportsSuccess"
                  :max-size="'10M'"
                  :placeholder="'支持png/pdf/jpg和jpeg格式，大小不超过10M,最多上传5张'"
                  @remove="handleReportsRemove"
                ></mj-upload>
                <p class="pic-error-msg" v-if="ReportsNull">{{ReportsErrorMsg}}</p>
              </div>
            </div>
            <div class="step-btns">
              <div
                class="mj-button orange step-btn-next cursor"
                v-if="pageFrom === 'usersGuaranteesPage' || pageFrom === 'usersAccountPage' "
                @click="handleIdentAuth"
              >提交</div>
              <div class="mj-button orange step-btn-next cursor" v-else @click="handleIdentAuth">下一步</div>
              <!--<mj-button text="提交" height="38" type="orange" class="step-btn-next" @click="handleIdentAuth"></mj-button>-->
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <mijin-dialog
      v-show="showAuthDialog"
      :is-success="isSuccess"
      :message="messageInfo"
      :is-direct="isDirect"
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
import * as Api from "../api/authority";
import * as uapi from "../api/users";
import { getLoginDetail } from "../api/account";
import { getPicUrls } from "../../api/common";

const USER_IDENTITY = "USER_IDENTITY";
const USER_IDENTITY_BACK = "USER_IDENTITY_BACK";
const HAND_USER_IDENTITY = "HAND_USER_IDENTITY";
const BANK_CREDIT_REPORT = "BANK_CREDIT_REPORT";
export default {
  name: "creditAuthority",
  components: {
    MijinHeader,
    MijinFootter,
    MijinSteps,
    MijinDialog
  },
  data() {
    return {
      pageFrom: this.$route.query.pageFrom,
      operateType: this.$route.query.operateType,
      showAuthDialog: false,
      isSuccess: false,
      isDirect: false,
      messageInfo: "",
      isIdentDisable: false,
      tipMessage: "注：支持png、jpg、jpeg格式，大小不超过10M",
      personSource: "",
      creditForm: {
        realName: "",
        ident: "",
        IDcodePositive: [],
        IDcodeOtherSide: [],
        handIDCode: [],
        bankCreditReports: [],
        proofMaterialDTOList: []
      },
      IDcodes: [],
      IDcodes_new: [],
      isIDcodesNull: false,
      IDcodeErrorMsg: "",
      hasIDcode_M: false,

      IDcodeOtherSide: [],
      IDcodeOtherSide_new: [],
      isOtherSideNull: false,
      OtherSideErrorMsg: "",
      hasIDcodeBack_M: false,

      handIDCode: [],
      handIDCode_new: [],
      HandIDCodeNull: false,
      HandIDCodeErrorMsg: "",
      hasIDcodeHand_M: false,

      bankCreditReports: [],
      reports_new: [],
      ReportsNull: false,
      ReportsErrorMsg: "",
      hasBankCredit_M: false,

      creditFormRules: {
        realName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "2-10个字符", trigger: "blur" },
          {
            pattern: this.$valid.errorChar,
            message: "输入有误，不允许输入特殊字符",
            trigger: "blur"
          }
        ],
        ident: [
          { required: true, message: "请输入证件号码", trigger: "blur" },
          {
            pattern: this.$valid.ident,
            message: "请输入正确的证件号码",
            trigger: "blur"
          }
        ],
        IDcodePositive: [
          { required: true, message: "请上传身份证正面照", trigger: "success" }
        ],
        IDcodeOtherSide: [{ required: true, message: "请上传身份证反面照" }],
        handIDCode: [{ required: true, message: "请上传手持身份证照" }],
        bankCreditReports: [{ required: true, message: "请上传人行征信报告" }]
      }
    };
  },
  created() {
    this.getDefaultLoginDetail();
  },
  computed: {
    IDcodes_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (
          this.creditForm.proofMaterialDTOList &&
          this.creditForm.proofMaterialDTOList.length > 0
        ) {
          _IDcodePositive = this.creditForm.proofMaterialDTOList
            .filter(_ => _.kind === USER_IDENTITY)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
          currentIDcode.push(_IDcodePositive[0]);
        }
        return currentIDcode;
      }
    },
    IDcodeOtherSide_pic: {
      get() {
        let _IdOtherSide = [],
          currentIDOtherSide = [];
        if (
          this.creditForm.proofMaterialDTOList &&
          this.creditForm.proofMaterialDTOList.length > 0
        ) {
          _IdOtherSide = this.creditForm.proofMaterialDTOList
            .filter(_ => _.kind === USER_IDENTITY_BACK)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
          currentIDOtherSide.push(_IdOtherSide[0]);
        }
        return currentIDOtherSide;
      }
    },
    IDhandle_pic: {
      get() {
        let _Idhandle = [],
          currentIDhandle = [];
        if (
          this.creditForm.proofMaterialDTOList &&
          this.creditForm.proofMaterialDTOList.length > 0
        ) {
          _Idhandle = this.creditForm.proofMaterialDTOList
            .filter(_ => _.kind === HAND_USER_IDENTITY)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
          currentIDhandle.push(_Idhandle[0]);
        }
        return currentIDhandle;
      }
    },
    reports_pic: {
      get() {
        let _reports = [];
        if (
          this.creditForm.proofMaterialDTOList &&
          this.creditForm.proofMaterialDTOList.length > 0
        ) {
          _reports = this.creditForm.proofMaterialDTOList
            .filter(_ => _.kind === BANK_CREDIT_REPORT)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
        }
        return _reports;
      }
    }
  },
  methods: {
    getDefaultLoginDetail() {
      getLoginDetail().then(res => {
        if (res.data.code === 200) {
          const _data = res.data.body;
          console.log(_data);
          if (_data.personSource && _data.personSource === "FENGTAI") {
            if (_data.ident && _data.ident !== "") {
              this.isIdentDisable = true;
            } else {
              this.isIdentDisable = false;
            }
            this.creditForm.ident = _data.ident ? _data.ident : "";
            this.creditForm.realName = _data.realName ? _data.realName : "";
            this.creditForm.proofMaterialDTOList =
              _data.proofMaterialDTOList &&
              _data.proofMaterialDTOList.length > 0
                ? _data.proofMaterialDTOList
                : [];

            if (
              _data.proofMaterialDTOList &&
              _data.proofMaterialDTOList.length > 0
            ) {
              let _pics1 = [],
                _pics2 = [],
                _pics3 = [],
                _pics4 = [];
              _data.proofMaterialDTOList.forEach(item => {
                if (item.kind === USER_IDENTITY) {
                  this.hasIDcode_M = true;
                  _pics1.push(item);
                } else if (item.kind === USER_IDENTITY_BACK) {
                  this.hasIDcodeBack_M = true;
                  _pics2.push(item);
                } else if (item.kind === HAND_USER_IDENTITY) {
                  this.hasIDcodeHand_M = true;
                  _pics3.push(item);
                } else if (item.kind === this.$enum.BANK_CREDIT_REPORT) {
                  this.hasBankCredit_M = true;
                  _pics4.push(item);
                }
              });

              this.IDcodes = [];
              this.IDcodes.push(_pics1[0]);

              this.IDcodeOtherSide = [];
              this.IDcodeOtherSide.push(_pics2[0]);

              this.handIDCode = [];
              this.handIDCode.push(_pics3[0]);

              this.bankCreditReports = [];
              this.bankCreditReports = _pics4;
            }
          }
        }
      });
    },
    validateIDcodes() {
      if (this.IDcodes.length <= 0) {
        this.isIDcodesNull = true;
        this.IDcodeErrorMsg = "请上传身份证正面照！";
      } else {
        this.isIDcodesNull = false;
        this.IDcodeErrorMsg = "";
      }
    },
    validateOtherSide() {
      if (this.IDcodeOtherSide.length < 1) {
        this.isOtherSideNull = true;
        this.OtherSideErrorMsg = "请上传身份证反面照！";
      } else {
        this.isOtherSideNull = false;
        this.OtherSideErrorMsg = "";
      }
    },
    validateHandIDCode() {
      if (this.handIDCode.length < 1) {
        this.HandIDCodeNull = true;
        this.HandIDCodeErrorMsg = "请上传手持身份证照片！";
      } else {
        this.HandIDCodeNull = false;
        this.HandIDCodeErrorMsg = "";
      }
    },
    validateReports() {
      if (this.bankCreditReports.length < 1) {
        this.ReportsNull = true;
        this.ReportsErrorMsg = "请上传人行征信报告！";
      } else {
        this.ReportsNull = false;
        this.ReportsErrorMsg = "";
      }
    },
    handleIDcodePositiveSuccess(file) {
      file.kind = this.$enum.USER_IDENTITY;
      this.IDcodes.push(file);
      this.validateIDcodes();
    },
    handleIDcodePositiveRemove(file, fileList) {
      this.IDcodes = [];
      this.validateIDcodes();
    },
    handleOtherSideSuccess(file) {
      file.kind = this.$enum.USER_IDENTITY_BACK;
      this.IDcodeOtherSide.push(file);
      this.validateOtherSide();
    },
    handleOtherSideRemove(file, fileList) {
      this.IDcodeOtherSide = [];
      this.validateOtherSide();
    },
    handleIDcodeSuccess(file) {
      file.kind = this.$enum.HAND_USER_IDENTITY;
      this.handIDCode.push(file);
      this.validateHandIDCode();
    },
    handleIDcodeRemove(file, fileList) {
      this.handIDCode = [];
      this.validateHandIDCode();
    },
    handleReportsSuccess(file) {
      file.kind = this.$enum.BANK_CREDIT_REPORT;
      this.bankCreditReports.push(file);
      this.validateReports();
    },
    handleReportsRemove(file, fileList) {
      const fileName = file.raw.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.bankCreditReports = [];
      } else {
        let _item = {};
        fileList.forEach(item => {
          _keys.push(item.response.key);
          _item = {
            key: item.response.key,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.BANK_CREDIT_REPORT
          };
          this.bankCreditReports.push(_item);
        });
        getPicUrls(_keys).then(res => {
          if (res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item, i) => {
              this.bankCreditReports[i].fileUri = item;
            });
          }
        });
      }
      this.validateReports();
    },
    handleIdentAuth() {
      let _params = {} || [];
      let authMaterial = [];
      if (this.IDcodes && this.IDcodes.length > 0) {
        this.IDcodes.forEach(item => {
          authMaterial.push(item);
        });
        this.isIDcodesNull = false;
        this.IDcodeErrorMsg = "";
      } else {
        this.isIDcodesNull = true;
        this.IDcodeErrorMsg = "请上传身份证正面照！";
      }
      if (this.IDcodeOtherSide && this.IDcodeOtherSide.length > 0) {
        this.IDcodeOtherSide.forEach(item => {
          authMaterial.push(item);
        });
        this.isOtherSideNull = false;
        this.OtherSideErrorMsg = "";
      } else {
        this.isOtherSideNull = true;
        this.OtherSideErrorMsg = "请上传身份证反面照！";
      }
      if (this.handIDCode && this.handIDCode.length > 0) {
        this.handIDCode.forEach(item => {
          authMaterial.push(item);
        });
        this.HandIDCodeNull = false;
        this.HandIDCodeErrorMsg = "";
      } else {
        this.HandIDCodeNull = true;
        this.HandIDCodeErrorMsg = "请上传手持身份证照片！";
      }

      if (
        this.pageFrom === "usersGuaranteesPage" &&
        this.operateType === "Edit"
      ) {
        if (this.bankCreditReports && this.bankCreditReports.length > 0) {
          this.bankCreditReports.forEach(item => {
            authMaterial.push(item);
          });
          this.ReportsNull = false;
          this.ReportsErrorMsg = "";
        } else {
          this.ReportsNull = true;
          this.ReportsErrorMsg = "请上传人行征信报告！";
        }
        if (
          !this.isIDcodesNull &&
          !this.isOtherSideNull &&
          !this.HandIDCodeNull &&
          !this.ReportsNull
        ) {
          this.$refs["authorityform"].validate(valid => {
            if (valid) {
              const _appid = this.$route.query.applicationId;
              authMaterial = authMaterial.filter(_ => _ !== null);
              uapi.putAuthorityInfo(_appid, authMaterial).then(
                res => {
                  if (res.data.code === 200) {
                    this.$router.push({ name: "usersGuaranteesPage" });
                  } else {
                    this.showAuthDialog = true;
                    this.isSuccess = false;
                    this.isDirect = false;
                    this.messageInfo = "信息修改失败，请检查您提交的信息!";
                  }
                },
                response => {
                  if (response.data.body) {
                    let _msg = "";
                    for (const key in response.data.body) {
                      _msg += response.data.body[key] + ";  ";
                    }
                    this.messageInfo = _msg;
                  } else {
                    this.messageInfo = response.data.message
                      ? response.data.message
                      : "信息修改失败，请检查您提交的信息!";
                  }
                  this.showAuthDialog = true;
                  this.isSuccess = false;
                  this.isDirect = false;
                }
              );
            } else {
              return false;
            }
          });
        }
      } else {
        if (
          !this.isIDcodesNull &&
          !this.isOtherSideNull &&
          !this.HandIDCodeNull
        ) {
          this.$refs["authorityform"].validate(valid => {
            if (valid) {
              authMaterial = authMaterial.filter(_ => _ !== null);
              _params = {
                ident: this.creditForm.ident,
                realName: this.creditForm.realName,
                proofMaterialDTOList: authMaterial
              };
              Api.identAuth(_params).then(
                res => {
                  if (res.data.code === 201) {
                    this.showAuthDialog = true;
                    this.isSuccess = true;
                    this.isDirect = true;
                    this.messageInfo = "恭喜你，身份信息认证成功！";
                  } else {
                    this.showAuthDialog = true;
                    this.isSuccess = false;
                    this.isDirect = false;
                    this.messageInfo = "实名认证不通过，请检查您提交的信息!";
                  }
                },
                response => {
                  this.showAuthDialog = true;
                  this.isSuccess = false;
                  this.isDirect = false;
                  this.messageInfo = "实名认证不通过，请检查您提交的信息!";
                  //相同身份证已注册
                  if (response.data.code == 4001000) {
                    this.messageInfo = response.data.message;
                  } else if (response.data.code == 400) {
                    //身份证错误
                    this.messageInfo = response.data.body.ident;
                  }
                }
              );
            } else {
              return false;
            }
          });
        }
      }
    },
    handleClose() {
      this.showAuthDialog = false;
      this.isSuccess = false;
      this.messageInfo = "";
    },
    handleSuccessRedirect() {
      if (this.isDirect) {
        if (this.pageFrom === "usersGuaranteesPage") {
          this.$router.push({ name: "usersGuaranteesPage" });
        } else {
          if (this.operateType && this.operateType === "AccountAuthority") {
            if (this.pageFrom === "usersAccountPage") {
              this.$router.push({ name: "usersAccountPage" });
            } else {
              this.$router.push({ name: "usersGuaranteesPage" });
            }
          } else {
            this.$router.push({ name: "authorityOperator" });
          }
        }
      } else {
        this.showAuthDialog = false;
        this.isSuccess = false;
        this.messageInfo = "";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.pic-error-msg {
  color: red;
  font-size: 12px;
  line-height: 30px;
}
.credit-reports .upload .el-upload-list--picture-card .el-upload-list__item {
  margin-right: 50px;
}
.credit-reports
  .upload
  .el-upload-list--picture-card
  .el-upload-list__item:nth-child(2n) {
  margin-right: 0;
}
.authority-item {
  .special-label {
    display: block;
    width: 150px;
    span {
      color: #f56c6c;
    }
  }
}
.mt20 {
  margin-top: 20px;
}
</style>
