<style lang="scss" scoped>
.advantage-pics {
  background: url("../../../assets/imgs/home-imgs2.png") no-repeat;
}
.advantage {
  background-color: #fff;
  padding: 60px 0;
  > h2 {
    text-align: center;
    font-size: 30px;
    color: #424242;
    font-weight: normal;
  }
  .advantage-items {
    width: 1200px;
    margin: 60px auto 0 auto;
    display: flex;
    .adavantage-item {
      width: 270px;
      margin: 0 65px;
    }
    .advantage-pics {
      display: block;
      width: 224px;
      height: 165px;
      margin: 0 auto;
    }
    .advantage-pics.img1 {
      background-position: 0 -18px;
    }
    .advantage-pics.img2 {
      background-position: -230px -18px;
    }
    .advantage-pics.img3 {
      background-position: -450px -18px;
    }
    .advantage-content {
      > h3 {
        font-size: 22px;
        color: #464646;
        text-align: center;
        margin: 20px 0;
      }
      > p {
        color: #868d92;
        font-size: 16px;
        line-height: 26px;
      }
    }
  }
}
</style>
<template>
  <section class="advantage">
    <h2>平台优势</h2>
    <div class="advantage-items">
      <section class="adavantage-item">
        <div class="advantage-pics img1"></div>
        <div class="advantage-content">
          <h3>互联网运营能力</h3>
          <p>多年互联网运营经验，深谙互联网的用户行为需求、交易需求、以及业务的商业模式建设。从根本上重新定义贷款用户的人群与风险分布。</p>
        </div>
      </section>
      <section class="adavantage-item">
        <div class="advantage-pics img2"></div>
        <div class="advantage-content">
          <h3>数据挖掘与分析能力</h3>
          <p>拥有自己的数据挖掘与云数据引擎技术、通过用户的个人与且数据进行风控数据的支撑工作。</p>
        </div>
      </section>
      <section class="adavantage-item">
        <div class="advantage-pics img3"></div>
        <div class="advantage-content">
          <h3>风险控制能力</h3>
          <p>行业内先进的风险控制与大数据交叉验证能力技术、根据互联网的第三方不可篡改的数据进行风控的判断与决策。</p>
        </div>
      </section>
    </div>
  </section>
</template>

