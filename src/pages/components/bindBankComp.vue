<template>
  <section class="section-custom custom-bindbank">
    <el-form class="custom-form label-width" :model="curentValue" ref="currentValue" :rules="currentValueRules">
      <el-form-item label="姓名">
        <mj-input v-model="realName" :mode="'VIEW'"></mj-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <mj-input v-model="ident" :mode="'VIEW'"></mj-input>
      </el-form-item>
      <el-form-item label="银行卡号" prop="bankCard">
        <mj-input v-model="curentValue.bankCard" :mode="'EDIT'"></mj-input>
      </el-form-item>
      <el-form-item label="银行预留手机号" prop="bankMobile">
        <mj-input v-model="curentValue.bankMobile" :mode="'EDIT'"></mj-input>
      </el-form-item>
      <el-row class="bindbak-btn">
        <el-button class="mj-button orange step-btn-next cursor" @click="handleSubmit">提交</el-button>
        <span class="bank-list-txt" @click="handleClickShowBanks">支持银行列表</span>
      </el-row>
    </el-form>
  </section>
</template>

<script>
import { getLoginDetail, postBindBank } from "../api/account.js";
// import { postBindBank } from "../api/account.js";
export default {
  name: "bindBankPage",
  props: {
    value: Object
  },
  data() {
    return {
      realName: "",
      ident: "",
      curentValue: {
        bankCard: "",
        bankMobile: ""
      },
      currentValueRules: {
        bankCard: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
          {
            pattern: this.$valid.card,
            message: "请输入正确的银行卡号",
            trigger: "blur"
          }
        ],
        bankMobile: [
          { required: true, message: "请输入银行预留手机号", trigger: "blur" },
          {
            pattern: this.$valid.phoneRegexp13_19,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    fromPageName: function(val, oldVal) {
      this.pageName = val;
    }
  },
  computed: {},
  created() {
    this.currentValue = this.value;
    this.getLoginDetail();
  },
  methods: {
    getLoginDetail() {
      getLoginDetail().then(res => {
        if (res.data.code == 200) {
          this.realName = res.data.body.realName;
          this.ident = res.data.body.ident;
        }
      });
    },
    handleSubmit() {
      this.$refs["currentValue"].validate(valid => {
        if (valid) {
          this.$emit("submit", this.curentValue);
        }
      });
    },
    handleClickShowBanks() {
      this.$emit("showBanklist");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.section-custom.custom-bindbank {
  width: 500px;
  margin: 10vh auto 10vh auto;
  .custom-form {
    .el-form-item {
      margin: 0 0 22px 0;
      display: flex;
      .el-form-item__content {
        flex: 1;
      }
    }
  }
  .custom-form.label-width {
    .el-form-item__label {
      width: 150px;
      text-align: right;
    }
  }
  .step-btn-next {
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    margin-top: 20px;
  }
  .bank-list-txt {
    color: #ff8b01;
    font-size: 14px;
    margin-left: 20px;
  }
  .bindbak-btn {
    width: 250px;
    text-align: center;
    margin: 0 auto 0 180px;
  }
}
</style>
