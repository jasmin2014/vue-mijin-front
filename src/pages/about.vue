<template>
  <div class="content">
    <div class="top-banner-about">
      <mijin-header  :active-page="'HomePage'"></mijin-header>
      <div class="main-content about-top">
        <h3>关于我们</h3>
        <p>为更多小微企业提供更加高效便捷的融资服务</p>
      </div>
    </div>
    <div class="about-us-box">
      <div class="main-content about-inner">
        <div class="about-splite inr-left-log">米今</div>
        <div class="about-info">
          <h3>关于我们<p class="about-splite"></p></h3>
          <p>杭州米今网络科技有限公司，是专业数据化信贷服务平台，依托互联网大数据多维度征信风控模型，为传统金融机构覆盖不到的小微企业主提供高效的信用咨询服务与信贷商贷定制化服务。目前公司旗下拥有电商通、外贸电商通等5款产品，自产品上线以来已帮助全国2000多家小微企业从银行等金融机构处获得超过10亿元的授信额度。米今将致力于为更多小微企业提供更加高效便捷的融资服务，进而辅助小微经济健康发展。</p>
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
  import MijinHeader from '../components/header.vue';
  import MijinFootter from '../components/footter.vue';
export default {
  name: 'AboutUsPage',
  components: {
    MijinHeader,
    MijinFootter
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
$font-size: 14px;
$font-tit: 22px;
$font-big-tit: 48px;
.about-splite {
  background-image : url("../assets/imgs/about-splite.png");
}
.top-banner-about {
  width: 100%;
  height: 430px;
  background: url("../assets/imgs/contact_bg.jpg") no-repeat center top;
  .about-top {
    > * {
      color: #fff;
    }
    h3 {
      font-size: 36px;
      line-height: 50px;
      font-weight: normal;
      margin-top: 60px;
    }
    p {
      margin-top: 30px;
      font-size: 18px;
      letter-spacing: 3px;
    }
  }
}
  .about-us-box {
    min-height: 50vh;
    .about-inner{
      position: relative;
      height: 450px;
      .inr-left-log {
        width: 431px;
        height: 68px;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -34px;
        text-indent: -9999em;
        background-position: 0 0;
      }
      .about-info {
        width: 580px;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -125px;
        h3 {
          font-size: 36px;
          font-weight: normal;
          line-height: 60px;
          >p {
            width: 251px;
            height: 49px;
            background-position: 0 -80px;
             position: absolute;
             top: -16px;
             left: 0;
           }
        }
        > p {
          font-size: 14px;
          line-height: 30px;
          text-indent: 2em;
          margin-top: 20px;
          }
      }
    }
  }


</style>
