import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { GlobalSpeedLimit, Info } from '@/util'


/**
 * 全局速度相关
 */
const useTransferInfoStore = defineStore('info', () => {
    //state

    const store = ref({
      intervalId: 0,
      globalInfo: new Info(),
      globalSpeedLimit: new GlobalSpeedLimit()
    })

    //get方法
    const infoState = computed(() => store.value)
   // const speedLimit = computed(() => store.globalSpeedLimit)

    // const setIntervalId = (intervalId: number) => {
    //     clearInterval(globalInfo.intervalId)
    //     globalInfo.intervalId = intervalId
    // }

    //actions
    // const refresh = (infoV: any) => {
    //     const info = globalInfo.info
    //     info.dht_nodes = infoV.dht_nodes
    //     info.dl_info_data.setBytes(infoV.dl_info_data)
    //     info.dl_info_speed.setBytes(infoV.dl_info_speed)
    //     info.dl_rate_limit = infoV.dl_rate_limit
    //     info.up_info_data.setBytes(infoV.up_info_data)
    //     info.up_info_speed.setBytes(infoV.up_info_speed)
    //     info.up_rate_limit = infoV.up_rate_limit
    // }
    // const setSpeedLimitsMode = (enable: number) => {
    //     const globalSpeedLimit = globalInfo.globalSpeedLimit
    //     globalSpeedLimit.speedLimitsMode = enable
    // }
    // const setDownloadLimit = (downloadLimit: number) => {
    //     const globalSpeedLimit = globalInfo.globalSpeedLimit
    //     globalSpeedLimit.downloadLimit.setBytes(downloadLimit)
    // }
    //
    // const setUploadLimit = (uploadLimit: number) => {
    //     const globalSpeedLimit = globalInfo.globalSpeedLimit
    //     globalSpeedLimit.uploadLimit.setBytes(uploadLimit)
    // }
    return { infoState  }
  }
)

/**
 * 登录鉴权的cookie
 */
const useAuthStore = defineStore('info', () => {
    //state
    const cookie = ref('')
    const login = ref(false)
    //get方法
    const cookieState = computed(() => cookie.value)
    const loginShow = computed(() => login.value)

    //actions
    const setCookie = (cookieV: string) => {
      cookie.value = cookieV
    }
    const setLoginShow = (show: boolean) => {
      login.value = show
    }

    return { loginShow, cookieState, setCookie, setLoginShow }
  }
)


export { useTransferInfoStore, useAuthStore }