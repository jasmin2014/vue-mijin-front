<template>
  <el-form
    ref="openForm"
    class="pub-open-form"
    :model="openForm"
    label-width="180px"
    :rules="openFormRules"
  >
    <div
      class="open-fail-msg"
      v-if="openForm.failMsg && openForm.failMsg !==''"
    >{{openForm.failMsg}}</div>

    <el-form-item label="企业名称：" prop="companyName">
      <div class="width450">
        <mj-input v-model.trim="openForm.companyName"></mj-input>
      </div>
    </el-form-item>
    <el-form-item label="统一社会信用代码：" prop="code">
      <div class="width450">
        <mj-input v-model.trim="openForm.code"></mj-input>
      </div>
    </el-form-item>
    <el-form-item label="法人代表姓名：" prop="corporationName">
      <div class="width450">
        <mj-input v-model.trim="openForm.corporationName"></mj-input>
      </div>
    </el-form-item>
    <el-form-item label="法人代表身份证号：" prop="corporationIdCard">
      <div class="width450">
        <mj-input v-model.trim="openForm.corporationIdCard"></mj-input>
      </div>
    </el-form-item>
    <el-form-item label="机构信用代码证号：" prop="mechanismCreditCodeCertificate">
      <div class="width450">
        <mj-input v-model.trim="openForm.mechanismCreditCodeCertificate"></mj-input>
      </div>
    </el-form-item>
    <el-form-item class="base-open-NO" label="基本存款账户开户许可证核准号：" prop="appNo">
      <div class="width450">
        <mj-input v-model.trim="openForm.appNo"></mj-input>
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
    <el-form-item label="注册资本(万元)：" prop="regCapital">
      <div class="width450">
        <mj-input v-model.trim="openForm.regCapital"></mj-input>
      </div>
    </el-form-item>
    <el-form-item label="注册地址：" prop="regAddress">
      <div class="width450">
        <mj-input v-model.trim="openForm.regAddress"></mj-input>
      </div>
    </el-form-item>
    <!-- <div class="width850">
      <div class="width300">
        <el-form-item label="注册地址：" prop="province">
          <mj-select :region="'86'" v-model.trim="openForm.province" @change="handleChangeProvince"></mj-select>
        </el-form-item>
      </div>
      <div class="width150">
        <el-form-item label label-width="0px" prop="city">
          <mj-select :region="openForm.province" v-model.trim="openForm.city"></mj-select>
        </el-form-item>
      </div>
      <div class="width150">
        <el-form-item label label-width="0px" prop="area">
          <mj-select :region="openForm.city" v-model.trim="openForm.area"></mj-select>
        </el-form-item>
      </div>
      <div class="width200">
        <el-form-item label label-width="0px" prop="infoAddress">
          <mj-input v-model.trim="openForm.infoAddress"></mj-input>
        </el-form-item>
      </div>
    </div>-->
    <el-form-item label="注册时间：" prop="regDate">
      <div class="width450">
        <el-date-picker
          type="date"
          placeholder="选择时间"
          v-model="openForm.regDate"
          value-format="yyyy-MM-dd"
          style="width: 100%;"
        ></el-date-picker>
      </div>
    </el-form-item>
    <el-form-item class="material-upload is-required" label="资料上传">
      <mj-card-upload
        v-model="companySeal"
        :limit="1"
        :max-size="'5M'"
        :pic-name="'公司公章'"
        :pic-warn-message="'(公章无水印，清晰)'"
        :placeholder="'注：支持png/jpg/jpeg，单张大小不超过5M,最多上传1张'"
        :mode="'EDIT'"
        @success="handleUploadSealPics"
        @remove="handleRemoveSealPics"
      ></mj-card-upload>
      <p class="error-warn" style="left: 0;" v-if="sealPicIsNull">{{sealPicErrorMsg}}</p>
      <mj-card-upload
        v-model="identityCard"
        :limit="1"
        :max-size="'5M'"
        :pic-name="'法人身份证'"
        :pic-warn-message="'(身份证前后二合一，清晰)'"
        :placeholder="'注：支持png/jpg/jpeg，单张大小不超过5M,最多上传1张'"
        :mode="'EDIT'"
        @success="handleUploadIdentCardPic"
        @remove="handleRemoveIdentCardPics"
      ></mj-card-upload>
      <p class="error-warn" style="left:350px;" v-if="identPicIsNull">{{identPicErrorMsg}}</p>
    </el-form-item>
    <el-form-item class="material-upload" label>
      <mj-card-upload
        v-model="busiLicense"
        :limit="1"
        :max-size="'5M'"
        :pic-name="'营业执照'"
        :pic-warn-message="'(营业执照上传正本，清晰)'"
        :placeholder="'注：支持png/jpg/jpeg，单张大小不超过5M,最多上传1张'"
        :mode="'EDIT'"
        @success="handleUploadLicensePics"
        @remove="handleRemoveLicensePics"
      ></mj-card-upload>
      <p class="error-warn" style="left: 0;" v-if="licensePicIsNull">{{licensePicErrorMsg}}</p>
      <mj-card-upload
        v-model="accPermits"
        :limit="1"
        :max-size="'5M'"
        :pic-name="'单位开户许可证'"
        :pic-warn-message="'(最新版本，清晰)'"
        :placeholder="'注：支持png/jpg/jpeg，单张大小不超过5M,最多上传1张'"
        :mode="'EDIT'"
        @success="handleUploadAccPermitsPics"
        @remove="handleRemoveAccPermitsPics"
      ></mj-card-upload>
      <p class="error-warn" style="left:350px;" v-if="permitPicIsNull">{{permitPicErrorMsg}}</p>
    </el-form-item>
    <el-form-item class="material-upload" label>
      <mj-card-upload
        v-model="creditCode"
        :limit="1"
        :max-size="'5M'"
        :pic-name="'机构信用代码证'"
        :pic-warn-message="'(三合一，五合一，用营业执照替代，反之，上传机构信用代码证)'"
        :placeholder="'注：支持png/jpg/jpeg，单张大小不超过5M,最多上传1张'"
        :mode="'EDIT'"
        @success="handleUploadCreditCodePics"
        @remove="handleRemoveCreditCodePics"
      ></mj-card-upload>
      <p class="error-warn" style="left: 0;" v-if="codePicIsNull">{{codePicErrorMsg}}</p>
      <!-- <mj-card-upload v-model="receipts" :limit="1" :max-size="'5M'" :pic-name="'公账电子回单'" :placeholder="'注：支持png/pdf/jpg/jpeg，单张大小不超过5M,最多上传1张'"
            :mode="'EDIT'" @success="handleUploadReceiptsPics" @remove="handleRemoveReceiptsPics"></mj-card-upload>
      <p class="error-warn" style="left:350px;" v-if="receiptPicIsNull">请上传公账电子回单</p>-->
    </el-form-item>
    <el-form-item class="material-upload" label>
      <p class="error-warn">
        <b>注:以上上传图片均需原件照片，清晰，不得用复印件代替，谢谢配合！</b>
      </p>
    </el-form-item>
    <el-form-item class="has-parent is-required" label="是否有母公司">
      <div :class="{'checked': openForm.isParComp == '0'}">
        <span></span>是
      </div>
      <div :class="{'checked': openForm.isParComp == '1'}">
        <span></span>否
      </div>
    </el-form-item>
    <el-form-item v-if="openForm.isParComp == '0'" class="has-parent is-required" label="母公司是否三证合一">
      <div :class="{'checked': openForm.praThreeToOne}">
        <span @click="openForm.praThreeToOne = true"></span>是
      </div>
      <div :class="{'checked': !openForm.praThreeToOne}">
        <span @click="openForm.praThreeToOne = false"></span>否
      </div>
    </el-form-item>
    <el-form-item label="是否有西安银行账户" class="has-parent is-required">
      <div v-bind:class="{'checked': hasXiAn == 0}">
        <span @click="changeXiAnAccountStatus(0)"></span>是
      </div>
      <div v-bind:class="{'checked': hasXiAn == 1}">
        <span @click="changeXiAnAccountStatus(1)"></span>否
      </div>
    </el-form-item>
    <p class="xiAn-warnning" v-if="xiAnIsNull">请选择是否有西安存管银行账户！</p>
    <div class="step-btns">
      <div class="mj-button orange step-btn-next cursor" @click="handleSubmitInfo">提交资料</div>
    </div>
  </el-form>
</template>

<script>
import { getOpenPublicCGInfo, postOpenPublicCG } from "../api/account.js";
import checkAccount from "../src/mixins/checkAccount.js";
export default {
  mixins: [checkAccount],
  data() {
    return {
      hasXiAn: null,
      xiAnIsNull: false,
      openForm: {
        failMsg: "",
        isParComp: "1",
        praThreeToOne: false,
        haveXianBankAccount: "",
        proofMaterialDTOList: [],
        // province: "",
        // city: "",
        // area: "",
        // infoAddress: "",
        regAddress: ""
      },
      redAddress: {
        province: "",
        city: "",
        area: "",
        infoAddress: ""
      },
      sealPic: [],
      sealPicIsNull: false,
      sealPicErrorMsg: "请上传公司公章",
      identCardPic: [],
      identPicIsNull: false,
      identPicErrorMsg: "请上传法人身份证",
      licensePic: [],
      licensePicIsNull: false,
      licensePicErrorMsg: "请上传营业执照",
      permitPic: [],
      permitPicIsNull: false,
      permitPicErrorMsg: "请上传单位开户许可证",
      creCodePic: [],
      codePicIsNull: false,
      codePicErrorMsg: "请上传机构信用代码证",
      receiptPic: [],
      receiptPicIsNull: false,
      openFormRules: {
        companyName: [
          {
            required: true,
            min: 4,
            max: 50,
            message: "请输入4到50个字符的企业名称",
            trigger: "blur"
          },
          {
            pattern: this.$valid.bracketsReg,
            message: "输入有误，不允许输入特殊字符除括号",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur"
          },
          {
            pattern: this.$valid.usciCode,
            message: "18位数字和大写字母组成",
            trigger: "blur"
          }
        ],
        mechanismCreditCodeCertificate: [
          {
            required: true,
            message: "请输入机构信用代码证号",
            trigger: "blur"
          },
          {
            pattern: this.$valid.usciCode,
            message: "18位数字、字母",
            trigger: "blur"
          }
        ],
        corporationName: [
          {
            required: true,
            message: "请输入法人代表姓名",
            trigger: "blur"
          },
          {
            pattern: this.$valid.ChineseChar,
            message: "输入有误，请输入中文名字",
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,
            message: "2-10字以内",
            trigger: "blur"
          }
        ],
        corporationIdCard: [
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
        appNo: [
          {
            required: true,
            message: "请输入基本存款账户开户许可证核准号",
            trigger: "blur"
          },
          {
            pattern: this.$valid.bitNumber,
            message: "请输入正确的许可证核准号",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "20个字符以内",
            trigger: "blur"
          }
        ],
        contactName: [
          {
            required: true,
            min: 1,
            max: 20,
            message: "请输入联系人姓名,2到10个中文字符",
            trigger: "blur"
          },
          {
            pattern: this.$valid.ChineseChar,
            message: "输入有误，请输入中文姓名",
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
            pattern: this.$valid.mobile,
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
          // {
          //   pattern: this.$valid.errorChar,
          //   message: "输入有误，不允许输入特殊字符",
          //   trigger: "blur"
          // },
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
        ],
        // province: [
        //   {
        //     required: true,
        //     message: "请选择省份",
        //     trigger: "change"
        //   }
        // ],
        // city: [
        //   {
        //     required: true,
        //     message: "请选择城市",
        //     trigger: "change"
        //   }
        // ],
        // area: [
        //   {
        //     required: true,
        //     message: "请选择区域",
        //     trigger: "change"
        //   }
        // ],
        regAddress: [
          {
            required: true,
            message: "请输入注册地址",
            trigger: "blur"
          }
        ],
        regCapital: [
          {
            required: true,
            message: "请输入注册资本",
            trigger: "blur"
          },
          {
            pattern: this.$valid.RegInt,
            message: "请输入正整数",
            trigger: "blur"
          }
        ],
        regDate: [
          {
            required: true,
            message: "请选择注册时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    companySeal: {
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
    identityCard: {
      get() {
        let _idCard = [],
          currentidCard = [];
        if (
          this.openForm.proofMaterialDTOList &&
          this.openForm.proofMaterialDTOList.length > 0
        ) {
          _idCard = this.openForm.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.LEGAL_PERSON_IDENTIT)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
          currentidCard.push(_idCard[0]);
        }
        return currentidCard;
      }
    },
    busiLicense: {
      get() {
        let _license = [],
          currentLicense = [];
        if (
          this.openForm.proofMaterialDTOList &&
          this.openForm.proofMaterialDTOList.length > 0
        ) {
          _license = this.openForm.proofMaterialDTOList
            .filter(
              _ => _.kind === this.$enum.COM_BUSINESS_LICENSE_OPEN_ACCOUNT
            )
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
          currentLicense.push(_license[0]);
        }
        return currentLicense;
      }
    },
    accPermits: {
      get() {
        let _accPermits = [],
          currentAccPermits = [];
        if (
          this.openForm.proofMaterialDTOList &&
          this.openForm.proofMaterialDTOList.length > 0
        ) {
          _accPermits = this.openForm.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.COM_ACCOUNT_PERMITS)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
          currentAccPermits.push(_accPermits[0]);
        }
        return currentAccPermits;
      }
    },
    creditCode: {
      get() {
        let _creditCode = [],
          currentCreditCode = [];
        if (
          this.openForm.proofMaterialDTOList &&
          this.openForm.proofMaterialDTOList.length > 0
        ) {
          _creditCode = this.openForm.proofMaterialDTOList
            .filter(_ => _.kind === this.$enum.AGENCY_CREDIT_CODE)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
          currentCreditCode.push(_creditCode[0]);
        }
        return currentCreditCode;
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
    this.getAccountCGInfo();
  },
  methods: {
    // handleChangeProvince(value) {
    //   console.log(value);
    // },
    changeXiAnAccountStatus(type) {
      this.openForm.haveXianBankAccount = type;
      this.hasXiAn = type;
      this.xiAnIsNull = false;
    },
    getAccountCGInfo() {
      getOpenPublicCGInfo().then(response => {
        let _res = response.data;
        if (_res.code == 200 && _res.body) {
          this.openForm = _res.body;
          this.openForm.failMsg = _res.body.failMsg ? _res.body.failMsg : "";
          this.openForm.isParComp = _res.body.isParComp
            ? _res.body.isParComp
            : 1;
          this.openForm.haveXianBankAccount = _res.body.haveXianBankAccount;
          this.hasXiAn = _res.body.haveXianBankAccount;
          this.openForm.regCapital = _res.body.regCapital
            ? Math.floor(Number(_res.body.regCapital) / 10000)
            : "";
          if (
            _res.body.proofMaterialDTOList &&
            _res.body.proofMaterialDTOList.length > 0
          ) {
            this.openForm.proofMaterialDTOList = _res.body.proofMaterialDTOList;
            let _pSeal = [],
              _pIdCard = [],
              _pLicense = [],
              _pPermit = [],
              _pCreCOde = [],
              _pReceipt = [];
            this.sealPic = [];
            this.identCardPic = [];
            this.licensePic = [];
            this.permitPic = [];
            this.creCodePic = [];
            this.receiptPic = [];
            _res.body.proofMaterialDTOList.forEach(item => {
              if (item.kind === this.$enum.COM_COMPANY_SEAL) {
                _pSeal.push(item);
              } else if (item.kind === this.$enum.LEGAL_PERSON_IDENTIT) {
                _pIdCard.push(item);
              } else if (
                item.kind === this.$enum.COM_BUSINESS_LICENSE_OPEN_ACCOUNT
              ) {
                _pLicense.push(item);
              } else if (item.kind === this.$enum.COM_ACCOUNT_PERMITS) {
                _pPermit.push(item);
              } else if (item.kind === this.$enum.AGENCY_CREDIT_CODE) {
                _pCreCOde.push(item);
              } else if (item.kind === this.$enum.COM_RETURN_RECEIPT) {
                _pReceipt.push(item);
              }
            });
            if (_pSeal.length > 0) this.sealPic.push(_pSeal[0]);
            if (_pIdCard.length > 0) this.identCardPic.push(_pIdCard[0]);
            if (_pLicense.length > 0) this.licensePic.push(_pLicense[0]);
            if (_pPermit.length > 0) this.permitPic.push(_pPermit[0]);
            if (_pCreCOde.length > 0) this.creCodePic.push(_pCreCOde[0]);
            if (_pReceipt.length > 0) this.receiptPic.push(receiptPic[0]);
          }
        }
      });
    },
    handleSubmitInfo() {
      let _params = {};
      let eParams = this.$deepcopy(this.openForm);

      if (
        this.openForm.haveXianBankAccount === "" ||
        this.openForm.haveXianBankAccount === null
      ) {
        this.xiAnIsNull = true;
      }
      eParams.proofMaterialDTOList = [];
      this.validateSealPic(() => {
        this.sealPic.forEach(item => {
          eParams.proofMaterialDTOList.push(item);
        });
      });
      this.validateIdentCardPic(() => {
        this.identCardPic.forEach(item => {
          eParams.proofMaterialDTOList.push(item);
        });
      });
      this.validateLicensePic(() => {
        this.licensePic.forEach(item => {
          eParams.proofMaterialDTOList.push(item);
        });
      });
      this.validatePermitPic(() => {
        this.permitPic.forEach(item => {
          eParams.proofMaterialDTOList.push(item);
        });
      });
      this.validateCreCodePic(() => {
        this.creCodePic.forEach(item => {
          eParams.proofMaterialDTOList.push(item);
        });
      });
      // this.validateReceiptPic(() => {
      //   this.receiptPic.forEach(item => {
      //     eParams.proofMaterialDTOList.push(item);
      //   });
      // });
      _params = this.$deepcopy(this.openForm);
      _params.proofMaterialDTOList = eParams.proofMaterialDTOList;

      this.$refs["openForm"].validate(valid => {
        if (valid) {
          // this.openForm.regAddress =
          //   this.openForm.province +
          //   this.openForm.city +
          //   this.openForm.area +
          //   this.openForm.infoAddress;
          // _params.regAddress = this.openForm.regAddress;
          // delete _params.province;
          // delete _params.city;
          // delete _params.area;
          // delete _params.infoAddress;
          _params.regCapital = Math.floor(
            Number(this.openForm.regCapital) * 10000
          );
          if (
            !this.sealPicIsNull &&
            !this.identPicIsNull &&
            !this.licensePicIsNull &&
            !this.permitPicIsNull &&
            !this.codePicIsNull &&
            // !this.receiptPicIsNull &&
            !this.xiAnIsNull
          ) {
            console.log("_params:", _params);
            _params.terminalNo = "PC";
            this.postOpenPublicCGApi(_params);
          }
        } else {
          return false;
        }
      });
    },
    postOpenPublicCGApi(params) {
      postOpenPublicCG(params)
        .then(response => {
          if (response.data.code == 200) {
            if (this.$route.name === "accountOpenPublicPage") {
              this.$router.push({ name: "accountOpenStatusPage" });
            } else if (this.$route.name === "usersOpenPublicPage") {
              this.$router.push({ name: "usersOpenStatusPage" });
            }
          }
        })
        .catch(Error => {
          /*状态吗为5003010时，说明时资金中心直接返回了已开户 ，则跳入到正式借款或者担保流程*/
          if (Error.data.code == "5003010") {
            this.$alert(Error.data.message, "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.getOpenStatus();
              }
            });
          } else {
            if (Error.data.body) {
              let msg = "";
              for (let item in Error.data.body) {
                msg += Error.data.body[item] + ";";
              }
              this.$confirm(msg, "提示", {
                confirmButtonText: "确定",
                type: "warning",
                closeOnClickModal: false,
                closeOnPressEscape: false
              });
            } else {
              this.$confirm(Error.data.message, "提示", {
                confirmButtonText: "确定",
                type: "warning",
                closeOnClickModal: false,
                closeOnPressEscape: false
              });
            }
          }
        });
    },
    validateSealPic(callback) {
      if (this.sealPic && this.sealPic.length > 0) {
        callback && callback();
        this.sealPicIsNull = false;
      } else {
        this.sealPicIsNull = true;
      }
    },
    validateIdentCardPic(callback) {
      if (this.identCardPic && this.identCardPic.length > 0) {
        callback && callback();
        this.identPicIsNull = false;
      } else {
        this.identPicIsNull = true;
      }
    },
    validateLicensePic(callback) {
      if (this.licensePic && this.licensePic.length > 0) {
        callback && callback();
        this.licensePicIsNull = false;
      } else {
        this.licensePicIsNull = true;
      }
    },
    validatePermitPic(callback) {
      if (this.permitPic && this.permitPic.length > 0) {
        callback && callback();
        this.permitPicIsNull = false;
      } else {
        this.permitPicIsNull = true;
      }
    },
    validateCreCodePic(callback) {
      if (this.creCodePic && this.creCodePic.length > 0) {
        callback && callback();
        this.codePicIsNull = false;
      } else {
        this.codePicIsNull = true;
      }
    },
    validateReceiptPic(callback) {
      if (this.receiptPic && this.receiptPic.length > 0) {
        callback && callback();
        this.receiptPicIsNull = false;
      } else {
        this.receiptPicIsNull = true;
      }
    },
    getExtName(fileName, kind, callback) {
      let ext = fileName.substr(fileName.lastIndexOf(".") + 1);
      let errorMsg = "只支持png/jpg/jpeg图片格式,请重新上传!";
      if (ext !== "png" && ext !== "jpg" && ext !== "jpeg") {
        if (kind === "COM_COMPANY_SEAL") {
          this.sealPicIsNull = true;
          this.sealPicErrorMsg = errorMsg;
        } else if (kind === "LEGAL_PERSON_IDENTIT") {
          this.identPicIsNull = true;
          this.identPicErrorMsg = errorMsg;
        } else if (kind === "COM_BUSINESS_LICENSE_OPEN_ACCOUNT") {
          this.licensePicIsNull = true;
          this.licensePicErrorMsg = errorMsg;
        } else if (kind === "COM_ACCOUNT_PERMITS") {
          this.permitPicIsNull = true;
          this.permitPicErrorMsg = errorMsg;
        } else if (kind === "AGENCY_CREDIT_CODE") {
          this.codePicIsNull = true;
          this.codePicErrorMsg = errorMsg;
        }
      } else {
        callback && callback();
      }
    },
    handleUploadSealPics(file) {
      let vm = this;
      this.getExtName(file.name, vm.$enum.COM_COMPANY_SEAL, function() {
        file.kind = vm.$enum.COM_COMPANY_SEAL;
        vm.sealPic = [];
        vm.sealPic.push(file);
        vm.validateSealPic();
      });
    },
    handleRemoveSealPics() {
      this.sealPic = [];
      this.sealPicErrorMsg = "请上传公司公章!";
      this.validateSealPic();
    },
    handleUploadIdentCardPic(file) {
      let vm = this;
      this.getExtName(file.name, vm.$enum.LEGAL_PERSON_IDENTIT, function() {
        file.kind = vm.$enum.LEGAL_PERSON_IDENTIT;
        vm.identCardPic = [];
        vm.identCardPic.push(file);
        vm.validateIdentCardPic();
      });
    },
    handleRemoveIdentCardPics() {
      this.identCardPic = [];
      this.identPicErrorMsg = "请上传法人身份证!";
      this.validateIdentCardPic();
    },
    handleUploadLicensePics(file) {
      let vm = this;
      this.getExtName(
        file.name,
        vm.$enum.COM_BUSINESS_LICENSE_OPEN_ACCOUNT,
        function() {
          file.kind = vm.$enum.COM_BUSINESS_LICENSE_OPEN_ACCOUNT;
          vm.licensePic = [];
          vm.licensePic.push(file);
          vm.validateLicensePic();
        }
      );
    },
    handleRemoveLicensePics() {
      this.licensePic = [];
      this.licensePicErrorMsg = "请上传营业执照";
      this.validateLicensePic();
    },
    handleUploadAccPermitsPics(file) {
      let vm = this;
      this.getExtName(file.name, vm.$enum.COM_ACCOUNT_PERMITS, function() {
        file.kind = vm.$enum.COM_ACCOUNT_PERMITS;
        vm.permitPic = [];
        vm.permitPic.push(file);
        vm.validatePermitPic();
      });
    },
    handleRemoveAccPermitsPics() {
      this.permitPic = [];
      this.permitPicErrorMsg = "请上传单位开户许可证!";
      this.validatePermitPic();
    },
    handleUploadCreditCodePics(file) {
      let vm = this;
      this.getExtName(file.name, vm.$enum.AGENCY_CREDIT_CODE, function() {
        file.kind = vm.$enum.AGENCY_CREDIT_CODE;
        vm.creCodePic = [];
        vm.creCodePic.push(file);
        vm.validateCreCodePic();
      });
    },
    handleRemoveCreditCodePics() {
      this.creCodePic = [];
      this.codePicErrorMsg = "请上传机构信用代码证!";
      this.validateCreCodePic();
    }
    // handleUploadReceiptsPics(file) {
    //   file.kind = this.$enum.COM_RETURN_RECEIPT;
    //   this.receiptPic = [];
    //   this.receiptPic.push(file);
    //   this.validateReceiptPic();
    // },
    // handleRemoveReceiptsPics() {
    //   this.receiptPic = [];
    //   this.validateReceiptPic();
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.pub-open-form {
  .open-fail-msg {
    color: red;
    margin: -50px auto 40px auto;
    text-align: left;
    line-height: 30px;
    font-size: 14px;
  }
  .el-form-item {
    .el-form-item__label {
      text-align: right;
    }
  }
}
.el-form-item {
  .el-form-item__content {
    .mj-upload {
      display: inline-block;
      margin-right: 10px;
      .el-upload-list--picture-card,
      .el-upload-list--picture-card .el-upload-list__item,
      .el-upload--picture-card {
        width: 324px;
        height: 220px;
      }
      .upload {
        margin-bottom: 0;
      }
    }
  }
}
.el-form-item.material-upload {
  .error-warn {
    color: red;
    position: absolute;
    font-size: 12px;
    bottom: -30px;
  }
}
.el-form-item.is-required {
  .el-form-item__label {
    text-align: right;
    padding-left: 10px;
  }
}
.el-form-item.base-open-NO.is-required {
  .el-form-item__label {
    text-align: right;
    padding-left: 10px;
  }
}
.el-form-item.base-open-NO {
  .el-form-item__label {
    line-height: 20px;
  }
}
.has-parent {
  display: flex;
  .el-form-item__content {
    margin-left: 0;
    display: flex;
    > div {
      > span {
        width: 15px;
        height: 15px;
        display: inline-block;
        border-radius: 7.5px;
        background: #bcbcbc;
        margin: 0 5px -2px 50px;
      }
    }
    > div:first-child {
      margin-left: -180px;
    }
    > div.checked {
      > span {
        background: #fff;
        border: 3px solid #ff8a00;
      }
    }
  }
}
.xiAn-warnning {
  font-size: 14px;
  color: red;
  padding-left: 230px;
  margin-top: -20px;
}
</style>
