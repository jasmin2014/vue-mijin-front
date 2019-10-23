// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "element-ui/lib/theme-chalk/index.css";
import "./assets/style.scss";
import "./assets/iconfont/iconfont.css";
import "./pages/credit/credit.scss";
import "./pages/users/users.scss";

import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";
import Global from "./lib/global";
import "./lib/polyfill";
import ElementUI from "element-ui";
import states from "./vuex/store";

Vue.config.productionTip = false;

Vue.use(Global);
Vue.use(ElementUI);
Vue.use(Vuex);

(function() {
  var domainUrl =
    process.env.NODE_ENV === "production"
      ? "collect.trc.com"
      : "testcollect.fengdai.org";

  var collect = document.createElement("script");
  collect.type = "text/javascript";
  collect.async = true;
  collect.src = "//" + domainUrl + "/index.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(collect, s);
})();

window._XT = window._XT || []; //定义信息配置对象

window._XT.push(["Target", "div"]); //无埋点行为采集
window._XT.push(["auth", "cd4af3697fe9dc90813d1e8b499c7da7"]); //处于安全性考虑的传参

// 用户自定义收集字段,现在传的是接入方的渠道码
window._XT.userConfig = {
  dcpChannelCode: "PPqCa8j8"
};

const store = new Vuex.Store(states);

// 关键字优化
const seoWords = {
  HomePage: {
    title: "米今—以科技服务金融，为电商小微企业提供专业的信贷、商贷服务",
    keywords: "企业信贷,企业商贷,米今",
    description:
      "米今(www.360mijin.com)专注为电商卖家、小微企业提供专业的信贷服务及商贷服务，为企业主提供最方便快捷的服务平台，米今助力，资金无忧。"
  },
  LoginPage: {
    title: "登录-米今官网",
    keywords: "登录",
    description: ""
  },
  AboutUsPage: {
    title: "关于我们-米今官网",
    keywords: "关于我们",
    description: ""
  },
  NewsPage: {
    title: "信息公告-米今官网",
    keywords: "信息公告",
    description: ""
  }
};
router.beforeEach((to, from, next) => {
  let key = to.name;
  if (seoWords[key]) {
    document.title = seoWords[key]["title"] || seoWords["HomePage"]["title"];
    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", seoWords[key]["keywords"]);
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", seoWords[key]["description"]);
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
