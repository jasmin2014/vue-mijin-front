import https from "../lib/http";

const appId = "uc07fb442be2d2cf6f"; //用户中心appId
const appSecret = "5f2bfe3263964745bf1b32e3f3a9df22"; //用户中心appSecret
const uCenterBaseURL = "http://ucenter.fengdai.org/gateway/foundation-user";

/** =================获取用户信息============**/
export const getUserInfo = () => {
  return https.mijin.get("v1/user/info");
};

/**============首页--获取轮播图片= devoceType ,值为2时是pc端,值为4时是公众号,值为8时是app端=============**/
export const getSwipeImgList = () => {
  return https.common.get(`v1/h5/banner/home?deviceType=2`);
};

/** =====================注册加登录================== **/
// 登录
export const doLogin = (phone, phone_code) => {
  const formData = new FormData();
  formData.append("phone", phone);
  formData.append("phone_code", phone_code);
  return https.mijin.post("v1/user/_login", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

/** =====================短信登录================== **/
export const doMsgLogin = params => {
  return https.mijin.post(`v1/user/_login_code`, params);
};

/** ================获取公钥=================== */
export const getPubKey = () => {
  return https.mijin.get(`/v1/user/public_key`);
};

/** =====================密码登录================== **/
export const doPassLogin = params => {
  return https.mijin.post(`v1/user/_login_pwd`, params);
};

/** =====================注册================== **/
export const doRegister = params => {
  return https.mijin.post(`v1/user/_register`, params);
};

/** =====================忘记密码================== **/
export const doForget = params => {
  return https.mijin.put(`v1/user/_forget_pwd`, params);
};

/**=================发送验证码===============**/
export const sendCode = (phone, codeType) => {
  return https.mijin.post(
    `v1/user/_send_code?phone=${phone}&codeType=${codeType}`
  );
};

/**===============登出=================**/
export const logOut = () => {
  return https.mijin.post("v1/user/_logout");
};

/**================检查当前手机号是否可以修改的接口================**/
export const checkPhone = () => {
  return https.mijin.get("/v1/user/modify_phone/check");
};

/**==================更换手机号并新注册一个号码接口===================**/
export const changeANewPhone = params => {
  return https.mijin.post("/v1/user/modify_phone", params);
};

/**===========获取七牛云的token============**/
export const getQiniuToken = () => {
  return https.common.get("v1/qiniu/upToken");
};

/**===========获取七牛云的图片地址==========**/
export const getPicUrls = uris => {
  return https.common.post("v1/qiniu/urls", uris);
};

/**================获取枚举列表=================**/
export const getAllSysEnum = () => {
  return https.common.get("v1/enums/sys/all");
};

/**================根据参数获取获取枚举值=================**/
export const getSysEnum = (kind, group, enumKey, visible, binarySequence) => {
  return https.common.get("v1/enums/sys/list", {
    params: {
      kind,
      group,
      enumKey,
      visible,
      binarySequence
    }
  });
};

/**===============获取区域===============**/
export const getRegionEnum = (parentRegion, region) => {
  return https.common.get("v1/region", {
    params: {
      parentRegion,
      region
    }
  });
};
