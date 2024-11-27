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
                                type="text"
                                size="small"
                                @click="downloadFile(row)"
                            >
                                下载表格
                            </el-button>
                            <el-button
                                type="text"
                                size="small"
                                @click="sendEmail(row)"
                            >
                                发送邮件
                            </el-button>
                        </template>
                        <template v-if="row.status === '3'">
                            <el-button
                                type="text"
                                size="small"
                                @click="retryDownloadTask(row)"
                            >
                                重试下载任务
                            </el-button>
                        </template>
                        <el-button
                            type="text"
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
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import api from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { removeURLParams } from '@/utils/tools'
// import { useRoute } from 'vue-router'
// const route = useRoute()

interface DownloadManageProps {
    userId: string;
    reqParams?:{[propName: string]: any};
    reqHeaders?: {[propName: string]: any};
    config?: {[propName: string]: any};
}
const props = withDefaults(defineProps<DownloadManageProps>(), { 
    userId: '',
 });

const state = reactive({
    count: 0,
    results: [],
    page: 1,
    pageSize: 10,
    status: '',
    data: {} as any
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

const currentChange = (val: number) => {
    state.page = val
    queryList(state.status)
}

const downloadFile = ({ id, fileUrl }: any) => {
    // zeusClick(route.meta.allPathTitle + '_下载表格',{
    //     bizId: '下载表格',
    //     sceneType: fileName
    // })
    api.sendEmail({ id, emailType:'02' }).then((res: any) => {
        if (res.code === '200000') {
            ElMessage.success('密码已发送到您的邮箱')
            window.open(removeURLParams(fileUrl))
        }
    })
}

//下载任务重试
const retryDownloadTask = ({ id }: any) => {
    api.retryDownloadTask({ id }).then((res: any) => {
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
const sendEmail = ({ id }: any) => {
    api.sendEmail({ id, emailType:'01' }).then((res: any) => {
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
            const deletePromises = tasks.map((item: {[key: string]: any}) =>
                api.deleteDownloadTask({ id: item.id })
            )

            Promise.all(deletePromises).finally(() => {
                handleClick()
            })
        })
        .catch(() => {})
}

//删除下载
const deleteTask = ({ id }: {id: string}) => {
    ElMessageBox.confirm('是否需要删除该下载任务?', '消息提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(() => {
            api.deleteDownloadTask({ id }).then((res: any) => {
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

<style lang="less" scoped>

</style>
