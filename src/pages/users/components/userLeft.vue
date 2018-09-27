<template>
  <div class="user-left-menu">
    <div class="user-menu-item" v-for="(item,index) in menuList" :key="index" :class="{'active-item': pageName == item.value }" @click="handleChangeActive">
      <router-link :to="item.to">{{item.name}}</router-link>
    </div>
    <!--<div class="menu-active-line"  :style="'top:'+55 * activeIndex + 'px'"></div>-->
  </div>
</template>

<script>
export default {
  name: 'userLeft',
  props: {
    pageName: String
  },
  data () {
    return {
      menuList: [
        {
          name: '我的账户',
          value: 'usersAccountPage',
          to: '/user/account'
        },
        {
          name: '资金管理',
          value: 'usersAssetPage',
          to: '/user/asset'
        },
        {
          name: '授信申请记录',
          to: '/user/credit',
          value: 'usersCreditPage'
        },
        {
          name: '借款记录',
          to: '/user/loans',
          value: 'usersMyLoansPage'
        },
        {
          name: '担保记录',
          to: '/user/guarantees',
          value:'usersGuaranteesPage'
        }
      ]
    }
  },
  created(){},
  methods: {
    handleChangeActive(item,index){
      this.activeIndex = index;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.user-left-menu {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  .user-menu-item {
    height: 55px;
    line-height:55px;
    padding-left: 30px;
    a {
      font-size: 16px;
      color: #494949;
    }
  }
  .user-menu-item.active-item {
    border-left: 2px solid #ff8b01;
    a {
      color: #ff8b01;
      font-size: 16px;
    }
  }
  .menu-active-line {
    width: 2px;
    height: 55px;
    background: #ff8b01;
    position: absolute;
    left: 0;
    top: 0;
    transition: .2s top;
  }
}
</style>
