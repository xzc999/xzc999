import axios from "axios"
import { ElMessage } from "element-plus"
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
request.interceptors.request.use((config) => {
  return config
})
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let msg = ""
    let status = error.response.status
    switch (status) {
      case 401:
        msg = "token过期"
        break
      case 403:
        msg = "无权访问"
        break
      case 404:
        msg = "请求地址错误"
        break
      case 500:
        msg = "服务器出现问题"
        break
      default:
        msg = "找不到网络"
    }
    ElMessage({
      type: "error",
      message: msg,
    })
    return Promise.reject(error)
  },
)
export default request
