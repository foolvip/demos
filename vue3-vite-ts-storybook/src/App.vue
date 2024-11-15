<template>
  <div class="APP">
    <!-- <Button type="primary" size="large" label="测试" /> -->
    <el-button  type="primary" @click="download">下载数据</el-button>
    <el-button  type="primary" @click="openDrawer">下载管理</el-button>
    <el-drawer v-model="showDialog" title="数据导出中心" :size="700">
      <DownloadManage />
      <!-- <download-manage /> -->
    </el-drawer>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { bcAddDownload } from './utils'
// import HelloWorld from './components/HelloWorld.vue'
// import Button from './components/Button/Button.vue'
import DownloadManage from './components/DownloadManage/index.vue'
// const apps = import.meta.glob('./src/*/*.vue')
// console.log('apps----', apps);
const download = () => {
  bcAddDownload({
    "tableName":"dwd_insure_policy_ids_data",
    "projectCode":"CITY000037",
    "keyValueList":[{"fieldName":null,"fieldValue":null,"encryp":false},{"fieldName":"project_code","fieldValue":"CITY000037","encryp":false},{"fieldName":"insured_name","fieldValue":"","encryp":true},{"fieldName":"insured_id_num","fieldValue":"","encryp":true},{"fieldName":"insured_area_name","fieldValue":"","encryp":false},{"fieldName":"policy_holder_name","fieldValue":"","encryp":true},{"fieldName":"policy_holder_id_num","fieldValue":"","encryp":true},{"fieldName":"is_share_order","fieldValue":"","encryp":false},{"fieldName":"share_code","fieldValue":"","encryp":false},{"fieldName":"share_scene_name","fieldValue":"","encryp":false},{"fieldName":"order_no","fieldValue":"","encryp":false},{"fieldName":"policy_id","fieldValue":"","encryp":false},{"fieldName":"order_status","fieldValue":"","encryp":false},{"fieldName":"pay_method","fieldValue":"","encryp":false},{"fieldName":"product_code","fieldValue":"","encryp":false},{"fieldName":"policy_no","fieldValue":"","encryp":false},{"fieldName":"status","fieldValue":"","encryp":false},{"fieldName":"contract_status","fieldValue":"","encryp":false}],"betweenValueList":[],
    "fileName":"订单明细表_1731656590235"
  }, {
    'x-insure-oss-path': '/fxDetails/project',
    'x-insure-oss-route': 'fxDetails-project',
    'x-insure-oss-type': 'IC_ADMIN',
  })
}

const showDialog = ref(false)
const openDrawer = () => {
  showDialog.value = true
}


</script>
<style scoped>
.APP {
  display: flex;
  align-items: center;
}
</style>
