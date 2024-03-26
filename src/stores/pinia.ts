import {computed, ref, reactive} from 'vue'
import {defineStore} from 'pinia'

/**
 * 全局速度相关
 */
const useTransferInfoStore = defineStore('info', () => {
        //state
        const info = reactive({
            connection_status: 'connected',
            dht_nodes: 0,
            dl_info_data: 0,
            dl_info_speed: 0,
            dl_rate_limit: 0,
            up_info_data: 0,
            up_info_speed: 0,
            up_rate_limit: 0
        })
        //get方法
        const infoState = computed(() => info)
        //actions
        const refresh = (infoV: any) => {
            info.dl_info_data = infoV.dl_info_data
            info.dht_nodes = infoV.dht_nodes
            info.dl_info_data = infoV.dl_info_data
            info.dl_info_speed = infoV.dl_info_speed
            info.dl_rate_limit = infoV.dl_rate_limit
            info.up_info_data = infoV.up_info_data
            info.up_info_speed = infoV.up_info_speed
            info.up_rate_limit = infoV.up_rate_limit
        }
        return {info, infoState, refresh}
    }
)

/**
 * 登录鉴权的cookie
 */
const useAuthStore = defineStore('info', () => {
        //state
        const cookie = ref("")
        //get方法
        const cookieState = computed(() => cookie.value)
        //actions
        const setCookie = (cookieV: string) => {
            cookie.value = cookieV
        }
        return {cookie, cookieState, setCookie}
    }
)


export {useTransferInfoStore, useAuthStore}