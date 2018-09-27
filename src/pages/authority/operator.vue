<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'QuotaPage'"></mijin-header>
    <div class="credit-content">
      <mijin-steps first second v-if="fromPage !== 'usersAccountPage'"></mijin-steps>
      <div class="main-content credit-form">
        <h3>运营商认证</h3>
        <el-form ref="operatorForm" :model="creditForm" label-width="150px" :rules="creditFormRules">
          <div class="credit-form-inner auth-operator-inner">
            <el-form-item label="注册手机号：" class="custom-width" prop="mobile">
              <mj-input v-model="creditForm.mobile" :mode="'VIEW'"></mj-input>
            </el-form-item>
            <el-form-item label="服务密码：" class="custom-width" prop="password">
              <mj-input v-model="creditForm.password" type="password" @blur="handleBlur"></mj-input>
              <p v-if="isNormal" style="color: #f56c6c; font-size:12px; line-height: 20px;">用户请致电运营商客服电话获取服务密码</p>
            </el-form-item>
            <div class="operate-item flex-start" v-show="showDynamic">
              <p class="special-label"><span>*</span>动态密码：</p>
              <div>
                <mj-input class="d-input" type="password" v-model="creditForm.captcha" @blur="handleCaptchaBlur"></mj-input>
                <p style="color: rgb(245, 108, 108);font-size: 12px;line-height: 20px;" v-show="hasDynamicPassword">{{dynamicText}}</p>
              </div>
            </div>
            <div class="step-btns">
              <div class="mj-button orange step-btn-next cursor" @click="handleAuthorityOperator">提交</div>
              <div v-if="fromPage !== 'usersAccountPage'" class="step-next margin-top10 cursor" @click="handleRedirect"><span>跳过此步骤></span></div>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <mijin-dialog v-show="showAuthDialog" :is-success="isSuccess" :message="messageInfo" :is-direct="isDirect" :button-name="btnName" @ok="handleSuccessRedirect" @close="handleClose"></mijin-dialog>
  </div>
</template>

<script>
  import MijinHeader from '../../components/header.vue';
  import MijinFootter from '../../components/footter.vue';
  import MijinSteps from '../components/steps.vue';
  import MijinDialog from '../../components/dialogBox.vue';
  import * as api from '../api/authority';
export default {
  name: 'authorityOperator',
  components: {
    MijinHeader,
    MijinFootter,
    MijinSteps,
    MijinDialog
  },
  data () {
    return {
      isNormal:true,
      fromPage: this.$route.query.pageName,
      disabledCode: false,
      showDynamic: false,
      showAuthDialog: false,
      messageInfo:'',
      btnName: '关闭',
      isDirect: false,
      isSuccess: false,
      hasDynamicPassword:false,
      dynamicText:'',
      creditForm: {
        mobile: '',
        password:'',
        captcha: '',
        token:''
      },
      creditFormRules: {
        mobile: [
          {required: true, message: '请输入联系人手机号', trigger: 'blur'},
          { pattern: this.$valid.mobile, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '用户请致电运营商客服电话获取服务密码！', trigger: 'blur'}
        ]
      }
    }
  },
  created(){
    if(this.$getLocalStorage('users') && this.$getLocalStorage('users') !==''){
      const users = JSON.parse(this.$getLocalStorage('users'));
      this.creditForm.mobile = users.mobile;
    }else{
      this.$router.push({name:'LoginPage'});
    }
  },
  methods: {
    handleCaptchaBlur(){
      this.hasDynamicPassword = this.creditForm.captcha && this.creditForm.captcha !== '' ? false : true;
    },
    handleBlur(){
      if(this.creditForm.password !== ''){
        this.isNormal = true;
      }else {
        this.isNormal = false;
      }
    },
    handleAuthorityOperator(){
      const _params = {
        password: this.creditForm.password,
        captcha: this.creditForm.captcha,
        token: this.creditForm.token
      }
      if(this.fromPage !== 'usersAccountPage'){
        this.$refs['operatorForm'].validate((valid) => {
          if (valid) {
            if(this.showDynamic) {
              if(!this.hasDynamicPassword) {
                api.operatorAuth(_params).then(res => {
                  if(res.data.code === 201){
                    if(res.data.body.code === 10100){
                      this.isDirect = false;
                      this.showAuthDialog = true;
                      this.isSuccess = true;
                      this.messageInfo = '运营商认证成功！';
                    }else{
                      this.isDirect = true;
                      this.showAuthDialog = true;
                      this.isSuccess = false;
                      this.messageInfo = res.data.body.note;
                      this.btnName = '关闭';
                    }
                  }
                },response => {
                  this.isDirect = true;
                  this.showAuthDialog = true;
                  this.isSuccess = false;
                  this.messageInfo = response.data.message;
                  this.btnName = '关闭';
                })
              }else {
                this.hasDynamicPassword = true;
                this.dynamicText = '请输入动态密码!';
              }
            }else {
              api.operatorAuth(_params).then(res => {
                if(res.data.code === 201){
                  if(res.data.body.code === 10100){
                    this.isDirect = false;
                    this.showAuthDialog = true;
                    this.isSuccess = true;
                    this.messageInfo = '运营商认证成功！';
                  }else if(res.data.body.code === 10002){
                    this.creditForm.token = res.data.body.token;
                    this.showDynamic = true;
                    this.hasDynamicPassword = true;
                    this.dynamicText = res.data.body.note;
                  }else{
                    this.isDirect = true;
                    this.showAuthDialog = true;
                    this.isSuccess = false;
                    this.messageInfo = res.data.body.note;
                    this.btnName = '关闭';
                  }
                }
              },response => {
                this.isDirect = true;
                this.showAuthDialog = true;
                this.isSuccess = false;
                this.messageInfo = response.data.message;
                this.btnName = '关闭';
              })
            }

          } else {
            this.isNormal = false;
            return false;
          }
        });
      }else{
        this.$refs['operatorForm'].validate((valid) => {
          if (valid) {
            if(this.showDynamic) {
              if(!this.hasDynamicPassword) {
                api.operatorCenterAuth(_params).then(res => {
                  if(res.data.code === 201){
                    if(res.data.body.code === 10100){
                      this.isDirect = true;
                      this.showAuthDialog = true;
                      this.isSuccess = true;
                      this.messageInfo = '运营商认证成功！';
                    }else{
                      this.isDirect = true;
                      this.showAuthDialog = true;
                      this.isSuccess = false;
                      this.messageInfo = res.data.body.note;
                      this.btnName = '关闭';
                    }
                  }
                },response => {
                  this.isSuccess = false;
                  this.messageInfo = response.data.message;
                  if(response.data.code === 5003004) {
                    this.btnName = '关闭';
                  }
                  this.isDirect = true;
                  this.showAuthDialog = true;
                })
              }else {
                this.hasDynamicPassword = true;
                this.dynamicText = '请输入动态密码!';
              }
            }else{
              api.operatorCenterAuth(_params).then(res => {
                if(res.data.code === 201){
                  if(res.data.body.code === 10100){
                    this.isDirect = true;
                    this.showAuthDialog = true;
                    this.isSuccess = true;
                    this.messageInfo = '运营商认证成功！';
                  }else if(res.data.body.code === 10002){
                    this.creditForm.token = res.data.body.token;
                    this.showDynamic = true;
                    this.hasDynamicPassword = true;
                    this.dynamicText = res.data.body.note;
                  }else{
                    this.isDirect = true;
                    this.showAuthDialog = true;
                    this.isSuccess = false;
                    this.messageInfo = res.data.body.note;
                    this.btnName = '关闭';
                  }
                }
              },response => {
                this.isSuccess = false;
                this.messageInfo = response.data.message;
                if(response.data.code === 5003004) {
                  this.btnName = '关闭';
                }
                this.isDirect = true;
                this.showAuthDialog = true;
              })
            }

          } else {
            this.isNormal = false;
            return false;
          }
        });
      }
    },
    handleSuccessRedirect(){
      if(this.isDirect) {
        if(this.fromPage === 'usersAccountPage') {
          this.$router.push({name:'usersAccountPage'})
        }else{
          this.$router.push({name:'creditBasePage'})
        }
      }
    },
    handleRedirect(){
      this.$router.push({name:'creditBasePage'});
    },
    handleClose(){
      if(this.isSuccess) {
        if(this.fromPage === 'usersAccountPage'){
          this.$router.push({name:'usersAccountPage'});
        }else{
          this.$router.push({name:'creditBasePage'});
        }
      }else{
        this.isDirect = false;
        this.showAuthDialog = false;
        this.isSuccess = false;
        this.messageInfo = '';
        this.btnName = '关闭';
      }
    }
  }
}
</script>

<style  lang="scss">
  .operate-item {
    .special-label {
      display: block;
      width: 150px;
      span {
        color: #f56c6c;
      }
    }
  }

</style>
