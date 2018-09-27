import https from '../../lib/http';

/**===============对公开户获取银行列表接口===============**/
export const getBankList = () => {
  return https.mijin.get('v1/ppvt/account/_bank-list');
}

/**===============开户接口==================**/
export const accountOpen = (params) => {
  return https.mijin.post('v1/ppvt/account/_open',params)
}

/**============我的额度-点击申请借款时调用用户开户状态接口==============**/
//status:0未开户、1开户、2正在开户、-1无
export const getAccountStatus = () => {
  return https.mijin.get('v1/ppvt/account/_status')
};

/**============我的额度-授信额度或者未授信产品列表获取==============**/
export const getCreditInfo = () => {
  return https.mijin.get('v1/asset/credit/')
};

/**============我的额度-点击“申请授信”按钮时先检查授信状态 第一步==============**/
export const getCheckedCredit = () => {
  return https.mijin.get('v1/asset/credit-application/_check')
};

/**===========最小的借款额度获取===============**/
export  const getMaxCreditAmount = (enumName) => {
  return https.common.get(`v1/sys/dict/${enumName}`)
}

/**============信用认证用户登录信息==============**/
export const getLoginDetail = () => {
  return https.mijin.get('v1/party/person/login/base')
};


/**============申请授信接口 注:未授信去申请授信额度 ================**/
export const postCreditDSTApply = (params) => {
  return https.mijin.post('v1/asset/credit-application/dst',params);
};

/**============申请授信接口 注:未授信去申请授信额度 ================**/
export const postCreditQYTApply = (params) => {
  return https.mijin.post('v1/asset/credit-application/qyt',params);
};

/**============添加担保人=====有额度===========**/
export const postAddGuarantee = (params) => {
  return https.mijin.post('v1/asset/guarantee-application/add',params)
};

/**================检查米今银行与存管银行卡是否一致的检查== 成功:去检查开户账户的资金状态; 失败:提示==============**/
export const checkOpenBankNumber = () => {
  return https.mijin.get('v1/ppvt/account/_check-bankcard')
}

/**=============检查开户用户的状态= 0: 未开户,去申请授信,1: 已开户,去检查银行卡是否一致==============**/
export const checkOpenStatus = (params) => {
  return https.mijin.get('v1/asset/loan-application/_check', {params})
};

/**=============去借款接口================**/
export const postLoanApplication = (params) => {
  return https.mijin.post('v1/asset/loan-application', params)
};

/**==============获取借款页面所需的数据接口=================**/
export const getLoanInformation = (creditId) => {
  return https.mijin.get(`v1/asset/credit/_loan/${creditId}`);
};

/**=============获取相关联系人信息的接口==================**/
export const getRelationList = () => {
  return https.mijin.get('v1/person/relation/list')
}

/**=============计算还款总额==================**/
export const calculateTotal = (params) => {
  return https.mijin.post('v1/ppvt/repayment/_calculate', params)
}

/**=============根据产品id获取产品信息==================**/
export const getProductInfo = (productId) => {
  return https.mijin.get(`v1/product/${productId}`);
};



