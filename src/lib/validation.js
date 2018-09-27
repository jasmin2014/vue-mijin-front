const phoneRegexp = /^1[34578]\d{9}$/;
// 银行卡
const card = /^\d{8,28}$/;

// 身份证号 18位
const ident18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

//身份证号 15 或 18 位
const ident = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

//身份证号15位
const ident15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;

// 手机号码
const mobile = /^((13[0-9])|(14[5-9])|(15[0-3,5-9])|(17[0-8])|(18[0-9])|19[8,9])\d{8}$/;
// 组织机构代码
const orgNo = /^[A-Za-z0-9]{8}-\d$/;
// 公积金账号
const pfAccount = /^\d{9,20}$/;
// 邮编
const postCode = /^\d{6}$/;
// 注册号
const regNo = /^\d{15}$/;
// 电话号码
const telephone = /^0\d{2,3}-\d{7,8}(-\d{1,4})?$/;
// 手机或电话
const telOrMobile = new RegExp(`^(${telephone.toString().slice(2, -2)})|(${mobile.toString().slice(2, -2)})$`);
// 社会信用代码
const usciCode = /^[A-Za-z0-9]{18}$/;
// 网址
const webSite = /^(http|https|ftp):\/\/[\w\-]+(\.[\w\-]+)+([\w\-:.,@?^=&%!#/~\\+]*[\w\-@?^=&%!#/~\\+])$/;

//正数
const integer = /^\d+(\.\d{1,2})?$/;

//正整数
const RegInt = /^[1-9]\d*$/;

/**
 * 校验浮点数精度
 * @param {Number} num
 * @param {Number} precise
 */
//校验特殊字符
  const errorChar = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
const floatValidator = function (num, precise) {
  if (typeof num !== 'number') return false;
  const splits = String(num).split('.');
  return !splits[1] || splits[1].length <= precise;
};

export default {
  phoneRegexp,
  card,
  ident18,
  ident,
  ident15,
  mobile,
  orgNo,
  pfAccount,
  postCode,
  regNo,
  telephone,
  telOrMobile,
  usciCode,
  webSite,
  floatValidator,
  errorChar,
  integer,
  RegInt
}
