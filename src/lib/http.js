import axios from "axios";
import { Loading, MessageBox, Message, Notification } from "element-ui";
import Utils from "../lib/method";

function createHttpInstance(baseURL) {
  const http = axios.create({
    baseURL: "/api/" + baseURL,
    timeout: 60000
  });

  // http请求拦截器
  let loadingInstance;

  http.interceptors.request.use(
    config => {
      // element ui Loading方法
      if (!loadingInstance || !document.querySelector(".el-loading-mask")) {
        loadingInstance = window.loadingInstance = Loading.service({
          fullscreen: true,
          background: "rgba(255,255,255,.4)"
        });
      }
      if (
        Utils.$getLocalStorage("token") &&
        Utils.$getLocalStorage("token") !== ""
      ) {
        config.headers["Authorization"] = Utils.$getLocalStorage("token");
      }

      if (config.method === "get") {
        config.params = {
          _t: new Date().getTime(),
          ...config.params
        };
      }
      return config;
    },
    () => {
      setTimeout(() => {
        loadingInstance.close();
      });
      return Promise.reject();
    }
  );
  // http响应拦截器
  http.interceptors.response.use(
    data => {
      // 响应成功关闭loading
      setTimeout(() => {
        loadingInstance.close();
      });
      return data;
    },
    error => {
      setTimeout(() => {
        loadingInstance.close();
      });
      const response = error.response;
      if (response) {
        if (response.data instanceof Blob) {
          const fr = new FileReader();
          fr.onload = function() {
            if (typeof this.result === "string") {
              response.data = JSON.parse(this.result);
            }
            errorHandler(response);
          };
          fr.readAsText(response.data);
        } else {
          errorHandler(response);
        }
      }
      return Promise.reject(response);
    }
  );
  return http;
}

function errorHandler(response) {
  switch (response.status) {
    case 401:
      if (response.data.code === 4001022) {
        MessageBox.confirm(response.data.message, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("users");
          })
          .catch(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("users");
          });
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("users");
      }
      break;
    case 400:
      if (response.data && response.data.type === "object") {
        const message = [];
        for (const k in response.data.body) {
          message.push(`<p>${response.data.body[k]}</p>`);
        }
      }
      break;
    case 404:
      break;
    case 409:
      if (response.data && response.data.message) {
      }
      break;
    case 500:
      /*Notification.error({
        title: '错误',
        message: '服务器错误',
        offset: 80
      });*/
      break;
    default:
      if (response.data && response.data.message) {
        /*Message({
          message: response.data.message,
          type: 'error'
        });*/
      }
      break;
  }
}

export default {
  common: createHttpInstance("common/"),
  mijin: createHttpInstance("mijin/"),
  test: createHttpInstance("test/")
};
