import axios from 'axios'
import {useAuthStore, useTransferInfoStore} from '@/stores/pinia'
import {ElMessage} from 'element-plus'

const useTransferInfo = useTransferInfoStore()
const useAuth = useAuthStore()

const service = axios.create({
    baseURL: "/api",
    timeout: 30000,// request timeout
    // withCredentials:true
})


//请求拦截器
service.interceptors.request.use(
    config => {
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);


        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        alert(`异常请求：${JSON.stringify(error.message)}`)
    }
);


const Authentication = {
    login: (username: string, password: string) => {
        service.get('/api/v2/auth/login?username=' + username + '&password=' + password)
            .then(resp => {
                useAuth.setCookie(resp.data)
            })
            .catch(error => {
                ElMessage.error('登录失败.' + error)
            })
    },
    logout: () => {
        service.get('/api/v2/auth/logout')
            .then(resp => {
                console.log(resp.data)
                useAuth.setCookie('')
            })
            .catch(error => {
                ElMessage.error('退出失败. ' + error)
            })
    }
}

const Application = {
    version: () => {
        return service.get('/api/v2/app/version')
    },
    webapiVersion: () => {
        return service.get('/api/v2/app/webapiVersion')
    },
    buildInfo: () => {
        return service.get('/api/v2/app/buildInfo')
    },
    shutdown: () => {
        return service.get('/api/v2/app/shutdown')
    },
    preferences: () => {
        return service.get('/api/v2/app/preferences')
    },
}

const TransferInfo = {
    info: () => {
        service.get("/api/v2/transfer/info")
            .then(resp => {
                const data = resp.data
                useTransferInfo.refresh(data)
            })
            .catch(error => {
                ElMessage.error(' 获取全局速度异常.' + error)
            })
    }
}


export {Authentication, Application, TransferInfo}

