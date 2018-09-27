<template>
  <div class="content ">
    <div class="login-content">
      <div class="login-content-inner">
        <div class="main-content login-main">
          <div class="main-content login-inner">
            <div class="login-inner-box">
              <h3>欢迎登录米今商贷</h3>
              <div class="login-input">
                <input v-model.trim="userPhone" @input="changePhone" placeholder="请输入手机号"/>
              </div>
              <div class="login-input flex input-code">
                <div class="the-code"><input v-model="userCode" tabindex="-1" @change="handleCheckCode" placeholder="请输入验证码"/></div>
                <div class="get-code cursor" v-if="!disabledCode" @click="handleCode">{{ btnCountDown }}</div>
                <div class="get-code disabled-code" v-else>{{btnCountDown}}</div>
              </div>
              <p style="color: red;font-size: 12px;line-height:30px;" v-if="isError">{{errorMsg}}</p>
              <button class="login-btn cursor" @click="login">登录</button>
            </div>
          </div>
        </div>
        <mijin-header></mijin-header>
      </div>
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
  import MijinHeader from '../components/header.vue';
  import MijinFootter from '../components/footter.vue';

  import * as api from '../api/common'


  export default {
    name: 'LoginPage',
    components: {
      MijinHeader,
      MijinFootter
    },
    data() {
      return {
        userPhone: '',
        userCode: '',
        disabledCode: true,
        btnCountDown: '获取短信验证码',
        isError: false,
        errorMsg: ''
      }
    },
    created(){
      if(this.$getLocalStorage('token') && this.$getLocalStorage('token') !=='' ){
        this.$router.push({name:'HomePage'})
      }
    },
    methods: {
      changePhone() {
        const phone = this.userPhone;
        this.disabledCode = !this.$valid.phoneRegexp.test(phone);
      },
      login(){
        if(this.userPhone === ''){
          this.isError = true;
          this.errorMsg = '请输入手机号!';
        }else if(!this.$valid.phoneRegexp.test(this.userPhone)) {
          this.isError = true;
          this.errorMsg = '请输入正确的手机号!';
        }else if(this.userCode === '') {
          this.isError = true;
          this.errorMsg = '请输入验证码！'
        }else{
          this.doLogin(this.userPhone,this.userCode);
        }
      },
      doLogin(phone, phoneCode){
        api.doLogin(phone, phoneCode).then((res) =>{
          const _data = res.data;
          if (_data.code === 200){
            this.isError = false;
            this.errorMsg = ''
            if (_data.body.userStatus === 'USABLE'){
              this.$setLocalStorage('token',_data.body.token);
              this.$setLocalStorage('loginInfo', JSON.stringify(_data.body));
              this.$router.push({name: 'HomePage'});
            }
          }
        },res => {
          if(res.data.code === 500) {
            this.errorMsg = '登录失败, 服务器错误!'
          }else{
            this.errorMsg = res.data.message;
          }
          this.isError = true;

        })
      },
      handleCode(){
        api.sendCode(this.userPhone).then((res)=>{
          if(res.data.code === 200){
            this.countDown(60);
          }
        }, res => {
          this.disabledCode = true;
          this.btnCountDown = '稍后再试';
          setTimeout(() => {
            this.disabledCode = false;
            this.btnCountDown = '获取短信验证码';
          },30000)
        })
      },
      handleCheckCode(){
        if(this.userCode.length === 4) {
          this.isError = false;
          this.errorMsg = '';
        }
      },
      countDown(sec) {
        if (sec >= 0) {
          this.disabledCode = true;
          this.btnCountDown = `剩余${sec}s`;
          setTimeout(() => {
            this.countDown(--sec);
          }, 1000)
        } else {
          this.disabledCode = false;
          this.btnCountDown = '获取短信验证码';
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .login-content {
    width: 100%;
    height: 808px;
    background: url("../assets/imgs/banner/login_bg_01.jpg") no-repeat center top;
    .login-content-inner {
      position: relative;
      height: 100%;
      background: url("../assets/imgs/banner/login_bg_02.jpg") no-repeat center 404px;
      .login-header {
        width: 100%;
        position: absolute;
        left:0;
        top:0;
      }
    }
  }
  .login-main {
    position: relative;
    height: 100%;
    background: url("../assets/imgs/banner/login_pic_01.jpg") no-repeat center top;
    .login-inner {
      position: relative;
      height: 100%;
      background: url("../assets/imgs/banner/login_pic_02.jpg") no-repeat center 404px;
      .login-inner-box {
        width: 350px;
        height: 280px;
        background: #fff;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -140px;
        padding: 0 20px;
        h3 {
          font-size: 18px;
          line-height: 80px;
          color: #666;
          font-weight: normal;
        }
        .login-input {
          height: 40px;
          input {
            width: 100%;
            height: 40px;
            border: 1px solid #ddd;
            padding-left: 10px;
          }
          input::-webkit-input-placeholder {
            color: #999;
            padding-left: 10px;
          }
        }
        .input-code {
          margin-top: 10px;
          > div {
            height: 40px;
            line-height: 40px;
          }
          .the-code {
            width: 180px;
          }
          .get-code {
            border: none;
            width: 120px;
            background: #fe8c00;
            color: #fff;
            font-size: 14px;
            text-align: center;
            cursor: pointer;
          }
          .get-code.disabled-code {
            background: #ddd;
          }
        }
        .login-btn {
          border: none;
          width: 88%;
          height: 40px;
          line-height: 40px;
          -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          border-radius: 3px;
          position: absolute;
          bottom: 30px;
          left: 20px;
          background: #fe8c00;
          color: #fff;
          text-align: center;
          letter-spacing: 10px;
        }
      }
    }

  }
</style>
