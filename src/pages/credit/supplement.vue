<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'QuotaPage'"></mijin-header>
    <div class="credit-content">
      <mijin-steps first second third forth class="mijin-steps"></mijin-steps>
      <div class="main-content credit-form">
        <h3>补充信息</h3>
        <div class="credit-form-inner auth-sup-inner">
          <el-form ref="supplementForm" :model="supplementForm" label-width="150px">
            <div class="flex-start credit-idCode credit-certificate">
              <el-form-item prop="licenses">
                <span slot="label">
                  *营业执照 /
                  <br> 淘宝店铺截图：
                </span>
                <mj-upload v-model="supplementForm.licenses" :limit="1" :max-size="'5M'" :placeholder="placeholderMsg" @success="handleLicenseSuccess"
                  @remove="handleRemoveLicense"></mj-upload>
                <p class="supple-error" v-if="isLicensesNull">{{licensesErrorMsg}}</p>
              </el-form-item>
              <el-form-item label="经营地证明：">
                <mj-upload v-model="supplementForm.businessLand" :limit="1" :max-size="'5M'" :placeholder="placeholderMsg" @success="handleBusinessLandSuccess"
                  @remove="handleBusinessLandRemove"></mj-upload>
                <!--<p class="supple-error" v-if="isBusinessNull">{{businessErrorMsg}}</p>-->
              </el-form-item>
            </div>
            <div class="flex-start credit-idCode credit-reports">
              <el-form-item label="*人行报告：" prop="reports">
                <mj-upload :class="{'isBlock': this.reports.length > 1,'lengthone':this.reports.length === 1,'isPosition': this.isPosition}"
                  v-model="supplementForm.reports" :limit="5" :max-size="'10M'" :placeholder="placeholderMsg2" @success="handleReportsSuccess"
                  @remove="handleReportsRemove"></mj-upload>
                <p class="supple-error" v-if="isReportsNull">{{reportErrorMsg}}</p>
              </el-form-item>
            </div>
            <div class="flex-start credit-idCode credit-sups" v-if="this.productType=='QYT_LOANS'">
              <el-form-item label="*企业征信：" prop="credits" v-if="this.creditApplicationAmount > 200000">
                <mj-upload :class="{'isBlock': this.credits.length > 1,'isPosition': this.isPosition_credits}" v-model="supplementForm.credits"
                  :limit="10" :max-size="'10M'" :placeholder="placeholderMsg3" @success="handleCreditSuccess" @remove="handleCreditRemove"></mj-upload>
                <p class="supple-error" v-if="isCreditsNull">{{creditsErrorMsg}}</p>
              </el-form-item>
              <el-form-item label="企业征信：" prop="credits" v-else>
                <mj-upload :class="{'isBlock': this.credits.length > 1,'isPosition': this.isPosition_credits}" v-model="supplementForm.credits"
                  :limit="10" :max-size="'10M'" :placeholder="placeholderMsg3" @success="handleCreditSuccess" @remove="handleCreditRemove"></mj-upload>
                <p class="supple-error" v-if="isCreditsNull">{{creditsErrorMsg}}</p>
              </el-form-item>
            </div>
            <div class="flex-start credit-idCode credit-sups">
              <el-form-item label="其它资料：">
                <mj-upload :class="{'isBlock': this.others.length > 1,'isPosition': this.isPosition_others}" v-model="supplementForm.others"
                  :limit="10" :max-size="'10M'" :placeholder="placeholderMsg3" @success="handleOtherSuccess" @remove="handleOtherRemove"></mj-upload>
                <!--<p class="supple-error" v-if="isOthersNull">{{otherErrorMsg}}</p>-->
              </el-form-item>
            </div>
            <div class="step-btns">
              <div class="mj-button orange step-btn-next cursor" @click="handleOpenAccount">立即申请</div>
              <div class="returnback cursor" @click="routerBack">返回</div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <mijin-dialog v-if="showAuthDialog && isDirect" :is-success="isSuccess" :message="messageInfo" :is-direct="isDirect" @ok="handleDirectPage"></mijin-dialog>
    <mijin-dialog v-else-if="showAuthDialog && !isDirect" :is-success="isSuccess" :message="messageInfo" @close="handleClose"></mijin-dialog>
  </div>
</template>

<script>
  import MijinHeader from '../../components/header.vue';
  import MijinFootter from '../../components/footter.vue';
  import MijinSteps from '../components/steps.vue';
  import MijinDialog from '../../components/dialogBox.vue';
  import * as api from '../api/account';
  import * as commonApi from '../../api/common';
  export default {
    name: 'creditSupplementPage',
    components: {
      MijinHeader,
      MijinFootter,
      MijinSteps,
      MijinDialog
    },
    data() {
      return {
        productId: '',
        productType: '',
        creditApplicationAmount: undefined,
        supplementForm: {
          licenses: [],
          businessLand: [],
          reports: [],
          credits: [],
          others: []
        },
        isPosition: false,
        isPosition_others: false,
        isPosition_credits: false,
        licenses: [],
        businessLand: [],
        reports: [],
        credits: [],
        isReportsNull: false,
        reportErrorMsg: '',
        isLicensesNull: false,
        licensesErrorMsg: '',
        isCreditsNull: false,
        creditsErrorMsg: '',
        others: [],
        showAuthDialog: false,
        isSuccess: false,
        isDirect: false,
        messageInfo: '',
        placeholderMsg: '注：支持png、pdf、jpg、jpeg,单张大小不超过10M,最多上传1张',
        placeholderMsg2: '注：支持png、pdf、jpg、jpeg,单张大小不超过10M,最多上传5张',
        placeholderMsg3: '注：支持png、pdf、jpg、jpeg,单张大小不超过10M,最多上传10张',
      }
    },
    created() {
      this.productId = JSON.parse(this.$getSessionStorage('checkedItems')).productId;
      this.getProductDetail(this.productId);
      this.creditApplicationAmount = JSON.parse(this.$getSessionStorage('creditApplicationAmount'));
    },
    methods: {
      // 获取产品详情
      getProductDetail(productId) {
        api.getProductInfo(productId).then(res => {
          if (res.data.code === 200) {
            this.productType = res.data.body.productType;
          }
        })
      },
      routerBack() {
        this.$router.go(-1);
      },
      validateReports() {
        if (this.reports.length < 1) {
          this.isReportsNull = true;
          this.reportErrorMsg = '请上传人行报告！';
        } else {
          this.isReportsNull = false;
          this.reportErrorMsg = '';
        }
      },
      validateLicense() {
        if (this.licenses.length < 1) {
          this.isLicensesNull = true;
          this.licensesErrorMsg = '请上传营业执照/淘宝店铺截图！';
        } else {
          this.isLicensesNull = false;
          this.licensesErrorMsg = '';
        }
      },
      validateCredit() {
        if (this.credits.length < 1) {
          this.isCreditsNull = true;
          this.creditsErrorMsg = '请上传企业征信！';
        } else {
          this.isCreditsNull = false;
          this.creditsErrorMsg = '';
        }
      },
      handleLicenseSuccess(file) {
        file.kind = this.$enum.COM_BUSINESS_LICENSE;
        this.licenses.push(file);
        this.validateLicense();
      },
      handleRemoveLicense(file, fileList) {
        const fileName = file.raw.name.split('.');
        const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : '';
        const _keys = [];
        if (fileList.length === 0) {
          this.licenses = []
        } else {
          let _item = {};
          fileList.forEach(item => {
            _keys.push(item.response.key);
            _item = {
              key: item.response.key,
              name: item.name,
              type: suffix.toLowerCase(),
              kind: this.$enum.COM_COMPANY_SEAL
            };
            this.licenses.push(_item);
          });
          commonApi.getPicUrls(_keys).then(res => {
            if (res.data.code === 200 && res.data.body.length > 0) {
              res.data.body.forEach((item, i) => {
                this.licenses[i].fileUri = item;
              });
            }
          })
        }
        this.validateLicense();
      },
      handleBusinessLandSuccess(file) {
        file.kind = this.$enum.DOMICILE_BUSINESS_CERTIFICATE;
        this.businessLand.push(file);
      },
      handleBusinessLandRemove(file, fileList) {
        const fileName = file.raw.name.split('.');
        const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : '';
        const _keys = [];
        if (fileList.length === 0) {
          this.businessLand = []
        } else {
          let _item = {};
          fileList.forEach(item => {
            _keys.push(item.response.key);
            _item = {
              key: item.response.key,
              name: item.name,
              type: suffix.toLowerCase(),
              kind: this.$enum.DOMICILE_BUSINESS_CERTIFICATE
            };
            this.businessLand.push(_item);
          });
          commonApi.getPicUrls(_keys).then(res => {
            if (res.data.code === 200 && res.data.body.length > 0) {
              res.data.body.forEach((item, i) => {
                this.businessLand[i].fileUri = item;
              });
            }
          })
        }
      },
      handleReportsSuccess(file) {
        file.kind = this.$enum.BANK_CREDIT_REPORT;
        this.reports.push(file);
        this.validateReports();
        if (this.reports.length % 2 === 1) {
          setTimeout(() => {
            this.isPosition = true;
          }, 200)
        } else {
          setTimeout(() => {
            this.isPosition = false;
          }, 200)
        }
      },
      handleReportsRemove(file, fileList) {
        const fileName = file.raw.name.split('.');
        const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : '';
        const _keys = [];
        if (fileList.length === 0) {
          this.reports = []
        } else {
          this.reports = [];
          let _item = {};
          fileList.forEach(item => {
            _keys.push(item.response.key);
            _item = {
              key: item.response.key,
              name: item.name,
              type: suffix.toLowerCase(),
              kind: this.$enum.BANK_CREDIT_REPORT
            };
            this.reports.push(_item);
          });
          commonApi.getPicUrls(_keys).then(res => {
            if (res.data.code === 200 && res.data.body.length > 0) {
              res.data.body.forEach((item, i) => {
                this.reports[i].fileUri = item;
              });
            }
          })
        }
        if (this.reports.length % 2 === 1) {
          setTimeout(() => {
            this.isPosition = true;
          }, 200)
        } else {
          setTimeout(() => {
            this.isPosition = false;
          }, 200)
        }
        this.validateReports();
      },
      handleOtherSuccess(file) {
        file.kind = this.$enum.USER_OTHER_MATERIAL;
        this.others.push(file);
        if (this.others.length % 2 === 1) {
          setTimeout(() => {
            this.isPosition_others = true;
          }, 200)
        } else {
          setTimeout(() => {
            this.isPosition_others = false;
          }, 200)
        }
      },
      handleOtherRemove(file, fileList) {
        const fileName = file.raw.name.split('.');
        const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : '';
        const _keys = [];
        if (fileList.length === 0) {
          this.others = []
        } else {
          this.others = [];
          let _item = {};
          fileList.forEach(item => {
            _keys.push(item.response.key);
            _item = {
              key: item.response.key,
              name: item.name,
              type: suffix.toLowerCase(),
              kind: this.$enum.USER_OTHER_MATERIAL
            };
            this.others.push(_item);
          });
          commonApi.getPicUrls(_keys).then(res => {
            if (res.data.code === 200 && res.data.body.length > 0) {
              res.data.body.forEach((item, i) => {
                this.others[i].fileUri = item;
              });
            }
          });
        }
        if (this.others.length % 2 === 1) {
          setTimeout(() => {
            this.isPosition_others = true;
          }, 200)
        } else {
          setTimeout(() => {
            this.isPosition_others = false;
          }, 200)
        }
      },
      handleCreditSuccess(file) {
        file.kind = this.$enum.COM_CREDIT_AUTHORIZATION;
        this.credits.push(file);
        if (this.credits.length % 2 === 1) {
          setTimeout(() => {
            this.isPosition_credits = true;
          }, 200)
        } else {
          setTimeout(() => {
            this.isPosition_credits = false;
          }, 200)
        }
        if (this.creditApplicationAmount > 200000) {
          this.validateCredit();
        }
      },
      handleCreditRemove(file, fileList) {
        const fileName = file.raw.name.split('.');
        const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : '';
        const _keys = [];
        if (fileList.length === 0) {
          this.credits = []
        } else {
          this.credits = [];
          let _item = {};
          fileList.forEach(item => {
            _keys.push(item.response.key);
            _item = {
              key: item.response.key,
              name: item.name,
              type: suffix.toLowerCase(),
              kind: this.$enum.COM_CREDIT_AUTHORIZATION
            };
            this.credits.push(_item);
          });
          commonApi.getPicUrls(_keys).then(res => {
            if (res.data.code === 200 && res.data.body.length > 0) {
              res.data.body.forEach((item, i) => {
                this.credits[i].fileUri = item;
              });
            }
          });
        }
        if (this.creditApplicationAmount > 200000) {
          this.validateCredit();
        }
        if (this.credits.length % 2 === 1) {
          setTimeout(() => {
            this.isPosition_credits = true;
          }, 200)
        } else {
          setTimeout(() => {
            this.isPosition_credits = false;
          }, 200)
        }
      },
      handleOpenAccount() {
        const checkedItems = JSON.parse(this.$getSessionStorage('checkedItems'));
        const accountInfos = JSON.parse(this.$getSessionStorage('accountInfos'));
        let materialList = [];
        if (this.licenses && this.licenses.length > 0) {
          this.licenses.forEach(item => {
            materialList.push(item)
          });
          this.isLicensesNull = false;
          this.licensesErrorMsg = '';
        } else {
          this.isLicensesNull = true;
          this.licensesErrorMsg = '请上传营业执照/淘宝店铺截图！';
        }

        if (this.businessLand && this.businessLand.length > 0) {
          this.businessLand.forEach(item => {
            materialList.push(item)
          });
        }

        if (this.reports && this.reports.length > 0) {
          this.reports.forEach(item => {
            materialList.push(item)
          });
          this.isReportsNull = false;
          this.reportErrorMsg = '';
        } else {
          this.isReportsNull = true;
          this.reportErrorMsg = '请上传人行报告！';
        }
        if (this.others && this.others.length > 0) {
          this.others.forEach(item => {
            materialList.push(item)
          });
        }

        if (this.productType == "QYT_LOANS") {
          if (this.credits && this.credits.length > 0) {
            this.credits.forEach(item => {
              materialList.push(item)
            });
            this.isCreditsNull = false;
            this.creditsErrorMsg = '';
          } else {
            if (this.creditApplicationAmount <= 200000) {
              this.isCreditsNull = false;
              this.creditsErrorMsg = '';
            } else {
              this.isCreditsNull = true;
              this.creditsErrorMsg = '请上传企业征信！';
            }
          }
        }

        let _params = {
          creditApplicationAmount: this.$getSessionStorage('creditApplicationAmount'),
          proofMaterialDTOList: materialList
        };
        const params = Object.assign(_params, checkedItems, accountInfos);
        if (this.productType == "DST_LOANS") {
          if (!this.isReportsNull && !this.isLicensesNull) {
            api.postCreditDSTApply(params).then(res => {
              if (res.data.code === 201) {
                this.$router.push({
                  name: 'successPage',
                  query: {
                    pageName: 'creditSupplementPage'
                  }
                })
              } else {
                this.showAuthDialog = true;
                this.isSuccess = false;
                this.isDirect = false;
                this.messageInfo = '申请授信失败，请检查信息是否正确';
              }
            }).catch(response => {
              this.showAuthDialog = true;
              this.isSuccess = false;
              this.isDirect = false;
              this.messageInfo = response.data.message;
            })
          }
        } else if (this.productType == "QYT_LOANS") {
          if (this.creditApplicationAmount <= 200000) {
            if (!this.isReportsNull && !this.isLicensesNull) {
              api.postCreditQYTApply(params).then(res => {
                if (res.data.code === 201) {
                  this.$router.push({
                    name: 'successPage',
                    query: {
                      pageName: 'creditSupplementPage'
                    }
                  })
                } else {
                  this.showAuthDialog = true;
                  this.isSuccess = false;
                  this.isDirect = false;
                  this.messageInfo = '申请授信失败，请检查信息是否正确';
                }
              }).catch(response => {
                this.showAuthDialog = true;
                this.isSuccess = false;
                this.isDirect = false;
                this.messageInfo = response.data.message;
              })
            }
          } else {
            if (!this.isReportsNull && !this.isLicensesNull && !this.isCreditsNull) {
              api.postCreditQYTApply(params).then(res => {
                if (res.data.code === 201) {
                  this.$router.push({
                    name: 'successPage',
                    query: {
                      pageName: 'creditSupplementPage'
                    }
                  })
                } else {
                  this.showAuthDialog = true;
                  this.isSuccess = false;
                  this.isDirect = false;
                  this.messageInfo = '申请授信失败，请检查信息是否正确';
                }
              }).catch(response => {
                this.showAuthDialog = true;
                this.isSuccess = false;
                this.isDirect = false;
                this.messageInfo = response.data.message;
              })
            }
          }
        }
      },
      handleClose() {
        this.showAuthDialog = false;
        this.messageInfo = '';
      },
      handleDirectPage() {
        this.$router.push({
          name: 'HomePage'
        });
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .auth-sup-inner .el-upload-list {
    li:nth-child(2n) {
      margin-left: 0;
    }
  }

  .supple-error {
    font-size: 12px;
    color: red;
    line-height: 30px;
  }

  .credit-reports {
    .mj-upload.isBlock {
      .el-upload-list--picture-card {
        display: block;
        width: 908px;
        zoom: 1;
        .el-upload-list__item {
          display: block;
          float: left;
        }
      }
      .el-upload-list--picture-card:after {
        content: "";
        display: block;
        clear: both;
      }
    }
    .mj-upload.isPosition {
      .upload {
        width: 908px;
        position: relative;
        .el-upload--picture-card {
          position: absolute;
          left: 363px;
          bottom: 10px;
        }
      }
    }
    .mj-upload.lengthone {
      .upload {
        .el-upload--picture-card {
          bottom: 24px;
        }
      }

    }
  }

</style>
