<style lang="scss" scoped>
$font-color: #424242;
.feature-products {
  background: url("../../../assets/imgs/mbg.jpg") repeat;
  width: 100%;
  padding: 30px 0 10px 0;
  > h2 {
    font-size: 30px;
    color: $font-color;
    text-align: center;
    line-height: 60px;
    font-weight: normal;
  }
  > p {
    font-size: 20px;
    color: $font-color;
    line-height: 40px;
    text-align: center;
  }
  .feature-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    > div {
      width: 120px;
      text-align: center;
      margin: 30px 140px;
      > span {
        width: 90px;
        height: 90px;
        display: block;
        margin: 0 auto;
      }
      > p {
        color: #868d92;
        line-height: 40px;
      }
      > span.first {
        background-position: -10px 0;
      }
      > span.second {
        background-position: -119px 0;
      }
      > span.third {
        background-position: -228px 0;
      }
    }
  }
}
</style>
<template>
  <section class="feature-products">
    <h2>专为小微企业提供融资助力</h2>
    <p>努力让借款越来越便捷</p>
    <div class="feature-content">
      <div>
        <span class="home-pics first"></span>
        <p>大数据风控</p>
      </div>
      <div>
        <span class="home-pics second"></span>
        <p>精准风险定位</p>
      </div>
      <div>
        <span class="home-pics third"></span>
        <p>0抵押借款</p>
      </div>
    </div>
  </section>
</template>

