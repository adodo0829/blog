import axios from 'axios'
import { Message } from 'element-ui'
import baseUrl from './envConfig'
import { getCookie } from '@/utils/cookies'
import errorHandle from './errorHandle'

const notNeedTokenApi = ['/app/tutuLogin', '/app/quit', '/app/ladpLogin']

const service = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    let url = config.url || ''
    let isNoTokenUrl = notNeedTokenApi.some(item => url.includes(item))
    if (getCookie('token') && !isNoTokenUrl) {
      config.headers['X-Access-Token'] = getCookie('token')
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // console.log(response)
    const res = response.data
    const status = response.status
    const statusCode = response.data.status.code
    const message = response.data.status.message
    // http 自带的 status
    if (status === 200) {
      // 200 表示返回正常
      // 至于其他错误异常, 通过 data 中的 status code 来判断
      if (statusCode !== 0) {
        Message({
          message: message || 'Error',
          type: 'error',
          duration: 3 * 1000
        })
        if (statusCode === 50001) {
          // 50001: token 失效
          errorHandle.handle50001()
        }
      }

      return res
    } else {
      Message({
        message: message || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(message || 'Error'))
    }
  },
  (error) => {
    // console.log(error.response)
    // 请求配置发生的错误
    if (!error.response) {
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
    } else {
      Message({
        message: (error.response.data && error.response.data.status.message) || `${error.response.status} ${error.response.statusText}`,
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
