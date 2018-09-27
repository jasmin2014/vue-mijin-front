<template>
  <el-select v-if="!readonly || disabled"
             v-model="currentValue"
             :disabled="disabled"
             :placeholder="placeholder"
             :clearable="clearable"
             @input="handleInput"
             @change="handleChange"
             @clear="handleClear"
             @visible-change="handleVisibleChange"
             @remove-tag="handleRemoveTag">
    <el-option v-for="option in currentOptions"
               :label="option.text"
               :value="option.value"
               :key="option.value"></el-option>
  </el-select>
  <el-input v-else-if="!text"
            v-model="displayValue"
            :class="readonly ? 'is-readonly' : ''"
            :readonly="readonly"></el-input>
  <span v-else>
    {{ displayValue }}
  </span>
</template>

<script>
  import * as api from '../api/common';

  const BOOLEAN_OPTIONS = [
    { text: '是', value: true },
    { text: '否', value: false }];

  export default {
    name: 'MjSelect',
    props: {
      value: [String, Number, Boolean],
      text: Boolean,
      type: {
        type: String, // enum, region, org, boolean
        default: 'enum'
      },
      kind: String,
      group: String,
      enumKey: String,
      visible: Number,
      sequence: Array,
      region: String,
      org: String,
      orgStatus: Number,
      options: Array,
      mode: String,
      disabled: Boolean,
      placeholder: String,
      clearable: Boolean,
      noGroup: Boolean
    },
    data() {
      return {
        currentValue: this.value,
        currentOptions: this.options || []
      }
    },
    computed: {
      readonly() {
        return this.mode === 'VIEW'
      },
      displayValue() {
        const result = this.currentOptions.filter(_ => _.value === this.currentValue);
        return result.length > 0 ? result[0].text : this.currentValue;
      }
    },
    watch: {
      value(val, oldValue) {
        this.setCurrentValue(val);
      },
      options(val, oldValue) {
        this.currentOptions = val;
      },
      currentOptions(val, oldVal) {
        if (JSON.stringify(oldVal) !== JSON.stringify(val)) {
          this.handleKvChange(this.currentValue);
        }
      },
      region(val, oldValue) {
        if (val) {
          this.getRegions(val);
        } else {
          this.currentOptions = [];
        }
        if (oldValue) {
          this.$emit('input', '')
        }
      },
      group(val, oldValue) {
        if (val) {
          this.getOptions(this.kind, val, this.enumKey, this.visible, this.sequence);
        } else {
          this.currentOptions = [];
        }
        if (oldValue) {
          this.$emit('input', '')
        }
      },
//      org(val, oldValue) {
//        if (val) {
//          this.getOrgList(val, this.orgStatus)
//        } else {
//          this.currentOptions = [];
//        }
//        if (oldValue) {
//          this.$emit('input', '')
//        }
//      }
    },
    created() {
      if (!this.options) {
        if (this.kind) {
          if (this.group || this.noGroup) {
            this.getOptions(this.kind, this.group, this.enumKey, this.visible, this.sequence)
          }
        } else if (this.region) {
          this.getRegions(this.region);
        }
        else if (this.type === 'boolean') {
          this.currentOptions = BOOLEAN_OPTIONS
        }
      }
    },
    methods: {
      setCurrentValue(value) {
        if (value !== this.currentValue) {
          this.currentValue = value;
          this.handleChange(value);
        }
        this.$emit('input', value);
      },
      handleInput(value) {
        this.setCurrentValue(value);
      },
      handleChange(value) {
        this.handleKvChange(value);
        this.$emit('change', value);
      },
      handleKvChange(value) {
        const kv = this.currentOptions.find(_ => _.value === value);
        this.$emit('kv-change', kv || {});
      },
      handleClear(value) {
        this.$emit('clear', value);
      },
      handleVisibleChange(value) {
        this.$emit('visible-change', value);
      },
      handleRemoveTag(value) {
        this.$emit('remove-tag', value);
      },
      getOptions(kind, group, enumKey, visible, sequence) {
        const enums = this.$store.state.enums;
        if (!sequence && enums && enums[`${kind}.${group}`]) {
          this.currentOptions = enums[`${kind}.${group}`];
          return;
        }
        const binarySequence = sequence ? this.$arrayToBinary(sequence) : null;
        api.getSysEnum(kind, group, enumKey, visible, binarySequence).then((response) => {
          const res = response.data;
          if (res.code === 200) {
            this.currentOptions = res.body.map(_ => ({text: _.displayName, value: _.enumKey}));
          }
        }, () => {})
      },
      getRegions(region) {
        const regions = this.$store.state.regions;
        if (regions[region]) {
          this.currentOptions = regions[region];
          return;
        }
        api.getRegionEnum(region).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.currentOptions = res.body.map(_ => ({text: _.name, value: _.region}));
            this.$store.commit('saveRegions', {
              code: region,
              list: this.$deepcopy(this.currentOptions)
            });
          }
        }, () => {})
      },
      /*getOrgList(orgType, statusEnable) {
        getOrgList(orgType, statusEnable).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.currentOptions = res.body.map(_ => ({text: _.name, value: _.partyId}))
          }
        }, () => {})
      }*/
    }
  }
</script>
