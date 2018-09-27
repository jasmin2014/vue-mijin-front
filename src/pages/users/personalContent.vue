<template>
  <div class="content">
    <div class="main-content user-contract personal-contract">
      <h3>个人信息查询授权书</h3>
      <p>本人<span></span>(身份证号码：<span></span>)在此向杭州米今网络科技有限公司（“甲方”）不可撤销地同意和授权如下：</p>
      <p>1.	申请人同意甲方和征信机构采集其个人信息，并保证向甲方和征信机构提供的所有资料和信息是真实、完整、准确的；</p>
      <p>2.	申请人同意甲方基于审核本人申请材料真实性、评估本人信用、业务管理及风险控制之目的向征信机构查询本人的个人信息多次，授权期限为服务存续期（自授权之日起至甲方与申请人终止服务之日止）；</p>
      <p>3.	申请人同意并授权征信机构采集其个人信息，包括但不限于申请人的收入、存款、银行卡、有价证券、商业保险、不动产的信息和纳税数额信息；申请人了解征信机构采集该等信息可能导致征信机构了解其个人资产和负债状况、消费和支持类型和个人消费行为习惯等个人隐私信息及可能产生的其他不利后果，在此基础上申请人予以同意；</p>
      <p>4.	申请人同意将其个人信息提供给征信机构；</p>
      <p>5.	申请人同意甲方将申请人的个人不良信息提供给征信机构，申请人在此确认甲方已经履行事先告知信息主体本人的义务。申请人了解，不良信息是指对信息主体信用状况构成负面影响的下列信息：信息主体在借贷、赊购、担保、租赁、保险、使用信用卡等活动中未按照合同履行义务的信息，对信息主体的行政处罚信息，人民法院判决或裁定信息主体履行义务以及强制执行的信息，以及国务院征信业监督管理部门规定的其他不良信息；</p>
      <p>6.	就授权范围内申请人信息的采集、提供、传输、处理、披露，将不视为对申请人任何权利和利益的侵犯，申请人将不会追究甲方和征信机构的任何责任。</p>
      <p>申请人<span></span></p>
      <p>有效身份证号码<span></span></p>
      <p>授权日期<span></span></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'personalContentPage',
    data () {
      return {}
    },
    created(){
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.personal-contract {
  p {
    margin-top: 20px;
    span {
      display: inline-block;
      width: 120px;
      height: 40px;
      border-bottom: 1px solid #666;
      margin-bottom: -5px;
    }
  }
}
</style>
