<style lang="scss">
.apply-step {
  background-color: #f7f7f7;
  padding-bottom: 50px;
  .step-content {
    width: 1200px;
    margin: 0 auto;
    h2 {
      font-size: 30px;
      color: #424242;
      text-align: center;
      line-height: 90px;
      font-weight: normal;
    }
    .steps {
      display: flex;
      vertical-align: middle;
      margin-top: 20px;
      .step-line {
        width: 110px;
        height: 26px;
        background-position: -350px -130px;
        margin-top: 20px;
      }
      .step1,
      .step2,
      .step3,
      .step4 {
        width: 96px;
        text-align: center;
        margin: 0 60px;
        > span {
          display: block;
          width: 65px;
          height: 65px;
          margin: 0 auto;
        }
        > p {
          line-height: 30px;
        }
      }
      .step1 {
        > span {
          background-position: -10px -109px;
        }
      }
      .step2 {
        > span {
          background-position: -95px -109px;
        }
      }
      .step3 {
        > span {
          background-position: -180px -109px;
        }
      }
      .step4 {
        > span {
          background-position: -265px -109px;
        }
      }
    }
  }
}
</style>
<template>
  <section class="apply-step">
    <div class="step-content">
      <h2>申请流程</h2>
      <div class="steps">
        <div class="step1">
          <span class="home-pics"></span>
          <p>点击申请</p>
        </div>
        <div class="home-pics step-line"></div>
        <div class="step2">
          <span class="home-pics"></span>
          <p>提交资料</p>
        </div>
        <div class="home-pics step-line"></div>
        <div class="step3">
          <span class="home-pics"></span>
          <p>信息审核</p>
        </div>
        <div class="home-pics step-line"></div>
        <div class="step4">
          <span class="home-pics"></span>
          <p>审批放款</p>
        </div>
      </div>
    </div>
  </section>
</template>

