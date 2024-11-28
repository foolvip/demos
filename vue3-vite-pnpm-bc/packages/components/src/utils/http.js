import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

// 创建axios实例
const axiosInstance = axios.create({
    // baseURL: '/insure-api/api/v1',
    timeout: import.meta.env.PROD ? 60000 : 50000, // 请求超时时间60秒
    headers: {
        'Content-Type': 'application/json'
    }
})

let requestNum = 0 // 当前正在执行的请求数
let loginMessageBoxIsShow = false

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    function (config) {
        // 如果是带http(s)开头的地址，不拼接统一的baseURL
        // if (/^http/.test(config.url)) {
        //     config.baseURL = ''
        // }

        requestNum++ // 请求数+1

        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    function (res) {
        requestNum-- // 请求数-1

        // 请求队列都已完成后，取消loading效果
        if (requestNum <= 0) {
            requestNum = 0

            // // 加个延迟关闭，避免页面闪烁太快，用户体验不好
            // timer = setTimeout(() => {
            //   store.commit('setLoading', false)
            // }, 200)
        }
        let _data = res.config && res.config.responseAllData ? res : res.data
        return Promise.resolve(_data)
    },
    function (error) {
        // 接口报错的话直接取消loading
        requestNum = 0

        // 对响应的错误加个type类型，下面捕获到这种类型的错误则判断非前端问题
        return Promise.reject({
            type: 'response',
            message: error
        })
    }
)

const ajax = (type, url, params, headers, config) => {
    let reqParams = {}
    // codeAllPass为true时，所有业务状态码都会resolve返回，以便处理特殊code状态
    let codeAllPass = (config && config.codeAllPass) || false

    switch (type) {
        case 'get':
        case 'delete':
        case 'head':
            reqParams = {
                params: {
                    // 't': new Date().getTime(), // 加上时间戳，防止有缓存
                    ...params
                }
            }
            break
        case 'post':
        case 'put':
        case 'patch':
            reqParams = { data: params }
            break
        default:
            throw new Error('Error request method type!')
    }

    return new Promise((resolve, reject) => {
        const axiosParams = {
            method: type,
            url,
            ...reqParams,
            ...config,
        }
        if (headers) {
            axiosParams.headers  = headers
        }
        console.log('axiosParams---', axiosParams)
        axiosInstance(axiosParams)
            .then((res) => {
                // 对响应数据做点什么
                if (
                    res.code === '000000' ||
                    res.code === '200000' ||
                    codeAllPass
                ) {
                    resolve(res)
                } else {
                    // 统一处理错误结果
                    if (res.code === '400401') {
                        // alert('未登录，请重新登录')
                        // location.href = `${
                        //     import.meta.env.VITE_UAA_LOGIN
                        // }?redirect=${encodeURIComponent(window.location.href)}`
                        if (!loginMessageBoxIsShow) {
                            loginMessageBoxIsShow = true
                            // 未登录
                            ElMessageBox.alert(
                                '未登录，请重新登录',
                                '温馨提示',
                                {
                                    confirmButtonText: '重新登录'
                                }
                            )
                                .then(() => {
                                    location.href = `${
                                        import.meta.env.VITE_UAA_LOGIN
                                    }?redirect=${encodeURIComponent(
                                        window.location.href
                                    )}`
                                })
                                .catch(() => {
                                    loginMessageBoxIsShow = false
                                    console.log('取消，不登录')
                                })
                        }
                    } else {
                        ElMessage.error(res.message)
                        // resolve(res)
                        reject(res)
                    }
                }
            })
            .catch((error) => {
                if (error.type === 'response') {
                    ElMessage.error('网络开小差')
                    console.error(error.message)
                } else {
                    console.error(error)
                }
            })
    })
}

export default {
    axios: axiosInstance,
    get: (url, params, headers, config) => ajax('get', url, params, headers, config),
    post: (url, params, headers, config) => ajax('post', url, params, headers, config),
    // put: (url, params, config) => ajax('put', url, params, config),
    // patch: (url, params, config) => ajax('patch', url, params, config)
    // delete: (url, params, config) => ajax('delete', url, params, config),
    // head: (url, params, config) => ajax('head', url, params, config),
}
