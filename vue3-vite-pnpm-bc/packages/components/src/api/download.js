import http from '@/utils/http'

export default {
    //查询下载任务列表
    queryDownloadTaskList: (params, reqHeaders, reqConfig) =>
        http.post('/insure-api/api/v1/report/download/task/list', params, reqHeaders, reqConfig),
    //下载任务添加
    addDownloadTask: (params, reqHeaders, reqConfig) =>
        http.post('/insure-api/api/v1/report/download/task/add', params, reqHeaders, reqConfig),
    //删除下载任务
    deleteDownloadTask: (params, reqHeaders, reqConfig) => 
        http.get('/insure-api/api/v1/report/download/task/delete', params, reqHeaders, reqConfig),
    //发送邮件
    sendEmail: (params, reqHeaders, reqConfig) =>
        http.get('/insure-api/api/v1/report/download/task/sendEmail', params, reqHeaders, reqConfig),
    //重试下载任务
    retryDownloadTask: (params, reqHeaders, reqConfig) =>
        http.get('/insure-api/api/v1/report/download/task/retry', params, reqHeaders, reqConfig),
}
