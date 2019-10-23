export default {
  methods: {
    openTip(url) {
      this.$alert(
        "提示:您即将跳转至西安存管银行页面进行开户操作。西安银行控件支持的浏览器：IE8、9、10，谷歌50以下版本。",
        "提示",
        {
          confirmButtonText: "确定",
          callback: action => {
            window.open(url);
          }
        }
      );
      // this.$alert(
      //   "提示:您即将跳转至西安存管银行页面进行开户操作。西安银行控件支持的浏览器：IE8、9、10，谷歌50以下版本。",
      //   "提示",
      //   {
      //     confirmButtonText: "确定",
      //     type: "warning",
      //     closeOnClickModal: false,
      //     closeOnPressEscape: false
      //   }
      // ).then(() => {
      //   window.open(url);
      // });
    }
  }
};
