<!-- 上传人行征信报告 -->
<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'usersAccountPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersGuaranteesPage'"></mijin-left-menu>
        </div>
        <div class="main-right mr-guarantees-fillinfo">
          <h3><span style="color: red;">*</span>添加人行征信报告</h3>
          <el-form ref="fillInfocationForm" :model="submitInfo">
            <el-form-item>
              <mj-upload :class="{'isBlock': this.reports.length > 1,'isPosition': this.isPosition}" v-model="submitInfo.reports"   :limit="5" :max-size="'10M'" :placeholder="placeholderMsg" @success="handleUploadSuccess" @remove="handleReportsRemove"></mj-upload>
              <p class="pic-error-msg" v-if="ReportsNull"> {{ReportsErrorMsg}} </p>
            </el-form-item>
            <div class="btn-guarantees-submit">
              <div class="mj-button orange step-btn-next cursor" @click="handleSubmitInfo">提交</div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
  import MijinHeader from '../../../components/header.vue';
  import MijinFootter from '../../../components/footter.vue';
  import MijinLeftMenu from '../components/userLeft.vue';
  import * as api from '../../api/users';
  import * as commonApi from '../../../api/common'
  export default {
    name: 'usersFillInfoPage',
    components: {
      MijinHeader,
      MijinFootter,
      MijinLeftMenu
    },
    data () {
      return {
        submitInfo: {
          reports: []
        },
        applicationId: this.$route.params.applicationId,
        placeholderMsg: '支持png、jpg、pdf和 jpeg 格式，单张大小不超过10M,最多上传5张',
        reports: [],
        ReportsNull: false,
        ReportsErrorMsg: ''
      }
    },
    created(){
    },
    methods: {
      validateReports(){
        if(this.reports.length < 1) {
          this.ReportsNull = true;
          this.ReportsErrorMsg = '请上传人行征信报告！';
        }else{
          this.ReportsNull = false;
          this.ReportsErrorMsg = '';
        }
      },
      handleUploadSuccess(file){
        file.kind = this.$enum.BANK_CREDIT_REPORT;
        this.reports.push(file);
        if(this.reports.length % 2 === 1){
          setTimeout(() => {
            this.isPosition = true;
          },200)
        }else{
          setTimeout(() => {
            this.isPosition = false;
          },200)
        }
        this.validateReports();
      },
      handleReportsRemove(file,fileList){
        const fileName = file.raw.name.split('.');
        const suffix = fileName.length > 1 ? fileName[fileName.length - 1] : '';
        const _keys = [];
        let _item = {};
        this.reports = [];
        fileList.forEach(item => {
          _keys.push(item.response.key);
          _item = {
            key: item.response.key,
            name: item.name,
            type: suffix.toLowerCase(),
            kind: this.$enum.BANK_CREDIT_REPORT
          };
          this.reports.push(_item);
        });
        commonApi.getPicUrls(_keys).then(res => {
          if(res.data.code === 200 && res.data.body.length > 0) {
            res.data.body.forEach((item,i) => {
              this.reports[i].fileUri = item;
            });
          }
        });
        if(this.reports.length % 2 === 1){
          setTimeout(() => {
            this.isPosition = true;
          },200)
        }else{
          setTimeout(() => {
            this.isPosition = false;
          },200)
        }
        this.validateReports();
      },
      handleSubmitInfo(){
        if(this.applicationId && this.applicationId !== ''){
          if(this.reports.length > 0) {
            this.ReportsNull = false;
            this.ReportsErrorMsg = '';
            api.postUserInfo(this.$route.params.applicationId,this.reports).then(res => {
              if(res.data.code === 200) {
                this.$router.push({name:'usersGuaranteesPage'});
              }
            })
          }else{
            this.ReportsNull = true;
            this.ReportsErrorMsg = '请上传人行征信报告！';
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.mr-guarantees-fillinfo {
  background: #fff;
  padding: 0 20px 20px 20px;
  .btn-guarantees-submit {
    text-align: center;
    height:40px;
    line-height: 40px;

    .mj-button {
      display: inline-block;
      border-radius: 20px;
    }
  }
}
  .pic-error-msg {
    color: red;
    line-height: 30px;
  }
.credit-reports {
  .mj-upload.isBlock {
    .el-upload-list--picture-card {
      display: block;
      width: 907px;
      zoom: 1;
      .el-upload-list__item {
        display: block;
        float: left;
      }
    }
    .el-upload-list--picture-card:after {
      content:"";
      display: block;
      clear:both;
    }
  }
  .mj-upload.isPosition {
    .upload {
      width: 908px;
      position: relative;
      .el-upload--picture-card {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
    }
  }
}
</style>
