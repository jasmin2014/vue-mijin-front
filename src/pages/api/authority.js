import https from "../../lib/http";

/**===========检测身份证是否已认证============**/
export const checkIdCardCredit = () => {
  return https.mijin.get("v1/ident/auth/check");
};

/**===========认证身份证号===================**/
export const identAuth = params => {
  return https.mijin.post("v1/ident/auth", params);
};

/**============运营商采集接口-聚立信数据盒子================**/
export const operatorAuthPassword = password => {
  return https.mijin.post(`v1/operator/collect?password=${password}`);
};

/**============运营商采集接口-聚立信数据盒子-动态验证码认证================**/
export const operatorAuthCode = params => {
  return https.mijin.post("v1/operator/collect/code", params);
};

/**=============企业通-进件邀请码接口判断==================**/
export const checkInviteCode = inviteCode => {
  return https.mijin.get(
    `/v1/asset/credit-application/_check-invite-code?inviteCode=${inviteCode}`
  );
};

/**================获取补充信息中的图片接口====================**/
export const getImgList = () => {
  return https.mijin.get("/v1/asset/credit-application/images");
};
