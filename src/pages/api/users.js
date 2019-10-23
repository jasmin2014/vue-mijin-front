import https from "../../lib/http";

/**============我的账户-获取账户信息=============**/
export const getAccountInfo = () => {
  return https.mijin.get("v1/party/person/login/detail");
};

/**===========我的账户-还款情况-还款 二次确认的弹窗还款信息获取接口==============**/
export const getNowRepaymentOrder = repayOrderId => {
  return https.mijin.get(`v1/repayment/order/${repayOrderId}`);
};

/**===========我的账户-还款情况-提前还款 二次确认的弹窗还款信息获取接口==============**/
export const getEarlyRepaymentOrder = params => {
  return https.mijin.get(`v1/repayment/order`, { params });
};

/**===========我的账户-还款接口=================**/
export const putNowRepayment = id => {
  return https.mijin.put(`v1/ppvt/repayment/${id}`);
};

/**===========我的账户-提前还款接口=============**/
export const postEarlyRepayment = params => {
  return https.mijin.post("v1/ppvt/repayment/_defaults-repay", params);
};

/**===========我的账户- 资金管理-资金流水==============**/
export const getAssetFlowRecords = params => {
  return https.mijin.get("v1/account/center/_page-for-account-flow", {
    params
  });
};

/**==========我的账户-资金管理-资金存管===============**/
export const getAssetDepositRecords = params => {
  return https.mijin.get("v1/account/center/_page-for-depository", { params });
};

/**===========我的账户-资金管理-资金流水3======================*/
export const getAssetLawcertRecords = params => {
  return https.mijin.get("/v1/account/center/_page-for-lawcert", { params });
};

/**=========我的账户-资金管理-绑卡信息和资金信息接口============**/
export const getAccountBankInfo = () => {
  return https.mijin.get("v1/ppvt/account/_info");
};

/**=========我的账户-资金管理-西安存管未开户时-点击"开通存管账户"对账户状态进行检查===========**/
export const gettCheckOpenStatus = () => {
  return https.mijin.get("/v1/ppvt/account/_check-open-status");
};

/**=========我的账户-授信管理-授信申请记录查询===========**/
export const getCreditApplicationList = params => {
  return https.mijin.get("v1/asset/credit-application/list", { params });
};

/**=========我的账户-授信管理-查看担保信息接口=========**/
export const getGuaranteeDetail = creditId => {
  return https.mijin.get(`v1/asset/guarantee/_guarantee_detail/${creditId}`);
};

/**=========我的账户-授信管理-更换担保人接口===========**/
export const putChangeGuarantee = (creditId, params) => {
  return https.mijin.put(
    `v1/asset/guarantee-application/update?creditId=${creditId}`,
    params
  );
};

/**=========我的账户-担保记录-担保记录============**/
export const getGuaranteeRecordList = params => {
  return https.mijin.get("v1/asset/guarantee/guaranteeList", { params });
};

/**=========我的账户-担保记录-担保的借款记录=========**/
export const getGuaranteeLoanList = params => {
  return https.mijin.get("v1/asset/guarantee/loanList", { params });
};

/**=========我的账户-担保记录-填充资料============**/
export const postUserInfo = (applicationId, params) => {
  return https.mijin.post(`v1/asset/guarantee/_add/${applicationId}`, params);
};

/**=========我的账户-担保记录-修改============**/
export const putAuthorityInfo = (applicationId, params) => {
  return https.mijin.put(`v1/asset/guarantee/_update/${applicationId}`, params);
};

/**=========我的账户-担保记录-签约===========**/
export const putGuaranteeApplication = params => {
  return https.mijin.put(
    `v1/asset/guarantee-application/_signing?applicationId=${
      params.applicationId
    }&status=${params.status}`
  );
};

/**========我的账户-担保记录-拒绝签约=======**/
export const putCancelSigning = params => {
  return https.mijin.put(
    `v1/asset/guarantee-application/_cancel?applicationId=${
      params.applicationId
    }&status=${params.status}`
  );
};

/**========我的账户-担保记录-预览合同下载接口===========**/
export const getGuaranteeContractPreview = params => {
  return https.mijin.get("v1/asset/guarantee-application/contract-preview", {
    params: params,
    responseType: "blob"
  });
};

/**========我的账户-担保记录-借款签约获取验证码============**/
export const getGuaranteeMessageCode = params => {
  return https.mijin.get(
    `/v1/asset/guarantee-application/obtain-code?applicationId=${
      params.applicationId
    }`
  );
};

/**========我的账户--担保记录-核对验证码============**/
export const ValidateGuaranteeMessageCode = code => {
  return https.mijin.get(
    `/v1/asset/guarantee-application/verify-code?code=${code}`
  );
};

/**========我的账户-查询认证银行信息========**/
export const getAuthBankInfo = params => {
  return https.mijin.get("v1/account/center/_find-auth-bank-info", { params });
};

/**========我的账户-充值页-判断绑卡是对公还是对私========**/
export const checkBankAccountType = () => {
  return https.mijin.get("v1/ppvt/account/_bankcard");
};

/**=========我的账户-充值-发送验证码接口===========**/
export const postPayCertCheck = phone => {
  return https.mijin.post(`v1/message/pay_cert_check/code?phone=${phone}`);
};

/**========我的账户-充值接口==========**/
export const postAccountRecharge = params => {
  return https.mijin.post("v1/account/center/_recharge", params);
};

/**=========我的账户-提现-发送验证码接口===========**/
export const postWithdrawCheckCode = phone => {
  return https.mijin.post(`v1/message/withdraw_check/code?phone=${phone}`);
};

/**=========我的账户-提现接口===========**/
export const postWithDrawForFund = params => {
  return https.mijin.post(
    "v1/account/center/_withdraw-for-fund-center",
    params
  );
};

/**========我的账户-借款记录接口===========**/
export const getLoanApplicationList = params => {
  return https.mijin.get(
    "v1/asset/loan-application/_page-for-loan-application",
    { params }
  );
};

/**========我的账户-借款记录-预览合同下载接口==========**/
export const getDownloadContractPreview = params => {
  return https.mijin.get("v1/asset/loan-application/contract-preview", {
    params: params,
    responseType: "blob"
  });
};

/**========我的账户-借款记录-借款签约获取验证码============**/
export const getContractMessageCode = params => {
  return https.mijin.get(
    `/v1/asset/loan-application/obtain-code?applicationId=${
      params.applicationId
    }`
  );
};

/**========我的账户-借款记录-借款签约核对验证码============**/
export const ValidateContractMessageCode = code => {
  return https.mijin.get(`/v1/asset/loan-application/verify-code?code=${code}`);
};

/**========我的账户-借款记录-签约============**/
export const putLoanApplicationSiging = params => {
  return https.mijin.put(
    `v1/asset/loan-application/_signing?applicationId=${
      params.applicationId
    }&status=${params.status}`
  );
};

/**========我的账户-借款记录-拒绝签约============**/
export const putCancelLoanApplicationSiging = params => {
  return https.mijin.put(
    `v1/asset/loan-application/_cancel?applicationId=${
      params.applicationId
    }&status=${params.status}`
  );
};

/**========我的账户-借款记录-借款单条详情接口==========**/
export const getLoanApplicationDetail = applicationId => {
  return https.mijin.get(`v1/asset/loan-application/${applicationId}/_detail`);
};

/**===========我的账户-资金管理-存管账户提现-=============**/
export const postWithdrawXiAn = amount => {
  return https.mijin.post(
    `/v1/account/center/_withdraw-xian?amount=${amount}&terminalNo=PC`
  );
};

/**==========我的账户-资金管理-存管账户提现页面存管信息获取============**/
export const getCGInfo = () => {
  return https.mijin.get("/v1/ppvt/account/xa/info");
};

/**==========我的账户-资金管理-点击去绑定银行卡的接口判断=================**/
export const getBindStatus = () => {
  return https.mijin.get("/v1/ppvt/account/bind/bank/check");
};

/**===========我的账户-提现接口判断是否已被冻结==========================**/
export const checkBalance = phone => {
  return https.mijin.get(`v1/account/balance/mobile/${phone}`);
};
