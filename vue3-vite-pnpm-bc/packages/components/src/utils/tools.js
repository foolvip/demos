import api from '@/api'

export const bcAddDownload = (reqBodyData, reqHeaders, reqConfig) => {
  api.addDownloadTask(reqBodyData, reqHeaders, reqConfig)
}

export function removeURLParams(_url) {
  return _url.replace(/\?.*$/, '');
}