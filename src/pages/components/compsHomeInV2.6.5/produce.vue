<style lang="scss" scoped>
.produce {
  background: #fff;
  padding: 20px 0;
}

.produce-box {
  .produce-list {
    position: relative;
    display: flex;
    > span.home-pics {
      display: block;
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
  }
  .produce-inline {
    vertical-align: middle;
  }
  padding: 20px 0 15px 0;
  text-align: left;
  .produce-list-title {
    margin-top: 20px;
    font-size: 18px;
    color: #424242;
    font-weight: bold;
  }
  .produce-list-content {
    display: inline-block;
    font-size: 14px;
    color: #6d6c72;
  }
  .produce-list-icon {
    margin-top: 0px;
    vertical-align: middle;
  }
}
</style>

<template>
  <section class="produce">
    <div class="produce-box main-content">
      <ul class="flex">
        <li class="produce-list clear" v-for="(item,index) in produce" :key="index">
          <span
            class="home-pics"
            :alt="item.title"
            :style="{backgroundPosition: item.bgPositionX + ' ' + item.bgPositionY + '' }"
          ></span>
          <p class="produce-inline">
            <span class="produce-list-title">{{item.title}}</span>
            <br>
            <span class="produce-list-content">{{item.content}}</span>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      produce: [
        {
          title: "纯信用",
          content: "大数据授信，无抵押",
          bgPositionX: "-10px",
          bgPositionY: "-194px"
        },
        {
          title: "额度高",
          content: "最高可达100万",
          bgPositionX: "-73px",
          bgPositionY: "-194px"
        },
        {
          title: "放款快",
          content: "智能审核，极速放款",
          bgPositionX: "-138px",
          bgPositionY: "-194px"
        },
        {
          title: "利息低",
          content: "日息低至万分之2.7",
          bgPositionX: "-203px",
          bgPositionY: "-194px"
        }
      ]
    };
  }
};
</script>
