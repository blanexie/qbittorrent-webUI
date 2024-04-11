import axios from 'axios'
import {ElMessage} from 'element-plus'


const service = axios.create({
    //  baseURL: "http://192.168.1.6:8080",
    timeout: 30000,// request timeout
    // withCredentials:true
})


//请求拦截器
service.interceptors.request.use(
    config => {
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        //config.headers.cookie = localStorage.getItem("cookie")
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        ElMessage.error(`异常请求：${JSON.stringify(error.message)}`)
    }
)


const Authentication = () => {

    const login = (username: string, password: string) => {
        const from = new FormData()
        from.set("username", username)
        from.set("password", password)
        return service.post('/api/v2/auth/login', from)
    }

    const logout = () => {
        service.get('/api/v2/auth/logout')
            .then(resp => {
                console.log(resp.data)
                localStorage.removeItem("cookie")
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
    }
}

const TransferInfo = (store: any) => {

    /**
     *  获取全局速度限制状态
     */
    const speedLimitsMode = () => {
        service.get('/api/v2/transfer/speedLimitsMode')
            .then(resp => {
                const enable = resp.data
                store.setSpeedLimitsMode(enable)
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
        service.get('/api/v2/transfer/toggleSpeedLimitsMode')
            .then(resp => {
                if (store.infoState.speedLimitsMode) {
                    store.setSpeedLimitsMode(0)
                } else {
                    store.setSpeedLimitsMode(1)
                }
            })
            .catch(error => {
                ElMessage.error(' 请求异常.' + error)
            })
    }
    const getDownloadLimit = () => {
        service.get('/api/v2/transfer/downloadLimit')
            .then(resp => {
                store.setDownloadLimit(resp.data)
            })
            .catch(error => {
                ElMessage.error(' 请求异常.' + error)
            })
    }
    const setDownloadLimit = (limit: number) => {
        service.get('/api/v2/transfer/setDownloadLimit?limit=' + limit)
            .then(resp => {
                store.setDownloadLimit(limit)
            })
            .catch(error => {
                ElMessage.error(' 请求异常.' + error)
            })
    }
    const getUploadLimit = () => {
        service.get('/api/v2/transfer/uploadLimit')
            .then(resp => {
                store.setUploadLimit(resp.data)
            })
            .catch(error => {
                ElMessage.error(' 请求异常.' + error)
            })
    }
    const setUploadLimit = (limit: number) => {
        service.get('/api/v2/transfer/setUploadLimit?limit=' + limit)
            .then(resp => {
                store.setUploadLimit(limit)
            })
            .catch(error => {
                ElMessage.error(' 请求异常.' + error)
            })
    }
    return {setUploadLimit}
}


export {service as axios, Authentication, Application, TransferInfo}

