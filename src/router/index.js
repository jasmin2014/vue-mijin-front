import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: () => import("../pages/home.vue")
    },
    {
      path: "/login",
      name: "LoginPage",
      component: () => import("../pages/login.vue")
    },
    {
      path: "/news",
      name: "NewsPage",
      component: () => import("../pages/news.vue")
    },
    {
      path: "/news-detail/:id",
      name: "NewsDetailPage",
      component: () => import("../pages/newsDetail.vue")
    },
    {
      path: "/about",
      name: "AboutUsPage",
      component: () => import("../pages/about.vue")
    },
    {
      path: "/quota",
      name: "QuotaPage",
      component: () => import("../pages/quota.vue")
    },
    {
      path: "/credit/apply",
      name: "creditApplyStep1",
      component: () => import("../pages/credit/apply.vue")
    },
    {
      path: "/credit/inviteCode",
      name: "creditApplyInviteCOde",
      component: () => import("../pages/credit/inviteCode.vue")
    },
    {
      path: "/auth/authority",
      name: "creditAuthority",
      component: () => import("../pages/authority/authority.vue")
    },
    {
      path: "/auth/operator",
      name: "authorityOperator",
      component: () => import("../pages/authority/operator.vue")
    },
    {
      path: "/credit/centerbank",
      name: "creditCenterBank",
      component: () => import("../pages/credit/centerbank.vue")
    },
    {
      path: "/credit/base",
      name: "creditBasePage",
      component: () => import("../pages/credit/base.vue")
    },
    {
      path: "/credit/supplement",
      name: "creditSupplementPage",
      component: () => import("../pages/credit/supplement.vue")
    },
    {
      path: "/success",
      name: "successPage",
      component: () => import("../pages/success.vue")
    },
    {
      path: "/account/open",
      name: "accountOpenPage",
      component: () => import("../pages/account/open.vue")
    },
    {
      path: "/credit/add-guarantee",
      name: "creditGuaranteePage",
      component: () => import("../pages/credit/addGuarantee.vue")
    },
    {
      path: "/account/loan",
      name: "accountLoanPage",
      component: () => import("../pages/account/loan.vue")
    },
    {
      path: "/user/account",
      name: "usersAccountPage",
      component: () => import("../pages/users/account.vue")
    },
    {
      path: "/user/asset",
      name: "usersAssetPage",
      component: () => import("../pages/users/asset.vue")
    },
    {
      //资金管理 授信申请/担保记录页面
      path: "/user/credit",
      name: "usersCreditPage",
      component: () => import("../pages/users/creditRecord.vue")
    },
    {
      //借款记录
      path: "/user/loans",
      name: "usersMyLoansPage",
      component: () => import("../pages/users/myLoans.vue")
    },
    {
      path: "/user/loan-detail/:id",
      name: "usersLoanRecordDetailPage",
      component: () => import("../pages/users/loanDetail.vue")
    },
    {
      //担保记录
      path: "/user/guarantees",
      name: "usersGuaranteesPage",
      component: () => import("../pages/users/guarantees/guarantees.vue")
    },
    {
      //担保记录-填充资料
      path: "/user/guarantees/fillinfo/:applicationId",
      name: "usersFillInfoPage",
      component: () => import("../pages/users/guarantees/fillInfo.vue")
    },
    {
      //充值
      path: "/user/recharge",
      name: "usersRechargePage",
      component: () => import("../pages/users/recharge.vue")
    },
    {
      //提现
      path: "/user/withdraw",
      name: "usersWithdrawPage",
      component: () => import("../pages/users/withdraw.vue")
    },
    {
      //用户协议
      path: "/user/user-contract",
      name: "usersContractPage",
      component: () => import("../pages/users/userContract.vue")
    },
    {
      //风险提示
      path: "/user/risk-tips",
      name: "riskTipsPage",
      component: () => import("../pages/users/riskTips.vue")
    },
    {
      //借款合同相关内容
      path: "/user/person-auth",
      name: "usersPersonalAuthPage",
      component: () => import("../pages/users/personalAuth.vue")
    },
    {
      //个人信息查询授权书
      path: "/user/person-content",
      name: "personalContentPage",
      component: () => import("../pages/users/personalContent.vue")
    },
    //绑定银行卡
    {
      path: "/account/bindbank",
      name: "bindBankPage",
      component: () => import("../pages/account/bindBank.vue")
    },
    //绑定银行卡提交后,如果是存管对公户暂时不能开通,跳转的页面
    {
      path: "/account/bindstatus",
      name: "accountBindStatusPage",
      component: () => import("../pages/account/bindStatus.vue")
    },
    //我的账户-资金管理-绑定银行卡
    {
      path: "/user/bindbank",
      name: "userBindBankPage",
      component: () => import("../pages/users/bindBank.vue")
    },
    //我的账户-资金管理-绑卡成功页
    {
      path: "/user/depsuccess",
      name: "depOperateSuccessPage",
      component: () => import("../pages/users/depSuccess.vue")
    },
    //绑定银行卡成功页面
    {
      path: "/user/goXiAn",
      name: "userOpenInfoSuccessedPage",
      component: () => import("../pages/users/openInfoSuccess.vue")
    },
    //存管账户提现
    {
      path: "/user/dep-withdraw",
      name: "usersDepWithdrawPage",
      component: () => import("../pages/users/depWithDraw.vue")
    },
    //提现申请受理提示页
    {
      path: "/user/dep-withdrawing",
      name: "withDrawingPage",
      component: () => import("../pages/users/withDrawing.vue")
    },
    //选择存管账户类型
    {
      path: "/account/choose-type",
      name: "chooseTypePage",
      component: () => import("../pages/account/chooseType.vue")
    },
    //账户类型-对私户
    {
      path: "/account/private",
      name: "accountOpenPrivatePage",
      component: () => import("../pages/account/openDepPrivate.vue")
    },
    //账户类型-对公户
    {
      path: "/account/public",
      name: "accountOpenPublicPage",
      component: () => import("../pages/account/openDepPublic.vue")
    },
    //开户成功后的跳转页面
    // {
    //   path: "/account/opensuccess",
    //   name: "openSuccessPage",
    //   component: () => import("../pages/account/openStatus.vue")
    // },
    //存管开户资料审核中页面
    {
      path: "/account/openstatus",
      name: "accountOpenStatusPage",
      component: () => import("../pages/account/openStatus.vue")
    },
    //存管开户资料带激活页
    {
      path: "/account/waitActive",
      name: "accountOpenStatusActivePage",
      component: () => import("../pages/account/openActived.vue")
    },
    //存管开户资料审核通过页
    {
      path: "/account/goXiAn",
      name: "accountOpenInfoSuccessPage",
      component: () => import("../pages/account/openInfoSuccess.vue")
    },
    //我的账户-选择存管账户类型
    {
      path: "/user/choose-type",
      name: "userChooseTypePage",
      component: () => import("../pages/users/chooseType.vue")
    },
    //我的账户-选择存管账户类型-对私户
    {
      path: "/user/private",
      name: "usersOpenPrivatePage",
      component: () => import("../pages/users/openDepPrivate.vue")
    },
    //我的账户-选择存管账户类型-对公户
    {
      path: "/user/public",
      name: "usersOpenPublicPage",
      component: () => import("../pages/users/openDepPublic.vue")
    },
    //我的账户-选择对公户-资料填充按钮后的跳转页面
    {
      path: "/user/openstatus",
      name: "usersOpenStatusPage",
      component: () => import("../pages/users/openStatus.vue")
    },
    //我的账户-申请借款-带激活状态调整页
    {
      path: "/user/openWaitActive",
      name: "usersOpenWaitActivePage",
      component: () => import("../pages/users/openWaitActive.vue")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
