<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'QuotaPage'"></mijin-header>
    <div class="credit-content">
      <mijin-steps first second third class="mijin-steps"></mijin-steps>
      <div class="main-content credit-form">
        <h3>基本信息</h3>
        <div class="credit-form-inner credit-form-base right">
          <!-- :rules="creditFormRules"-->
          <el-form
            ref="creditForm"
            :model="productType==='YCT_LOANS' ? Object.assign(creditForm,YCT_params) : creditForm"
            label-width="170px"
            :rules="creditFormRules"
          >
            <!--productType==='YCT_LOANS' ? Object.assign(creditFormRules,YCT_paramsRules) : creditFormRules-->
            <el-form-item label="真实姓名：">
              <div class="width450">
                <mj-input v-model="baseInfo.name" :mode="'VIEW'"></mj-input>
              </div>
            </el-form-item>
            <el-form-item label="手机号码：">
              <div class="width450">
                <mj-input v-model="baseInfo.mobile" :mode="'VIEW'"></mj-input>
              </div>
            </el-form-item>
            <el-form-item label="身份证号：">
              <div class="width450">
                <mj-input v-model="baseInfo.ident" :mode="'VIEW'"></mj-input>
              </div>
            </el-form-item>
            <el-form-item label="婚姻状况：" class="credit-custom-select" prop="marital">
              <div class="width450">
                <mj-select
                  v-model="creditForm.marital"
                  :kind="$enum.MARITAL"
                  :group="$enum.MARITAL"
                  :clearable="true"
                ></mj-select>
              </div>
            </el-form-item>
            <div class="flex-start credit-relation">
              <el-form-item label="亲属姓名：" class="relation-name" prop="familyName">
                <mj-input v-model="creditForm.familyName"></mj-input>
              </el-form-item>
              <el-form-item
                label="关系："
                class="flex-start relation-type"
                label-width="130"
                prop="familyRelationship"
              >
                <mj-select
                  v-model="creditForm.familyRelationship"
                  :kind="$enum.RELATIONSHIP"
                  :group="$enum.FAMILY_RELATIONSHIP"
                  :clearable="true"
                ></mj-select>
              </el-form-item>
              <el-form-item
                label="手机号码："
                class="flex-start relation-phone"
                label-width="150"
                prop="familyMobile"
              >
                <mj-input v-model="creditForm.familyMobile"></mj-input>
              </el-form-item>
            </div>
            <div class="flex-start credit-relation">
              <el-form-item label="其他联系人姓名：" class="relation-name" prop="otherName">
                <mj-input v-model="creditForm.otherName"></mj-input>
              </el-form-item>
              <el-form-item
                label="关系："
                class="flex-start relation-type"
                label-width="130"
                prop="otherRelationship"
              >
                <mj-select
                  v-model="creditForm.otherRelationship"
                  :kind="$enum.RELATIONSHIP"
                  :group="$enum.CONTACT_RELATIONSHIP"
                  :clearable="true"
                ></mj-select>
              </el-form-item>
              <el-form-item
                label="手机号码："
                class="flex-start relation-phone"
                label-width="150"
                prop="otherMobile"
              >
                <mj-input v-model="creditForm.otherMobile"></mj-input>
              </el-form-item>
            </div>
            <div
              class="flex-start credit-branch-bank"
              v-if="productType=='QYT_LOANS' || productType=='YCT_LOANS'"
            >
              <el-form-item label="实际经营地址：" prop="provinceCode" class="mr10">
                <mj-select
                  v-model="creditForm.provinceCode"
                  :region="'86'"
                  ref="changeProvince"
                  @kv-change="handleChangeProvince"
                  :clearable="true"
                ></mj-select>
              </el-form-item>
              <el-form-item prop="cityCode" label-width="20" class="mr10">
                <mj-select
                  v-model="creditForm.cityCode"
                  :region="creditForm.provinceCode"
                  @kv-change="handleChangeCity"
                  :clearable="true"
                ></mj-select>
              </el-form-item>
              <el-form-item prop="actualManagementAddress" label-width="0">
                <div class="width290 el-select">
                  <mj-input v-model="creditForm.actualManagementAddress" :clearable="true"></mj-input>
                </div>
              </el-form-item>
            </div>
            <el-form-item label="实际经营地址：" prop="actualManagementAddress" v-else>
              <div class="width450">
                <mj-input v-model="creditForm.actualManagementAddress"></mj-input>
              </div>
            </el-form-item>
            <!--电商通和跨境通里，叫店铺名称；企业通和烟草通里，叫企业名称；-->
            <el-form-item
              :label="productType === 'DST_LOANS'|| productType === 'KJT_LOANS' ? '店铺名称：': '企业名称：'"
              prop="shopName"
            >
              <div class="width450">
                <mj-input v-model="creditForm.shopName"></mj-input>
              </div>
            </el-form-item>
            <div v-if="productType==='YCT_LOANS'">
              <el-form-item
                label="烟草订烟网账号："
                :rules="YCT_paramsRules.accountNumber"
                prop="accountNumber"
              >
                <div class="width450">
                  <mj-input v-model="YCT_params.accountNumber"></mj-input>
                </div>
              </el-form-item>
              <el-form-item label="烟草订烟网密码：" :rules="YCT_paramsRules.password" prop="password">
                <div class="width450">
                  <mj-input v-model="YCT_params.password"></mj-input>
                </div>
              </el-form-item>
            </div>
            <el-form-item label="所属行业：" class="credit-custom-select" prop="industry">
              <div class="width450">
                <mj-select
                  v-model="creditForm.industry"
                  :kind="$enum.INDUSTRY"
                  :group="$enum.INDUSTRY"
                  :clearable="true"
                ></mj-select>
              </div>
            </el-form-item>
            <el-form-item label="年收入（万元）：" class="credit-custom-select" prop="annualSalary">
              <div class="width450">
                <mj-select
                  v-model="creditForm.annualSalary"
                  :kind="$enum.ANNUAL_SALARY"
                  :group="$enum.ANNUAL_SALARY"
                  :clearable="true"
                ></mj-select>
              </div>
            </el-form-item>
            <el-form-item label="借款用途：" class="credit-custom-select" prop="loanPurpose">
              <div class="width450">
                <mj-select
                  v-model="creditForm.loanPurpose"
                  :kind="$enum.USAGE_LOAN"
                  :group="$enum.LOAN"
                  :clearable="true"
                ></mj-select>
              </div>
            </el-form-item>
            <el-form-item label="还款来源：" class="credit-custom-select" prop="payment">
              <div class="width450">
                <mj-select
                  v-model="creditForm.payment"
                  :kind="$enum.PAYMENT"
                  :group="$enum.PAYMENT"
                  :clearable="true"
                ></mj-select>
              </div>
            </el-form-item>
            <div class="step-btns">
              <div class="mj-button orange step-btn-next cursor" @click="handleOpenAccountNext">下一步</div>
              <!--<mj-button text="下一步" height="38" type="orange" class="step-btn-next"></mj-button>-->
              <div class="returnback cursor" @click="routerBack">返回</div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <mijin-dialog
      v-show="showDialog"
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

export default {
  name: "creditBasePage",
  components: {
    MijinHeader,
    MijinFootter,
    MijinSteps,
    MijinDialog
  },
  data() {
    let familyMobileRule = (rule, value, callback) => {
      if (!this.$valid.phone11.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      }
      if (value == JSON.parse(this.$getLocalStorage("loginInfo")).mobile) {
        callback(new Error("与本人号码重复"));
      }
      if (value == this.creditForm.otherMobile) {
        callback(new Error("与其他联系人号码重复"));
      }
      callback();
    };
    let otherMobileRule = (rule, value, callback) => {
      if (!this.$valid.phone11.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      }
      if (value == JSON.parse(this.$getLocalStorage("loginInfo")).mobile) {
        callback(new Error("与本人号码重复"));
      }
      if (value == this.creditForm.familyMobile) {
        callback(new Error("与亲属号码重复"));
      }
      callback();
    };
    return {
      baseInfo: {
        name: "",
        mobile: "",
        ident: ""
      },
      productId: "",
      productType: "",
      creditForm: {
        marital: "",
        familyName: "",
        familyRelationship: "",
        familyMobile: "",
        otherName: "",
        otherRelationship: "",
        otherMobile: "",
        actualManagementAddress: "",
        provinceCode: "",
        cityCode: "",
        industry: "",
        annualSalary: "",
        loanPurpose: "",
        payment: "",
        shopName: ""
      },
      YCT_params: {
        // shopName: "",
        password: "",
        accountNumber: ""
      },
      showDialog: false,
      isSuccess: false,
      messageInfo: "",
      creditFormRules: {
        marital: [
          {
            required: true,
            message: "请选择婚姻状况",
            trigger: "change"
          }
        ],
        familyName: [
          {
            required: true,
            message: "请输入亲属姓名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: "2-10个字符",
            trigger: "blur"
          },
          {
            pattern: this.$valid.realText,
            message: "输入格式不正确!",
            trigger: "blur"
          }
        ],
        familyRelationship: [
          {
            required: true,
            message: "请选择亲属关系",
            trigger: "change"
          }
        ],
        familyMobile: [
          {
            required: true,
            message: "请输入亲属手机号码",
            trigger: "blur"
          },
          {
            validator: familyMobileRule,
            trigger: "blur"
          }
        ],
        otherName: [
          {
            required: true,
            message: "请输入其他联系人姓名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: "2-10个字符",
            trigger: "blur"
          },
          {
            pattern: this.$valid.realText,
            message: "输入格式不正确!",
            trigger: "blur"
          }
        ],
        otherRelationship: [
          {
            required: true,
            message: "请选择其他联系人关系",
            trigger: "change"
          }
        ],
        otherMobile: [
          {
            required: true,
            message: "请输入其他联系人手机号码",
            trigger: "blur"
          },
          {
            validator: otherMobileRule,
            trigger: "blur"
          }
        ],
        actualManagementAddress: [
          {
            required: true,
            message: "请输入详细实际经营地址",
            trigger: "blur"
          },
          {
            min: 1,
            max: 100,
            message: "100字符以内",
            trigger: "blur"
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
        industry: [
          {
            required: true,
            message: "请选择所属行业",
            trigger: "change"
          }
        ],
        annualSalary: [
          {
            required: true,
            message: "请选择您的年收入范围",
            trigger: "change"
          }
        ],
        loanPurpose: [
          {
            required: true,
            message: "请选择借款用途",
            trigger: "change"
          }
        ],
        payment: [
          {
            required: true,
            message: "请选择还款来源",
            trigger: "change"
          }
        ],
        shopName: [
          {
            required: true,
            message: "请输入店铺（企业）名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 50,
            message: "50字符以内",
            trigger: "blur"
          }
        ]
      },
      YCT_paramsRules: {
        password: [
          {
            required: true,
            message: "请输入烟草订烟网密码",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "1-20字符",
            trigger: "blur"
          }
        ],
        accountNumber: [
          {
            required: true,
            message: "请输入烟草订烟网账号",
            trigger: "blur"
          },
          {
            min: 1,
            max: 50,
            message: "1-50字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.productId = JSON.parse(
      this.$getSessionStorage("checkedItems")
    ).productId;
    this.getProductDetail(this.productId);
    this.getLoginDetail();
    this.getRelationList();
  },
  methods: {
    // 省份选择变化
    handleChangeProvince(val) {},
    // 市选择变化
    handleChangeCity(val) {},
    // 返回按钮
    routerBack() {
      this.$router.go(-1);
    },
    // 获取产品详情
    getProductDetail(productId) {
      api.getProductInfo(productId).then(res => {
        if (res.data.code === 200) {
          this.productType = res.data.body.productType;
        }
      });
    },
    // 获取当前登陆账户详情
    getLoginDetail() {
      api.getLoginDetail().then(res => {
        if (res.data.code === 200) {
          this.baseInfo.name = res.data.body.realName;
          this.baseInfo.mobile = res.data.body.mobile;
          this.baseInfo.ident = res.data.body.ident;
          this.creditForm.marital = res.data.body.marriage;
        }
      });
    },
    // 获取亲属关系列表
    getRelationList() {
      api.getRelationList().then(res => {
        if (res.data.code === 200) {
          let _relationDTO = res.data.body.relationDTO;
          let _friendDTO = res.data.body.friendDTO;
          this.creditForm.familyName =
            _relationDTO && _relationDTO.realName ? _relationDTO.realName : "";
          this.creditForm.familyRelationship =
            _relationDTO && _relationDTO.relKind ? _relationDTO.relKind : "";
          this.creditForm.familyMobile =
            _relationDTO && _relationDTO.mobile ? _relationDTO.mobile : "";
          this.creditForm.otherName =
            _friendDTO && _friendDTO.realName ? _friendDTO.realName : "";
          this.creditForm.otherRelationship =
            _friendDTO && _friendDTO.relKind ? _friendDTO.relKind : "";
          this.creditForm.otherMobile =
            _friendDTO && _friendDTO.mobile ? _friendDTO.mobile : "";

          let _partyBasic = res.data.body.partyBasicInfoBackFillDTO
            ? res.data.body.partyBasicInfoBackFillDTO
            : {};
          this.creditForm.actualManagementAddress = _partyBasic.actualManagementAddress
            ? _partyBasic.actualManagementAddress
            : "";
          this.creditForm.shopName = _partyBasic.shopName
            ? _partyBasic.shopName
            : "";
          this.creditForm.industry = _partyBasic.industry
            ? _partyBasic.industry
            : "";
          this.creditForm.annualSalary = _partyBasic.annualSalary
            ? _partyBasic.annualSalary
            : "";
          this.creditForm.loanPurpose = _partyBasic.loanPurpose
            ? _partyBasic.loanPurpose
            : "";
          this.creditForm.payment = _partyBasic.payment
            ? _partyBasic.payment
            : "";
        }
      });
    },
    // 开户下一步
    handleOpenAccountNext() {
      this.$refs["creditForm"].validate(valid => {
        if (valid) {
          const _params = this.$deepcopy(this.creditForm);
          this.$setSessionStorage("accountInfos", JSON.stringify(_params));
          this.$router.push({
            name: "creditSupplementPage"
          });
        } else {
          this.showDialog = true;
          this.isSuccess = false;
          this.messageInfo = "请检查您的信息填写是否正确！";
          return false;
        }
      });
    },
    // 关闭弹框
    handleClose() {
      this.showDialog = false;
      this.isSuccess = false;
      this.messageInfo = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mr10 {
  margin-right: 10px;
}

.width290 {
  width: 290px;
}
</style>
