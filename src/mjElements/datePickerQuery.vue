<template>
  <el-date-picker v-model="currentValue"
                  type="daterange"
                  :start-placeholder="startPlaceholder"
                  :end-placeholder="endPlaceholder"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                  :clearable="clearable"
                  unlink-panels
                  @input="handleInput"
                  @change="handleChange"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @pick="handlePick"
                  @dodestroy="handleDodestroy"></el-date-picker>
</template>

<script>
  export default {
    name: 'MjDatePickerQuery',
    props: {
      clearable: Boolean,
      value: {}
    },
    data() {
      return {
        currentValue: this.$deepcopy(this.value),
        startPlaceholder: '选择开始日期',
        endPlaceholder: '选择结束日期',
        pickerOptions: {
          disabledDate: (time) => {
            return time.getTime() > Date.now();
          }/*,
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }
          ]*/
        }
      }
    },
    watch: {
      'value'(val, oldValue) {
        this.setCurrentValue(val);
      }
    },
    methods: {
      setCurrentValue(value, oldValue) {
        if (JSON.stringify(value) === JSON.stringify(oldValue)) return;
        this.currentValue = this.$deepcopy(value);
        this.$emit('input', value);
      },
      handleInput(value) {
        this.setCurrentValue(value);
      },
      handleChange(value) {
        this.$emit('change', value);
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      handleBlur(event) {
        this.$emit('blur', event);
      },
      handlePick(event) {
        this.$emit('pick', event);
      },
      handleDodestroy(event) {
        this.$emit('dodestroy', event);
      }
    }
  }
</script>
