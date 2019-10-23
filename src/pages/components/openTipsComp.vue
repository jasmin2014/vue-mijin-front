<template>
  <div class="review-inner">    
    <div class="review-pic-suc" v-if="pageFrom === 'accountOpenInfoSuccessPage' || pageFrom === 'userOpenInfoSuccessedPage'"></div>
    <div class="review-pic" v-else></div>
    <div v-if="pageFrom === 'accountBindStatusPage'">
      <div class="review-msg">本系统暂不支持线上对公开户，请联系客户线下处理。</div>
      <div><span class="bright-txt">{{time}}</span>秒后将自动返回 <router-link to="/" class="bright-txt">首页</router-link></div>
    </div>    
    <div class="review-msg" v-if="pageFrom === 'accountOpenStatusPage' || pageFrom === 'usersOpenStatusPage'">
      您的开户资料已提交，审核通过后，我们将以短信通知您！
    </div>
    <div class="review-msg" v-else-if="pageFrom === 'accountOpenStatusActivePage' || pageFrom === 'usersOpenWaitActivePage'">
      <p>存管账户待激活</p>
      <p>请线下给您西安银行账户打款以激活账户</p>
    </div>
    <div class="review-msg" v-else-if="pageFrom === 'accountOpenInfoSuccessPage' || pageFrom === 'userOpenInfoSuccessedPage'">
      <p>您的开户资料已经审核通过!</p>      
    </div>
    <div  v-if="pageFrom !== 'accountBindStatusPage' && pageFrom !== 'accountOpenInfoSuccessPage' && pageFrom !== 'userOpenInfoSuccessedPage'" class="mj-button orange step-btn-next cursor" @click="handleReturn">返回</div>
    <div v-else-if="pageFrom === 'accountOpenInfoSuccessPage' || pageFrom === 'userOpenInfoSuccessedPage'" class="mj-button orange step-btn-next cursor" @click="handleGoOpenXian">去开户</div>
    <!-- <div class="xian-success center" v-if="pageFrom === 'accountOpenInfoSuccessPage' || pageFrom === 'userOpenInfoSuccessedPage'">
      <p class="xian-suc-txt">提示:您即将跳转至西安存管银行页面进行开户操作。</p>
      <p class="xian-suc-txt">西安银行控件支持的浏览器：IE8、9、10，谷歌50以下版本。</p>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    pageFrom: String
  },
  data() {
    return {
      time: 3,
      status: this.$route.query.status
    };
  },
  created() {
    if (this.pageFrom === "accountBindStatusPage") {
      this.countDown(3);
    }
  },
  methods: {
    countDown(sec) {
      if (sec > 0) {
        this.time = `${sec}`;
        setTimeout(() => {
          this.countDown(--sec);
        }, 1000);
      } else {
        this.$router.push({ name: "HomePage" });
      }
    },
    handleReturn() {
      if (
        this.pageFrom === "accountOpenStatusPage" ||
        this.pageFrom === "accountOpenStatusActivePage"
      ) {
        this.$router.push({ name: "HomePage" });
      } else if (
        this.pageFrom === "usersOpenStatusPage" ||
        this.pageFrom === "usersOpenWaitActivePage"
      ) {
        this.$router.push({ name: "usersAccountPage" });
      }
    },
    handleGoOpenXian() {
      this.$emit("go-open-xa");
    }
  }
};
</script>

<style lang="scss">
.review-inner {
  width: 400px;
  margin: 0 auto;
  padding: 10vh 0;
  text-align: center;
  .review-pic {
    width: 120px;
    height: 120px;
    background: url("../../assets/imgs/auth_fail_pic.png") no-repeat center
      center;
    background-size: 100%;
    margin: 0 auto;
  }
  .review-pic-suc {
    width: 120px;
    height: 120px;
    background: url("../../assets/imgs/auth_success_pic.png") no-repeat center
      center;
    background-size: 100%;
    margin: 0 auto;
  }
  .review-msg {
    width: 80%;
    margin: 0 auto;
    line-height: 2em;
  }
  .step-btn-next {
    width: 90px;
    padding: 0;
    height: 36px;
    line-height: 36px;
    border-radius: 5px;
    margin-top: 30px;
  }
  .bright-txt {
    color: orange;
    margin: 0 5px;
  }
}
.xian-success {
  width: 400px;
  margin: 20px auto;
  font-size: 14px;
  line-height: 24px;
  color: #ff8c00;
  text-align: left;
}
.xian-success.center {
  text-align: center;
}
</style>
