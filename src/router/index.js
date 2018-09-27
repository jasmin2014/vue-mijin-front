import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'HomePage',
      component: () =>
        import ('../pages/home.vue')
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () =>
        import ('../pages/login.vue')
    },
    {
      path: '/news',
      name: 'NewsPage',
      component: () =>
        import ('../pages/news.vue')
    },
    {
      path: '/news-detail/:id',
      name: 'NewsDetailPage',
      component: () =>
        import ('../pages/newsDetail.vue')
    },
    {
      path: '/about',
      name: 'AboutUsPage',
      component: () =>
        import ('../pages/about.vue')
    },
    {
      path: '/quota',
      name: 'QuotaPage',
      component: () =>
        import ('../pages/quota.vue')
    },
    {
      path: '/credit/apply',
      name: 'creditApplyStep1',
      component: () =>
        import ('../pages/credit/apply.vue')
    },
    {
      path: '/auth/authority',
      name: 'creditAuthority',
      component: () =>
        import ('../pages/authority/authority.vue')
    },
    {
      path: '/auth/operator',
      name: 'authorityOperator',
      component: () =>
        import ('../pages/authority/operator.vue')
    },
    {
      path: '/credit/centerbank',
      name: 'creditCenterBank',
      component: () =>
        import ('../pages/credit/centerbank.vue')
    },
    {
      path: '/credit/base',
      name: 'creditBasePage',
      component: () =>
        import ('../pages/credit/base.vue')
    },
    {
      path: '/credit/supplement',
      name: 'creditSupplementPage',
      component: () =>
        import ('../pages/credit/supplement.vue')
    },
    {
      path: '/success',
      name: 'successPage',
      component: () =>
        import ('../pages/success.vue')
    },
    {
      path: '/account/open',
      name: 'accountOpenPage',
      component: () =>
        import ('../pages/account/open.vue')
    },
    {
      path: '/credit/add-guarantee',
      name: 'creditGuaranteePage',
      component: () =>
        import ('../pages/credit/addGuarantee.vue')
    },
    {
      path: '/account/loan',
      name: 'accountLoanPage',
      component: () =>
        import ('../pages/account/loan.vue')
    },
    {
      path: '/user/account',
      name: 'usersAccountPage',
      component: () =>
        import ('../pages/users/account.vue')
    },
    {
      path: '/user/asset',
      name: 'usersAssetPage',
      component: () =>
        import ('../pages/users/asset.vue')
    },
    {
      //资金管理 授信申请/担保记录页面
      path: '/user/credit',
      name: 'usersCreditPage',
      component: () =>
        import ('../pages/users/creditRecord.vue')
    },
    {
      //借款记录
      path: '/user/loans',
      name: 'usersMyLoansPage',
      component: () =>
        import ('../pages/users/myLoans.vue')
    },
    {
      path: '/user/loan-detail/:id',
      name: 'usersLoanRecordDetailPage',
      component: () =>
        import ('../pages/users/loanDetail.vue')
    },
    {
      //担保记录
      path: '/user/guarantees',
      name: 'usersGuaranteesPage',
      component: () =>
        import ('../pages/users/guarantees/guarantees.vue')
    },
    {
      //担保记录-填充资料
      path: '/user/guarantees/fillinfo/:applicationId',
      name: 'usersFillInfoPage',
      component: () =>
        import ('../pages/users/guarantees/fillInfo.vue')
    },
    {
      //充值
      path: '/user/recharge',
      name: 'usersRechargePage',
      component: () =>
        import ('../pages/users/recharge.vue')
    },
    {
      //提现
      path: '/user/withdraw',
      name: 'usersWithdrawPage',
      component: () =>
        import ('../pages/users/withdraw.vue')
    },
    {
      //用户协议
      path: '/user/user-contract',
      name: 'usersContractPage',
      component: () =>
        import ('../pages/users/userContract.vue')
    },
    {
      //风险提示
      path: '/user/risk-tips',
      name: 'riskTipsPage',
      component: () =>
        import ('../pages/users/riskTips.vue')
    },
    {
      //借款合同相关内容
      path: '/user/person-auth',
      name: 'usersPersonalAuthPage',
      component: () =>
        import ('../pages/users/personalAuth.vue')
    },
    {
      //个人信息查询授权书
      path: '/user/person-content',
      name: 'personalContentPage',
      component: () =>
        import ('../pages/users/personalContent.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
