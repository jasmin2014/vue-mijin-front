<!-- 担保资料上传 -->
<template>
  <div class="content">
    <mijin-header :is-white="true" :active-page="'usersAccountPage'"></mijin-header>
    <div class="users-content">
      <div class="main-content users-inner flex-start">
        <div class="main-left">
          <mijin-left-menu :page-name="'usersGuaranteesPage'"></mijin-left-menu>
        </div>
        <div class="main-right">
          <section class="asset-mr02 no-top-margin myloan-rig-inner">
            <div class="search-tabs-header flex">
              <div class="cursor" :class="{'search-tab-active':activeItem==='first'}" @click="activeItem='first';">担保记录</div>
              <div class="cursor" :class="{'search-tab-active':activeItem==='second'}" @click="activeItem='second'">担保的借款记录</div>
            </div>
            <div class="amr02-seach-inner">
              <div class="search-tabs-content">
                <div class="search-tabs-item" v-if="activeItem==='first'">
                  <el-table
                    :data="guaranteeDatas"
                    border>
                    <el-table-column
                      prop="applicationId"
                      label="担保编号"
                      align="center"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="partyName"
                      label="借款人"
                      align="center"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="partyMobile"
                      align="center"
                      label="手机号">
                    </el-table-column>
                    <el-table-column
                      prop="creditAmount"
                      align="center"
                      label="担保金额(元)">
                    </el-table-column>
                    <el-table-column
                      prop="createdTime"
                      align="center"
                      label="生成时间">
                    </el-table-column>
                    <el-table-column
                      prop="status"
                      align="center"
                      :formatter="(row, col, val) => (this.$filter(val, this.$enum.GUARANTEE_STATUS, this.$enum.GUARANTEE_GROUP))"
                      label="状态">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      width="200"
                      label="操作">
                      <template slot-scope="scope">
                        <div class="operate" v-if="scope.row.status === $enum.AUTH_BE_CERTIFIED"><span @click="handleGoAuth(scope.row)">去认证</span></div>
                        <div class="operate" v-else-if="scope.row.status === $enum.AUTH_TO_INFORMATION"><span @click="handleFillInfo(scope.row)">填写资料</span></div>
                        <!--<div class="operate" v-else-if="scope.row.status === $enum.AUTH_FAIL"><span>查看原因</span></div>-->
                        <div class="operate" v-else-if="scope.row.status === $enum.AUTH_BE_SIGN">
                          <span @click="handlePreview(scope.row)">签约</span>
                          <span @click="handleRefuseSigning(scope.row)">拒绝签约</span>
                        </div>
                        <div class="operate" v-else-if="scope.row.status === $enum.AUTH_UPDATE" @click="handleEdit(scope.row)"><span>修改</span></div>
                        <div class="operate" v-else-if="scope.row.status === $enum.AUTH_SIGNED">
                          <a :href="scope.row.guaranteeProtocolUrl" target="_blank">合同</a>
                        </div>
                        <span v-else></span>
                        <!--<div class="operate"><span @click="handleFillInfo(scope.row)">填写资料</span></div>-->
                        <!--<div class="operate"><span @click="handleGoAuth(scope.row)">去认证</span></div>-->
                        <!--<div class="operate" @click="handleEdit(scope.row)"><span>修改</span></div>-->
                      </template>
                    </el-table-column>
                  </el-table>
                  <section class="mj-pagination">
                    <el-pagination layout="prev,pager, next,jumper" :total="guaranteesTotal" :current-page="search.pageNumber" :page-size="search.pageSize"
                                   @current-change="handleChangeGuaranteesPage"></el-pagination>
                  </section>
                </div>
                <div class="search-tabs-item"  v-else-if="activeItem==='second'">
                  <el-row>
                    <el-table :data="guaranteeLoanDatas" class='table-center' border tooltip-effect="dark">
                      <el-table-column prop="loanName" label="借款名称"></el-table-column>
                      <el-table-column prop="partyName" label="借款人"></el-table-column>
                      <el-table-column prop="partyMobile" label="手机号"></el-table-column>
                      <el-table-column prop="paymentAmount" label="借款金额(元)"></el-table-column>
                      <el-table-column prop="repayTerms" label="借款期限（月）"></el-table-column>
                      <el-table-column prop="repayWay" label="还款方式" :formatter="(row, col, val) => (this.$filter(val, this.$enum.REPAY_WAY, this.$enum.REPAY_WAY))"></el-table-column>
                      <el-table-column prop="status" label="还款状态" :formatter="(row, col, val) => (this.$filter(val, this.$enum.LOAN_STATUS, this.$enum.LOAN_GROUP))"></el-table-column>
                      <el-table-column prop="applicationId" label="担保编号"></el-table-column>
                      <el-table-column prop="applicationTime" label="借款申请时间"></el-table-column>
                    </el-table>
                    <section class="mj-pagination">
                      <el-pagination layout="prev,pager, next,jumper" :total="guaranteesLoanTotal" :current-page="search.pageNumber" :page-size="search.pageSize"
                                     @current-change="getGuaranteeLoanList"></el-pagination>
                    </section>
                  </el-row>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
    <mijin-footter></mijin-footter>
    <mijin-dialog v-show="showRefuseSignDialog" :is-success="isRefuseSuccess" :message="refuseMessageInfo" :double-button="doubleButton" :ok-button-name="okButtonName" @ok="handleSuccessRedirect" @close="handleCloseRefuseDialog"></mijin-dialog>
    <!--签约合同-->
    <el-dialog title="签约合同" top="0vh" :visible.sync="guaranteeDialog" lock-scroll class="guarantee-dialog" @close="handleCloseRefuseDialog" :close-on-click-modal="false">
      <div class="dialog-img-box">
        <img :src="guaranteeUrl" alt="签约合同" width="100%">
      </div>
      <div class="dialog-guarantee-btn">
        <el-button v-if="this.dialogType === this.$enum.LOAN_BE_SIGN" type="warning" round plain class="guarantee-btn" @click="handleGuarantee">签约</el-button>
      </div>
      <!--身份验证-->
      <el-dialog width="500px" title="身份认证" :visible.sync="validateDialog" @close="closeValidateDialog" :close-on-click-modal="false" append-to-body center>
        <div class="validate-box clearfix">
          <p>手机号码：</p> {{guaranteeMobile}}
        </div>
        <div class="validate-box flex">
          <p>短信验证码: </p>
          <el-input style="width:150px;" placeholder="请输入验证码" v-model="guaranteeMessageCode" clearable></el-input>
          <div class="mr-code-get cursor" :class="{'disabled-code' : disabledCode}" @click="handleCode">{{ btnCountDown}}</div>
        </div>
        <p class="validateCode" v-if="this.validateCode==true">请输入验证码</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitGuaranteeValidate" :disabled="disabledOperate">提交</el-button>
          <el-button @click="closeValidateDialog" :disabled="disabledOperate">取消</el-button>
        </span>  
      </el-dialog>  
    </el-dialog>
  </div>
</template>

<script>
  import MijinHeader from '../../../components/header.vue';
  import MijinFootter from '../../../components/footter.vue';
  import MijinLeftMenu from '../components/userLeft.vue';
  import MijinDialog from '../../../components/dialogBox.vue';
  import * as api from '../../api/users';
  export default {
    name: 'usersGuaranteesPage',
    components: {
      MijinHeader,
      MijinFootter,
      MijinLeftMenu,
      MijinDialog
    },
    data () {
      return {
        activeItem:'first',
        showRefuseSignDialog: false,
        isRefuseSuccess: false,
        refuseMessageInfo: '',
        doubleButton: false,
        okButtonName: '确定',
        dialogType:'',
        currentAppItem: {
          applicationId:'',
          status: ''
        },
        submitInfo: {
          reports: []
        },
        search: {
          pageNumber: 1,
          pageSize: 10
        },
        guaranteesTotal: 0,
        guaranteeDatas: [],
        guaranteeLoanDatas: [],
        guaranteesLoanTotal: 0,
        guaranteeRow:'',
        guaranteeDialog:false,
        guaranteeBtn:false,
        guaranteeUrl:'',
        codeInterval:null,
        validateDialog:false,
        disabledCode:false,
        validateCode:false,
        btnCountDown:'获取短信验证码',
        guaranteeMobile:JSON.parse(this.$getLocalStorage('loginInfo')).nickName,
        guaranteeMessageCode:'',
        currentAppItem:{},
        disabledOperate:false,
      }
    },
    created(){
      this.getGuaranteeRecordList(1);
      this.getGuaranteeLoanList(1);
    },
    methods: {
      handlePreview(row){
        const _params = {
          applicationId: row.applicationId,
          status: row.status
        };
        api.getGuaranteeContractPreview(_params).then(res => {
          if (res.status === 200) {
            let data = res.data;
            this.guaranteeRow = row
            this.dialogType = row.status
            this.guaranteeDialog=true
            this.guaranteeUrl=this.$createObjectURL(data);
          }
        })
      },
      handleCode(){
        if(this.disabledCode==true){
          return false;
        }
        this.disabledCode=true
        const applicationId={'applicationId':this.currentAppItem.applicationId}
        api.getGuaranteeMessageCode(applicationId).then((res)=>{
          if(res.data.code === 200){
            this.countDown(60);
          }
        }, res => {
          this.disabledCode = true;
          this.btnCountDown = '稍后再试';
          setTimeout(() => {
            this.disabledCode = false;
            this.btnCountDown = '获取短信验证码';
          },30000)
        })
      },

      countDown(sec) {
        if (sec >= 0) {
          this.disabledCode = true;
          this.btnCountDown = `剩余${sec}s`;
          this.codeInterval=setTimeout(() => {
            this.countDown(--sec);
          }, 1000)
        } else {
          this.disabledCode = false;
          this.btnCountDown = '获取短信验证码';
          this.codeInterval=null
        }
      },
      
      submitGuaranteeValidate(){
        if(this.guaranteeMessageCode==''){
          this.validateCode=true
        }else{
          api.ValidateGuaranteeMessageCode(this.guaranteeMessageCode).then((res)=>{
            if(res.data.code === 200){
              this.putGuaranteeApplication();
            }
          }, res => {
            this.$notify.error({
              title: '错误',
              message: '验证码错误，请重新填写验证码'
            });
          })
        }
      },
      closeValidateDialog(){
        this.validateDialog=false
        this.disabledCode=false
        this.validateCode=false
        this.disabledOperate=false
        this.guaranteeMessageCode=''
        window.clearTimeout(this.codeInterval)
        this.codeInterval=null
        this.btnCountDown = '获取短信验证码'
      },
      handleGoAuth(row){
        this.$router.push({name:'creditAuthority',query:{applicationId:row.applicationId,pageFrom:'usersGuaranteesPage',operateType:'AccountAuthority'}})
      },
      handleChangeGuaranteesPage(value){
        this.getGuaranteeRecordList(value)
      },
      getGuaranteeRecordList(index){
        const _search = this.$deepcopy(this.search);
        _search.pageNumber = index;
        api.getGuaranteeRecordList(_search).then(res => {
          if(res.data.code === 200) {
            this.guaranteeDatas = res.data.body.list ? res.data.body.list : [];
            this.guaranteesTotal = res.data.body.totalRecord;
            this.search.pageNumber = res.data.body.pageNumber;
          }
        })
      },
      getGuaranteeLoanList(index){
        const _search = this.$deepcopy(this.search);
        _search.pageNumber = index;
        api.getGuaranteeLoanList(_search).then(res => {
          if(res.data.code === 200) {
            this.guaranteeLoanDatas = res.data.body.list ? res.data.body.list : [];
            this.guaranteesLoanTotal = res.data.body.totalRecord;
            this.search.pageNumber = res.data.body.pageNumber;
          }
        })
      },
      handleGoIdentity(){
        this.$router.push({name:'creditAuthority'});
      },
      handleFillInfo(row){
        this.$router.push({name:'usersFillInfoPage',params:{applicationId:row.applicationId}});
      },
      handleEdit(row){
        this.$router.push({name:'creditAuthority',query:{applicationId:row.applicationId,pageFrom:'usersGuaranteesPage',operateType:'Edit'}})
      },
      handleGuarantee(){
        this.validateDialog=true
        this.dialogType = this.$enum.AUTH_BE_SIGN;
        this.currentAppItem = {
          applicationId: this.guaranteeRow.applicationId,
          status: this.guaranteeRow.status
        }
      },
      guaranteeUrlEmpty(){
        this.guaranteeUrl=''
      },
      putGuaranteeApplication(){
        this.disabledOperate=true
        api.putGuaranteeApplication(this.currentAppItem).then(res => {
          if(res.data.code === 200){
            this.$notify({
              title: '成功',
              message: '签约成功',
              type:'success'
            });
            this.getGuaranteeRecordList(1);
            this.handleCloseRefuseDialog();
          }else{
            this.disabledOperate=false
            this.doubleButton = false;
            this.disabledCode=false
            this.btnCountDown='获取短信验证码';
            this.showRefuseSignDialog = true;
            this.isRefuseSuccess = false;
            this.codeInterval=null;
            this.refuseMessageInfo = '签约失败，稍后再试';
          }
        },response => {
          if(response.data.body) {
            let _msg = '';
            for (const key in response.data.body) {
              _msg +=  response.data.body[key] + ';  '
            }
            this.refuseMessageInfo = _msg;
          }else{
            this.refuseMessageInfo = response.data.message ? response.data.message : '签约失败，稍后再试';
            this.disabledOperate=false
          }
          this.doubleButton = false;
          this.showRefuseSignDialog = true;
          this.isRefuseSuccess = false;
        })
      },
      handleRefuseSigning(row){
        this.dialogType = this.$enum.AUTH_REFUSE;
        this.refuseMessageInfo = '拒签是不可恢复操作，是否继续？';
        this.doubleButton = true;
        this.showRefuseSignDialog = true;
        this.isRefuseSuccess = false;
        this.currentAppItem = {
          applicationId: row.applicationId,
          status: row.status
        }
      },
      putCancelSigning(){
        api.putCancelSigning(this.currentAppItem).then(res => {
          if(res.data.code===200){
            this.getGuaranteeRecordList(1);
            this.handleCloseRefuseDialog();
          }else{
            this.showRefuseSignDialog = true;
            this.isRefuseSuccess = false;
            this.doubleButton = false;
            this.refuseMessageInfo = res.data.message ?  res.data.message : '操作失败，稍后再试';
          }
        },response => {
          if(response.data.body) {
            let _msg = '';
            for(const key in response.data.body[key]) {
              _msg += response.data.body[key] + ';  '
            }
            this.refuseMessageInfo = _msg;
          }else{
            this.refuseMessageInfo = response.data.message ? response.data.message: '拒绝签约失败,请稍后再试!';
          }
          this.showRefuseSignDialog = false;
          this.isRefuseSuccess = false;
        })
      },
      handleSuccessRedirect(){
        if(this.dialogType === 'BE_SIGN') {
          this.putGuaranteeApplication();
        }else if (this.dialogType === 'REFUSE') {
          this.putCancelSigning();
        }
      },
      handleCloseRefuseDialog(){
        this.showRefuseSignDialog = false;
        this.isRefuseSuccess = false;
        this.refuseMessageInfo = '';
        this.doubleButton = false;
        this.closeValidateDialog();
        this.guaranteeRow='';
        this.guaranteeDialog=false;
        this.guaranteeBtn=false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" socped>
.search-tabs-item .el-table .descending .sort-caret.descending {
   border-top-color: #ff8b01;
  }
 .search-tabs-item .el-table .ascending .sort-caret.ascending {
   border-bottom-color: #ff8b01;
 }
 .signature .mj-message-box {
   z-index: 3300;
 }
 .guarantee-dialog{
    height:90%;
    margin-top:3%;
    text-align:center;
    overflow:hidden;
    .el-dialog{
      height:100%;
      .dialog-img-box{
        height:650px;
        width:100%;
        overflow-y:auto;
      }
      .dialog-guarantee-btn{
        width: 100%;
        background: #fff;
        position: absolute;
        bottom: 0px;
        left: 0px;
        padding-bottom:15px;
        .guarantee-btn {
          margin:10px auto 0 auto;
          font-size:16px;
          width:120px;
        }
      }
    }  
 }
 .validate-box{
    width:90%;
    margin:0 auto;
    font-size:16px;
    p{
      display:inline-block;
      height:45px;
      line-height: 45px;
      width:100px;
      margin:0 10px 10px 0;
      text-align: right;
    }
    .mr-code-get{
      border: none;
      width: 120px;
      height:40px;
      line-height:40px;
      background: #fe8c00;
      border-radius:4px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      display: inline-block;
    }
    .mr-code-get.disabled-code{
      color:#fff;
      background:#ddd;
    }
 }
.validateCode{
  font-size:12px;
  color:#ff8b01;
  text-align: center;
  margin:10px auto 0 auto;
}
</style>
