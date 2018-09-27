import axios from 'axios';
import https from '../lib/http';

// const http = axios.create({
//   baseURL: '/api/mijin/',
//   timeout: 30000
// });

const appId = "uc432aeff9af92169b"; //用户中心appId
const appSecret = "34195e9f779942d6aada211e98bf8de3"; //用户中心appSecret
const uCenterBaseURL = "http://uat-ucenter.tairancloud.com/gateway/foundation-user";


// export const saveToken = (token) => {
//   return http.get('v1/user/status',{
//     headers: {
//       Authorization:token
//     }
//   })
// };

/** =================获取用户信息============**/
export const getUserInfo = () => {
  return https.mijin.get('v1/user/info')
};


/** =====================登录================== **/
// 登录
export const doLogin = (phone, phone_code) => {
  const formData = new FormData();
  formData.append('phone', phone);
  formData.append('phone_code', phone_code);
  return https.mijin.post ('v1/user/_login',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  // return http.post(`${uCenterBaseURL}/login/quick_login_register`, {
  //   appId,
  //   phone,
  //   phoneCode
  // })
};
/**=================发送验证码===============**/
// 发送激活/重置手机验证码
export const sendCode = (phone) => {
  const formData = new FormData();
  formData.append('phone', phone);
  return https.mijin.post('v1/user/login_send_code', formData)
};

/**===============登出=================**/
export const logOut = () => {
  return https.mijin.post ('v1/user/_logout')
}


/**===========获取七牛云的token============**/
export const getQiniuToken = () => {
  return https.common.get('v1/qiniu/upToken');
};

/**===========获取七牛云的图片地址==========**/
export const getPicUrls = (uris) => {
  return https.common.post('v1/qiniu/urls',uris)
}

/**================获取枚举列表=================**/
export const getAllSysEnum = () => {
  return https.common.get('v1/enums/sys/all')
};

/**================根据参数获取获取枚举值=================**/
export const getSysEnum = (kind, group, enumKey, visible, binarySequence) => {
  return https.common.get('v1/enums/sys/list', {
    params: {
      kind,
      group,
      enumKey,
      visible,
      binarySequence
    }
  })
};

/**===============获取区域===============**/
export const getRegionEnum = (parentRegion,region) => {
  return https.common.get('v1/region', {
    params: {
      parentRegion,
      region
    }
  })
};



