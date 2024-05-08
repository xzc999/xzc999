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
        msg = "token����"
        break
      case 403:
        msg = "��Ȩ����"
        break
      case 404:
        msg = "�����ַ����"
        break
      case 500:
        msg = "��������������"
        break
      default:
        msg = "������"
    }
    ElMessage({
      type: "error",
      message: msg,
    })
    return Promise.reject(error)
  },
)
export default request
