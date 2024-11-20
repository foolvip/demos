import api from '@/api'

export const bcAddDownload = (reqBodyData = {}, reqHeaders?: object, reqConfig?: object) => {
  api.addDownloadTask(reqBodyData,reqHeaders, reqConfig).then((res) => {
  console.log('res---addDownloadTask---', res)
})
}