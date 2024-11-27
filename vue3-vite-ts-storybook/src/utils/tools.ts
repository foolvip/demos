import api from '@/api'

export const bcAddDownload = (reqBodyData = {}, reqHeaders?: object, reqConfig?: object) => {
  api.addDownloadTask(reqBodyData, reqHeaders, reqConfig)
}

export function removeURLParams(_url: string) {
  return _url.replace(/\?.*$/, '');
}