import https from "../../lib/http";
// import http from "../../lib/http";

/**===============对公开户获取银行列表接口===============**/
export const getBankList = () => {
  return https.mijin.get("v1/ppvt/account/_bank-list");
};

/**==========根据获取银行卡列表接口里面的bankCode获取银行的logo=============**/
export const getBankLogo = bankCode => {
  return https.mijin.get(`/v1/ppvt/account/bank/logo/${bankCode}`);
};

/**============绑定银行卡接口调用=============**/
export const postBindBank = params => {
  return https.mijin.post("/v1/ppvt/account/_bind-bank", params);
};

/**============更换银行卡接口调用=============**/
export const postChangeBank = params => {
  return https.mijin.post("/v1/ppvt/account/_replace_bind-bank", params);
};

/**===============开户接口(不要)==================**/
export const accountOpen = params => {
  return https.mijin.post("v1/ppvt/account/_open", params);
};

/**============我的额度-点击申请借款时调用用户开户状态接口==============**/
export const getAccountStatus = () => {
  return https.mijin.get("v1/ppvt/account/_status");
};

/**========我的额度-借款申请-选择开户状态-对私户开户接口==========**/
export const postXaOpenPrivage = () => {
  return https.mijin.post("/v1/ppvt/account/_xa-open-person?terminalNo=PC");
};

/**============我的额度-授信额度或者未授信产品列表获取==============**/
export const getCreditInfo = () => {
  return https.mijin.get("v1/asset/credit/");
};

/**============我的额度-点击“申请授信”按钮时先检查授信状态 第一步==============**/
export const getCheckedCredit = () => {
  return https.mijin.get("v1/asset/credit-application/_check");
};

/**===========最小的借款额度获取===============**/
export const getMaxCreditAmount = enumName => {
  return https.common.get(`v1/sys/dict/${enumName}`);
};

/**============信用认证用户登录信息==============**/
export const getLoginDetail = () => {
  return https.mijin.get("v1/party/person/login/base");
};

/**============申请授信接口-电商通 注:未授信去申请授信额度 ================**/
export const postCreditDSTApply = params => {
  return https.mijin.post("v1/asset/credit-application/dst", params);
};

/**============申请授信接口-跨境通 注:未授信去申请授信额度 ================**/
export const postCreditKJTApply = params => {
  return https.mijin.post("v1/asset/credit-application/kjt", params);
};

/**============申请授信接口-企业通 注:未授信去申请授信额度 ================**/
export const postCreditQYTApply = params => {
  return https.mijin.post("v1/asset/credit-application/qyt", params);
};
/**============申请授信接口-烟草通 注:未授信去申请授信额度 ================**/
export const postCreditYCTApply = params => {
  return https.mijin.post("v1/asset/credit-application/yct", params);
};
/**============添加担保人=====有额度===========**/
export const postAddGuarantee = params => {
  return https.mijin.post("v1/asset/guarantee-application/add", params);
};

/**================检查米今银行与存管银行卡是否一致的检查== 成功:去检查开户账户的资金状态; 失败:提示 -(不要)==============**/
export const checkOpenBankNumber = () => {
  return https.mijin.get("v1/ppvt/account/_check-bankcard");
};

/**=============检查开户用户的借款状态==============**/
export const checkOpenStatus = params => {
  return https.mijin.get("v1/asset/loan-application/_check", { params });
};

/**=============去借款接口================**/
export const postLoanApplication = params => {
  return https.mijin.post("v1/asset/loan-application", params);
};

/**==============获取借款页面所需的数据接口=================**/
export const getLoanInformation = () => {
  return https.mijin.get(`v1/asset/credit/_loan`);
};

/**=============获取相关联系人信息的接口==================**/
export const getRelationList = () => {
  return https.mijin.get("v1/person/relation/list");
};

/**=============计算还款总额==================**/
export const calculateTotal = params => {
  return https.mijin.post("v1/ppvt/repayment/_calculate", params);
};

/**=============根据产品id获取产品信息==================**/
export const getProductInfo = productId => {
  return https.mijin.get(`v1/product/${productId}`);
};

/**=========绑定卡后-去选择开户类型为对公时的"下一步"操作的接口,用来判断存管对公户开户是否支持============**/
export const getPublicOpenStatus = () => {
  return https.mijin.get("/v1/ppvt/account/check/org");
};

/**==========存管对公开户接口调用============**/
export const postOpenPublicCG = params => {
  return https.mijin.post("/v1/ppvt/account/_open-org", params);
};

/**==========存管对公开户查询对公开户相关信息接口调用==========**/
export const getOpenPublicCGInfo = () => {
  return https.mijin.get("/v1/ppvt/account/xa/org/info");
};
