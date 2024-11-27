<template>
  <div class="APP">
    <Button type="primary" size="large" label="测试" />
     <Header :user="{ name: 'zq'}"/>
    <el-button  type="primary" @click="download">下载数据</el-button>
    <el-button  type="primary" @click="openDrawer">下载管理</el-button>
    <el-drawer v-model="showDialog" title="数据导出中心" :size="700">
      <DownloadManage user-id="1964" />
      <!-- <download-manage /> -->
    </el-drawer>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { bcAddDownload } from './utils'
// import HelloWorld from './components/HelloWorld.vue'
import Button from './components/Button/Button.vue'
import Header from './components/Header/Header.vue'
import DownloadManage from './components/DownloadManage/index.vue'
// const apps = import.meta.glob('./src/*/*.vue')
// console.log('apps----', apps);
const download = () => {
  bcAddDownload({
    "dataExportReq":{
      "fileName":"文件名称"
    },
  
    "queryType": "core-test",
    "t": {
      "head": [["姓名"],["name"]]
    },
    "userId": "1964"
  }, {
    'authorization': '3e235d3585e24f6993ef47034a21f974',
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
