<template>
  <div class="mj-upload">
    <label v-if="uploadTitle && uploadTitle !== ''">{{uploadTitle}}</label>
    <el-upload
      v-if="mode === 'VIEW' && currentValue && currentValue.length"
      ref="upload"
      class="upload-view"
      :action="''"
      :file-list="fileList"
      :show-file-list="true"
      :auto-upload="false"
      :list-type="listType"
      :on-preview="handlePreview"
      :disabled="true"
    ></el-upload>
    <div v-else-if="mode === 'VIEW'" class="upload no-pic">
      <div class="text">无{{ text }}</div>
    </div>
    <el-upload
      v-else
      ref="upload"
      :class="customClass"
      :action="action"
      :file-list="fileList"
      :limit="limit"
      :accept="accept"
      :data="postData"
      :show-file-list="true"
      :list-type="listType"
      :before-upload="handleBeforeUpload"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-change="handleChange"
      :on-preview="handlePreview"
    >
      <template>
        <div class="text">
          <i class="icon iconfont icon-tianjia"></i>
          <span class="text-upload">添加</span>
          <div class="el-upload__text">
            <i v-if="required" class="required"></i>
            {{ text }}
          </div>
          <div class="el-upload__placeholder">{{ placeholder }}</div>
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script>
import * as api from "../api/common";
let _http = window.location.href.split(":")[0];
export default {
  name: "mjUpload",
  props: {
    uploadTitle: String,
    mode: String,
    value: [String, Array],
    kind: String,
    text: String,
    accept: {
      type: String
    },
    listType: {
      type: String,
      default: "picture-card"
    },
    action: {
      type: String,
      default:
        _http && _http === "https"
          ? "https://up.qbox.me"
          : "http://upload.qiniu.com/"
    },
    limit: {
      type: Number,
      default: Infinity
    },
    placeholder: String,
    noDelete: Boolean,
    required: Boolean,
    maxSize: String
  },
  data() {
    return {
      currentValue: this.$deepcopy(this.value),
      fileList: [],
      hideUploadButtonClass: "upload-view",
      defaultClass: "upload",
      postData: {
        token: ""
      },
      size: this.value ? this.value.length : 0
    };
  },
  computed: {
    customClass() {
      let ret =
        this.size >= this.limit
          ? this.hideUploadButtonClass
          : this.defaultClass;
      if (this.noDelete) {
        ret += " no-delete";
      }
      return ret;
    }
  },
  watch: {
    value: "setCurrentValue"
  },
  methods: {
    setCurrentValue(val, oldVal) {
      if (JSON.stringify(val) === JSON.stringify(this.currentValue)) return;
      this.currentValue = this.$deepcopy(val);
      if (this.currentValue.length) {
        this.fileList = this.$deepcopy(this.currentValue);
      } else {
        this.fileList = [];
        if (this.$refs.upload) {
          this.$refs.upload.uploadFiles = [];
        }
      }
      this.fileList.forEach((file, i) => {
        // 遍历获取url
        if (this.$isUrl(file.url)) {
          if (file.name) {
            const fileName = file.name.split(".");
            const suffix =
              fileName.length > 1
                ? fileName[fileName.length - 1]
                : file.type
                ? file.type
                : "pdf";
            if (suffix == "pdf") {
              file.fileUri = file.url;
              file.url = require("../assets/imgs/pdf.png");
            }
          }
        } else {
          const urls = [file.url];
          this.getPicUrls(urls).then(({ data }) => {
            if (file.name) {
              const fileName = file.name.split(".");
              const suffix =
                fileName.length > 1
                  ? fileName[fileName.length - 1]
                  : file.type
                  ? file.type
                  : "pdf";
              if (suffix == "pdf") {
                file.fileUri = data.body[0];
                file.url = require("../assets/imgs/pdf.png");
              } else {
                file.url = data.body[0];
              }
            }
          });
        }
      });
      this.size = val.length;
    },
    handlePreview(file) {
      const fileList = this.$refs.upload.uploadFiles;
      const index = fileList.map(_ => _.uid).indexOf(file.uid);
      this.$preview(fileList, index);
    },
    handleRemove(file, fileList) {
      this.size = fileList.length;
      this.$emit("remove", file, fileList);
    },
    handleChange(file, fileList) {
      this.size = fileList.length;
    },
    handleSuccess(response, file, fileList) {
      let _keys = [];
      const fileName = file.raw.name.split(".");
      const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : "";
      let values = {
        key: response.key,
        type: suffix.toLowerCase(),
        name: file.raw.name
      };
      if (suffix == "pdf") {
        file.url = require("../assets/imgs/pdf.png");
        values.url = file.url;
      }
      _keys.push(response.key);
      this.getPicUrls(_keys).then(({ data }) => {
        values.fileUri = data.body[0];
        file.fileUri = values.fileUri;
        this.$emit("success", values);
      });
    },
    handleError(response, file, fileList) {
      const status = response.status;
      if (status === 400) {
        this.$message.error("无上传凭证，请重试");
        api.getQiniuToken().then(
          res => {
            if (res.data.code === 200) {
              this.$store.commit("saveQiniuToken", res.data.body);
            }
          },
          () => {}
        );
      } else if (status === 401) {
        this.$message.error("上传凭证过期，请重试");
        api.getQiniuToken().then(
          res => {
            if (res.data.code === 200) {
              this.$store.commit("saveQiniuToken", res.data.body);
            }
          },
          () => {}
        );
      }
      this.$emit("error", response);
    },
    handleBeforeUpload(file) {
      const isIMG = /^image\/(png)|(jpeg)|(jpg)|(pdf)/i.test(file.type);
      if (!isIMG) {
        this.$message.error("支持png/pdf/jpg和jpeg格式");
      }
      if (!this.$store.state.qiniu) {
        api.getQiniuToken().then(
          res => {
            if (res.data.code === 200) {
              this.$store.commit("saveQiniuToken", res.data.body);
              this.postData.token = res.data.body;
            }
          },
          () => {}
        );
      } else {
        this.postData.token = this.$store.state.qiniu;
      }

      if (this.maxSize === "10M") {
        const isLt5M = file.size / 1024 / 1024 < 10;
        if (!isLt5M) {
          this.$message.error("上传图片大小不能超过10MB");
        }
        if (isIMG && isLt5M) {
          this.$emit("start");
        }
        return isIMG && isLt5M;
      } else if (this.maxSize === "200K") {
        const isLt200K = file.size / 1024 < 200;
        if (!isLt200K) {
          this.$message.error("上传图片大小不能超过200K");
        }
        if (isIMG && isLt200K) {
          this.$emit("start");
        }
        return isIMG && isLt200K;
      }
    },
    getPicUrls(urls) {
      return api.getPicUrls(urls);
    }
  }
};
</script>

<style lang="scss">
.mj-upload {
  > label {
    line-height: 30px;
    font-size: 14px;
    padding-left: 10px;
  }
  .upload-view {
    .el-upload-list--picture-card {
      // width: 1000px;
      display: inline-block;
      .el-upload-list__item {
        width: 324px;
        height: 220px;
      }
    }
    .el-upload--picture-card {
      width: 324px;
      height: 220px;
    }
  }
}

.text {
  box-sizing: border-box;
  padding-top: 20%;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 30px;
  text-align: center;
  background: #eee;
  i {
    font-size: 32px;
  }
  .text-upload {
    display: block;
    margin-top: -10px;
  }
  .el-upload__placeholder {
    font-size: 14px;
    line-height: 20px;
    width: 80%;
    margin: 30px auto 0 auto;
  }
}
.upload {
  margin-right: 8px;
  margin-bottom: 8px;
  &.no-pic {
    border: 1px dashed #c0ccda;
    width: 324px;
    height: 220px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 324px;
    height: 220px;
  }

  .el-upload--picture-card {
    width: 324px;
    height: 220px;
    background: #eee;
    .text {
      i {
        font-size: 32px;
      }
    }
    .text-upload {
      display: block;
      margin-top: -10px;
    }
  }
}
.el-form-item .el-form-item__content .mj-upload .el-upload-list--picture-card {
  width: auto;
  height: auto;
}
</style>
