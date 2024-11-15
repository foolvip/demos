import http from '../utils/http'

export default {
    //下载或发送邮件
    operateDataList: (params, config?) =>
        http.post('/ic-api/api/v1/report/data/export', params, config),
    //查询下载任务列表
    queryDownloadTaskList: (params, config?) =>
        http.post('/ic-api/api/v1/report/download/task/list', params, config),
    //下载任务添加
    addDownloadTask: (params, config?) =>
        http.post('/ic-api/api/v1/report/download/task/add', params, config),
    //删除下载任务
    deleteDownloadTask: (params, config?) =>
        http.get('/ic-api/api/v1/report/download/task/delete', params, config),
    //发送邮件
    sendEmail: (params, config?) =>
        http.get(
            '/ic-api/api/v1/report/download/task/sendEmail',
            params,
            config
        ),
    //重试下载任务
    retryDownloadTask: (params, config?) =>
        http.get('/ic-api/api/v1/report/download/task/retry', params, config),
}
