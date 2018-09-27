<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'QuotaPage'"></mijin-header>
    <div class="credit-content">
      <mijin-steps first second></mijin-steps>
      <div class="main-content credit-form">
        <h3>央行征信认证</h3>
        <el-form ref="form" :model="creditForm" label-width="150px">
          <div class="credit-form-inner">
            <el-form-item label="人行征信登录名">
              <mj-input v-model="creditForm.cBankName" placeholder="请输入央行征信登录名" width="350"></mj-input>
            </el-form-item>
            <el-form-item label="密码">
              <mj-input v-model="creditForm.bankPassword" width="350"></mj-input>
            </el-form-item>
            <el-form-item label="验证码">
              <div class="flex-start dynamic-password dypass-curr">
                <mj-input class="d-input" v-model="creditForm.dynamicPassword"></mj-input>
                <div class="code">图形码</div>
              </div>
            </el-form-item>
            <div class="dynamic-tips">
              <p>1、请确保人行征信获取成功且身份验证码有效</p>
              <p>2、如忘记登录名或密码请在人行征信中心网站找回</p>
            </div>
            <div class="step-btns">
              <mj-button text="提交" height="38" type="orange" class="step-btn-next"></mj-button>
              <div class="step-next"><span>跳过此步骤></span></div>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
  import MijinHeader from '../../components/header.vue';
  import MijinFootter from '../../components/footter.vue';
  import MijinSteps from '../components/steps.vue';
  import MijinDialog from '../../components/dialogBox.vue';
export default {
  name: 'creditCenterBank',
  components: {
    MijinHeader,
    MijinFootter,
    MijinSteps,
    MijinDialog
  },
  data () {
    return {
      creditForm: {
        cBankName: '',
        bankPassword:'',
        dynamicPassword:''
      }

    }
  },
  created(){},
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.authority-content {
  width:100%;
  background: #eee;
  padding:20px 0 60px 0;
  .authority-form {
    background: #fff;
    padding: 0 20px 120px 20px;
    h3 {
      line-height: 40px;
      font-size: 14px;
      border-bottom: 1px dashed #ddd;
      font-weight:normal;
    }
    .authority-form-inner {
      width: 700px;
      margin: 30px auto 0 auto;
      .step-btn-next {
        display: inline-block;
        font-size: 14px;
      }
      .auth-input {
        width: 440px;
        .dynamic-password{
          /*width: 100%;*/
          .d-input {
            width: 340px;
          }
          .code {
            flex: 1;
            line-height: 40px;
            height: 40px;
            text-align: center;
            margin-left: 10px;
            font-size: 14px;
            border: 1px solid #ddd;
            color: #fe8c00;
            padding: 0 10px;
            border-radius: 4px;
          }
        }
      }
      .dynamic-tips {
        >label {
          width: 120px;
          height: 30px;
          display: block;
          margin-right: 10px;
        }
        >div {
          >p {
            color: #fe8c00;
            font-size: 14px;
          }
        }
      }
      .auth-upload {
        >label {
          width: 120px;
          font-size: 14px;
          text-align: right;
          display: inline-block;
          height: 38px;
          margin-right: 10px;
          line-height: 38px;
          color: #333;
        }
        >section {
          >p.tips {
            height: 38px;
            line-height: 38px;
            font-size: 14px;
            color: red;
          }
          .pic-signs {
            margin-left: 60px;
          }
        }
      }
      .step-agreement {
        height: 30px;
        line-height: 30px;
        >label {
          width:120px;
          text-align: right;
          margin-right: 10px;
          cursor: pointer;
          i {
            width: 15px;
            height: 15px;
            display: inline-block;
            background: url("../../assets/imgs/check.png") no-repeat center center;
          }
        }
        >label.checked {
          i {
            background: url("../../assets/imgs/checked.png") no-repeat center center;
          }
        }
        >div {
          font-size: 12px;
          a {
            color: #fe8c00;
          }
        }
      }

    }
  }
}

</style>
