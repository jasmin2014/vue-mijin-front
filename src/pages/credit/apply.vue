<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'QuotaPage'"></mijin-header>
    <div class="credit-content">
      <mijin-steps first></mijin-steps>
      <div class="main-content credit-form operate">
        <h3>{{productName}}</h3>
        <el-form ref="applyForm" :model="creditForm" label-width="150px" :rules="creditFormRules">
          <div class="credit-form-inner credit-form-apply">
            <el-form-item label="申请授信金额：" prop="creditApplicationAmount">
              <mj-input v-model="creditForm.creditApplicationAmount" :placeholder="amountArea" @blur="handleBlur"></mj-input>
            </el-form-item>
            <div class="step-agreement flex-start">
              <label :class="{'checked': isChecked}"><i class="cursor" @click="handleChecked"></i></label>
              <div>我已阅读，并同意<router-link to="../user/user-contract" target="_blank">《用户协议》</router-link>及<router-link to="../user/risk-tips" target="_blank">《风险提示》</router-link></div>
            </div>
            <div class="step-btns">
              <div class="mj-button orange step-btn-next cursor" @click="handleNextStep">下一步</div>
              <!--<mj-button text="下一步" height="38" type="orange" class="step-btn-next" @click="handleNextStep"></mj-button>-->
              <!--<p class="step-tips">提示语</p>-->
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <mijin-dialog v-show="showDialog" :is-success="isSuccess" :message="messageInfo" @close="handleClose"></mijin-dialog>
  </div>
</template>

<script>
  import MijinHeader from '../../components/header.vue';
  import MijinFootter from '../../components/footter.vue';
  import MijinSteps from '../components/steps.vue';
  import MijinDialog from '../../components/dialogBox.vue';
  import * as Api from '../api/authority';
  import * as api from '../api/account';
export default {
  name: 'creditApplyStep1',
  components: {
    MijinHeader,
    MijinFootter,
    MijinSteps,
    MijinDialog
  },
  data () {
    return {
      showDialog: false,
      isSuccess: false,
      messageInfo: '',
      creditForm: {
        creditApplicationAmount:'',
      },
      creditFormRules: {
        'creditApplicationAmount': [
          {required: true, message: '请输入申请授信金额', trigger: 'blur'},
          {pattern: this.$valid.RegInt, message: '请输入正整数!', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if(Number(value) < Number(JSON.parse(this.$getSessionStorage('checkedItems')).creditMinAmount) ) {
                callback('申请额度不能小于' + JSON.parse(this.$getSessionStorage('checkedItems')).creditMinAmount);
              }else if(Number(value) > Number(JSON.parse(this.$getSessionStorage('checkedItems')).creditMaxAmount)) {
                callback('申请额度不能大于' + JSON.parse(this.$getSessionStorage('checkedItems')).creditMaxAmount)
              }else {
                callback();
              }
            }
          }
        ]
      },
      isChecked: false,
      productName: '',
      creditMinAmount: 0,
      creditMaxAmount: 0,
      amountArea: ''
    }
  },
  created(){
    this.getAmount();
  },
  methods: {
    getAmount(){
      this.productName = this.$getSessionStorage('checkedItems') && this.$getSessionStorage('checkedItems') !=='' ? JSON.parse(this.$getSessionStorage('checkedItems')).productName : '';
      this.creditMinAmount = this.$getSessionStorage('checkedItems') && this.$getSessionStorage('checkedItems') !=='' ? JSON.parse(this.$getSessionStorage('checkedItems')).creditMinAmount : 0;
      this.creditMaxAmount = this.$getSessionStorage('checkedItems') && this.$getSessionStorage('checkedItems') !=='' ? JSON.parse(this.$getSessionStorage('checkedItems')).creditMaxAmount : 0;
      this.amountArea = "额度范围" + this.creditMinAmount + "~" + this.creditMaxAmount;
    },
    handleBlur(val){
      this.$setSessionStorage('creditApplicationAmount',this.creditForm.creditApplicationAmount);
    },
    handleChecked(){
      this.isChecked = !this.isChecked;
    },
    handleNextStep(){
      if(this.isChecked) {
        this.$refs['applyForm'].validate((valid) => {
          if (valid) {
            Api.checkIdCardCredit().then(res => {
              const _data = res.data;
              if(_data.code === 200) {
                if(_data.body){
                  this.$router.push({name:'authorityOperator'});
                }else{
                  this.$router.push({name:'creditAuthority'});
                }
              }
            })
          } else {
            return false;
          }
        });
      }else{
        this.showDialog = true;
        this.isSuccess = false;
        this.messageInfo = '请先勾选并同意协议！'
      }
    },
    handleClose(){
      this.showDialog = false;
      this.isSuccess = false;
      this.messageInfo = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.step-content {
  width:100%;
  background: #eee;
  padding:20px 0 60px 0;
  .step-form {
    background: #fff;
    padding: 60px 0 120px 0;
    .step-form-inner {
      width: 440px;
      margin: 0 auto;
      h3 {
        text-align: center;
        font-size: 30px;
        font-weight:normal;
      }

      .step-btns {
        margin-top: 80px;
        text-align: center;
        .step-btn-next {
          display: inline-block;
          font-size: 14px;
        }
        >.step-tips {
          font-size: 12px;
          color: red;
          line-height:30px;
        }
      }
    }
  }
}

</style>
