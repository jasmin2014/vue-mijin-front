<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'QuotaPage'"></mijin-header>
    <div class="credit-content">
      <mijin-steps first second third forth class="mijin-steps"></mijin-steps>
      <div class="main-content credit-form">
        <h3>补充信息</h3>
        <div class="credit-form-inner auth-sup-inner right">
          <el-form ref="supplementForm" :model="supplementForm" label-width="160px">
            <div class="flex-start credit-idCode credit-reports">
              <el-form-item label="家庭状况证明：">
                <mj-upload
                  v-model="familyStatus_pic"
                  :limit="4"
                  :max-size="'5M'"
                  :placeholder="placeholderMsg4"
                  @success="handleFamilyStatusSuccess"
                  @remove="handleFamilyStatusRemove"
                ></mj-upload>
              </el-form-item>
            </div>
            <div class="flex-start credit-idCode credit-reports">
              <el-form-item class="is-required" prop="licenses">
                <span v-if="productType === 'DST_LOANS'" slot="label">
                  营业执照 /
                  <br>淘宝店铺截图：
                </span>
                <span v-else slot="label">营业执照</span>
                <mj-upload
                  v-model="licenses_pic"
                  :limit="4"
                  :max-size="'5M'"
                  :placeholder="placeholderMsg4"
                  @success="handleLicenseSuccess"
                  @remove="handleRemoveLicense"
                ></mj-upload>
                <p class="supple-error" v-if="isLicensesNull">{{licensesErrorMsg}}</p>
              </el-form-item>
            </div>
            <div class="flex-start credit-idCode credit-reports">
              <el-form-item :class="{'is-required':productType==='YCT_LOANS'}" label="经营地证明：">
                <mj-upload
                  v-model="businessLand_pic"
                  :limit="4"
                  :max-size="'5M'"
                  :placeholder="placeholderMsg4"
                  @success="handleBusinessLandSuccess"
                  @remove="handleBusinessLandRemove"
                ></mj-upload>
                <p
                  class="supple-error"
                  v-if="isBusinessLandNull && productType==='YCT_LOANS'"
                >{{businessLandErrorMsg}}</p>
              </el-form-item>
            </div>
            <div v-if="productType==='YCT_LOANS'">
              <div class="flex-start credit-idCode credit-reports">
                <el-form-item class="is-required" label="店铺照片：">
                  <mj-upload
                    v-model="shopPictures_pic"
                    :limit="4"
                    :max-size="'5M'"
                    :placeholder="placeholderMsg4"
                    @success="handleShopPicturesSuccess"
                    @remove="handleShopPicturesRemove"
                  ></mj-upload>
                  <p class="supple-error" v-if="isShopPicturesNull">{{shopPicturesErrorMsg}}</p>
                </el-form-item>
              </div>
              <div class="flex-start credit-idCode credit-reports">
                <el-form-item class="is-required" label="烟草零售许可证：">
                  <mj-upload
                    v-model="retailLicense_pic"
                    :limit="4"
                    :max-size="'5M'"
                    :placeholder="placeholderMsg4"
                    @success="handleRetailLicenseSuccess"
                    @remove="handleRetailLicenseRemove"
                  ></mj-upload>
                  <p class="supple-error" v-if="isRetailLicenseNull">{{retailLicenseErrorMsg}}</p>
                </el-form-item>
              </div>
            </div>
            <div class="flex-start credit-idCode credit-reports" v-if="productType==='DST_LOANS'">
              <el-form-item label="淘宝贷款截图：">
                <mj-upload
                  v-model="taobaoScreen_pic"
                  :limit="4"
                  :max-size="'10M'"
                  :placeholder="placeholderMsg4"
                  @success="handleTaobaoScreenSuccess"
                  @remove="handleTaobaoScreenRemove"
                ></mj-upload>
              </el-form-item>
            </div>

            <div class="flex-start credit-idCode credit-reports" v-if="productType==='KJT_LOANS'">
              <el-form-item label="店铺数据截图：">
                <mj-upload
                  v-model="shopScreen_pic"
                  :limit="4"
                  :max-size="'10M'"
                  :placeholder="placeholderMsg4"
                  @success="handleShopScreenSuccess"
                  @remove="handleShopScreenRemove"
                ></mj-upload>
              </el-form-item>
            </div>
            <div>
              <div class="flex-start credit-idCode credit-reports">
                <el-form-item class="is-required" label="人行报告：" prop="reports">
                  <mj-upload
                    :class="{'isBlock': this.reports.length > 1,'lengthone':this.reports.length === 1,'isPosition': this.isPosition}"
                    v-model="reports_pic"
                    :limit="5"
                    :max-size="'10M'"
                    :placeholder="placeholderMsg5"
                    @success="handleReportsSuccess"
                    @remove="handleReportsRemove"
                  ></mj-upload>
                  <p class="supple-error" v-if="isReportsNull">{{reportErrorMsg}}</p>
                </el-form-item>
              </div>
            </div>
            <div v-if="productType==='YCT_LOANS' || productType==='QYT_LOANS'">
              <div class="flex-start credit-idCode credit-sups">
                <el-form-item label="配偶人行报告：">
                  <mj-upload
                    :class="{'isBlock': this.spouseRep.length > 1,'lengthone':this.spouseRep.length === 1,'isPosition': this.isPosition_spouseRep}"
                    v-model="spouseRep_pic"
                    :limit="5"
                    :max-size="'10M'"
                    :placeholder="placeholderMsg5"
                    @success="handleSpouseRepSuccess"
                    @remove="handleSpouseRepRemove"
                  ></mj-upload>
                </el-form-item>
              </div>
            </div>
            <div v-if="this.productType=='QYT_LOANS'">
              <div class="flex-start credit-idCode credit-sups">
                <el-form-item
                  class="is-required"
                  label="企业征信："
                  prop="credits"
                  v-if="this.creditApplicationAmount > 200000"
                >
                  <mj-upload
                    :class="{'isBlock': this.credits.length > 1,'isPosition': this.isPosition_credits}"
                    v-model="credits_pic"
                    :limit="10"
                    :max-size="'10M'"
                    :placeholder="placeholderMsg10"
                    @success="handleCreditSuccess"
                    @remove="handleCreditRemove"
                  ></mj-upload>
                  <p class="supple-error" v-if="isCreditsNull">{{creditsErrorMsg}}</p>
                </el-form-item>
                <el-form-item label="企业征信：" prop="credits" v-else>
                  <mj-upload
                    :class="{'isBlock': this.credits.length > 1,'isPosition': this.isPosition_credits}"
                    v-model="credits_pic"
                    :limit="10"
                    :max-size="'10M'"
                    :placeholder="placeholderMsg10"
                    @success="handleCreditSuccess"
                    @remove="handleCreditRemove"
                  ></mj-upload>
                  <p class="supple-error" v-if="isCreditsNull">{{creditsErrorMsg}}</p>
                </el-form-item>
              </div>
              <div class="flex-start credit-idCode credit-reports">
                <el-form-item label="场地照片：">
                  <mj-upload
                    v-model="placePic_pic"
                    :limit="4"
                    :max-size="'10M'"
                    :placeholder="placeholderMsg4"
                    @success="handlePlacePicSuccess"
                    @remove="handlePlacePicRemove"
                  ></mj-upload>
                </el-form-item>
              </div>
              <div class="flex-start credit-idCode credit-reports">
                <el-form-item label="员工通讯录：">
                  <mj-upload
                    v-model="employeeAddress_pic"
                    :limit="1"
                    :max-size="'10M'"
                    :placeholder="placeholderMsg"
                    @success="handleEmployeeAddressSuccess"
                    @remove="handleEmployeeAddressRemove"
                  ></mj-upload>
                </el-form-item>
              </div>
              <div class="flex-start credit-idCode credit-reports">
                <el-form-item label="增值税开票数据：">
                  <mj-upload
                    v-model="ticketOpening_pic"
                    :limit="4"
                    :max-size="'10M'"
                    :placeholder="placeholderMsg4"
                    @success="handleTicketOpeningSuccess"
                    @remove="handleTicketOpeningRemove"
                  ></mj-upload>
                </el-form-item>
              </div>
            </div>
            <div class="flex-start credit-idCode credit-sups">
              <el-form-item label="其它资料：">
                <mj-upload
                  :class="{'isBlock': this.others.length > 1,'isPosition': this.isPosition_others}"
                  v-model="others_pic"
                  :limit="10"
                  :max-size="'10M'"
                  :placeholder="placeholderMsg10"
                  @success="handleOtherSuccess"
                  @remove="handleOtherRemove"
                ></mj-upload>
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
    <mijin-dialog
      v-if="showAuthDialog && isDirect"
      :is-success="isSuccess"
      :message="messageInfo"
      :is-direct="isDirect"
      @ok="handleDirectPage"
    ></mijin-dialog>
    <mijin-dialog
      v-else-if="showAuthDialog && !isDirect"
      :is-success="isSuccess"
      :message="messageInfo"
      @close="handleClose"
    ></mijin-dialog>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import MijinSteps from "../components/steps.vue";
import MijinDialog from "../../components/dialogBox.vue";
import * as api from "../api/account";
import * as commonApi from "../../api/common";
import { getImgList } from "../api/authority.js";

export default {
  name: "creditSupplementPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinSteps,
    MijinDialog
  },
  data() {
    return {
      productId: "",
      productType: "",
      creditApplicationAmount: undefined,
      supplementForm: {
        familyStatus: [],
        licenses: [],
        businessLand: [],
        reports: [],
        credits: [],
        others: [],
        shopPictures: [],
        retailLicense: [],
        spouseRep: [],
        taobaoScreen: [],
        placePic: [],
        employeeAddress: [],
        ticketOpening: [],
        shopScreen: []
      },
      proofMaterialDTOList: [],
      isPosition: false,
      isPosition_spouseRep: false, //配偶人行征信报告
      isPosition_others: false,
      isPosition_credits: false,
      familyStatus: [], //家庭情况
      licenses: [], //营业执照
      licenses_img: [],
      businessLand: [], //经营地证明
      reports: [], //人行报告
      credits: [], //企业征信
      shopPictures: [], //烟草通-店铺照片
      retailLicense: [], //烟草通-烟草零售许可证
      spouseRep: [], //配偶人行征信报告
      taobaoScreen: [], //电商通-淘宝贷款截图
      placePic: [], //企业通-场地照片
      employeeAddress: [], //企业通-员工通讯录
      ticketOpening: [], //企业通-增值税开票数据
      shopScreen: [], //跨境通-店铺数据截图
      others: [], //其他
      isReportsNull: false,
      reportErrorMsg: "",
      isLicensesNull: false,
      licensesErrorMsg: "",
      isBusinessLandNull: false,
      businessLandErrorMsg: "",
      isCreditsNull: false,
      creditsErrorMsg: "",
      showAuthDialog: false,
      isSuccess: false,
      isDirect: false,
      isShopPicturesNull: false,
      shopPicturesErrorMsg: "",
      isRetailLicenseNull: false,
      retailLicenseErrorMsg: "",
      messageInfo: "",
      placeholderMsg:
        "注：支持png、pdf、jpg、jpeg,单张大小不超过10M,最多上传1张",
      placeholderMsg4:
        "注：支持png、pdf、jpg、jpeg,单张大小不超过10M,最多上传4张",
      placeholderMsg5:
        "注：支持png、pdf、jpg、jpeg,单张大小不超过10M,最多上传5张",
      placeholderMsg10:
        "注：支持png、pdf、jpg、jpeg,单张大小不超过10M,最多上传10张"
    };
  },
  created() {
    this.productId = JSON.parse(
      this.$getSessionStorage("checkedItems")
    ).productId;
    this.getProductDetail(this.productId);
    this.creditApplicationAmount = JSON.parse(
      this.$getSessionStorage("creditApplicationAmount")
    );
    this.getImgList();
  },
  computed: {
    familyStatus_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.PERSONAL_RESIDENCE_BOOK)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.PERSONAL_RESIDENCE_BOOK
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    },
    licenses_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.COM_BUSINESS_LICENSE)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.COM_BUSINESS_LICENSE
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    },
    businessLand_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.DOMICILE_BUSINESS_CERTIFICATE)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.DOMICILE_BUSINESS_CERTIFICATE
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    },
    shopPictures_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.SHOP_PHOTO)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.SHOP_PHOTO
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    },
    retailLicense_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.TOBACCO_RETAIL_LICENSE)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.TOBACCO_RETAIL_LICENSE
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    },
    taobaoScreen_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.COM_LOANS_PRINTSCREEN)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.COM_LOANS_PRINTSCREEN
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    },
    shopScreen_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.COM_SHOP_DATA_PRINTSCREEN)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.COM_SHOP_DATA_PRINTSCREEN
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    },
    reports_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.BANK_CREDIT_REPORT)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.BANK_CREDIT_REPORT
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    },
    spouseRep_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.SPOUSE_BANK_CREDIT_REPORT)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.SPOUSE_BANK_CREDIT_REPORT
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    },
    credits_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.COM_CREDIT_AUTHORIZATION)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.COM_CREDIT_AUTHORIZATION
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    },
    placePic_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.COM_PLACE_PRINTSCREEN)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.COM_PLACE_PRINTSCREEN
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    },
    employeeAddress_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.COM_STAFF_CONTACTS_LIST)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.COM_STAFF_CONTACTS_LIST
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    },
    ticketOpening_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.COM_INVOICE_PHOTO)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.COM_INVOICE_PHOTO
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    },
    others_pic: {
      get() {
        let _IDcodePositive = [],
          currentIDcode = [];
        if (this.proofMaterialDTOList && this.proofMaterialDTOList.length > 0) {
          _IDcodePositive = this.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.USER_OTHER_MATERIAL)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.name.split(".")[_.name.split(".").length - 1],
              kind: this.$enum.USER_OTHER_MATERIAL
            }));
          if (_IDcodePositive.length > 0) {
            _IDcodePositive.forEach(item => {
              currentIDcode.push(item);
            });
          }
        }
        return currentIDcode;
      }
    }
  },
  methods: {
    async getImgList() {
      let result = await this.toGetImgList();
      console.log(result);
      if (result && result.length > 0) {
        this.proofMaterialDTOList = result;
        result.forEach(item => {
          // 家庭情况证明
          if (item.kind === this.$enum.PERSONAL_RESIDENCE_BOOK) {
            this.familyStatus.push(item);
          }
          // 营业执照
          else if (item.kind === this.$enum.COM_BUSINESS_LICENSE) {
            this.licenses.push(item);
          }
          // 经营地证明
          else if (item.kind === this.$enum.DOMICILE_BUSINESS_CERTIFICATE) {
            this.businessLand.push(item);
          }
          // 烟草通-店铺图片
          else if (item.kind === this.$enum.SHOP_PHOTO) {
            this.shopPictures.push(item);
          }
          // 烟草通-烟草零售许可证
          else if (item.kind === this.$enum.TOBACCO_RETAIL_LICENSE) {
            this.retailLicense.push(item);
          }
          // 电商通-淘宝贷款截图
          else if (item.kind === this.$enum.COM_LOANS_PRINTSCREEN) {
            this.taobaoScreen.push(item);
          }
          // 跨境通-店铺数据截图
          else if (item.kind === this.$enum.COM_SHOP_DATA_PRINTSCREEN) {
            this.shopScreen.push(item);
          }
          // 人行报告
          else if (item.kind === this.$enum.BANK_CREDIT_REPORT) {
            this.reports.push(item);
          }
          // 配偶人行征信报告
          else if (item.kind === this.$enum.SPOUSE_BANK_CREDIT_REPORT) {
            this.spouseRep.push(item);
          }
          // 企业征信
          else if (item.kind === this.$enum.COM_CREDIT_AUTHORIZATION) {
            this.credits.push(item);
          }
          // 企业通-场地照片
          else if (item.kind === this.$enum.COM_PLACE_PRINTSCREEN) {
            this.placePic.push(item);
          }
          // 企业通-员工通讯录
          else if (item.kind === this.$enum.COM_STAFF_CONTACTS_LIST) {
            this.employeeAddress.push(item);
          }
          // 企业通-增值税开票数据
          else if (item.kind === this.$enum.COM_INVOICE_PHOTO) {
            this.ticketOpening.push(item);
          }
          // 其他
          else if (item.kind === this.$enum.USER_OTHER_MATERIAL) {
            this.others.push(item);
          }
        });
      }
    },
    toGetImgList() {
      return new Promise((resolve, reject) => {
        getImgList().then(
          res => {
            if (
              res.data.code == 200 &&
              res.data.body &&
              res.data.body.length > 0
            ) {
              resolve(res.data.body);
            } else {
              reject([]);
            }
          },
          err => {
            reject([]);
          }
        );
      });
    },
    // 获取产品详情
    getProductDetail(productId) {
      api.getProductInfo(productId).then(res => {
        if (res.data.code === 200) {
          this.productType = res.data.body.productType;
        }
      });
    },
    routerBack() {
      this.$router.go(-1);
    },
    //营业执照/店铺截图校验
    validateLicense() {
      if (this.licenses.length < 1) {
        this.isLicensesNull = true;
        this.licensesErrorMsg =
          this.productType == "DST_LOANS"
            ? "请上传营业执照/淘宝店铺截图！"
            : "请上传营业执照！";
        return false;
      } else {
        this.isLicensesNull = false;
        this.licensesErrorMsg = "";
      }
    },
    //经营地证明
    validateBusinessLand() {
      if (this.businessLand.length < 1) {
        this.isBusinessLandNull = true;
        this.businessLandErrorMsg = "请上传经营地证明";
        return false;
      } else {
        this.isBusinessLandNull = false;
        this.businessLandErrorMsg = "";
      }
    },
    //店铺照片-烟草通
    validateShopPictures() {
      if (this.shopPictures.length < 1) {
        this.isShopPicturesNull = true;
        this.shopPicturesErrorMsg = "请上传店铺照片！";
        return false;
      } else {
        this.isShopPicturesNull = false;
        this.shopPicturesErrorMsg = "";
      }
    },
    //烟草零售许可证-烟草通
    validateRetailLicense() {
      if (this.retailLicense.length < 1) {
        this.isRetailLicenseNull = true;
        this.retailLicenseErrorMsg = "请上传烟草零售许可证！";
        return false;
      } else {
        this.isRetailLicenseNull = false;
        this.retailLicenseErrorMsg = "";
      }
    },
    //人行报告
    validateReports() {
      if (this.reports.length < 1) {
        this.isReportsNull = true;
        this.reportErrorMsg = "请上传人行报告！";
        return false;
      } else {
        this.isReportsNull = false;
        this.reportErrorMsg = "";
      }
    },
    //企业信息
    validateCredit() {
      if (this.credits.length < 1) {
        this.isCreditsNull = true;
        this.creditsErrorMsg = "请上传企业征信！";
        return false;
      } else {
        this.isCreditsNull = false;
        this.creditsErrorMsg = "";
      }
    },

    //家庭情况证明
    handleFamilyStatusSuccess(file) {
      file.kind = this.$enum.PERSONAL_RESIDENCE_BOOK;
      this.familyStatus.push(file);
    },
    handleFamilyStatusRemove(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.familyStatus = [];
      } else {
        this.familyStatus = [];
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: item.response.key,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.PERSONAL_RESIDENCE_BOOK,
            fileUri: item.fileUri ? item.fileUri : item.url
          };
          this.familyStatus.push(_item);
        });
        commonApi.getPicUrls(_keys).then(res => {
          if (res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item, i) => {
              this.familyStatus[i].fileUri = item;
            });
          }
        });
      }
    },
    //营业执照
    handleLicenseSuccess(file) {
      file.kind = this.$enum.COM_BUSINESS_LICENSE;
      this.licenses.push(file);
      this.validateLicense();
    },
    handleRemoveLicense(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.licenses = [];
      } else {
        this.licenses = [];
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key != "" ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: _myKey,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.COM_BUSINESS_LICENSE,
            fileUri: item.fileUri ? item.fileUri : item.url
          };
          this.licenses.push(_item);
        });
        commonApi.getPicUrls(_keys).then(res => {
          if (res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item, i) => {
              this.licenses[i].fileUri = item;
            });
          }
        });
      }
      this.validateLicense();
    },
    //经营地证明
    handleBusinessLandSuccess(file) {
      file.kind = this.$enum.DOMICILE_BUSINESS_CERTIFICATE;
      this.businessLand.push(file);
      if (this.productType === "YCT_LOANS") this.validateBusinessLand();
    },
    handleBusinessLandRemove(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.businessLand = [];
      } else {
        this.businessLand = [];
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key != "" ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: _myKey,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.DOMICILE_BUSINESS_CERTIFICATE,
            fileUri: item.fileUri ? item.fileUri : item.url
          };
          this.businessLand.push(_item);
        });
        commonApi.getPicUrls(_keys).then(res => {
          if (res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item, i) => {
              this.businessLand[i].fileUri = item;
            });
          }
        });
      }
      if (this.productType === "YCT_LOANS") this.validateBusinessLand();
    },
    //烟草通-店铺图片
    handleShopPicturesSuccess(file) {
      file.kind = this.$enum.SHOP_PHOTO;
      this.shopPictures.push(file);
      this.validateShopPictures();
    },
    handleShopPicturesRemove(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.shopPictures = [];
      } else {
        this.shopPictures = [];
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key != "" ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: _myKey,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.SHOP_PHOTO,
            fileUri: item.fileUri ? item.fileUri : item.url
          };
          this.shopPictures.push(_item);
        });
        commonApi.getPicUrls(_keys).then(res => {
          if (res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item, i) => {
              this.shopPictures[i].fileUri = item;
            });
          }
        });
      }
      this.validateShopPictures();
    },

    //烟草通-烟草零售许可证
    handleRetailLicenseSuccess(file) {
      file.kind = this.$enum.TOBACCO_RETAIL_LICENSE;
      this.retailLicense.push(file);
      this.validateRetailLicense();
    },
    handleRetailLicenseRemove(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.retailLicense = [];
      } else {
        this.retailLicense = [];
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key != "" ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: _myKey,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.TOBACCO_RETAIL_LICENSE,
            fileUri: item.fileUri ? item.fileUri : item.url
          };
          this.retailLicense.push(_item);
        });
        commonApi.getPicUrls(_keys).then(res => {
          if (res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item, i) => {
              this.retailLicense[i].fileUri = item;
            });
          }
        });
      }
      this.validateRetailLicense();
    },

    //电商通-淘宝贷款截图
    handleTaobaoScreenSuccess(file) {
      file.kind = this.$enum.COM_LOANS_PRINTSCREEN;
      this.taobaoScreen.push(file);
    },
    handleTaobaoScreenRemove(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.taobaoScreen = [];
      } else {
        this.taobaoScreen = [];
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key != "" ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: _myKey,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.COM_LOANS_PRINTSCREEN,
            fileUri: item.fileUri ? item.fileUri : item.url
          };
          this.taobaoScreen.push(_item);
        });
        commonApi.getPicUrls(_keys).then(res => {
          if (res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item, i) => {
              this.taobaoScreen[i].fileUri = item;
            });
          }
        });
      }
    },

    //跨境通-店铺数据截图
    handleShopScreenSuccess(file) {
      file.kind = this.$enum.COM_SHOP_DATA_PRINTSCREEN;
      this.shopScreen.push(file);
    },
    handleShopScreenRemove(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.shopScreen = [];
      } else {
        this.shopScreen = [];
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key != "" ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: _myKey,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.COM_SHOP_DATA_PRINTSCREEN,
            fileUri: item.fileUri ? item.fileUri : item.url
          };
          this.shopScreen.push(_item);
        });
        commonApi.getPicUrls(_keys).then(res => {
          if (res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item, i) => {
              this.shopScreen[i].fileUri = item;
            });
          }
        });
      }
    },

    //企业通-场地照片
    handlePlacePicSuccess(file) {
      file.kind = this.$enum.COM_PLACE_PRINTSCREEN;
      this.placePic.push(file);
    },
    handlePlacePicRemove(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.placePic = [];
      } else {
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key != "" ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: _myKey,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.COM_PLACE_PRINTSCREEN,
            fileUri: item.fileUri ? item.fileUri : item.url
          };
          this.placePic.push(_item);
        });
        commonApi.getPicUrls(_keys).then(res => {
          if (res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item, i) => {
              this.placePic[i].fileUri = item;
            });
          }
        });
      }
    },

    //企业通-员工通讯录
    handleEmployeeAddressSuccess(file) {
      file.kind = this.$enum.COM_STAFF_CONTACTS_LIST;
      this.employeeAddress.push(file);
    },
    handleEmployeeAddressRemove(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.employeeAddress = [];
      } else {
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key != "" ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: _myKey,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.COM_STAFF_CONTACTS_LIST,
            fileUri: item.fileUri ? item.fileUri : item.url
          };
          this.employeeAddress.push(_item);
        });
        commonApi.getPicUrls(_keys).then(res => {
          if (res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item, i) => {
              this.employeeAddress[i].fileUri = item;
            });
          }
        });
      }
    },

    //企业通-增值税开票数据
    handleTicketOpeningSuccess(file) {
      file.kind = this.$enum.COM_INVOICE_PHOTO;
      this.ticketOpening.push(file);
    },
    handleTicketOpeningRemove(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.ticketOpening = [];
      } else {
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key != "" ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: _myKey,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.COM_INVOICE_PHOTO,
            fileUri: item.fileUri ? item.fileUri : item.url
          };
          this.ticketOpening.push(_item);
        });
        commonApi.getPicUrls(_keys).then(res => {
          if (res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item, i) => {
              this.ticketOpening[i].fileUri = item;
            });
          }
        });
      }
    },

    //人行报告
    handleReportsSuccess(file) {
      file.kind = this.$enum.BANK_CREDIT_REPORT;
      this.reports.push(file);
      this.validateReports();
      if (this.reports.length % 2 === 1) {
        setTimeout(() => {
          this.isPosition = true;
        }, 200);
      } else {
        setTimeout(() => {
          this.isPosition = false;
        }, 200);
      }
    },
    handleReportsRemove(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.reports = [];
      } else {
        this.reports = [];
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key != "" ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: _myKey,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.BANK_CREDIT_REPORT,
            fileUri: item.fileUri ? item.fileUri : item.url
          };
          this.reports.push(_item);
        });
        commonApi.getPicUrls(_keys).then(res => {
          if (res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item, i) => {
              this.reports[i].fileUri = item;
            });
          }
        });
      }
      if (this.reports.length % 2 === 1) {
        setTimeout(() => {
          this.isPosition = true;
        }, 200);
      } else {
        setTimeout(() => {
          this.isPosition = false;
        }, 200);
      }
      this.validateReports();
    },

    //配偶人行征信报告
    handleSpouseRepSuccess(file) {
      file.kind = this.$enum.SPOUSE_BANK_CREDIT_REPORT;
      this.spouseRep.push(file);
      if (this.spouseRep.length % 2 === 1) {
        setTimeout(() => {
          this.isPosition_spouseRep = true;
        }, 200);
      } else {
        setTimeout(() => {
          this.isPosition_spouseRep = false;
        }, 200);
      }
    },
    handleSpouseRepRemove(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.spouseRep = [];
      } else {
        this.spouseRep = [];
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key != "" ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: _myKey,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.SPOUSE_BANK_CREDIT_REPORT,
            fileUri: item.fileUri ? item.fileUri : item.url
          };
          this.spouseRep.push(_item);
        });
        commonApi.getPicUrls(_keys).then(res => {
          if (res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item, i) => {
              this.spouseRep[i].fileUri = item;
            });
          }
        });
      }
      if (this.spouseRep.length % 2 === 1) {
        setTimeout(() => {
          this.isPosition_spouseRep = true;
        }, 200);
      } else {
        setTimeout(() => {
          this.isPosition_spouseRep = false;
        }, 200);
      }
    },

    //其他
    handleOtherSuccess(file) {
      file.kind = this.$enum.USER_OTHER_MATERIAL;
      this.others.push(file);
      if (this.others.length % 2 === 1) {
        setTimeout(() => {
          this.isPosition_others = true;
        }, 200);
      } else {
        setTimeout(() => {
          this.isPosition_others = false;
        }, 200);
      }
    },
    handleOtherRemove(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.others = [];
      } else {
        this.others = [];
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key != "" ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: _myKey,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.USER_OTHER_MATERIAL,
            fileUri: item.fileUri ? item.fileUri : item.url
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
        }, 200);
      } else {
        setTimeout(() => {
          this.isPosition_others = false;
        }, 200);
      }
    },

    //企业征信
    handleCreditSuccess(file) {
      file.kind = this.$enum.COM_CREDIT_AUTHORIZATION;
      this.credits.push(file);
      if (this.credits.length % 2 === 1) {
        setTimeout(() => {
          this.isPosition_credits = true;
        }, 200);
      } else {
        setTimeout(() => {
          this.isPosition_credits = false;
        }, 200);
      }
      // if (this.creditApplicationAmount > 200000) {
      //   this.validateCredit();
      // }
    },
    handleCreditRemove(file, fileList) {
      const fileName = file.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      const _keys = [];
      if (fileList.length === 0) {
        this.credits = [];
      } else {
        this.credits = [];
        let _item = {};
        fileList.forEach(item => {
          var _myKey =
            item.response && item.response.key != "" ? item.response.key : "";
          if (_myKey != "") {
            _keys.push(_myKey);
          }
          _item = {
            key: _myKey,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.COM_CREDIT_AUTHORIZATION,
            fileUri: item.fileUri ? item.fileUri : item.url
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
      // if (this.creditApplicationAmount > 200000) {
      //   this.validateCredit();
      // }
      if (this.credits.length % 2 === 1) {
        setTimeout(() => {
          this.isPosition_credits = true;
        }, 200);
      } else {
        setTimeout(() => {
          this.isPosition_credits = false;
        }, 200);
      }
    },

    handleOpenAccount() {
      const checkedItems = JSON.parse(this.$getSessionStorage("checkedItems"));
      const accountInfos = JSON.parse(this.$getSessionStorage("accountInfos"));
      let materialList = [];
      //电商通(家庭情况 营业执照/淘宝截图 经营地证明 淘宝贷款截图 人行报告 其他资料)
      if (this.productType === "DST_LOANS") {
        this.validateLicense();
        this.validateReports();
        this.familyStatus.forEach(item => {
          materialList.push(item);
        });
        this.licenses.forEach(item => {
          materialList.push(item);
        });
        this.businessLand.forEach(item => {
          materialList.push(item);
        });
        this.taobaoScreen.forEach(item => {
          materialList.push(item);
        });
        this.reports.forEach(item => {
          materialList.push(item);
        });
        this.others.forEach(item => {
          materialList.push(item);
        });
      } else if (this.productType === "QYT_LOANS") {
        //企业通(家庭情况 营业执照 经营地证明 人行报告 配偶人行报告 企业征信 其他资料 员工通讯录 增值税开票数据)
        this.validateLicense();
        this.validateReports();
        this.familyStatus.forEach(item => {
          materialList.push(item);
        });
        this.licenses.forEach(item => {
          materialList.push(item);
        });
        this.businessLand.forEach(item => {
          materialList.push(item);
        });
        this.reports.forEach(item => {
          materialList.push(item);
        });
        this.spouseRep.forEach(item => {
          materialList.push(item);
        });
        if (this.creditApplicationAmount <= 200000) {
          this.credits.forEach(item => {
            materialList.push(item);
          });
        } else {
          this.validateCredit();
          this.credits.forEach(item => {
            materialList.push(item);
          });
        }
        this.placePic.forEach(item => {
          materialList.push(item);
        });
        this.others.forEach(item => {
          materialList.push(item);
        });
        this.employeeAddress.forEach(item => {
          materialList.push(item);
        });
        this.ticketOpening.forEach(item => {
          materialList.push(item);
        });
      } else if (this.productType === "KJT_LOANS") {
        //跨境通(家庭情况 营业执照 经营地证明 店铺数据截图 人行报告 其他资料)
        this.validateLicense();
        this.validateReports();
        this.familyStatus.forEach(item => {
          materialList.push(item);
        });
        this.licenses.forEach(item => {
          materialList.push(item);
        });
        this.businessLand.forEach(item => {
          materialList.push(item);
        });
        this.shopScreen.forEach(item => {
          materialList.push(item);
        });
        this.reports.forEach(item => {
          materialList.push(item);
        });
        this.others.forEach(item => {
          materialList.push(item);
        });
      } else if (this.productType === "YCT_LOANS") {
        //烟草通(家庭情况 营业执照 经营地证明 店铺照片 烟草零售许可证 人行报告 配偶人行报告 其他资料)
        this.validateLicense();
        this.validateBusinessLand();
        this.validateShopPictures();
        this.validateRetailLicense();
        this.validateReports();
        this.familyStatus.forEach(item => {
          materialList.push(item);
        });
        this.licenses.forEach(item => {
          materialList.push(item);
        });
        this.businessLand.forEach(item => {
          materialList.push(item);
        });
        this.shopPictures.forEach(item => {
          materialList.push(item);
        });
        this.retailLicense.forEach(item => {
          materialList.push(item);
        });
        this.reports.forEach(item => {
          materialList.push(item);
        });
        this.spouseRep.forEach(item => {
          materialList.push(item);
        });
        this.others.forEach(item => {
          materialList.push(item);
        });
      }

      let _params = {
        creditApplicationAmount: this.$getSessionStorage(
          "creditApplicationAmount"
        ),
        proofMaterialDTOList: materialList
      };
      const params = Object.assign(_params, checkedItems, accountInfos);
      console.log(this.productType, "params===============", params);
      if (this.productType === "DST_LOANS") {
        if (!this.isReportsNull && !this.isLicensesNull) {
          api
            .postCreditDSTApply(params)
            .then(res => {
              if (res.data.code === 201) {
                this.$router.push({
                  name: "successPage",
                  query: {
                    pageName: "creditSupplementPage"
                  }
                });
              } else {
                this.showAuthDialog = true;
                this.isSuccess = false;
                this.isDirect = false;
                this.messageInfo = "申请授信失败，请检查信息是否正确";
              }
            })
            .catch(response => {
              this.showAuthDialog = true;
              this.isSuccess = false;
              this.isDirect = false;
              this.messageInfo = response.data.message;
            });
        }
      } else if (this.productType === "KJT_LOANS") {
        if (!this.isReportsNull && !this.isLicensesNull) {
          api
            .postCreditKJTApply(params)
            .then(res => {
              if (res.data.code === 201) {
                this.$router.push({
                  name: "successPage",
                  query: {
                    pageName: "creditSupplementPage"
                  }
                });
              } else {
                this.showAuthDialog = true;
                this.isSuccess = false;
                this.isDirect = false;
                this.messageInfo = "申请授信失败，请检查信息是否正确";
              }
            })
            .catch(response => {
              this.showAuthDialog = true;
              this.isSuccess = false;
              this.isDirect = false;
              this.messageInfo = response.data.message;
            });
        }
      } else if (this.productType === "QYT_LOANS") {
        params.inviteCode = this.$getSessionStorage("inviteCode");
        if (this.creditApplicationAmount <= 200000) {
          if (!this.isReportsNull && !this.isLicensesNull) {
            api
              .postCreditQYTApply(params)
              .then(res => {
                if (res.data.code === 201) {
                  this.$router.push({
                    name: "successPage",
                    query: {
                      pageName: "creditSupplementPage"
                    }
                  });
                } else {
                  this.showAuthDialog = true;
                  this.isSuccess = false;
                  this.isDirect = false;
                  this.messageInfo = "申请授信失败，请检查信息是否正确";
                }
              })
              .catch(response => {
                this.showAuthDialog = true;
                this.isSuccess = false;
                this.isDirect = false;
                this.messageInfo = response.data.message;
              });
          }
        } else {
          if (
            !this.isReportsNull &&
            !this.isLicensesNull &&
            !this.isCreditsNull
          ) {
            api
              .postCreditQYTApply(params)
              .then(res => {
                if (res.data.code === 201) {
                  this.$router.push({
                    name: "successPage",
                    query: {
                      pageName: "creditSupplementPage"
                    }
                  });
                } else {
                  this.showAuthDialog = true;
                  this.isSuccess = false;
                  this.isDirect = false;
                  this.messageInfo = "申请授信失败，请检查信息是否正确";
                }
              })
              .catch(response => {
                this.showAuthDialog = true;
                this.isSuccess = false;
                this.isDirect = false;
                this.messageInfo = response.data.message;
              });
          }
        }
      } else if (this.productType === "YCT_LOANS") {
        if (
          !this.isLicensesNull &&
          !this.isBusinessLandNull &&
          !this.isShopPicturesNull &&
          !this.isRetailLicenseNull &&
          !this.isReportsNull
        ) {
          api
            .postCreditYCTApply(params)
            .then(response => {
              const res = response.data;
              if (res.code === 201) {
                this.$router.push({
                  name: "successPage",
                  query: {
                    pageName: "creditSupplementPage"
                  }
                });
              } else {
                this.showAuthDialog = true;
                this.isSuccess = false;
                this.isDirect = false;
                this.messageInfo = "申请授信失败，请检查信息是否正确";
              }
            })
            .catch(response => {
              this.showAuthDialog = true;
              this.isSuccess = false;
              this.isDirect = false;
              this.messageInfo = response.data.message;
            });
        } else {
        }
      }
    },
    handleClose() {
      this.showAuthDialog = false;
      this.messageInfo = "";
    },
    handleDirectPage() {
      this.$router.push({
        name: "HomePage"
      });
    }
  }
};
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
