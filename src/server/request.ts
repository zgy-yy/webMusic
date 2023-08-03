import Http from './http'
import {storeToRefs} from "pinia";
//http://123.207.32.32:9002/
const baseUrl: string = '/music'
const timeout = 8000
//


const request = new Http({
  baseURL: baseUrl,
  timeout: timeout,
  interceptors: {
    requestInterceptor: (config) => {
      // const token = localCache.getCache('token')
      // if (token && config.headers) {
      //     config.headers.Authorization = `Bearer ${token}`
      // }
      // isLoading.value = true
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      // isLoading.value = false
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default request
