<template>
  <div class="content">
    <div class="top-banner-quota">
      <div class="top-quota-inr">
        <div class="main-content top-quota-content">
          <div class="main-content quota-box">
            <section class="quota-no" v-if="!haveAmount">
              <p class="quota-top-text">进行信用审核后，即可查看授权额度</p>
              <div class="quota-choose-items">
                <p>请选择需要申请的产品</p>
                <ul class="clearfix">
                  <li class="cursor" v-for="(product,index) in products" :key="index" :class="{'active':activeProduct === product.productId}" @click="handleCheckedProducts(product)"><label></label>{{product.productName}}</li>
                </ul>
              </div>
              <div class="quota-btns">
                <div class="button cursor" @click="handleAppplyCredit">申请授信</div>
                <div class="quota-more-records margin-top20">
                  <router-link to="user/credit">查看记录 ></router-link>
                </div>
              </div>
            </section>
            <section class="quota-no" v-else>
              <div>
                <p class="normal-txt">您的授信额度为</p>
                <p class="special-txt">{{creditAmount.creditAmount}}元</p>
                <p class="normal-txt letter-spacing">当前可用额度{{creditAmount.availableAmount}}（元）</p>
              </div>
              <div class="quota-btns">
                <div class="quota-product">授信产品为<span>{{creditAmount.productName }}</span></div>
                <div class="button cursor" @click="handleCheckedAccountOpen">申请借款</div>
                <div class="quota-more-records margin-top20">
                  <router-link to="user/credit">查看记录 ></router-link>
                </div>
              </div>
            </section>
          </div>
        </div>
        <mijin-header :active-page="'QuotaPage'"></mijin-header>
      </div>

      <!--<div class="main-content quota-box">

      </div>-->
    </div>
    <mijin-footter></mijin-footter>
    <div class="mj-message-box" v-show="isNoLogin">
      <div class="mj-mask cursor" @click="isNoLogin=false;"></div>
      <div class="message-inner message-login">
        <div class="message-close cursor" @click="isNoLogin=false;"><i class="icon iconfont icon-guanbi"></i></div>
        <div class="message-content fail">
          <div class="pic"></div>
          <p class="tip-text">还未登录，请先登录！</p>
        </div>
        <div class="message-btns">
          <div class="message-btn-ok cursor" @click="handleLogin">去登录</div>
        </div>
      </div>
    </div>
    <mijin-dialog v-show="showRedirectDialog" :is-success="isRedirectSuccess" :message="messageRedirectInfo" :double-button="double" :ok-button-name="okButtonName" @ok="handleRedirect" @close="handleClose"></mijin-dialog>
  </div>
</template>

<script>
  import MijinHeader from '../components/header.vue';
  import MijinFootter from '../components/footter.vue';
  import mijinDialog from '../components/dialogBox.vue';
  import * as api from './api/account';
export default {
  name: 'QuotaPage',
  components: {
    MijinHeader,
    MijinFootter,
    mijinDialog
  },
  data () {
    return {
      haveAmount: false,
      activeProduct: '',
      isNoLogin: false,
      products: [],
      isChecked: {},
      okButtonName:'查看进度',
      showRedirectDialog: false,
      isRedirectSuccess: false,
      messageRedirectInfo: '',
      double: false,
      creditAmount: {
      },
      totalCreditAmount: 100000
    }
  },
  created(){
    this.getCreditInfo();
  },
  methods: {
    getCreditInfo(){
      api.getCreditInfo().then(res => {
        if(res.data.code === 200) {
          let _data = res.data.body;
          if(res.data.body.haveAmount) {
            this.creditAmount = this.$deepcopy(_data.creditAmountDTOList[0]);
            this.creditAmount.creditAmount = Number(_data.creditAmountDTOList[0].creditAmount) >= 0 ? _data.creditAmountDTOList[0].creditAmount : 0;
            this.creditAmount.availableAmount = Number(_data.creditAmountDTOList[0].availableAmount) >= 0 ? _data.creditAmountDTOList[0].availableAmount : 0;
            this.haveAmount = true;
            this.$setSessionStorage('checkedProducts',JSON.stringify({
              creditId: this.creditAmount.creditId,
              productId: this.creditAmount.productId,
              productName: this.creditAmount.productName
            }))
          }else{
            this.products = res.data.body.creditAmountDTOList;
            this.haveAmount = false;
          }
        }
      }, (res) => {

      })
    },
    handleCheckedProducts(row){
      this.activeProduct = row.productId;
      this.isChecked = this.$deepcopy(row);
    },
    handleRedirect(){
      this.$router.push({name:'usersCreditPage'});
      this.handleClose();
    },
    handleAppplyCredit(){
      if(this.$getLocalStorage('token') && this.$getLocalStorage('token') !== ''){
        this.isNoLogin = false;
        if(this.isChecked && this.isChecked.productId){
          api.getCheckedCredit().then(res => {
            if(res.data.code === 200) {
              const _creditUserInfo = {
                productName:this.isChecked.productName,
                productId:this.isChecked.productId,
                creditMinAmount: this.isChecked.creditMinAmount,
                creditMaxAmount: this.isChecked.creditMaxAmount
              };
              this.$setSessionStorage('checkedItems',JSON.stringify(_creditUserInfo));
              this.$router.push({name:'creditApplyStep1'});
            }else if(res.data.code === 4002001) {
              this.showRedirectDialog = true;
              this.isRedirectSuccess = false;
              this.messageRedirectInfo = res.data.message;
              this.double = true;
            }else{
              this.showRedirectDialog = true;
              this.isRedirectSuccess = false;
              this.messageRedirectInfo = res.data.message;
              this.double = false;
            }
          },(response) => {
            if(response.data.code === 4002001) {
              this.showRedirectDialog = true;
              this.isRedirectSuccess = false;
              this.messageRedirectInfo = response.data.message;
              this.double = true;
            }else{
              if(response.data.body) {
                let _msg = '';
                for(const key in response.data.body){
                  _msg += response.data.body[key] + '  ';
                }
                this.messageRedirectInfo = _msg;
              }else{
                this.messageRedirectInfo = response.data.message ? response.data.message : '操作失败!';
              }
              this.showRedirectDialog = true;
              this.isRedirectSuccess = false;
              this.double = false;
            }

          })
        }else{
          this.messageRedirectInfo = '请先选择一个产品，再执行授信操作';
          this.showRedirectDialog = true;
          this.isRedirectSuccess = false;
          this.double = false;
        }
      }else{
        this.isNoLogin = true;
        this.$router.push({name:'LoginPage'});
      }
    },
    handleCheckedAccountOpen(){
      if(this.creditAmount.availableAmount && Number(this.creditAmount.availableAmount) > 0) {
        api.getAccountStatus().then(res => {
          if(res.data.code === 200) {
            if(res.data.body.status === '0') {
              this.$router.push({name:'accountOpenPage',query:{'creditAmount': this.creditAmount.creditAmount,'accountType': res.data.body.accountType ? res.data.body.accountType : '-1'}})
            }else if(res.data.body.status === '1'){
              /*调用开户之后的状态判断*/
              this.getCheckTheBankNumber();
            }else if(res.data.body.status === '2'){
              this.messageRedirectInfo = '账户正在开户中!';
              this.showRedirectDialog = true;
              this.isRedirectSuccess = false;
              this.double = false;
            }else{
              this.messageRedirectInfo = '';
              this.showRedirectDialog = false;
              this.isRedirectSuccess = false;
              this.double = false;
            }
          }
        }, res => {
          this.messageRedirectInfo = res.data.message ? res.data.message : '未知错误!';
          this.showRedirectDialog = true;
          this.isRedirectSuccess = false;
          this.double = false;
        })
      }else{
        this.messageRedirectInfo = '您的可用额度不足 ,不可执行借款操作!';
        this.showRedirectDialog = true;
        this.isRedirectSuccess = false;
        this.double = false;
      }
    },
    getCheckTheBankNumber(){
      api.checkOpenBankNumber().then(res => {
        if(res.data.code === 200) {
          this.getOpenStatus();
        }else{
          this.messageRedirectInfo = res.data.message ? res.data.message : '操作失败!';
          this.showRedirectDialog = true;
          this.isRedirectSuccess = false;
          this.double = false;
        }
      },(response) => {
        if(response.data.body) {
          let _msg = '';
          for(const key in response.data.body){
            _msg += response.data.body[key] + '  ';
          }
          this.messageRedirectInfo = _msg;
        }else{
          this.messageRedirectInfo = response.data.message ? response.data.message : '操作失败!';
        }
        this.showRedirectDialog = true;
        this.isRedirectSuccess = false;
        this.double = false;
      })
    },
    getOpenStatus(){
      const params = {
        creditId: this.creditAmount.creditId,
        productId: this.creditAmount.productId
      }
      api.checkOpenStatus(params).then(res => {
        if(res.data.code === 200) {
          this.$router.push({name:'accountLoanPage'});
        }else if(res.data.code === 4002021){
          this.$router.push({name:'creditGuaranteePage'});
        }else if(res.data.code === 4002005){
          this.messageRedirectInfo = res.data.message ? res.data.message : '操作失败!';
          this.showRedirectDialog = true;
          this.isRedirectSuccess = false;
          this.double = true;
        }else{
          this.messageRedirectInfo = res.data.message ? res.data.message : '操作失败!';
          this.showRedirectDialog = true;
          this.isRedirectSuccess = false;
          this.double = false;
        }
      },res => {
        if(res.data.body){
          let _msg = '';
          for (const key in res.data.body){
            _msg += res.data.body[key] + '  ';
          }
          this.messageRedirectInfo = _msg;
        }else{
          this.messageRedirectInfo = res.data.message ? res.data.message : '操作失败!';
        }
        this.showRedirectDialog = true;
        this.isRedirectSuccess = false;
        this.double = false;
      })
    },
    handleLogin(){
      this.$router.push({name:'LoginPage'})
    },
    handleClose(){
      this.showRedirectDialog = false;
      this.isRedirectSuccess = false;
      this.messageRedirectInfo = '';
      this.double = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.top-banner-quota {
  width: 100%;
  height: 880px;
  background: url("../assets/imgs/banner/quota-bg_01.jpg") no-repeat center top;
  .top-quota-inr {
    position: relative;
    height: 100%;
    background: url("../assets/imgs/banner/quota-bg_02.jpg") no-repeat center 440px;
    .header {
      position: absolute;
      left: 0;
      top: 0;
    }
    .top-quota-content {
      height:100%;
      background: url("../assets/imgs/banner/quota-pic_01.jpg") no-repeat center top;
      .quota-box {
        height:100%;
        background: url("../assets/imgs/banner/quota-pic_02.jpg") no-repeat center 440px;
      }
    }
  }
  .quota-box {
    position: relative;
    >section {
      margin: 0 auto;
      padding-top: 170px;
      > * {
        color: #fff;
      }
      .quota-top-text{
        text-align: center;
        font-size: 40px;
        line-height: 100px;
      }
      .quota-choose-items {
        margin-top: 60px;
        text-align: center;
        .el-radio__inner {
          width: 20px;
          height: 20px;
          background: #bcbcbc;
          border: none;
        }
        >p {
          font-size: 25px;
          color: #bcbcbc;
          line-height: 50px;
        }
        ul {
          /*width: 560px;*/
          margin: 20px auto;
        }
        ul.flex {
          display: flex;
          li {
            float: none;
          }
        }
        li {
          text-align: center;
          display: inline-block;
          /*float: left;*/
          /*width: 110px;*/
          margin-right: 40px;
          margin-bottom: 20px;
          list-style: none;
          font-size: 25px;
          color: #bcbcbc;
          cursor: pointer;
          label {
            width: 20px;
            height: 20px;
            background: #bcbcbc;
            display: inline-block;
            border-radius: 10px;
            margin-right: 10px;
            position: relative;
            input {
              width: 20px;
              height: 20px;
              top: 0;
              position: absolute;
              left: 0;
              opacity: 0;
            }
          }
        }
        /*li:nth-child(4n) {
          margin-right: 0;
        }*/
        li.active{
          label{
            background: #fff;
            border: 4px solid #fb8802;
            input {
              width: 20px;
              height: 20px;
              top: -4px;
              left: -4px;
              opacity: 0;
            }
          }
        }
      }
      .quota-btns{
        margin-top: 100px;
        >div.button {
          width: 320px;
          height: 64px;
          line-height: 64px;
          text-align: center;
          font-size: 25px;
          background-image: -webkit-gradient(linear, right top, left top, from(#fe8c00), to(#fac61e));
          background-image: linear-gradient(to left, #fe8c00, #fac61e);
          border-radius: 32px;
          margin: 0 auto;
        }
        .quota-more-records {
          text-align: center;
          >a {
            font-size: 18px;
            color: #ff8b00;
          }
        }

      }
    }
    .quota-no {
      > * {
        text-align: center;
      }
      .normal-txt {
        font-size: 30px;
        color: #bcbcbc;
      }
      .letter-spacing {
        letter-spacing: 8px;
      }
      .special-txt {
        font-size: 100px;
        color: #ff8b01;
        font-weight: bold;
        margin: 10px;
      }
      .quota-product {
        display: inline-block;
        padding: 0 30px;
        margin: 30px auto;
        height: 60px;
        line-height: 54px;
        border: 1px solid #F7F7F7;
        font-size: 25px;
        color: #bcbcbc;
        white-space: nowrap;
        text-overflow: ellipsis;
        > span {
          font-size: 30px;
          color: #ff8b01;
          margin-left: 6px;
        }
      }
      .quota-btns {
        margin-top: 60px;
      }
    }
  }
}
  .message-login {
    width: 320px;
    height: 230px;
    margin-top: -115px;
    margin-left: -160px;
  }
</style>
