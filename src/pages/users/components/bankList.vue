<template>
  <div class="users-message-confirm bank-items" v-show="showConfirmDialog">
    <div class="mask" @click="handleClosed"></div>
    <section class="confirm-content banks-box">
      <header>
        <p>支持银行列表</p>
      </header>
      <div class="confirm-banks">
        <el-table :data="bankTable" style="width: 100%">
          <el-table-column prop="bankName" label="银行" width="180">
            <template slot-scope="scope">
              <img class="banks-icon" :src="scope.row.appLogo" alt="银行">
              <span class="banks-name">{{scope.row.bankName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="卡类型" width="">
          </el-table-column>
          <el-table-column prop="singleLimit" label="单笔限额" width="">
          </el-table-column>
          <el-table-column prop="dayLimit" label="每日限额" width="">
          </el-table-column>
        </el-table>
      </div>
      <div class="confirm-btn">
        <div class="mj-button orange step-btn-next cursor" @click="handleClosed">关闭</div>
      </div>
    </section>
  </div>
</template>

<script>
import { getBankList, getBankLogo } from "../../api/account.js";
export default {
  props: {
    showbanklist: Boolean
  },
  data() {
    return {
      bankTable: [],
      showConfirmDialog: false
    };
  },
  watch: {
    showbanklist: function(val, oldVal) {
      this.showConfirmDialog = val;
    }
  },
  created() {
    this.getBankList();
    this.showConfirmDialog = this.showbanklist;
  },
  methods: {
    getBankList() {
      getBankList().then(response => {
        if (response.data.code == 200 && response.data.body.length) {
          this.bankTable = [];
          response.data.body.forEach(item => {
            item.type = "储蓄卡";
            this.getBankLogo(item);
          });
        }
      });
    },
    getBankLogo(item) {
      getBankLogo(item.bankCode).then(response => {
        if (response.data.code == 200) {
          let _item = {};
          _item = {
            bankName: item.bankName,
            appLogo: response.data.body.appLogo,
            type: item.type,
            dayLimit: item.dayLimit,
            singleLimit: item.singleLimit
          };
          this.bankTable.push(_item);
        }
      });
    },
    handleClosed() {
      this.$emit("close");
    }
  }
};
</script>

