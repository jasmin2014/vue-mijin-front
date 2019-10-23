<style lang="scss" scoped>
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
</style>
<template>
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
</template>
<script>
export default {
  data() {
    return {
      partner: [
        {
          name: "泰然金融",
          src: require("../../../assets/imgs/partner_1.png"),
          url: "http://www.trc.com"
        },
        {
          name: "宝付",
          src: require("../../../assets/imgs/partner_2.png"),
          url: "http://www.baofu.com"
        },
        {
          name: "同盾科技",
          src: require("../../../assets/imgs/partner_3.png"),
          url: "https://www.tongdun.cn"
        },
        {
          name: "聚信立",
          src: require("../../../assets/imgs/partner_4.png"),
          url: "https://www.juxinli.com"
        },
        {
          name: "上上签",
          src: require("../../../assets/imgs/partner_5.png"),
          url: "https://www.bestsign.cn/"
        },
        {
          name: "示远科技",
          src: require("../../../assets/imgs/partner_6.png"),
          url: "http://www.18sms.com"
        }
      ]
    };
  }
};
</script>

