<template>
  <div>
    <el-button type="primary" @click="add">添加下载数据</el-button>
    <BcDownlaodList user-id="1964" :req-headers="{ authorization: 'da51682e6a434b39bba59211a090a40a' }"/>
    <!-- <s-button @click="onClick" type="primary">button</s-button>
    <s-input v-model="value">
      <template #prepend>Http://</template>
    </s-input> -->
  </div>
</template>

<script setup>
import { BcDownlaodList, bcAddDownload } from 'busi-coms-vue3-pnpm';
// import { ref } from 'vue'
// const value = ref('')
// const onClick = () => {
//   console.log('click')
// }
const add = () => {
    bcAddDownload(
        {
            dataExportReq: {
                fileName: '文件名称'
            },

            queryType: 'core-test',
            t: {
                head: [['姓名', 'name']]
            },
            userId: '1964'
        },
        {
            authorization: localStorage.getItem('uaatoken')
        }
    )
}
</script>
