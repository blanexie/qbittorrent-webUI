import axios from 'axios'
import {ElMessage} from 'element-plus'


const service = axios.create({
    //  baseURL: "http://192.168.1.6:8080",
    timeout: 5000,// request timeout
    // withCredentials:true
})


//请求拦截器
service.interceptors.request
    .use(config => {
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        //config.headers.cookie = localStorage.getItem("cookie")
        return config
    }, error => {
        return Promise.reject(error)
    })

//响应拦截器
service.interceptors.response
    .use(response => {
        if (response.status == 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    }, error => {
        console.log("接口报错", error)
        if (error?.response?.status == 403) {
            sessionStorage.removeItem("loginOk")
            location.reload()
        } else {
            ElMessage.error(`异常请求：${JSON.stringify(error.message)}`)
        }
    })

export {service as axios}

