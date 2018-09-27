<template>
  <div class="content">
    <mijin-header :is-white="true"></mijin-header>
    <div class="news-detail">
      <div class="main-content news-box">
        <section>
          <h2>信用有什么用？</h2>
          <div class="news-bottom">
            <i class="icon iconfont icon-shijian"></i>2017-06-12 08:11:17  <i class="icon iconfont icon-eye"></i> <label>212</label>
          </div>
        </section>
        <div class="pic-news"><img src="../assets/imgs/pic_news.jpg" /> </div>
        <div class="news-content">
          <p>互联网经济时代，人们逐渐发现，网上的一次不经意的“失信”，有可能让自己失去一些别人拥有的方便，严重的时候甚至遭遇意想不到的麻烦，信用评分已经成为许多领域的“通关密码”。比如，互联网第三方征信平台与共享单车合作，在用户个人信用值达到某一标准时，就可以通过信用授权免押金使用服务。再如，不少从事租房业务的营运商，都与第三方征信平台合作，退出享受押金见面、租金月付等优惠。</p>
          <p>互联网第三方征信市场在国内的发展壮大有其内在逻辑。如今，互联网金融在中国的普及迅速提升，在全球名列前茅。前不久，咨询机构毕马威发布的一份报告显示：全球66%的受访者表示愿意使用移动钱包业务，而在中国，这个比例高达84%。有专家预测，不超过10年，中国就将迎来“无现金时代”。互联网金融的迅速普及在方便人们生活的同事，也为第三方征信市场带来了可靠、全面的数据衣服，这是其蓬勃发展的基础。</p>
          <p>如今，基于海量互联网交易信息而产生的第三方征信市场已经获得广泛应用。借助于大数据、云计算等技术，大型互联网金融平台可以较为客观的呈现个人信用状况，并可以与商户合作，在 融资祖灵、酒店、租房、出行、婚恋、公共事业服务等多个场景下为用户、商户提供西永服务。</p>
          <p>当然，信用体系能再多大范围内构件、完善，取决于交易关系形成过程中的信息对称程度。个人征信市场的发展首先要解决的还是信息共享问题。</p>
          <p>口袋钱包，作为信用钱包，无时无刻不在关注信用问题，以信用为依托，将信用最大化，您将拥有一个良好的信用评级。</p>
          <p>在“无现今时代”到来之际，如何管理好自己的信用，让自己的信用更有价值，这是许多网民需要了解的命题。</p>
        </div>
      </div>
      <div class="main-content news-paging">
        <ul class="clearfix">
          <li><router-link to="/">公司首页</router-link></li>
          <li>上一篇</li>
          <li class="active0">下一篇</li>
        </ul>
      </div>
    </div>
    <mijin-footter></mijin-footter>
  </div>
</template>

<script>
  import MijinHeader from '../components/header.vue';
  import MijinFootter from '../components/footter.vue';
export default {
  name: 'NewsDetailPage',
  components: {
    MijinHeader,
    MijinFootter
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
$font-size: 14px;
$font-tit: 22px;
$font-big-tit: 48px;
.news-detail {
  background: #eee;
  padding: 30px 0 60px 0;
  .news-box {
    background: #fff;
    padding: 40px 40px 80px 40px;
    >section {
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 1px solid #ddd;
      h2 {
        font-size: 30px;
        font-weight:normal;
        letter-spacing: 3px;
      }
      .news-bottom {
        color: #999;
        font-size: 14px;
        margin-top: 20px;
        .icon-shijian {
          margin-right: 5px;
        }
        .icon-eye {
          margin-left: 20px;
          margin-right: 5px;
        }
      }
    }
    .pic-news {
      width: 850px;
      margin: 40px auto;
    }
    .news-content {
      p {
        line-height: 30px;
        text-indent: 2em;
        color: #333;
        margin-top: 30px;
      }
      p:first-child {
        margin-top: 0;
      }
    }
  }
}


</style>
