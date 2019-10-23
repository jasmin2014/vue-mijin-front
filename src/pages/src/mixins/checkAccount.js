import * as accountApi from "../../api/account";
export default {
  data: function() {
    return {};
  },
  created() {},
  methods: {
    checkAccountFn() {
      /**开户状态检查接口**/
      accountApi
        .getAccountStatus()
        .then(res => {
          let _res = res.data;
          if (_res.code === 200) {
            /**第一步:bankBind 参数判断资金账户是否已绑定银行卡,false 未绑定时跳入到绑卡页面**/
            if (!_res.body.bankBind) {
              if (
                this.$route.name === "usersAccountPage" ||
                this.$route.name === "QuotaPage"
              ) {
                this.$router.push({ name: "bindBankPage" });
              }
            } else {
              /**第二步: xiAnStatus参数,如果已绑卡的状态下去判断西安银行开户状态, 1): 0 为未开户**/
              if (_res.body.xiAnStatus == 0) {
                /** 第三步: 未开户的情况下,accountType参数, 1) 判断开户类型 -1 为需要选择开户类型**/
                if (_res.body.accountType == -1) {
                  if (
                    this.$route.name === "usersAccountPage" ||
                    this.$route.name === "bindBankPage" ||
                    this.$route.name === "QuotaPage"
                  ) {
                    this.$router.push({
                      name: "chooseTypePage"
                    });
                  } else if (this.$route.name === "userBindBankPage") {
                    this.$router.push({ name: "userChooseTypePage" });
                  }
                } else if (_res.body.accountType == 0) {
                  /**第三步: 未开户的情况下,accountType参数, 2) 判断开户类型 0 为需开对私户 **/

                  if (
                    this.$route.name === "usersAccountPage" ||
                    this.$route.name === "bindBankPage" ||
                    this.$route.name === "QuotaPage"
                  ) {
                    this.$router.push({
                      name: "accountOpenPrivatePage"
                    });
                  } else if (this.$route.name === "userBindBankPage") {
                    this.$router.push({ name: "usersOpenPrivatePage" });
                  }
                } else if (_res.body.accountType == 1) {
                  /**第三步: 未开户的情况下,accountType参数, 3) 判断开户类型 1 为需开对公户 **/

                  if (
                    this.$route.name === "usersAccountPage" ||
                    this.$route.name === "bindBankPage" ||
                    this.$route.name === "QuotaPage"
                  ) {
                    this.$router.push({
                      name: "accountOpenPublicPage"
                    });
                  } else if (this.$route.name === "userBindBankPage") {
                    this.$router.push({ name: "usersOpenPublicPage" });
                  }
                }
              } else if (_res.body.xiAnStatus == 1) {
                /**第二步: xiAnStatus参数,如果已绑卡的状态下去判断西安银行开户状态, 1 为已开户**/
                this.getOpenStatus();
              } else if (_res.body.xiAnStatus == 2) {
                /**第二步: xiAnStatus参数,如果已绑卡的状态下去判断西安银行开户状态, 2 为开户中**/

                if (
                  this.$route.name === "QuotaPage" ||
                  this.$route.name === "usersAccountPage"
                ) {
                  this.$router.push({
                    name: "accountOpenStatusPage"
                  });
                }
              } else if (_res.body.xiAnStatus == 3) {
                /**第三步: xiAnStatus参数,如果已绑卡的状态下去判断西安银行开户状态, 3 为资料审核成功,跳转到西安存管第三方开户页面**/
                if (
                  _res.body.xiAnOrgOpenUrl &&
                  _res.body.xiAnOrgOpenUrl !== ""
                ) {
                  if (
                    this.$route.name === "QuotaPage" ||
                    this.$route.name === "usersAccountPage"
                  ) {
                    this.$router.push({
                      name: "accountOpenInfoSuccessPage",
                      params: {
                        xaOpenUrl: _res.body.xiAnOrgOpenUrl
                      }
                    });
                  }
                } else {
                  if (this.$route.name === "accountOpenPublicPage") {
                    this.$router.push({ name: "accountOpenStatusPage" });
                  } else if (this.$route.name === "usersOpenPublicPage") {
                    this.$router.push({ name: "usersOpenStatusPage" });
                  }
                }
              } else if (_res.body.xiAnStatus == 4) {
                /**第四步: xiAnStatus参数,如果已绑卡的状态下去判断西安银行开户状态, 4 为待激活状态,需要充值了之后才能激活成功**/

                if (
                  this.$route.name === "QuotaPage" ||
                  this.$route.name === "usersAccountPage"
                ) {
                  this.$router.push({
                    name: "accountOpenStatusActivePage"
                  });
                }
              }
            }
          }
        })
        .catch(Error => {
          let _msg = Error.data.message ? Error.data.message : "未知错误!";
          if (
            Error.data.code == "4001000" &&
            this.$route.name === "bindBankPage"
          ) {
            this.$router.push({ name: "accountBindStatusPage" });
          } else {
            this.$confirm(_msg, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              closeOnClickModal: false,
              closeOnPressEscape: false
            });
          }
        });
    },
    getOpenStatus() {
      accountApi.checkOpenStatus().then(
        res => {
          if (res.data.code === 200) {
            this.$router.push({ name: "accountLoanPage" });
          } else if (res.data.code === 4002021) {
            this.$router.push({ name: "creditGuaranteePage" });
          } else if (res.data.code === 4002005) {
            let _msg = res.data.message ? res.data.message : "操作失败!";
            this.$confirm(_msg, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              closeOnClickModal: false,
              closeOnPressEscape: false
            });
          } else {
            let _msg = res.data.message ? res.data.message : "操作失败!";
            this.$confirm(_msg, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              closeOnClickModal: false,
              closeOnPressEscape: false
            });
          }
        },
        res => {
          if (res.data.body) {
            let _msg = "";
            for (const key in res.data.body) {
              _msg += res.data.body[key] + "  ";
            }
            this.$confirm(_msg, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              closeOnClickModal: false,
              closeOnPressEscape: false
            });
          } else {
            let _msg = res.data.message ? res.data.message : "操作失败!";
            this.$confirm(_msg, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              closeOnClickModal: false,
              closeOnPressEscape: false
            });
          }
        }
      );
    }
  }
};
