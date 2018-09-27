<template>
  <div class="header" :class="{'is-hover': isHover, 'is-white': isWhite}" v-if="pageName !== 'LoginPage'">
    <div class="main-content header-main">
      <div class="header-main-top flex">
        <p>客服热线：400-6690-108（09:00～21:00）</p>
        <p>欢迎来到米今商贷！您好，
          <span v-if="!isLogin">
            请
            <router-link to="/login" target="_blank" v-if="isTarget">登录</router-link>
            <router-link to="/login" v-else>登录</router-link> |
          </span>
          <label v-else>
            <span class="header-top-user">{{userName}}</span>
            <span class="logo-out cursor" @click="doLogOut('doLogOut')">退出</span>
          </label>
        </p>
      </div>
      <div class="header-main-nav flex">
        <div class="small-pics header-logo">
          米金logo
        </div>
        <ul class="header-right-nav clearfix" v-if="isTarget">
          <li><router-link to="/" target="_blank" :class="{'active': activePage === 'HomePage'}">首页</router-link></li>
          <li><router-link to="/quota" target="_blank" :class="{'active': activePage === 'QuotaPage'}">我的额度</router-link></li>
          <li class="header-nav-myaccount"><router-link to="/user/account" target="_blank"><i class="icon iconfont icon-yonghu1"></i>我的账户</router-link></li>
        </ul>
        <ul class="header-right-nav clearfix" v-else>
          <li><router-link to="/" :class="{'active': activePage === 'HomePage'}">首页</router-link></li>
          <li><router-link to="/quota" :class="{'active': activePage === 'QuotaPage'}">我的额度</router-link></li>
          <li class="header-nav-myaccount"><router-link to="/user/account"><i class="icon iconfont icon-yonghu1"></i>我的账户</router-link></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="login-header" v-else>
    <div class="main-content header-main">
      <div class="header-main-nav flex">
        <div class="small-pics header-logo">
          米金logo
        </div>
        <div class="header-return" v-if="isTarget"><router-link to="/" target="_blank">返回首页</router-link></div>
        <div class="header-return" v-else><router-link to="/">返回首页</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Api from '../api/common';
export default {
  props: {
    isHover: Boolean,
    isWhite: Boolean,
    activePage: String,
    isTarget: Boolean
  },
  data () {
    return {
      pageName: this.$route.name,
      isLogin: false,
      userName: ''
    }
  },
  created() {
    if(this.$getLocalStorage('token') && this.$getLocalStorage('token')!==''){
      this.isLogin = true;
      this.userName = JSON.parse(this.$getLocalStorage('loginInfo')).mobile ? JSON.parse(this.$getLocalStorage('loginInfo')).mobile : JSON.parse(this.$getLocalStorage('loginInfo')).name;
      if(!this.$getLocalStorage('users')){
        this.getUserInfo();
      }
    }else{
      if(this.pageName === 'HomePage' || this.pageName === 'NewsPage' || this.pageName === 'NewsDetailPage' || this.pageName === 'AboutUsPage'){
        return
      }else{
        this.$router.push({name:'LoginPage'});
      }
    }
  },
  methods: {
    getUserInfo() {
      Api.getUserInfo().then((res) => {
        if(res.data.code === 200) {
          const _users = JSON.stringify(res.data.body);
          this.$setLocalStorage('users',_users);
        }
      });
    },
    doLogOut(){
      this.$logout(() => {
        if(this.isTarget) {
          let routeData = this.$router.resolve({name: "LoginPage"});
          window.open(routeData.href, '_blank');
        }else{
          this.$router.push({name:'LoginPage'});
        }

      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $font-size: 14px;
  $font-size-middle: 16px;
  $nav-font: 18px;
  .login-header {
    background: #666;
    .header-main-nav {
      padding: 10px 0;
      .header-logo {
        margin:0;
      }
    }
  }
  .header-return {
    a {
      color: #fff;
    }
  }
  .header {
    width:100%;
    height:100px;
    transition: .5s;
    background: rgba(255,255,255,0);
    .header-main-top {
      width: 100%;
      line-height:30px;
      a {
        color: #b3b2ba;
        font-size: $font-size;
      }
      p {
        font-size: $font-size;
        color: #b0b3b5;
      }
      .header-top-user {
        color: #f4cd20;
    }
      .logo-out {
        cursor:pointer;
        margin-left: 10px;
      }
    }
  }
  .header-main-nav {
    width: 100%;
    .header-logo {
      text-indent: -9999em;
      width: 252px;
      height: 40px;
      overflow: hidden;
      margin-top: 10px;
      background-position: 0 -265px;
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
          color: #fff;
          padding: 3px 5px;
        }
        a.active {
          color: #f3cd1f;
          border-bottom: 2px solid #f3cd1f;
        }
      }
      li.header-nav-myaccount {
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        border: 1px solid #ddd;
        margin-left: 30px;
        a {
          font-size: $font-size-middle;
        }
        .icon-yonghu1 {
          font-size: $nav-font;
          margin-right: 5px;
        }
      }
    }
  }
.header.is-hover:hover ,.header.is-white {
  background: #fff;
  .header-logo {
    background-position: 0 -207px;
  }
  .header-main-top {
    p { color: #666; }
    a {
      color: #666;
    }
  }
  .header-right-nav {
    li {
      a {
        color: #666;
      }
      a.active {
        color: #f3cd1f;
      }
    }
    .header-nav-myaccount {
      background: #f3cd1f;
      a {
        color: #fff;
      }

    }
  }
}

</style>
