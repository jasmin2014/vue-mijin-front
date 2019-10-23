export default {
  data: function() {
    return {
      showAuthDialog: false,
      isSuccess: false,
      messageInfo: "",
      isDirect: false,
      btnName: ""
    };
  },
  created() {},
  methods: {
    showAlert(obj) {
      if (obj.type === "success") {
        this.isDirect = false;
        this.showAuthDialog = true;
        this.isSuccess = true;
        this.messageInfo = obj.msg;
        this.btnName = "确定";
      } else if (obj.type === "error") {
        this.isDirect = true;
        this.showAuthDialog = true;
        this.isSuccess = false;
        this.messageInfo = obj.msg;
        this.btnName = "关闭";
      } else if (obj.type === "close") {
        this.isDirect = false;
        this.showAuthDialog = false;
        this.isSuccess = false;
        this.messageInfo = "";
        this.btnName = "关闭";
      } else if (obj.type === "operate") {
        this.isDirect = true;
        this.showAuthDialog = true;
        this.isSuccess = true;
        this.messageInfo = obj.msg;
        this.btnName = "确定";
      }
    }
  }
};
