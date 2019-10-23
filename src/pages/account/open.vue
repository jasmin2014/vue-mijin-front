<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'QuotaPage'"></mijin-header>
    <div class="credit-content">
      <div class="main-content credit-form">
        <h3>开户</h3>
        <div class="credit-form-inner open-form-inner">
          <!--<el-form ref="openForm" :model="openForm" label-width="180px" :rules="activeTab === ENTERPRISE ? openFormRules : openPersonalFormRules">-->
          <!-- <div class="credit-form-toptext">
            <p>授信额度超过20万，需开通对公账户，放款金额将打入对公银行卡。</p>
            <p>授信额度小于20万，用户可自行选择开通对私账户或对公账户。</p>
          </div> -->
          <div class="credit-headers flex-start" v-show="accountChance">
            <label class="credit-headers-label">请选择开户主体</label>
            <div class="credit-headers-tabs flex-start">
              <div class="cursor" :class="{'active': activeTab === ENTERPRISE}" @click="handleChanteTab(ENTERPRISE)">公司</div>
              <div class="cursor" :class="{'active': activeTab === PERSONAL}" @click="handleChanteTab(PERSONAL)">个人</div>
            </div>
          </div>
          <div class="credit-tab-content">
            <div class="credit-tab-pane" v-show="activeTab === ENTERPRISE">
              <el-form ref="openForm" :model="openForm" label-width="180px" :rules="openFormRules" :disabled="openDisabled">
                <el-form-item label="企业名称：" prop="name">
                  <div class="width450">
                    <mj-input v-model.trim="openForm.name"></mj-input>
                  </div>
                </el-form-item>
                <el-form-item label="统一社会信用代码：" prop="identityCode">
                  <div class="width450">
                    <mj-input v-model.trim="openForm.identityCode"></mj-input>
                  </div>
                </el-form-item>
                <el-form-item label="对公银行卡号：" prop="cardNo">
                  <div class="width450">
                    <mj-input v-if="cardNoIsDisable" v-model.trim="openForm.cardNo" :mode="'VIEW'"></mj-input>
                    <mj-input v-else v-model.trim="openForm.cardNo"></mj-input>
                  </div>
                </el-form-item>
                <el-form-item label="银行预留手机号：" prop="preMobile">
                  <div class="width450">
                    <mj-input v-model.trim="openForm.preMobile"></mj-input>
                  </div>
                </el-form-item>
                <div class="flex-start credit-branch-bank">
                  <el-form-item label="开户银行：" prop="bankName">
                    <mj-select v-model="openForm.bankName" :options="bankList" @kv-change="handleChangeBankName"
                      :clearable="true"></mj-select>
                  </el-form-item>
                  <el-form-item prop="provinceCode" label-width="0">
                    <mj-select v-model="openForm.provinceCode" :region="'86'" ref="changeProvince" @kv-change="handleChangeBankProvince"
                      :clearable="true"></mj-select>
                  </el-form-item>
                  <el-form-item prop="cityCode" label-width="0">
                    <mj-select v-model="openForm.cityCode" :region="openForm.provinceCode" @kv-change="handleChangeBankCity"
                      :clearable="true"></mj-select>
                  </el-form-item>
                </div>

                <el-form-item class="flex-start" prop="branchName" label-width="0" style="padding-left:180px;">
                  <div class="width450_2 el-select">
                    <mj-input v-model.trim="openForm.branchName" placeholder="支行名称"></mj-input>
                  </div>
                  <span class="el-select"> &nbsp;(请填写准确的支行名称，一字不差)</span>
                </el-form-item>

                <el-form-item label="法人代表姓名：" prop="legalName">
                  <div class="width450">
                    <mj-input v-model.trim="openForm.legalName"></mj-input>
                  </div>
                </el-form-item>
                <el-form-item label="法人代表身份证号：" prop="legalIdentityCode">
                  <div class="width450">
                    <mj-input v-model.trim="openForm.legalIdentityCode"></mj-input>
                  </div>
                </el-form-item>


                <el-form-item label="联系人姓名：" prop="contactName">
                  <div class="width450">
                    <mj-input v-model.trim="openForm.contactName"></mj-input>
                  </div>
                </el-form-item>
                <el-form-item label="联系人手机号：" prop="contactPhone">
                  <div class="width450">
                    <mj-input v-model.trim="openForm.contactPhone"></mj-input>
                  </div>
                </el-form-item>
                <el-form-item label="公司地址：" prop="address">
                  <div class="width450">
                    <mj-input v-model.trim="openForm.address"></mj-input>
                  </div>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                  <div class="width450">
                    <mj-input v-model.trim="openForm.email"></mj-input>
                  </div>
                </el-form-item>
                <div class="flex-start credit-idCode credit-idCodes">
                  <div class="flex">
                    <p class="special-label"><span>*</span>公司公章：</p>
                    <div>
                      <mj-upload v-model="seals" :limit="1" :max-size="'5M'" :placeholder="'注：格式png、jpg、jpeg，上传公章需在空白纸上大小控制在5M以内'"
                        :mode="'EDIT'" @success="handleUploadSealPics" @remove="handleRemoveSealPics"></mj-upload>
                      <p style="font-size: 12px; color: red; line-height: 30px;" v-if="sealIsNull">{{sealErrorMsg}}</p>
                    </div>
                  </div>
                  <div class="upload-example">
                    <p class="upload-txt">查看示例</p>
                    <p><img src="../../assets/imgs/seal_example.jpg"> </p>
                  </div>
                </div>
                <div class="flex-start credit-idCode credit-idCodes mt20">
                  <div class="flex">
                    <p class="special-label"><span>*</span>对公账户电子回单：</p>
                    <div>
                      <mj-upload v-model="receipts" :limit="1" :max-size="'10M'" :placeholder="'注：格式png、jpg、jpeg，大小控制在10M以内'"
                        :mode="'EDIT'" @success="handleUploadReceiptsPics" @remove="handleRemoveReceiptPisc"></mj-upload>
                      <p style="font-size: 12px; color: red; line-height: 30px;" v-if="receiptIsNull">{{receiptErrorMsg}}</p>
                    </div>
                  </div>
                  <div class="upload-example">
                    <p class="upload-txt">查看示例</p>
                    <p><img src="../../assets/imgs/receipt_example.jpg"> </p>
                  </div>
                </div>
                <!--<div class="step-agreement credit-agree flex-start">
                  <label :class="{'checked': isCheckedEnterprise}"><i @click="handleCheckedEnterprise"></i></label>
                  <div>我已阅读，并同意<a href="">《借款人服务协议》</a></div>
                </div>-->
                <div class="step-btns">
                  <div class="mj-button orange step-btn-next cursor" @click="handleOpenAccountCompany">开通账户</div>
                </div>
              </el-form>
            </div>
            <div class="credit-tab-pane" v-show="activeTab === PERSONAL">
              <el-form ref="openPersonalForm" :model="openPersonalForm" label-width="170px" :rules="openPersonalFormRules"
                :disabled="personalDisabled">
                <el-form-item label="姓名：">
                  <div class="width450">
                    <mj-input v-model.trim="openPersonalForm.name" :mode="'VIEW'"></mj-input>
                  </div>
                </el-form-item>
                <el-form-item label="身份证号码：">
                  <div class="width450">
                    <mj-input v-model.trim="openPersonalForm.identityCode" :mode="'VIEW'"></mj-input>
                  </div>
                </el-form-item>
                <el-form-item label="银行卡号：" prop="cardNoPersonal">
                  <div class="width450">
                    <mj-input v-if="cardNoIsDisable" v-model.trim="openPersonalForm.cardNoPersonal" :mode="'VIEW'"></mj-input>
                    <mj-input v-else v-model.trim="openPersonalForm.cardNoPersonal"></mj-input>
                  </div>
                </el-form-item>
                <el-form-item label="银行预留手机号：" prop="preMobilePersonal">
                  <div class="width450">
                    <mj-input v-model.trim="openPersonalForm.preMobilePersonal"></mj-input>
                  </div>
                </el-form-item>
                <div class="flex-start credit-branchBank-address">
                  <el-form-item label="支行地点：" prop="provinceCodePersonal">
                    <div class="width450_2">
                      <mj-select v-model="openPersonalForm.provinceCodePersonal" :region="'86'" @kv-change="handleChangeBankProvince"
                        :clearable="true"></mj-select>
                    </div>
                  </el-form-item>
                  <el-form-item prop="cityCodePersonal" label-width="0">
                    <div class="width450_2">
                      <mj-select v-model="openPersonalForm.cityCodePersonal" :region="openPersonalForm.provinceCodePersonal"
                        @kv-change="handleChangeBankCity" :clearable="true"></mj-select>
                    </div>
                  </el-form-item>
                </div>
                <!--<div class="step-agreement credit-agree flex-start">
                  <label :class="{'checked': isChecked}"><i @click="handleChecked"></i></label>
                  <div>我已阅读，并同意<a href="">《借款人服务协议》</a></div>
                </div>-->
                <div class="step-btns">
                  <div class="mj-button orange step-btn-next cursor" @click="handleOpenAccount">开通账户</div>
                  <div class="returnback cursor" @click="showConfirmDialog = true;">支持银行列表</div>
                </div>
              </el-form>
            </div>
          </div>
          <!--</el-form>-->
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <mijin-dialog v-show="showDialog" :is-success="isSuccess" :message="messageInfo" @close="handleClose"></mijin-dialog>
    <div class="users-message-confirm bank-items" v-show="showConfirmDialog">
      <div class="mask"></div>
      <section class="confirm-content banks-box">
        <header>
          <p>支持银行列表</p>
        </header>
        <div class="confirm-banks">
          <el-table :data="bankTable" style="width: 100%">
            <el-table-column prop="name" label="银行" width="200">
              <template slot-scope="scope">
                <img class="banks-icon" :src="scope.row.icon" alt="银行">
                <span class="banks-name">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="卡类型" width="">
            </el-table-column>
            <el-table-column prop="single" label="单笔限额" width="">
            </el-table-column>
            <el-table-column prop="day" label="每日限额" width="">
            </el-table-column>
          </el-table>
        </div>
        <div class="confirm-btn">
          <div class="mj-button orange step-btn-next cursor" @click="showConfirmDialog = false;">关闭</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import MijinHeader from "../../components/header.vue";
import MijinFootter from "../../components/footter.vue";
import MijinSteps from "../components/steps.vue";
import MijinDialog from "../../components/dialogBox.vue";
import { getPicUrls, getRegionEnum } from "../../api/common";
import * as api from "../api/account";

export default {
  name: "accountOpenPage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinSteps,
    MijinDialog
  },
  data() {
    return {
      bankTable: [
        {
          name: "中国工商银行",
          icon: require("../../assets/imgs/bank1.png"),
          type: "储蓄卡",
          single: "5万",
          day: "5万"
        },
        {
          name: "中国银行",
          icon: require("../../assets/imgs/bank2.png"),
          type: "储蓄卡",
          single: "5万",
          day: "5万"
        },
        {
          name: "中国建设银行",
          icon: require("../../assets/imgs/bank3.png"),
          type: "储蓄卡",
          single: "5万",
          day: "5万"
        },
        {
          name: "交通银行",
          icon: require("../../assets/imgs/bank4.png"),
          type: "储蓄卡",
          single: "1万",
          day: "5万"
        },
        {
          name: "光大银行",
          icon: require("../../assets/imgs/bank5.png"),
          type: "储蓄卡",
          single: "5万",
          day: "5万"
        },
        {
          name: "广发银行",
          icon: require("../../assets/imgs/bank6.png"),
          type: "储蓄卡",
          single: "5万",
          day: "5万"
        },
        {
          name: "兴业银行",
          icon: require("../../assets/imgs/bank7.png"),
          type: "储蓄卡",
          single: "5万",
          day: "5万"
        },
        {
          name: "浦发银行",
          icon: require("../../assets/imgs/bank8.png"),
          type: "储蓄卡",
          single: "5万",
          day: "5万"
        },
        {
          name: "上海银行",
          icon: require("../../assets/imgs/bank9.png"),
          type: "储蓄卡",
          single: "10万",
          day: "100万"
        },
        {
          name: "邮储银行",
          icon: require("../../assets/imgs/bank10.png"),
          type: "储蓄卡",
          single: "5000元",
          day: "5000元"
        },
        {
          name: "中信银行",
          icon: require("../../assets/imgs/bank11.png"),
          type: "储蓄卡",
          single: "5000元",
          day: "5000元"
        }
      ],
      activeTab: this.$enum.ENTERPRISE,
      PERSONAL: this.$enum.PERSONAL,
      ENTERPRISE: this.$enum.ENTERPRISE,
      FINANCIAL: this.$enum.FINANCIAL_LENDING,
      THIRD_PARTY: this.$enum.THIRD_PARTY_LENDING,
      isCheckedEnterprise: false,
      isChecked: false,
      showConfirmDialog: false,
      totalLimit: 200000,
      totalCreditAmount: Number(this.$route.query.creditAmount), //授信金额
      accountType: this.$route.query.accountType.toString(), //开户类型:0未开户、1开户、2正在开户、-1无
      accountChance: false,
      showAmountTipMessage: false,
      showDialog: false,
      isSuccess: false,
      messageInfo: "",
      picSeals: [],
      sealIsNull: false,
      sealErrorMsg: "",
      picReceipts: [],
      receiptIsNull: false,
      receiptErrorMsg: "",
      bankList: [],
      openDisabled: false,
      openForm: {
        name: "",
        identityCode: "",
        legalName: "",
        legalIdentityCode: "",
        cardNo: "",
        preMobile: "",
        provinceCode: "",
        cityCode: "",
        bankProvince: "",
        bankCity: "",
        branchName: "",
        contactName: "",
        contactPhone: "",
        address: "",
        email: "",
        proofMaterialDTOList: [],
        bankName: "",
        _bankName: "",
        bankCode: ""
      },
      cardNoIsDisable: false,
      pics: {
        seal: [],
        receipt: []
      },
      personalDisabled: false,
      openPersonalForm: {
        name: "",
        identityCode: "",
        cardNoPersonal: "",
        preMobilePersonal: "",
        provinceCodePersonal: "",
        cityCodePersonal: "",
        bankProvincePersonal: "",
        bankCityPersonal: ""
      },
      openFormRules: {
        name: [
          {
            required: true,
            min: 4,
            max: 50,
            message: "请输入4到50个字符的企业名称",
            trigger: "blur"
          },
          {
            pattern: this.$valid.errorChar,
            message: "输入有误，不允许输入特殊字符",
            trigger: "blur"
          }
        ],
        identityCode: [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur"
          },
          {
            pattern: this.$valid.usciCode,
            message: "18位数字、字母",
            trigger: "blur"
          }
        ],
        legalName: [
          {
            required: true,
            message: "请输入法人代表姓名",
            trigger: "blur"
          },
          {
            pattern: this.$valid.errorChar,
            message: "输入有误，不允许输入特殊字符",
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,
            message: "2-10字以内",
            trigger: "blur"
          }
        ],
        legalIdentityCode: [
          {
            required: true,
            message: "请输入法人代表身份证号",
            trigger: "blur"
          },
          {
            pattern: this.$valid.ident,
            message: "请输入正确的身份证号",
            trigger: "blur"
          }
        ],
        cardNo: [
          {
            required: true,
            message: "请输入银行卡号",
            trigger: "blur"
          },
          {
            pattern: this.$valid.card,
            message: "请输入正确的银行卡号",
            trigger: "blur"
          }
        ],
        preMobile: [
          {
            required: true,
            message: "请输入银行预留手机号",
            trigger: "blur"
          },
          {
            pattern: this.$valid.phone11,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        bankName: [
          {
            required: true,
            message: "请选择银行",
            trigger: "change"
          }
        ],
        provinceCode: [
          {
            required: true,
            message: "请选择省份",
            trigger: "change"
          }
        ],
        cityCode: [
          {
            required: true,
            message: "请选择城市",
            trigger: "change"
          }
        ],
        branchName: [
          {
            required: true,
            min: 0,
            max: 50,
            message: "请输入50个字符以内的支行名称",
            trigger: "blur"
          },
          {
            pattern: this.$valid.errorChar,
            message: "输入有误，不允许输入特殊字符",
            trigger: "blur"
          }
        ],
        contactName: [
          {
            required: true,
            min: 2,
            max: 20,
            message: "请输入联系人姓名,不能超过20个字符",
            trigger: "blur"
          },
          {
            pattern: this.$valid.errorChar,
            message: "输入有误，不允许输入特殊字符",
            trigger: "blur"
          }
        ],
        contactPhone: [
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
        address: [
          {
            required: true,
            message: "请输入公司地址",
            trigger: "blur"
          },
          {
            pattern: this.$valid.errorChar,
            message: "输入有误，不允许输入特殊字符",
            trigger: "blur"
          },
          {
            min: 0,
            max: 100,
            message: "100字以内",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          {
            type: "email",
            message: "请输入正确的邮箱",
            trigger: "blur"
          }
        ]
      },
      openPersonalFormRules: {
        cardNoPersonal: [
          {
            required: true,
            message: "请输入银行卡号",
            trigger: "blur"
          },
          {
            pattern: this.$valid.card,
            message: "请输入正确的银行卡号",
            trigger: "blur"
          }
        ],
        preMobilePersonal: [
          {
            required: true,
            message: "请输入银行预留手机号",
            trigger: "blur"
          },
          {
            pattern: this.$valid.phone11,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        provinceCodePersonal: [
          {
            required: true,
            message: "请选择省份",
            trigger: "change"
          }
        ],
        cityCodePersonal: [
          {
            required: true,
            message: "请选择城市",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    seals: {
      get() {
        let _seals = [],
          currentSeal = [];
        if (
          this.openForm.proofMaterialDTOList &&
          this.openForm.proofMaterialDTOList.length > 0
        ) {
          _seals = this.openForm.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.COM_COMPANY_SEAL)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
          currentSeal.push(_seals[0]);
        }
        return currentSeal;
      }
    },
    receipts: {
      get() {
        let _receipts = [],
          currentReceipts = [];
        if (
          this.openForm.proofMaterialDTOList &&
          this.openForm.proofMaterialDTOList.length > 0
        ) {
          _receipts = this.openForm.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.COM_RETURN_RECEIPT)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
          currentReceipts.push(_receipts[0]);
        }
        return currentReceipts;
      }
    }
  },
  created() {
    this.checkAccountStatus();
    this.getBankList();
  },
  methods: {
    getFormType(data) {
      if (data.creditAmount <= this.totalLimit) {
        //小于等于20w
        if (data.accountType === "1") {
          //已有开户状态切对公
          this.activeTab = this.ENTERPRISE;
        } else {
          //对私
          this.activeTab = this.PERSONAL;
        }
      } else if (data.creditAmount > this.totalLimit) {
        //20w+
        // //开户类型
        if (data.accountType === "0") {
          //对私
          this.activeTab = this.PERSONAL;
        } else if (data.accountType === "1") {
          //对公
          this.activeTab = this.ENTERPRISE;
        } else {
          //无accountType == -1或其他
          //放款类型第三方只能对公
          if (data.paymentType == this.THIRD_PARTY) {
            this.activeTab = this.ENTERPRISE;
          } else if (data.paymentType == this.FINANCIAL) {
            //财务放款对公对私自由显示
            this.accountChance = true;
          }
        }
      }
    },
    getDisabled(accountNum) {
      if (accountNum > 0) {
        this.openDisabled = true;
        this.personalDisabled = true;
      }
    },
    getProvinceAndCityName(region) {
      getRegionEnum(null, region).then(res => {
        if (res.data.code === 200) {
          return res.data.body[0].name;
        }
      });
    },
    getBankList() {
      api.getBankList().then(res => {
        if (res.data.code === 200) {
          this.bankList = res.data.body.map(_ => ({
            text: _.bankName,
            value: _.bankCode
          }));
        }
      });
    },
    handleChangeBankName(val) {
      if (val.text) {
        this.openForm._bankName = val.text;
      }
      if (val.value) {
        this.openForm.bankCode = val.value;
      }
    },
    checkAccountStatus() {
      api.getAccountStatus().then(res => {
        if (res.data.code === 200) {
          if (res.data.body.status === "0") {
            let _params = this.$deepcopy(res.data.body);
            this.getFormType(_params);
            this.getDisabled(_params.accountNum);
            this.openForm = {
              name: _params.name ? _params.name : "",
              identityCode: _params.identityCode ? _params.identityCode : "",
              legalName: _params.legalName ? _params.legalName : "",
              legalIdentityCode: _params.legalIdentityCode
                ? _params.legalIdentityCode
                : "",
              cardNo: _params.cardNo ? _params.cardNo : "",
              provinceCode: _params.provinceCode
                ? _params.provinceCode
                : this.openForm.provinceCode,
              bankProvince: _params.bankProvince
                ? _params.bankProvince
                : this.openForm.bankProvince,
              bankCity: _params.bankCity
                ? _params.bankCity
                : this.openForm.bankCity,
              cityCode: _params.cityCode
                ? _params.cityCode
                : this.openForm.cityCode,
              branchName: _params.branchName ? _params.branchName : "",
              contactName: _params.contactName ? _params.contactName : "",
              contactPhone: _params.contactPhone ? _params.contactPhone : "",
              address: _params.address ? _params.address : "",
              email: _params.email ? _params.email : "",
              preMobile: _params.preMobile ? _params.preMobile : "",
              bankName: _params.bankName ? _params.bankName : "",
              _bankName: _params.bankName ? _params.bankName : "",
              bankCode: _params.bankCode ? _params.bankCode : "",
              proofMaterialDTOList: _params.proofMaterialDTOList
                ? _params.proofMaterialDTOList
                : []
            };
            if (_params.personSource && _params.personSource === "FENGTAI") {
              if (_params.cardNo && _params.cardNo !== null) {
                this.cardNoIsDisable = true;
              } else {
                this.cardNoIsDisable = false;
              }
            }
            this.openForm.bankProvince =
              _params.bankProvince && _params.bankProvince !== ""
                ? this.getProvinceAndCityName(_params.bankProvince)
                : "";
            this.openForm.bankCity =
              _params.cityCode && _params.cityCode !== ""
                ? this.getProvinceAndCityName(this.openForm.cityCode)
                : "";

            this.openPersonalForm = {
              name: _params.name ? _params.name : "",
              identityCode: _params.identityCode ? _params.identityCode : "",
              cardNoPersonal: _params.cardNo ? _params.cardNo : "",
              preMobilePersonal: _params.preMobile ? _params.preMobile : "",
              provinceCodePersonal: _params.provinceCode
                ? _params.provinceCode
                : this.openPersonalForm.provinceCodePersonal,
              cityCodePersonal: _params.cityCode
                ? _params.cityCode
                : this.openPersonalForm.cityCodePersonal,
              bankProvincePersonal: _params.bankProvince
                ? _params.bankProvince
                : this.openPersonalForm.bankProvincePersonal,
              bankCityPersonal: _params.bankCity
                ? _params.bankCity
                : this.openPersonalForm.bankCityPersonal
            };
            if (
              _params.proofMaterialDTOList &&
              _params.proofMaterialDTOList.length > 0
            ) {
              let _pSeals = [],
                _preceipts = [];
              _params.proofMaterialDTOList.forEach(item => {
                if (item.kind === this.$enum.COM_COMPANY_SEAL) {
                  _pSeals.push(item);
                } else if (item.kind === this.$enum.COM_RETURN_RECEIPT) {
                  _preceipts.push(item);
                }
              });
              this.picSeals = [];
              this.picSeals.push(_pSeals[0]);
              this.picReceipts = [];
              this.picReceipts.push(_preceipts[0]);
            }
            this.openPersonalForm.bankProvincePersonal =
              _params.provinceCode && _params.provinceCode !== ""
                ? this.getProvinceAndCityName(_params.provinceCode)
                : "";
            this.openPersonalForm.bankCityPersonal =
              _params.cityCode && _params.cityCode !== ""
                ? this.getProvinceAndCityName(_params.cityCode)
                : "";
          }
        }
      });
    },
    handleOpenAccountCompany() {
      let _params = {};
      let enterpriseParams = this.$deepcopy(this.openForm);
      enterpriseParams.proofMaterialDTOList = [];
      if (this.picSeals && this.picSeals.length > 0) {
        this.picSeals.forEach(item => {
          enterpriseParams.proofMaterialDTOList.push(item);
        });
        this.sealIsNull = false;
        this.sealErrorMsg = "";
      } else {
        this.sealIsNull = true;
        this.sealErrorMsg = "请上传公司公章";
      }
      if (this.picReceipts && this.picReceipts.length > 0) {
        this.picReceipts.forEach(item => {
          enterpriseParams.proofMaterialDTOList.push(item);
        });
        this.receiptIsNull = false;
        this.receiptErrorMsg = "";
      } else {
        this.receiptIsNull = true;
        this.receiptErrorMsg = "请上传对公账户电子回单";
      }
      _params = enterpriseParams;
      _params.partyType = this.activeTab;
      _params.bankName = enterpriseParams._bankName;
      _params.bankCode = enterpriseParams.bankCode;
      _params.returnUrl = this.$url.localURL + "/success";
      this.$refs["openForm"].validate(valid => {
        if (valid) {
          if (!this.sealIsNull && !this.receiptIsNull) {
            this.$confirm(
              "当您完成企业开户后，您的账户性质将被定义为企业，此后将只能申请企业类产品，无法申请个人类产品, 是否继续?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                closeOnClickModal: false,
                closeOnPressEscape: false
              }
            )
              .then(() => {
                setTimeout(() => {
                  this.openAccount(_params);
                }, 1000);
              })
              .catch(() => {
                this.$message({
                  type: "warning",
                  message: "已取消企业开户"
                });
              });
          } else {
            this.showDialog = true;
            this.isSuccess = false;
            this.messageInfo = "您的账户开户失败,请检查参数是否正确！";
          }
        } else {
          this.showDialog = true;
          this.isSuccess = false;
          this.messageInfo = "您的账户开户失败,请检查信息是否正确！";
          return false;
        }
      });
    },
    handleOpenAccount() {
      let _params = {};
      const personParams = this.$deepcopy(this.openPersonalForm);
      _params = {
        name: personParams.name,
        identityCode: personParams.identityCode,
        cardNo: personParams.cardNoPersonal,
        preMobile: personParams.preMobilePersonal,
        provinceCode: personParams.provinceCodePersonal,
        cityCode: personParams.cityCodePersonal,
        partyType: this.activeTab,
        bankProvince: personParams.bankProvincePersonal
          ? personParams.bankProvincePersonal
          : "",
        bankCity: personParams.bankCityPersonal
          ? personParams.bankCityPersonal
          : "",
        returnUrl: this.$url.localURL + "/success"
      };
      this.$refs["openPersonalForm"].validate(valid => {
        if (valid) {
          this.$confirm(
            "当您完成个人开户后，您的账户性质将被定义为个人，此后将只能申请个人类产品，无法申请企业类产品, 是否继续?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              closeOnClickModal: false,
              closeOnPressEscape: false
            }
          )
            .then(() => {
              setTimeout(() => {
                this.openAccount(_params);
              }, 1000);
            })
            .catch(() => {
              this.$message({
                message: "已取消个人开户",
                type: "warning"
              });
            });
        } else {
          this.showDialog = true;
          this.isSuccess = false;
          this.messageInfo = "您的账户开户失败，请检查信息是否正确！";
          return false;
        }
      });
    },

    openAccount(params) {
      api.accountOpen(params).then(
        res => {
          if (res.data.code === 200) {
            if (res.data.body && res.data.body !== null) {
              window.location.href = res.data.body;
            } else {
              this.$router.push({
                name: "successPage",
                query: {
                  pageName: "accountOpenPage"
                }
              });
            }
          } else {
            this.showDialog = true;
            this.isSuccess = false;
            this.messageInfo = "您的账户开户失败,请检查填写资料是否真实有效！";
          }
        },
        response => {
          this.showDialog = true;
          this.isSuccess = false;
          let _msg = "";
          if (response.data.body) {
            for (const key in response.data.body) {
              _msg += response.data.body[key] + "  ";
            }
            this.messageInfo = _msg;
          } else {
            this.messageInfo = response.data.message
              ? response.data.message
              : "开户失败！";
          }
        }
      );
    },
    handleClose() {
      this.showDialog = false;
      this.isSuccess = false;
      this.messageInfo = "";
    },
    validateSealPics() {
      if (this.picSeals.length <= 0) {
        this.sealIsNull = true;
        this.sealErrorMsg = "请上传公司公章";
      } else {
        this.sealIsNull = false;
        this.sealErrorMsg = "";
      }
    },
    validateReceiptPics() {
      if (this.picReceipts.length <= 0) {
        this.receiptIsNull = true;
        this.receiptErrorMsg = "请上传对公账户电子回单";
      } else {
        this.receiptIsNull = false;
        this.receiptErrorMsg = "";
      }
    },
    handleUploadSealPics(file) {
      file.kind = this.$enum.COM_COMPANY_SEAL;
      this.picSeals = [];
      this.picSeals.push(file);
      this.validateSealPics();
    },
    handleRemoveSealPics(file, fileList) {
      this.picSeals = [];
      this.validateSealPics();
    },
    handleUploadReceiptsPics(file) {
      file.kind = this.$enum.COM_RETURN_RECEIPT;
      this.picReceipts = [];
      this.picReceipts.push(file);
      this.validateReceiptPics();
    },
    handleRemoveReceiptPisc(file, fileList) {
      this.picReceipts = [];
      this.validateReceiptPics();
    },
    handleChangeBankProvince(val) {
      if (this.activeTab === this.$enum.ENTERPRISE) {
        this.openForm.bankProvince = val.text;
      } else {
        this.openPersonalForm.bankProvincePersonal = val.text;
      }
    },
    handleChangeBankCity(val) {
      if (this.activeTab === this.$enum.ENTERPRISE) {
        this.openForm.bankCity = val.text;
      } else {
        this.openPersonalForm.bankCityPersonal = val.text;
      }
    },
    handleChanteTab(type) {
      //重置校验数据
      // if (type == this.$enum.ENTERPRISE) {
      //   this.$refs['openPersonalForm'].resetFields();
      // } else {
      //   this.$refs['openForm'].resetFields();
      // }
      this.activeTab = type;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mt20 {
  margin-top: 20px;
}

.special-label {
  display: block;
  width: 180px;

  span {
    color: #f56c6c;
  }
}

.banks-box {
  width: 620px;
  overflow: hidden;
  top: 5%;
  margin: 0 0 0 -310px;
}
</style>
