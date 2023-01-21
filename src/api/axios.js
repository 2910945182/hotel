import axios from 'axios'
import { ElLoading } from 'element-plus'

axios.defaults.baseURL = 'http://127.0.0.1:5173'

// 请求拦截器
axios.interceptors.request.use((config) => {
    const loadingInstance = ElLoading.service({ fullscreen: true })
    nextTick(() => {
      	// Loading should be closed asynchronously
      	loadingInstance.close()
    })
   return config;
})

axios.interceptors.response.use((response)=>{
	loadingInstance.close();
    return response;
})



Vue.prototype.$http = axios

// export default axios
































