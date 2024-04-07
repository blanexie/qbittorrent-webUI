import axios from 'axios'
import {ElMessage} from 'element-plus'


const service = axios.create({
    baseURL: "http://localhost:8080",
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
        ElMessage.error(`异常请求：${JSON.stringify(error.message)}`)
    }
);


const Authentication = (useAuth: any) => {

    const login = (username: string, password: string) => {
      return   service.get('/api/v2/auth/login?username=' + username + '&password=' + password)
    }

    const logout = () => {
        service.get('/api/v2/auth/logout')
            .then(resp => {
                console.log(resp.data)
                useAuth.setCookie('')
            })
            .catch(error => {
                ElMessage.error('退出失败. ' + error)
            })
    }

    return {login, logout}
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

const TransferInfo = (useTransferInfo: any) => {
    /**
     * 获取全局速度等信息
     */
    const info = () => {
        service.get("/api/v2/transfer/info")
            .then(resp => {
                useTransferInfo.refresh(resp.data)
            })
            .catch(error => {
                ElMessage.error(' 获取全局速度异常.' + error)
            })
    }
    /**
     *  获取全局速度限制状态
     */
    const speedLimitsMode = () => {
        service.get("/api/v2/transfer/speedLimitsMode")
            .then(resp => {
                const enable = resp.data
                useTransferInfo.setSpeedLimitsMode(enable)
            })
            .catch(error => {
                ElMessage.error(' 请求异常.' + error)
            })
    }

    /**
     * toggleSpeedLimitsMode
     * 全局速度限制开启的 开关， 点击一下就是切换状态
     */
    const toggleSpeedLimitsMode = () => {
        service.get("/api/v2/transfer/toggleSpeedLimitsMode")
            .then(resp => {
                if (useTransferInfo.infoState.speedLimitsMode) {
                    useTransferInfo.setSpeedLimitsMode(0)
                } else {
                    useTransferInfo.setSpeedLimitsMode(1)
                }
            })
            .catch(error => {
                ElMessage.error(' 请求异常.' + error)
            })
    }
    const getDownloadLimit = () => {
        service.get("/api/v2/transfer/downloadLimit")
            .then(resp => {
                useTransferInfo.setDownloadLimit(resp.data)
            })
            .catch(error => {
                ElMessage.error(' 请求异常.' + error)
            })
    }
    const setDownloadLimit = (limit: number) => {
        service.get("/api/v2/transfer/setDownloadLimit?limit=" + limit)
            .then(resp => {
                useTransferInfo.setDownloadLimit(limit)
            })
            .catch(error => {
                ElMessage.error(' 请求异常.' + error)
            })
    }
    const getUploadLimit = () => {
        service.get("/api/v2/transfer/uploadLimit")
            .then(resp => {
                useTransferInfo.setUploadLimit(resp.data)
            })
            .catch(error => {
                ElMessage.error(' 请求异常.' + error)
            })
    }
    const setUploadLimit = (limit: number) => {
        service.get("/api/v2/transfer/setUploadLimit?limit=" + limit)
            .then(resp => {
                useTransferInfo.setUploadLimit(limit)
            })
            .catch(error => {
                ElMessage.error(' 请求异常.' + error)
            })
    }
    return {info, setUploadLimit}
}


export {service as axios, Authentication, Application, TransferInfo}

