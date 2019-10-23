<template>
  <div class="content home-bg">
    <div class="top-banner">
      <mijin-header :is-hover="true" :active-page="'HomePage'"></mijin-header>
    </div>
    <div class="produce">
      <div class="produce-box main-content">
        <ul class="flex">
          <li class="produce-list" v-for="(item,index) in produce" :key="index">
            <img :src="item.src" alt="图标" class="produce-list-icon">
            <p class="produce-inline">
              <span class="produce-list-title">{{item.title}}</span>
              <br>
              <span class="produce-list-content">{{item.content}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="other-products">
      <div class="other-pro_bg">
        <div class="main-content other-pro-inr">
          <div class="main-content other-pro-inr2">
            <div class="main-content products-inner">
              <section v-for="(item,index) in majors" :key="item.name + ':'+ index">
                <div v-bind:class="item.className">
                  <h3>{{item.name}}</h3>
                  <p class="line"></p>
                  <div>
                    <label>{{item.max}}</label>
                  </div>
                  <p class="desc">{{item.desc}}</p>
                </div>
                <ul class="product-content">
                  <ol>准入条件</ol>
                  <li v-for="(condition,index) in item.conditions" :key="index">{{condition}}</li>
                </ul>
                <ul class="product-content">
                  <ol>所需材料</ol>
                  <li v-for="(material,index) in item.materials" :key="index">{{material}}</li>
                </ul>
                <div class="products-btn cursor" @click="handleToSeeAmount">立刻查看额度</div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="feature-products">
      <p>特色产品</p>
      <div class="feature flex">
        <section v-for="(item,index) in features" :class="item.className" :key="index">
          <p class="mt30">
            <img :src="item.src" alt>
          </p>
          <p class="name">{{item.name}}</p>
          <div class="max">
            <label>{{item.max}}</label>
          </div>
          <p class="desc">{{item.desc}}</p>
          <p class="feature-btn transition cursor" @click="handleToSeeAmount">立即查看额度</p>
        </section>
      </div>
    </div>
    <div class="common-problem">
      <div class="main-content problem-inner flex">
        <article>
          <h2>常见问题</h2>
          <section>
            <h3>米今科技借款申请审核需要多久?</h3>
            <div>提交后，会通过智能审核系统急速审批。若资料不全，需人工审核，请保持手机通畅,便于随时与您联络。</div>
          </section>
          <section class="last-child">
            <h3>审核通过后,贷款金额多久能到账户?</h3>
            <div>根据您的借款类型而定,大部分借款是在审核通过后1个工作日之内放款,根据招标情况放款。</div>
          </section>
        </article>
      </div>
    </div>
    <aside class="aside-box">
      <p class="aside-title">合作平台</p>
      <ul class="flex">
        <li class="partner_list" v-for="(item,index) in partner" :key="index">
          <a :href="item.url" v-if="item.name!='泰然金融'" target="_blank" rel="external nofollow">
            <img :src="item.src" width height>
          </a>
          <a :href="item.url" v-else target="_blank">
            <img :src="item.src" width height>
          </a>
        </li>
      </ul>
    </aside>
    <div class="floatTop">
      <div class="mjLogo floatbg"></div>
      <a
        href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDE3MTk4Nl80ODg2OTNfODAwMTcxOTg2Xw"
        class="qq-img floatbg"
        target="_blank"
      ></a>
      <div class="goTop floatbg" @click="goTop"></div>
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
import MijinHeader from "../components/header.vue";
import MijinFootter from "../components/footter.vue";
import MjButton from "../mjElements/button";
import topHeader from "./components/compsHomeInV2.6.5/top";
export default {
  name: "HomePage",
  components: {
    MjButton,
    MijinHeader,
    MijinFootter,
    topHeader
  },
  data() {
    return {
      produce: [
        {
          title: "纯信用",
          content: "大数据授信，无抵押",
          src: require("../assets/imgs/produce_icon1.png")
        },
        {
          title: "额度高",
          content: "最高可达100万",
          src: require("../assets/imgs/produce_icon2.png")
        },
        {
          title: "放款快",
          content: "智能审核，极速放款",
          src: require("../assets/imgs/produce_icon3.png")
        },
        {
          title: "利息低",
          content: "日息低至万分之2.7",
          src: require("../assets/imgs/produce_icon4.png")
        }
      ],
      majors: [
        {
          name: "电商通",
          max: "最高可达100万",
          desc: "网店数据 | 一次授信 | 循环授信 | 快速审核",
          className: {
            "top-pic": true,
            "top-pic1": true
          },
          conditions: ["淘宝、天猫、京东等网站主", "网店经营时间满一年以上"],
          materials: ["网店经营流水", "网店截图"]
        },
        {
          name: "外贸电商通",
          max: "最高可达100万",
          desc: "网店数据 | 一次授信 | 循环授信 | 快速审核",
          className: {
            "top-pic": true,
            "top-pic2": true
          },
          conditions: [
            "亚马逊、eBay、速卖通、Wish等平台店主",
            "经营时间满一年及以上"
          ],
          materials: ["经营场地证明", "平台经营流水"]
        }
      ],
      features: [
        {
          name: "烟草通",
          max: "最高可达100万",
          desc: "烟草店铺法人 | 店铺经营满一年",
          className: {
            "feature-1": true,
            transition: true
          },
          src: require("../assets/imgs/ico_1.png")
        },
        {
          name: "企业通",
          max: "最高可达100万",
          desc: "中小微企业主 | 企业经营满一年",
          className: {
            "feature-2": true,
            transition: true
          },
          src: require("../assets/imgs/ico_2.png")
        },
        {
          name: "物流通",
          max: "最高可达100万",
          desc: "物流网点经营主 | 网点经营满一年",
          className: {
            "feature-3": true,
            transition: true
          },
          src: require("../assets/imgs/ico_3.png")
        }
      ],
      partner: [
        {
          name: "泰然金融",
          src: require("../assets/imgs/partner_1.png"),
          url: "http://www.trc.com"
        },
        {
          name: "宝付",
          src: require("../assets/imgs/partner_2.png"),
          url: "http://www.baofu.com"
        },
        {
          name: "同盾科技",
          src: require("../assets/imgs/partner_3.png"),
          url: "https://www.tongdun.cn"
        },
        {
          name: "聚信立",
          src: require("../assets/imgs/partner_4.png"),
          url: "https://www.juxinli.com"
        },
        {
          name: "上上签",
          src: require("../assets/imgs/partner_5.png"),
          url: "https://www.bestsign.cn/"
        },
        {
          name: "示远科技",
          src: require("../assets/imgs/partner_6.png"),
          url: "http://www.18sms.com"
        }
      ]
    };
  },
  created() {},
  methods: {
    handleToSeeAmount() {
      this.$router.push({
        name: "QuotaPage"
      });
    },
    goTop() {
      let scrollFn = null;
      scrollFn = setInterval(() => {
        let nowScroll = document.body.scrollTop
          ? document.body.scrollTop
          : document.documentElement.scrollTop;
        if (nowScroll == 0) {
          clearInterval(scrollFn);
        } else {
          document.body.scrollTop -= 200;
          document.documentElement.scrollTop -= 200;
        }
      }, 35);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$font-size: 14px;
$font-tit: 22px;
$font-big-tit: 48px;
.home-bg {
  background: #eff3f7;
}

.top-bnr-bg1 {
  width: 100%;
  background: url("../assets/imgs/banner/banner_bg02.jpg") no-repeat center
    310px;
}

.options-splite {
  background-image: url("../assets/imgs/options-splite.png");
}

.top-banner {
  width: 100%;
  height: 520px;
  position: relative;
  z-index: 0;
  background: #000 url("../assets/imgs/banner/bannerbj.png") no-repeat;
  background-size: 100% 100%;
  img {
    margin: 0;
    padding: 0;
    display: block;
  }
  .header {
    position: absolute;
    left: 0;
    top: 0;
  }
}

.mj-options {
  position: relative;
  z-index: 99;
  margin-top: -76px;
  padding: 0 15px 0 15px;
  background: #fff;
  .option-inner {
    padding: 24px 25px 25px 25px;
    /*border-bottom: 1px solid #cecece;*/
    section {
      display: flex;
      > .option-des {
        padding: 10px 0 0 10px;
        h3 {
          color: #414141;
        }
      }
      p {
        font-size: $font-size;
        color: #6e6e71;
        line-height: 30px;
      }
      .option-icon {
        width: 70px;
        height: 70px;
      }
      .option-icon1 {
        background-position: 0 0;
      }
      .option-icon2 {
        background-position: -70px 0;
      }
      .option-icon3 {
        background-position: -140px 0;
      }
      .option-icon4 {
        background-position: -210px 0;
      }
    }
  }
  .option-notice {
    line-height: 24px;
    color: #6d6c72;
    padding: 20px 0;
    display: none;
    .notice-tit {
      width: 89px;
      height: 24px;
      display: inline-block;
      background-position: 0 -70px;
      text-indent: -999em;
      margin-right: 45px;
    }
    .notice-opts {
      flex: 1;
      > span {
        margin: 0 50px;
      }
      > p:first-child {
        span {
          background: red;
          color: #fff;
          padding: 0 5px;
          margin-right: 10px;
        }
      }
    }
  }
}

.produce {
  background: #fff;
}

.produce-box {
  .produce-list {
    position: relative;
  }
  .produce-inline {
    display: inline-block;
    vertical-align: middle;
  }
  padding: 20px 0 15px 0;
  text-align: left;
  .produce-list-title {
    margin-top: 20px;
    font-size: 20px;
    columns: #4e4e4e;
    font-weight: bold;
  }
  .produce-list-content {
    display: inline-block;
    font-size: 14px;
    color: #6d6c72;
  }
  .produce-list-icon {
    margin-top: 0px;
    vertical-align: middle;
  }
}

.product-box {
  background: #eff3f7;
  padding: 63px 0 80px 0;
  section {
    .product-title {
      font-size: 45px;
      font-weight: 300;
      color: #424242;
      span {
        display: inline-block;
        padding-bottom: 20px;
      }
    }
    .product-content {
      position: relative;
      margin-top: 45px;
      h3 {
        position: relative;
        z-index: 99;
        font-size: 22px;
      }
      ul {
        margin: 20px 0 35px 0;
        li {
          list-style: none;
          background: url(/static/img/ico_list.fcdf46d.png) no-repeat left
            center;
          line-height: 24px;
          color: #798da0;
          padding-left: 20px;
        }
      }
    }
    .product-content:after {
      content: "";
      width: 25px;
      height: 25px;
      display: block;
      border-radius: 100%;
      position: absolute;
      top: 0px;
      left: -15px;
      background: #000;
      z-index: 9;
    }
    .product-btn {
      width: 175px;
      height: 46px;
      margin-top: 45px;
      line-height: 46px;
      border-radius: 23px;
      text-align: center;
      color: #fff;
      transition: all 0.2s;
    }
  }
  .product-blue {
    span {
      border-bottom: 4px solid #0086ff;
    }
    h3 {
      color: #0086ff;
    }
    .product-content:after {
      background: #eaf5fe;
    }
    .product-btn {
      background-image: -webkit-linear-gradient(to left, #0187ff, #34c3fa);
      background-image: linear-gradient(to left, #0187ff, #34c3fa);
    }
    .product-btn:hover {
      -webkit-box-shadow: 10px 10px 10px rgba(52, 149, 254, 0.4);
      -moz-box-shadow: 10px 10px 10px rgba(52, 149, 254, 0.4);
      box-shadow: 10px 10px 10px rgba(52, 149, 254, 0.4);
    }
  }
  .product-orange {
    span {
      border-bottom: 4px solid #ff8b00;
    }
    h3 {
      color: #fd8d00;
    }
    .product-content:after {
      background: #eaf5fe;
    }
    .product-btn {
      background-image: -webkit-linear-gradient(to left, #fe8c00, #fac61e);
      background-image: linear-gradient(to left, #fe8c00, #fac61e);
    }
    .product-btn:hover {
      -webkit-box-shadow: 10px 10px 10px rgba(251, 127, 34, 0.4);
      -moz-box-shadow: 10px 10px 10px rgba(251, 127, 34, 0.4);
      box-shadow: 10px 10px 10px rgba(251, 127, 34, 0.4);
    }
  }
}

.category {
  // background: #f3faff;
  padding: 60px 0 134px 0;
  .category-inner {
    > section {
      width: 100%;
    }
    .cate-items {
      padding-top: 30px;
      position: relative;
      section {
        position: relative;
        width: 512px;
        height: 140px;
        padding: 25px 0 0 160px;
        background: #fff;
        -webkit-box-shadow: 3px 3px 5px #eee;
        -moz-box-shadow: 3px 3px 5px #eee;
        box-shadow: 3px 3px 5px #eee;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        margin-top: 13px;
        h3 {
          font-size: $font-tit;
        }
        ul {
          margin-top: 15px;
        }
        li {
          list-style: none;
          background: url("../assets/imgs/ico_list.png") no-repeat left center;
          line-height: 24px;
          color: #778b9e;
          padding-left: 20px;
        }
        .cate-bg {
          display: block;
          width: 189px;
          height: 110px;
          position: absolute;
          left: 15px;
          top: 15px;
        }
        .cate-bg1 {
          background-position: 0 -94px;
        }
        .cate-bg2 {
          background-position: 0 -204px;
        }
        .cate-bg3 {
          background-position: 0 -314px;
        }
        .cate-bg4 {
          background-position: 0 -424px;
        }
        .cate-content {
          position: absolute;
          top: 25px;
          left: 160px;
        }
      }
      section:first-child {
        margin-top: 0;
      }
    }
    .category-btn {
      position: absolute;
      bottom: -40px;
      left: 50%;
      margin: 30px 0 0 -85px;
    }
    .category-btn.btn-edu {
      padding: 0 30px;
      height: 46px;
      line-height: 46px;
      border-radius: 23px;
      color: #fff;
    }
    /* .category-btn:hover {
      bottom: -30px;
    } */
    .cate-pic {
      width: 545px;
      height: 326px;
      padding: 100px 0 0 50px;
      margin-top: 30px;
      h3 {
        font-size: $font-big-tit;
        color: #fff;
      }
      > label {
        display: block;
        width: 52px;
        height: 5px;
        margin: 15px 0;
        -webkit-border-radius: 1px;
        -moz-border-radius: 1px;
        border-radius: 1px;
        background: #0085fe;
      }
      p {
        color: #fff;
        font-size: 18px;
      }
      .cate-pic-midsize {
        font-size: 30px;
        line-height: 50px;
      }
    }
    .category-s1 {
      background: url("../assets/imgs/tit_b_1.png") no-repeat left top;
      padding-bottom: 110px;
      .cate-items {
        h3 {
          color: #0085fe;
        }
      }
      .cate-pic {
        background: url("../assets/imgs/pic_1.jpg") no-repeat center center;
      }
      .category-btn {
        background-image: -webkit-linear-gradient(to left, #0187ff, #34c3fa);
        background-image: linear-gradient(to left, #0187ff, #34c3fa);
      }
      .category-btn:hover {
        -webkit-box-shadow: 10px 10px 10px rgba(52, 149, 254, 0.4);
        -moz-box-shadow: 10px 10px 10px rgba(52, 149, 254, 0.4);
        box-shadow: 10px 10px 10px rgba(52, 149, 254, 0.4);
      }
    }
    .category-s2 {
      background: url("../assets/imgs/tit_b_2.png") no-repeat right top;
      .cate-items {
        h3 {
          color: #ff8b00;
        }
      }
      .cate-pic {
        background: url("../assets/imgs/pic_2.jpg") no-repeat center center;
        padding: 100px 0 0 90px;
        > label {
          background: #ff8b00;
        }
      }
      .category-btn {
        background-image: -webkit-linear-gradient(to left, #fe8c00, #fac61e);
        background-image: linear-gradient(to left, #fe8c00, #fac61e);
      }
      .category-btn:hover {
        -webkit-box-shadow: 10px 10px 10px rgba(251, 127, 34, 0.4);
        -moz-box-shadow: 10px 10px 10px rgba(251, 127, 34, 0.4);
        box-shadow: 10px 10px 10px rgba(251, 127, 34, 0.4);
      }
    }
  }
}

.other-products {
  /* background: url("../assets/imgs/banner/banner_quato_01.jpg") no-repeat center top; */
  width: 100%;
  height: 560px;
  position: relative;
  z-index: 1;
  .other-pro_bg {
    height: 100%;
    /* background: url("../assets/imgs/banner/banner_quato_02.jpg") no-repeat center 374px; */
  }
  .other-pro-inr {
    height: 100%;
    /* background: url("../assets/imgs/banner/banner_qua_pic_01.jpg") no-repeat center top; */
  }
  .other-pro-inr2 {
    /* background: url("../assets/imgs/banner/banner_qua_pic_02.jpg") no-repeat center 374px; */
    height: 100%;
  }
  .products-inner {
    position: absolute;
    bottom: -50px;
    left: 50%;
    height: 540px;
    margin-left: -600px;
    display: flex;
    justify-content: space-between;
    section {
      position: relative;
      margin: 0 auto;
      width: 400px;
      height: 100%;
      background: #fff;
      transition: 0.3s;
      .top-pic {
        height: 240px;
        padding-left: 34px;
        padding-top: 53px;
        > * {
          color: #fff;
        }
        > h3 {
          font-size: 32px;
          font-weight: normal;
        }
        > div {
          line-height: 40px;
          padding-left: 20px;
          margin-top: 10px;
          background: url("../assets/imgs/ico_list_1.png") no-repeat left center;
          > label {
            color: #eee;
            font-size: 20px;
            padding-right: 20px;
            background: url("../assets/imgs/ico_list_1.png") no-repeat right
              center;
          }
        }
        .desc {
          color: #ddd;
        }
        .line {
          width: 35px;
          height: 5px;
          margin-top: 12px;
          background: #f29900;
        }
      }
      .top-pic1 {
        background: url("../assets/imgs/pic_1.png") no-repeat center center;
      }
      .top-pic2 {
        background: url("../assets/imgs/pic_2.png") no-repeat center center;
      }
      .top-pic3 {
        background: url("../assets/imgs/pic_3.png") no-repeat center center;
      }
      .product-content::after {
        content: "";
        width: 25px;
        height: 25px;
        display: block;
        border-radius: 100%;
        position: absolute;
        top: -1px;
        left: 20px;
        background: rgba(253, 144, 0, 0.2);
        z-index: 9;
      }
      > ul {
        position: relative;
        padding-left: 34px;
        ol {
          z-index: 10;
          margin-bottom: 10px;
          margin-top: 26px;
          color: #f29900;
          font-size: 20px;
          font-weight: bold;
        }
      }
      li {
        list-style: none;
        font-size: 16px;
        color: #848484;
        line-height: 22px;
        background: url("../assets/imgs/ico_list.png") no-repeat left center;
        padding-left: 20px;
      }
      .products-btn {
        position: absolute;
        bottom: 20px;
        left: 50%;
        margin-left: -87px;
        width: 175px;
        height: 45px;
        border-radius: 22px;
        border: 1px solid #ff8b03;
        text-align: center;
        line-height: 42px;
        color: #ff8b03;
        transition: all 0.2s;
      }
      .products-btn:hover {
        border: none;
        color: #fff;
        -webkit-box-shadow: 10px 10px 10px rgba(251, 127, 34, 0.4);
        -moz-box-shadow: 10px 10px 10px rgba(251, 127, 34, 0.4);
        box-shadow: 10px 10px 10px rgba(251, 127, 34, 0.4);
        background-image: linear-gradient(270deg, #fe8c00, #fac61e);
      }
    }
    section:hover {
      -webkit-box-shadow: 0 20px 40px rgba(255, 139, 1, 0.2);
      -moz-box-shadow: 0 20px 40px rgba(255, 139, 1, 0.2);
      box-shadow: 0 20px 40px rgba(255, 139, 1, 0.2);
    }
  }
}

.feature-products {
  color: #fff;
  text-align: center;
  margin-top: 120px;
  > p {
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    color: #424242;
    background: #f7f7f7;
  }
  .mt30 {
    margin-top: 50px;
  }
  .name {
    font-size: 35px;
    margin-top: 10px;
  }
  section {
    overflow: hidden;
    .max {
      margin-top: 10px;
      > label {
        color: #eee;
        font-size: 20px;
        padding-right: 20px;
        position: relative;
        background: url("../assets/imgs/ico_list_1.png") no-repeat right center;
      }
      label::before {
        content: "";
        width: 12px;
        height: 16px;
        position: absolute;
        top: 6px;
        left: -20px;
        background: url("../assets/imgs/ico_list_1.png") no-repeat left center;
        background-size: 100% 100%;
      }
    }
    .desc {
      color: #ddd;
      margin-top: 8px;
    }
    .feature-btn {
      width: 100%;
      height: 45px;
      line-height: 45px;
      font-size: 16px;
      position: absolute;
      bottom: -45px;
      background-image: linear-gradient(270deg, #fe8c00, #fac61e);
    }
  }
  section:hover {
    transform: translateY(-4px);
    -webkit-transform: translateY(-4px);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-size: 120% 120%;
  }
  section:hover .feature-btn {
    transform: translateY(-45px);
    -webkit-transform: translateY(-45px);
  }
  .transition {
    transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    /* Firefox 4 */
    -webkit-transition: all 0.3s ease-in-out;
    /* Safari 和 Chrome */
    -o-transition: all 0.3s ease-in-out;
    /* Opera */
  }
  .feature-1 {
    width: 100%;
    height: 350px;
    position: relative;
    background: url("../assets/imgs/pic_3.png") no-repeat left center;
    background-size: 100% 100%;
  }
  .feature-2 {
    width: 100%;
    height: 350px;
    position: relative;
    background: url("../assets/imgs/pic_4.png") no-repeat left center;
    background-size: 100% 100%;
  }
  .feature-3 {
    width: 100%;
    height: 350px;
    position: relative;
    background: url("../assets/imgs/pic_5.png") no-repeat left center;
    background-size: 100% 100%;
  }
}

.common-problem {
  width: 100%;
  background: #f7f7f7;
  padding: 80px 0 60px 0;
  position: relative;
  z-index: 0;
  .problem-inner {
    > article {
      position: relative;
      width: 100%;
      height: 425px;
      background: #fff;
      border: 1px solid #eff3f7;
      h2 {
        font-size: 30px;
        color: #282828;
        padding: 30px 0 0 25px;
        font-weight: normal;
      }
      > section {
        border-bottom: 1px dashed #898989;
        margin: 30px auto 0 auto;
        width: 90%;
        padding-bottom: 20px;
        h3 {
          color: #282828;
          background: url("../assets/imgs/Q.png") no-repeat left center;
          padding-left: 30px;
        }
        > div {
          font-size: 14px;
          color: #898989;
          line-height: 22px;
          margin-top: 15px;
          background: url("../assets/imgs/A.png") no-repeat left top;
          padding-left: 30px;
        }
      }
      > section.last-child {
        border-bottom: none;
      }
      .problem-more {
        width: 160px;
        text-align: center;
        height: 35px;
        line-height: 30px;
        border: 1px solid #767676;
        border-radius: 17px;
        color: #767676;
        position: absolute;
        left: 50%;
        bottom: 30px;
        margin-left: -80px;
      }
      > ul {
        width: 528px;
        margin: 20px auto 0 auto;
        li {
          position: relative;
          list-style: none;
          line-height: 30px;
          font-size: 14px;
          padding-left: 15px;
          label {
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -2px;
            display: block;
            width: 6px;
            height: 6px;
            background: #767676;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
          }
          div {
            display: flex;
            justify-content: space-between;
            color: #767676;
          }
        }
      }
    }
    .problem-bnr {
      width: 528px;
      margin: 20px auto 0 auto;
    }
  }

  .footter-bg {
    position: absolute;
    left: 0;
    bottom: 26px;
    display: block;
    width: 100%;
    height: 69px;
    background: url("../assets/imgs/slogan.png") no-repeat center bottom #f7f7f7;
  }
}

.aside-box {
  width: 100%;
  padding: 26px 0 45px 0;
  text-align: center;
  background: #fff;
  .aside-title {
    font-size: 30px;
    color: #424242;
    margin-bottom: 36px;
  }
  ul {
    position: relative;
    width: 1170px;
    margin: 0 auto;
    list-style-type: none;
    .partner_list {
      justify-content: space-between;
      width: 160px;
      height: 66px;
      padding-top: 6px;
      a {
        display: block;
      }
    }
    .foot-Operate {
      position: absolute;
      top: -80px;
      right: -80px;
      width: 50px;
      p {
        font-size: 12px;
        color: #6d6c72;
        span {
          color: #ff8b00;
        }
      }
      .qrCode {
        width: 46px;
        height: 46px;
        margin: 14px 0;
      }
      .goTop {
        width: 50px;
        height: 50px;
        border: 1px solid #e6e6e6;
        border-radius: 6px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
      }
      .goTop:hover {
        background: #fe8c00;
        border: 1px solid #fe8c00;
        color: #fff;
      }
    }
  }
}
.floatbg {
  background: url("../assets/imgs/float-img.png") no-repeat center center;
}
.floatTop {
  position: fixed;
  width: 64px;
  height: 162px;
  transition: all 0.2s;
  right: 50px;
  top: 50%;
  margin-top: -180px;
  .mjLogo {
    width: 64px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    background-position: 0 0;
  }
  .qq-img {
    width: 64px;
    height: 59px;
    position: absolute;
    top: 60px;
    left: 0;
    transition: all 0.2s;
    background-position: 0 -60px;
    cursor: pointer;
  }
  .goTop {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 64px;
    height: 43px;
    cursor: pointer;
    transition: all 0.2s;
    background-position: 0 -119px;
  }
  .qq-img:hover,
  .qq-img:active {
    background: url("../assets/imgs/floathover.png") no-repeat center center;
    background-position: 0 -60px;
  }
  .goTop:hover,
  .goTop:active {
    background: url("../assets/imgs/floathover.png") no-repeat center center;
    background-position: 0 -119px;
  }
}
</style>
