<template>
  <div>
    <el-tabs v-model="state.status" @tab-click="handleClick">
            <el-tab-pane
                :label="`全部（${state.data.sum || 0}）`"
                name=""
            ></el-tab-pane>
            <el-tab-pane
                :label="`成功（${state.data.sucCount || 0}）`"
                name="1"
            ></el-tab-pane>
            <el-tab-pane
                :label="`导出中（${state.data.processingCount || 0}）`"
                name="2"
            ></el-tab-pane>
            <el-tab-pane
                :label="`导出失败（${state.data.failCount || 0}）`"
                name="3"
            ></el-tab-pane>
        </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import api from '@/api'

interface DownloadManageProps {
    userId: string;
    reqParams?:{[propName: string]: any};
    reqHeaders?: {[propName: string]: any};
    config?: {[propName: string]: any};
}

const props = defineProps<DownloadManageProps>()
  const state = reactive({
    count: 0,
    results: [],
    page: 1,
    pageSize: 10,
    status: '',
    data: {} as any
})


onMounted(() => {
    queryList()
})

const queryList = (status = '') => {
    api.queryDownloadTaskList({
        status: status === '0' ? '' : status,
        page: state.page,
        pageSize: state.pageSize,
        userId: props.userId
    }).then((res: any) => {
        const { data } = res.result || {}
        state.count = data?.count || 0
        state.results = data?.results || []
        state.data = res.result
    })
}
const handleClick = () => {
    state.page = 1
    queryList(state.status)
}
</script>