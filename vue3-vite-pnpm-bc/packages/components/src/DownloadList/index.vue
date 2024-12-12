<template>
<el-config-provider namespace="mth-bus-com">
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
    <div>
        <el-button @click="deleteTaskAll">删除选中</el-button>
    </div>
    <div>
        <el-table
            ref="tableRefs"
            :data="state.results"
            style="width: 100%"
        >
            <el-table-column type="selection" width="40" />
            <el-table-column
                label="文件名"
                prop="fileName"
                width="180"
                show-overflow-tooltip
            />
            <el-table-column label="下载状态" min-width="180">
                <template #default="{ row }">
                    <el-progress
                        v-if="row.status === '1'"
                        :percentage="100"
                        status="success"
                    >
                        <span text>导出成功</span>
                    </el-progress>
                    <el-progress
                        v-if="row.status === '2'"
                        :percentage="40"
                        striped
                        striped-flow
                    >
                        <span text>导出中</span>
                    </el-progress>
                    <el-progress
                        v-if="row.status === '3'"
                        :percentage="100"
                        status="exception"
                    >
                        <span text>导出失败</span>
                    </el-progress>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="240">
                <template #default="{ row }">
                    <template v-if="row.status === '1'">
                        <el-button
                            link
                            size="small"
                            @click="downloadFile(row)"
                        >
                            下载表格
                        </el-button>
                        <el-button
                            link
                            size="small"
                            @click="sendEmail(row)"
                        >
                            发送邮件
                        </el-button>
                    </template>
                    <template v-if="row.status === '3'">
                        <el-button
                            link
                            size="small"
                            @click="retryDownloadTask(row)"
                        >
                            重试下载任务
                        </el-button>
                    </template>
                    <el-button
                        link
                        size="small"
                        style="color: #f56c6c"
                        @click="deleteTask(row)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="state.count"
            @current-change="currentChange"
        />
    </div>
</el-config-provider>

</template>
<script name='BcDownlaodList' setup>
import { onMounted, ref, reactive } from 'vue'
import api from '@/api'
import { ElMessage, ElMessageBox, ElTable, ElTableColumn } from 'element-plus'
import { removeURLParams } from '@/utils/tools'
// import { useRoute } from 'vue-router'
// const route = useRoute()

 const props = defineProps({
    userId: {
        type: String,
        default: ''
     },
     reqHeaders: Object || null || undefined,
     reqConfig: Object || null || undefined
})
const state = reactive({
    count: 0,
    results: [],
    page: 1,
    pageSize: 10,
    status: '',
    data: {}
})

const tableRefs = ref()

onMounted(() => {
    queryList()
})
const queryList = (status = '') => {
    api.queryDownloadTaskList({
        status: status === '0' ? '' : status,
        page: state.page,
        pageSize: state.pageSize,
        userId: props.userId
    }, props.reqHeaders, props.reqConfig).then((res) => {
        const { data } = res.result || {}
        state.count = data?.count || 0
        state.results = data?.results || []
        state.data = res.result
    })
}

const handleClick = (pane) => {
    console.log('Tab-000-点击:', state.status)
    console.log('Tab-pane-点击:', pane.paneName)
    state.page = 1
    state.status = pane.paneName
    queryList(pane.paneName)
}

const currentChange = (val) => {
    state.page = val
    queryList(state.status)
}

const downloadFile = ({ id, fileUrl }) => {
    // zeusClick(route.meta.allPathTitle + '_下载表格',{
    //     bizId: '下载表格',
    //     sceneType: fileName
    // })
    api.sendEmail({ id, emailType:'02' }, props.reqHeaders, props.reqConfig).then((res) => {
        if (res.code === '200000') {
            ElMessage.success('密码已发送到您的邮箱')
            window.open(removeURLParams(fileUrl))
        }
    })
}

//下载任务重试
const retryDownloadTask = ({ id }) => {
    api.retryDownloadTask({ id }, props.reqHeaders, props.reqConfig).then((res) => {
        if (res.code === '200000') {
            ElMessage.success('下载任务重试成功')
            handleClick()
        }
    })
    // zeusClick(route.meta.allPathTitle + '_下载任务重试',{
    //     bizId: '下载任务重试',
    //     sceneType: fileName
    // })
}

//发送邮件
const sendEmail = ({ id }) => {
    api.sendEmail({ id, emailType:'01' }, props.reqHeaders, props.reqConfig).then((res) => {
        if (res.code === '200000') {
            ElMessage.success('邮件发送成功')
        }
    })
    // zeusClick(route.meta.allPathTitle + '_发送邮件',{
    //     bizId: '发送邮件',
    //     sceneType: fileName
    // })
}

const deleteTaskAll = () => {
    const tasks = tableRefs.value?.getSelectionRows() || []
    if (tasks.length === 0) {
        ElMessage.warning('请选择需要删除的任务')
        return
    }

    ElMessageBox.confirm('是否需要删除所选下载任务?', '消息提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(() => {
            const deletePromises = tasks.map((item) =>
                api.deleteDownloadTask({ id: item.id }, props.reqHeaders, props.reqConfig)
            )

            Promise.all(deletePromises).finally(() => {
                handleClick()
            })
        })
        .catch(() => {})
}

//删除下载
const deleteTask = ({ id }) => {
    ElMessageBox.confirm('是否需要删除该下载任务?', '消息提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(() => {
            api.deleteDownloadTask({ id }, props.reqHeaders, props.reqConfig).then((res) => {
                if (res.code === '200000') {
                    ElMessage.success('删除成功')
                    handleClick()
                }
            })
        })
        .catch(() => {})
}

// defineExpose({ queryList })
</script>

<!-- <script name='BcDownlaodList' setup>
import { computed } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'default'
  }
})
const typeClass = computed(() => `button-${props.type}`)
</script> -->

<style lang="scss" scoped>

</style>
