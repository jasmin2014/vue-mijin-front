<style lang="scss" scoped>
$font-color: #494646;
$border-color: #e3e3e3;
$active-color: #ff8b00;
.product-wrapper {
  background: #fff;
  padding: 30px 0 60px 0;
  header {
    text-align: center;
    padding-bottom: 30px;
    > h2 {
      font-size: 30px;
      font-weight: normal;
    }
    > p {
      font-size: 20px;
      color: #424242;
      line-height: 40px;
      > span {
        margin-right: 15px;
      }
    }
  }
  .product-list-wrapper {
    width: 1200px;
    margin: 30px auto 0 auto;
    height: 480px;
    display: flex;
    > .product-item {
      width: 25%;
      display: block;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-left: 0;
      position: relative;
      -webkit-transition: width 1s cubic-bezier(0.4, 0, 0.2, 1),
        z-index 0s 0.12s;
      transition: width 1s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0.12s;
      border: 1px solid $border-color;
      border-right: none;
      > header {
        width: 100%;
        height: 180px;
        background-color: #f7f7f7;
        text-align: center;
        padding-top: 30px;
        > span {
          display: block;
          margin: 0 auto;
          width: 46px;
          height: 53px;
        }
        > span.first {
          background-position: -10px -264px;
        }
        > span.second {
          background-position: -140px -264px;
        }
        > span.third {
          background-position: -272px -264px;
        }
        > span.forth {
          background-position: -404px -264px;
        }
        > h3 {
          color: $font-color;
          font-size: 24px;
          font-weight: normal;
          margin-top: 8px;
        }
        > p {
          color: $font-color;
          font-size: 16px;
          line-height: 30px;
        }
      }
      > .product-item-list {
        position: relative;
        height: 300px;
        > section {
          padding: 0 25px;
          position: absolute;
          h4 {
            border-left: 2px solid $active-color;
            color: #383838;
            font-size: 16px;
            height: 20px;
            line-height: 20px;
            padding: 0 0 0 8px;
          }
          > p {
            color: #868d92;
            font-size: 14px;
            padding-left: 8px;
          }
        }
        > section:first-child {
          top: 25px;
        }
        > section:nth-child(2) {
          top: 130px;
        }
        > button {
          display: block;
          width: 120px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          border: 1px solid $border-color;
          color: #8a8a8a;
          background-color: #fff;
          position: absolute;
          bottom: 30px;
          left: 50%;
          margin-left: -60px;
          border-radius: 3px;
        }
      }
    }
    > .product-item:last-child {
      border-right: 1px solid $border-color;
    }
    > .product-item.active,
    > .product-item:hover {
      height: 505px;
      width: 28%;
      top: -15px;
      border: 1px solid $active-color;
      -webkit-box-shadow: 0 0 20px rgba(255, 139, 0, 0.8);
      box-shadow: 0 0 20px rgba(255, 139, 0, 0.8);
      z-index: 100;
      header {
        background-color: $active-color;
        color: #fff;
        > h3,
        > p {
          color: #fff;
        }
        > span.first {
          background-position: -77px -264px;
        }
        > span.second {
          background-position: -206px -264px;
        }
        > span.third {
          background-position: -338px -264px;
        }
        > span.forth {
          background-position: -470px -264px;
        }
      }
      > .product-item-list {
        > button {
          background-color: $active-color;
          color: #fff;
          border: 1px solid $active-color;
        }
      }
    }
  }
}
</style>
<template>
  <section class="product-wrapper">
    <header>
      <h2>特色产品</h2>
      <p>
        <span>更高额</span>
        <span>更低息</span>
        <span>更灵活</span>
      </p>
    </header>
    <main class="product-list-wrapper">
      <div
        class="product-item"
        :class="{'active':isMouseOver === 'first'}"
        @mouseenter="handleChangeActive('first')"
      >
        <header>
          <span class="home-pics first"></span>
          <h3>电商通</h3>
          <p>网店数据授信</p>
        </header>
        <div class="product-item-list">
          <section>
            <h4>准入条件</h4>
            <p>淘宝、天猫、京东等网店店主</p>
            <p>网店经营满一年及以上</p>
          </section>
          <section>
            <h4>所需材料</h4>
            <p>网店经营流水</p>
            <p>网店截图</p>
          </section>
          <button @click="handleToSeeAmount">立即申请</button>
        </div>
      </div>
      <div
        class="product-item"
        :class="{'active':isMouseOver === 'second'}"
        @mouseenter="handleChangeActive('second')"
      >
        <header>
          <span class="home-pics second"></span>
          <h3>外贸电商通</h3>
          <p>店铺数据授信</p>
        </header>
        <div class="product-item-list">
          <section>
            <h4>准入条件</h4>
            <p>亚马逊、eBay、速卖通、Wish等平台店主</p>
            <p>经营时间满一年及以上</p>
          </section>
          <section>
            <h4>所需材料</h4>
            <p>经营场地证明</p>
            <p>平台经营流水</p>
          </section>
          <button @click="handleToSeeAmount">立即申请</button>
        </div>
      </div>
      <div
        class="product-item"
        :class="{'active':isMouseOver === 'third'}"
        @mouseenter="handleChangeActive('third')"
      >
        <header>
          <span class="home-pics third"></span>
          <h3>烟草通</h3>
          <p>店铺数据授信</p>
        </header>
        <div class="product-item-list">
          <section>
            <h4>准入条件</h4>
            <p>店铺经营时间满一年及以上</p>
            <p>借款人为烟草店铺法定代表人</p>
          </section>
          <section>
            <h4>所需材料</h4>
            <p>烟草专卖零售许可证</p>
            <p>烟草商务网信息</p>
          </section>
          <button @click="handleToSeeAmount">立即申请</button>
        </div>
      </div>
      <div
        class="product-item"
        :class="{'active':isMouseOver === 'forth'}"
        @mouseenter="handleChangeActive('forth')"
      >
        <header>
          <span class="home-pics forth"></span>
          <h3>企业通</h3>
          <p>企业数据授信</p>
        </header>
        <div class="product-item-list">
          <section>
            <h4>准入条件</h4>
            <p>企业经营时间满一年及以上，借款人</p>
            <p>为企业的法定代表人</p>
          </section>
          <section>
            <h4>所需材料</h4>
            <p>营业执照</p>
            <p>企业开票数据</p>
          </section>
          <button @click="handleToSeeAmount">立即申请</button>
        </div>
      </div>
    </main>
  </section>
</template>
<script>
export default {
  data() {
    return {
      isMouseOver: "first"
    };
  },
  methods: {
    handleToSeeAmount() {
      this.$router.push({
        name: "QuotaPage"
      });
    },
    handleChangeActive(active) {
      this.isMouseOver = active;
    }
  }
};
</script>


