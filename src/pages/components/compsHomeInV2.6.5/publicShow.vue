<style lang="scss">
$font-color: #6e6c72;
$bg-color: #f7f7f7;
.public-show {
  width: 100%;
  background-color: $bg-color;
  height: 58px;
  line-height: 58px;
  padding: 10px 0;
  display: none;
  .public-show-main {
    width: 1200px;
    margin: 0 auto;
    display: flex;
  }
  .public-show-title {
    width: 128px;
    height: 38px;
    overflow: hidden;
    background-position: 0 -406px;
    text-indent: -9999em;
    overflow: hidden;
  }
  .public-items {
    flex: 1;
    .public-item {
      line-height: 38px;
      height: 38px;
      overflow: hidden;
      display: flex;
      .hots {
        width: 40px;
        height: 15px;
        overflow: hidden;
        background-position: -140px -418px;
        text-indent: -999em;
        margin-top: 12px;
        margin-right: 8px;
      }
      > div {
        color: $font-color;
      }
    }
  }
}
</style>

<template>
  <section class="public-show">
    <div class="public-show-main">
      <div class="home-pics public-show-title">米今公告</div>
      <div class="public-items">
        <div class="public-item clear">
          <span class="home-pics hots">hots</span>
          <div>
            <a href="#">关于五一劳动节放假及工作安排通知</a>
            <span>/</span>
            <a href="#">关于北京银行存管系统升级通知</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
