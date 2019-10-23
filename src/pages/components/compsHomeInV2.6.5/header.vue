<template>
  <div class="header-main-nav">
    <div class="main-content flex">
      <div class="home-pics header-logo">米金logo</div>
      <ul class="header-right-nav clearfix" v-if="isTarget">
        <li>
          <router-link to="/" target="_blank" :class="{'active': activePage === 'HomePage'}">首页</router-link>
        </li>
        <li>
          <router-link
            to="/quota"
            target="_blank"
            :class="{'active': activePage === 'QuotaPage'}"
          >我的额度</router-link>
        </li>
        <li class="header-nav-myaccount">
          <router-link to="/user/account" target="_blank">
            <i class="icon iconfont icon-yonghu1"></i>我的账户
          </router-link>
        </li>
      </ul>
      <ul class="header-right-nav clearfix" v-else>
        <li>
          <router-link to="/" :class="{'active': activePage === 'HomePage'}">首页</router-link>
        </li>
        <li>
          <router-link to="/quota" :class="{'active': activePage === 'QuotaPage'}">我的额度</router-link>
        </li>
        <li class="header-nav-myaccount">
          <router-link to="/user/account">
            <i class="icon iconfont icon-yonghu1"></i>我的账户
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    activePage: String,
    isTarget: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
$nav-font: 18px;
$font-size-middle: 16px;

$color-orange: #ffa812;
$color-white: #fff;
$color-666: #666;
$border-color: #ddd;

.header-main-nav {
  padding: 0;
  background: $color-white;
  width: 100%;

  .header-logo {
    background-position: 0 -318px;
    text-indent: -9999em;
    width: 260px;
    height: 75px;
    overflow: hidden;
  }

  .header-right-nav {
    display: flex;
    margin-top: 10px;
    padding-bottom: 10px;

    li {
      list-style: none;
      width: 120px;
      text-align: center;
      height: 40px;
      line-height: 36px;

      a {
        font-size: $nav-font;
        color: $color-666;
        padding: 3px 5px;
      }

      a.active {
        color: $color-orange;
        border-bottom: 2px solid $color-orange;
      }
    }

    li.header-nav-myaccount {
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      border: 1px solid $border-color;
      margin-left: 30px;
      background: $color-orange;

      a {
        font-size: $font-size-middle;
        color: $color-white;
      }

      .icon-yonghu1 {
        font-size: $nav-font;
        margin-right: 5px;
      }
    }
  }
}
</style>
