import http from './http'

export const bcAddDownload = (reqBodyData = {}, reqHeaders?: object, reqConfig?: object) => {
  http.post('/ic-api/api/v1/report/download/task/add', reqBodyData, reqHeaders, reqConfig)
}