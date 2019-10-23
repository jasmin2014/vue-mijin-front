"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"testing"',
  DCP_URL: '"testcollect.fengdai.org"',
  CHAT_URL: '"https://testhwjr.commonservice.cn:50131/"'
});
