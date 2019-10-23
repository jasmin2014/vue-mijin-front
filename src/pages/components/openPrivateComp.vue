<template>
  <el-form ref="openForm" :model="openForm" label-width="180px">
    <div class="open-private-txt">
      <p class="warning">您即将前往银行页面进行存管账户的开设及支付密码的设置,请保存好支付密码.</p>
      <p class="grey">请务必保证在存管页面绑定的银行卡信息与以下信息一致.</p>
    </div>
    
    <div class="open-private-content private-h3">
      <h3>米今绑卡信息如下</h3>
      <div>
        <label>银行卡所属银行</label><span>{{openForm.bankName}}</span>
      </div>
      <div>
        <label>银行卡号</label><span>{{openForm.bankCardNo}}</span>
      </div>
      <div>
        <label>银行预留手机号</label><span>{{openForm.bankMobile}}</span>
      </div>
    </div>
    <div class="step-btns">
      <div class="mj-button orange step-btn-next cursor" @click="handleOpenNow">立即开户</div>
    </div>

    <div class="xian-success center">
      <p class="xian-suc-txt">*存管业务由泰然金融提供相关支持</p>
    </div>

    <!-- <div class="xian-success center">
      <p class="xian-suc-txt">提示:您即将跳转至西安存管银行页面进行开户操作。</p>
      <p class="xian-suc-txt">西安银行控件支持的浏览器：IE8、9、10，谷歌50以下版本。</p>
    </div> -->
  </el-form>
</template>

<script>
import { getAccountBankInfo } from "../api/users.js";
import { postXaOpenPrivage } from "../api/account.js";
import openTip from "../src/mixins/openTip.js";
import checkAccount from "../src/mixins/checkAccount.js";

export default {
  data() {
    return {
      openForm: {
        bankName: "",
        bankCardNo: "",
        bankMobile: ""
      }
    };
  },
  mixins: [checkAccount, openTip],
  created() {
    this.getAccountBankInfo();
  },
  methods: {
    getAccountBankInfo() {
      getAccountBankInfo().then(res => {
        if (res.data.code == 200) {
          let _mydata = res.data.body.centerInfo;
          this.openForm = _mydata;
        }
      });
    },
    handleOpenNow() {
      postXaOpenPrivage()
        .then(response => {
          if (
            response.data.code == 200 &&
            response.data.body &&
            response.data.body != ""
          ) {
            this.openTip(response.data.body);
          }
        })
        .catch(Error => {
          this.$alert(Error.data.message, "提示", {
            confirmButtonText: "确定",
            callback: action => {
              if (Error.data.code == "5003010") {
                this.getOpenStatus();
              } else {
                this.$router.push({ name: "HomePage" });
              }
            }
          });
        });
    }
  }
};
</script>

<style lang="scss">
.open-private-txt {
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  .warning {
    margin-top: 60px;
    font-size: 20px;
    font-weight: 600;
  }
  .grey {
    color: #666;
  }
}
.open-private-content {
  width: 50%;
  margin: 50px auto 0 auto;
  h3 {
    font-size: 20px;
    font-weight: 600;
    border-bottom: none;
  }
  > div {
    margin-top: 15px;
    label {
      width: 120px;
      display: inline-block;
    }
    span {
      color: #666;
      margin-left: 30px;
    }
  }
}
.open-private-content.private-h3 {
  h3 {
    font-size: 20px;
    font-weight: 600;
    border-bottom: none;
    color: #a9a9a9;
  }
}
.xian-success {
  width: 400px;
  margin: 20px auto;
  font-size: 14px;
  line-height: 24px;
  color: #ff8c00;
}
.xian-success.center {
  text-align: center;
}
</style>
