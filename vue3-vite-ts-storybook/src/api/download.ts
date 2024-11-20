import http from '../utils/http'

export default {
    //下载或发送邮件
    operateDataList: (params, config?) =>
        http.post('/ic-api/api/v1/report/data/export', params, config),
    //查询下载任务列表
    queryDownloadTaskList: (params, reqHeaders?) =>
        http.post('/insure-api/api/v1/report/download/task/list', params, reqHeaders),
    //下载任务添加
    addDownloadTask: (params, reqHeaders?) =>
        http.post('/insure-api/api/v1/report/download/task/add', params, reqHeaders),
    //删除下载任务
    deleteDownloadTask: (params, reqHeaders?) => {
        console.log('deleteDownloadTask-----', params, reqHeaders)
        http.get('/insure-api/api/v1/report/download/task/delete', params, reqHeaders)
    },
    //发送邮件
    sendEmail: (params, config?) =>
        http.get(
            '/insure-api/api/v1/report/download/task/sendEmail',
            params,
            config
        ),
    //重试下载任务
    retryDownloadTask: (params, config?) =>
        http.get('/insure-api/api/v1/report/download/task/retry', params, config),
}
