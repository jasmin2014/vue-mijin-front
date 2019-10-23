<style lang="scss" scoped>
.common-problem {
  width: 100%;
  position: relative;
  z-index: 0;
  padding: 10px 0;
  background-color: #f7f7f7;
  .problem-inner {
    > article {
      position: relative;
      width: 100%;
      height: 425px;
      h2 {
        font-size: 30px;
        color: #282828;
        padding: 30px 0 0 0;
        font-weight: normal;
      }
      > section {
        border-bottom: 1px dashed #898989;
        margin: 30px auto 0 0;
        width: 90%;
        padding-bottom: 20px;
        h3 {
          color: #282828;
          display: flex;
          vertical-align: middle;
          font-size: 18px;
          > span {
            display: block;
            width: 22px;
            height: 22px;
            background-position: -10px -455px;
            margin-right: 12px;
          }
        }
        > div {
          font-size: 14px;
          color: #898989;
          line-height: 22px;
          margin-top: 15px;
          display: flex;
          vertical-align: middle;
          > span {
            display: block;
            width: 22px;
            height: 22px;
            background-position: -10px -492px;
            margin-right: 12px;
          }
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
    // background: url("../assets/imgs/slogan.png") no-repeat center bottom #f7f7f7;
  }
}
</style>
<template>
  <div class="common-problem">
    <div class="main-content problem-inner flex">
      <article>
        <h2>常见问题</h2>
        <section>
          <h3>
            <span class="home-pics"/>
            <p>米今科技借款申请审核需要多久?</p>
          </h3>
          <div>
            <span class="home-pics"/>
            <p>提交后，会通过智能审核系统急速审批。若资料不全，需人工审核，请保持手机通畅,便于随时与您联络。</p>
          </div>
        </section>
        <section>
          <h3>
            <span class="home-pics"/>
            <p>审核通过后,贷款金额多久能到账户?</p>
          </h3>
          <div>
            <span class="home-pics"/>
            <p>根据您的借款类型而定,大部分借款是在审核通过后1个工作日之内放款,根据招标情况放款。</p>
          </div>
        </section>
        <section class="last-child">
          <h3>
            <span class="home-pics"/>
            <p>我在米今科技借款需要准备哪些资料？</p>
          </h3>
          <div>
            <span class="home-pics"/>
            <p>米今科技申请手续非常简单，需要您提供个人基本信息、照片证明等资料。不同贷款产品所需资料在申请界面有详细说明，您可以选择在线上传提交。</p>
          </div>
        </section>
      </article>
    </div>
  </div>
</template>
