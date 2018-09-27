<template>
  <div class="content">
    <div class="top-banner-news">
      <mijin-header  :active-page="'NewsPage'"></mijin-header>
      <div class="main-content news-top">
        <h3>信息公告</h3>
        <p>不错过每一条信贷相关新闻</p>
      </div>
    </div>
    <div class="news-box">
      <div class="main-content news-content">
        <div class="crumbs"><router-link to="/">首页</router-link>-<router-link to="/news">信息公告</router-link></div>
        <div class="news-items" v-if="NewsList.length>0">
          <section class="flex">
            <div><img src="../assets/imgs/pic_01.jpg"  /> </div>
            <div class="news-item-right">
              <p class="title">关于近期口袋钱包用户遭遇假客服电话诈骗的公告</p>
              <p class="simple-content margin-top10">近期，蜂泰科技旗下口袋钱包平台接到投诉，用户在百度搜索“口袋钱包客服电话”，被不法分子冒充的电话，要求提前还款至私人账户，造成财产损失。再次，蜂泰科技郑重声明：目前口袋钱包仅支持登录口袋钱包APP线上还款。</p>
              <div class="news-bottom">
                <i class="icon iconfont icon-shijian"></i>2017-06-12 08:11:17  <i class="icon iconfont icon-eye"></i> <label>212</label>
              </div>
            </div>
            <router-link to="/news-detail/1">关于近期口袋钱包用户遭遇假客服电话诈骗的公告</router-link>
          </section>
          <section class="flex">
            <div><img src="../assets/imgs/pic_02.jpg"  /> </div>
            <div class="news-item-right">
              <p class="title">关于部分银行近期维护无法充值的通知</p>
              <p class="simple-content margin-top10">农业银行、邮政储蓄、华夏银行、招商银行和民生银行近期维护，以上银行卡暂不支持还款，系统已为您解除绑定。</p>
              <div class="news-bottom">
                <i class="icon iconfont icon-shijian"></i>2017-06-12 08:11:17  <i class="icon iconfont icon-eye"></i> <label>212</label>
              </div>
            </div>
            <router-link to="/news-detail/2">关于部分银行近期维护无法充值的通知</router-link>
          </section>
          <section class="flex">
            <div><img src="../assets/imgs/pic_03.jpg"  /> </div>
            <div class="news-item-right">
              <p class="title">浙江蜂泰科技有限公司（百科）</p>
              <p class="simple-content margin-top10">浙江蜂泰科技有限公司秉承着未用户和社会创造价值的出新，向广大消费者提供科技化的多元场景消费金融服务，从实用性消费品触发，延展到出行、教育、美容、旅游等多维度生活空间；已客户为中心，不断创建从线下到线上的产品服务场景。</p>
              <div class="news-bottom">
                <i class="icon iconfont icon-shijian"></i>2017-06-12 08:11:17  <i class="icon iconfont icon-eye"></i> <label>212</label>
              </div>
            </div>
            <router-link to="/news-detail/3">浙江蜂泰科技有限公司（百科）</router-link>
          </section>
          <section class="flex">
            <div><img src="../assets/imgs/pic_04.jpg"  /> </div>
            <div class="news-item-right">
              <p class="title">杭州蜂贷网络科技有限公司 关于拟变更公司名称、简称</p>
              <p class="simple-content margin-top10">为统一企业公司名称和渠道品牌名称，突出消费金融主业，进一步提高公司金融品牌知名度及美誉度，公司计划将“浙江蜂泰科技有限公司”这一名称作为公司新名称，对公司中文名称，英文名称及中英文简称等拟进行变更。</p>
              <div class="news-bottom">
                <i class="icon iconfont icon-shijian"></i>2017-06-12 08:11:17  <i class="icon iconfont icon-eye"></i> <label>212</label>
              </div>
            </div>
            <router-link to="/news-detail/4">杭州蜂贷网络科技有限公司 关于拟变更公司名称、简称</router-link>
          </section>
          <section class="flex">
            <div><img src="../assets/imgs/pic_05.jpg"  /> </div>
            <div class="news-item-right">
              <p class="title">关于04月03日平台维护升级业务暂停的通知</p>
              <p class="simple-content margin-top10">平台将于本周二（04月03日）18:00进行维护升级、恢复时间为当天（04月03日）24:00</p>
              <div class="news-bottom">
                <i class="icon iconfont icon-shijian"></i>2017-06-12 08:11:17  <i class="icon iconfont icon-eye"></i> <label>212</label>
              </div>
            </div>
            <router-link to="/news-detail/5">关于04月03日平台维护升级业务暂停的通知</router-link>
          </section>
          <section class="flex">
            <div><img src="../assets/imgs/pic_06.jpg"  /> </div>
            <div class="news-item-right">
              <p class="title">关于ios用户还款方式通知</p>
              <p class="simple-content margin-top10">由于近期版本更新新审核，已更新版本的ios用户还款暂时需要从“钱包-还款”进入还款页面操作还款，若没有更新版本则和之前还款流程一致，给您带来不便敬请谅解。</p>
              <div class="news-bottom">
                <i class="icon iconfont icon-shijian"></i>2017-06-12 08:11:17  <i class="icon iconfont icon-eye"></i> <label>212</label>
              </div>
            </div>
            <router-link to="/news-detail/6">关于04月03日平台维护升级业务暂停的通知</router-link>
          </section>
        </div>
        <div class="news-items" v-else><p>暂无公告</p></div>
      </div>
      <!--<div class="main-content news-paging">
        <ul class="clearfix">
          <li>上一页</li>
          <li class="active1"><span>1</span></li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>共4页</li>
          <li class="active0">下一页</li>
        </ul>
      </div>-->
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
  import MijinHeader from '../components/header.vue';
  import MijinFootter from '../components/footter.vue';
export default {
  name: 'NewsPage',
  components: {
    MijinHeader,
    MijinFootter
  },
  data () {
    return {
      NewsList: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
$font-size: 14px;
$font-tit: 22px;
$font-big-tit: 48px;
.top-banner-news {
  width: 100%;
  height: 430px;
  background: url("../assets/imgs/news_bj.png") no-repeat center top;
  .news-top {
    > * {
      color: #fff;
    }
    h3 {
      font-size: 36px;
      line-height: 50px;
      font-weight: normal;
      margin-top: 60px;
    }
    p {
      margin-top: 30px;
      font-size: 18px;
      letter-spacing: 3px;
    }
  }
}
.news-box {
  background: #eee;
  padding-bottom: 60px;
  .news-content {
    background: #fff;
    padding: 20px;
    .crumbs {
      a {
        font-size: 14px;
      }
    }
    >section {
      margin-top: 20px;
      border-bottom: 1px solid #ddd;
      padding: 10px 10px;
      position: relative;
      .news-item-right {
        width: 775px;
        margin-left: 30px;
        position: relative;
        .title {
          color: #fe8c00;
        }
        .simple-content {
          color: #999;
          font-size: 14px;
          line-height:26px;
        }
        .news-bottom {
          position: absolute;
          bottom: 15px;
          left: 0;
          color: #999;
          font-size: 14px;
          .icon-shijian {
            margin-right: 5px;
          }
          .icon-eye {
            margin-left: 20px;
            margin-right: 5px;
          }
        }
      }
      >a {
        text-indent: -9999999em;
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top:0;
      }
    }
    >section:hover {
      background: #eee;
    }
    .news-items {
      position: relative;
      min-height: 66vh;
      >p {
        position: absolute;
        top: 50%;
        left: 50%;
        line-height:40px;
        text-align: center;
        margin-top: -20px;
        margin-left: -58px;
        font-size: 180%;
      }
    }

  }

}


</style>
