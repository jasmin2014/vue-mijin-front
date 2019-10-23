<template>
  <div class="top-banner">
    <el-carousel class="top-swipe-container" height="410px" v-if="imgList.length > 0">
      <el-carousel-item class="swipe-item" v-for="(item,index) in imgList" :key="index">
        <a target="_blank" v-if="item.bannerLink && item.bannerLink !=''" :href="item.bannerLink">
          <img :src="item.imageUrl" alt="米今商贷,日息最低万分之2.7,最高借100万">
        </a>
        <img v-else :src="item.imageUrl" alt="米今商贷,日息最低万分之2.7,最高借100万">
      </el-carousel-item>
      <!-- <el-carousel-item class="swipe-item first-item">
        <div>
          <img src="../../../assets/imgs/banner/banner-min01_01.jpg" alt="米今商贷,日息最低万分之2.7,最高借100万">
          <img src="../../../assets/imgs/banner/banner-min01_02.jpg" alt="米今商贷,日息最低万分之2.7,最高借100万">
        </div>
      </el-carousel-item>
      <el-carousel-item class="swipe-item second-item">
        <div>
          <a
            target="_blank"
            href="https://b.pingan.com.cn/station/activity/loan/g-newloan/loantrust.html?source=sa0001707&outerSource=mj000001&outerid=ou0001551&cid=mj000001"
          >
            <img src="../../../assets/imgs/banner/banner-min02_01.jpg" alt="米今.平安贷款,最高可带50万">
            <img src="../../../assets/imgs/banner/banner-min02_02.jpg" alt="米今.平安贷款,最高可带50万">
          </a>
        </div>
      </el-carousel-item>-->
    </el-carousel>
    <div class="swipe-item first-item" v-else>
      <div>
        <img src="../../../assets/imgs/banner/banner-min01_01.jpg" alt="米今商贷,日息最低万分之2.7,最高借100万">
        <img src="../../../assets/imgs/banner/banner-min01_02.jpg" alt="米今商贷,日息最低万分之2.7,最高借100万">
      </div>
    </div>
  </div>
</template>
<script>
import { getSwipeImgList } from "../../../api/common.js";
export default {
  data() {
    return {
      imgList: []
    };
  },
  created() {
    this.getSwipeImgList();
  },
  methods: {
    enter(index) {},
    getSwipeImgList() {
      getSwipeImgList(this.deviceType).then(response => {
        const res = response.data;
        console.log(res);
        if (res.code == 200) {
          this.imgList = res.body;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.top-banner {
  .swipe-item {
    width: 100%;
    height: 410px;
    > div {
      width: 1200px;
      margin: 0 auto;
    }
    img {
      width: 100%;
      display: block;
      margin: 0 auto;
    }
  }
  .first-item {
    background-color: #634dd4;
  }
  .top-swipe-container {
    width: 100%;
    height: 410px;
    position: relative;
    overflow: hidden;

    .second-item {
      background: url("../../../assets/imgs/banner/banner-min02_bg.jpg")
        no-repeat center center;
    }
  }
}
</style>
