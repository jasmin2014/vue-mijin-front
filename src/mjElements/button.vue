<template>
  <div class="mj-button" :class="{'orange': type === 'orange','blue': type === 'blue'}" :style="'width:'+width+'px;height:'+height+'px;line-height:'+height+'px;border-radius: '+(Number(height)/2).toString()+'px;'">{{text}}</div>
</template>

<script>
export default {
  name: 'MjButton',
  props: {
    text: String,
    width: String,
    height: String,
    type: String,
    size: String
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
 .mj-button {
   /*display: block;*/
   padding: 0 40px;
   -webkit-transition: .3s;
   transition: .3s;
   text-align: center;
   color: #fff;
   margin-left: auto;
   margin-right:auto;
 }
 .mj-button.orange {
   background-image: -moz-linear-gradient(left,#fe8c00, #fac61e);
   background-image: -o-linear-gradient(left,#fe8c00, #fac61e);
   background-image: -webkit-gradient(linear, right top, left top, from(#fe8c00), to(#fac61e));
   background-image: linear-gradient(to left, #fe8c00, #fac61e);
   filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#fe8c00',endColorStr='#fac61e',gradientType='0');
 }
 .mj-button.blue {
   background-image: -moz-linear-gradient(left,#0187ff, #34c3fa);
   background-image: -o-linear-gradient(left,#0187ff, #34c3fa);
   background-image: -webkit-gradient(linear, right top, left top, from(#0187ff), to(#34c3fa));
   background-image: linear-gradient(to left, #0187ff, #34c3fa);
   filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#0187ff',endColorStr='#34c3fa',gradientType='0');
 }
</style>
