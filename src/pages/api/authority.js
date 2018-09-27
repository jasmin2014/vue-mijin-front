import https from '../../lib/http';

/**===========检测身份证是否已认证============**/
export const checkIdCardCredit = () => {
  return https.mijin.get('v1/ident/auth/check');
};

/**===========认证身份证号===================**/
export const identAuth = (params) => {
  return https.mijin.post('v1/ident/auth', params)
};

/**============运营商采集接口================**/
export const operatorAuth = (params) => {
  return https.mijin.post('v1/operator/auth', params)
};

/**============我的账户-运营商数据采集(认证)================**/
export const operatorCenterAuth = (params) => {
  return https.mijin.post('v1/operator/auth/center', params)
};



