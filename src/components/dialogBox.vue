<template>
  <div class="mj-message-box">
    <div class="mj-mask cursor" @click="handleClose"></div>
    <div class="message-inner" :style="'width:'+width+'px;margin-left:-'+(Number(width)/2).toString()+'px;'">
      <div class="message-close cursor" @click="handleClose"><i class="icon iconfont icon-guanbi"></i></div>
      <div class="message-content" v-if="isSuccess" :class="{'success': isSuccess}">
        <div class="pic"></div>
        <p class="tip-text">{{message || '网络异常，请重试'}}</p>
      </div>
      <div class="message-content" v-else :class="{'fail': !isSuccess}">
        <div class="pic"></div>
        <p class="tip-text">{{message || '网络异常，请重试'}}</p>
      </div>
      <div class="message-btns flex" v-if="doubleButton">
        <div class="message-btn-ok cursor" @click="handleOK">{{okButtonName}}</div>
        <div class="message-btn-cancel cursor" @click="handleClose">关闭</div>
      </div>
      <div class="message-btns" v-else-if="isDirect">
        <div class="message-btn-ok cursor" @click="handleOK">{{buttonName}}</div>
      </div>
      <div class="message-btns" v-else>
        <div class="message-btn-ok cursor" @click="handleClose">关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogSuccess',
  props: {
    width: {
      default: '300',
      type:String
    },
    height: {
      default: '240',
      type: String
    },
    okButtonName: {
      default: '确定',
      type: String
    },
    isSuccess: Boolean,
    message: String,
    doubleButton: {
      default: false,
      type: Boolean
    },
    isDirect: {
      default: false,
      type: Boolean
    },
    buttonName: {
      default: '确定',
      type: String
    }
  },
  methods: {
    handleClose(){
      this.$emit('close');
    },
    handleOK(val) {
      this.$emit('ok', val);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>

</style>
