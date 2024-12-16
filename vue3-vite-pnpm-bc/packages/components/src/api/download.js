import http from '@/utils/http'

export default {
    //下载任务添加
    addDownloadTask: (params, reqHeaders, reqConfig = {}) =>{
        const { baseUrl, ...others } = reqConfig
        return http.post(baseUrl + '/api/v1/common/export/download/task/add', params, reqHeaders, others)
    },
    //查询下载任务列表
    queryDownloadTaskList: (params, reqData, reqHeaders, reqConfig = {}) => {
        const { baseUrl, ...others } = reqConfig
        return http.post(baseUrl + '/api/v1/common/export/download/task/list', {...params, ...reqData }, reqHeaders, others)
    },
    //删除下载任务
    deleteDownloadTask: (params, reqData, reqHeaders, reqConfig = {}) => {
        const { baseUrl, ...others } = reqConfig
        return http.get(baseUrl + '/api/v1/common/export/download/task/delete',  {...params, ...reqData }, reqHeaders, others)
    },
    //发送邮件
    sendEmail: (params, reqData, reqHeaders, reqConfig = {}) => {
        const { baseUrl, ...others } = reqConfig
        return http.get(baseUrl + '/api/v1/common/export/download/task/sendEmail',  {...params, ...reqData }, reqHeaders, others)
    },
    //重试下载任务
    retryDownloadTask: (params, reqData, reqHeaders, reqConfig = {}) => {
        const { baseUrl, ...others } = reqConfig
        return http.get(baseUrl + '/api/v1/common/export/download/task/retry',  {...params, ...reqData }, reqHeaders, others)
    },
}
