import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { GlobalSpeedLimit, GlobalInfo } from '@/util'


/**
 * 全局速度相关
 */
const useTransferInfoStore =
  defineStore('info', () => {
      //state

      const store = reactive({
        intervalId: 0,
        globalInfo: new GlobalInfo(),
        globalSpeedLimit: new GlobalSpeedLimit()
      })

      //get方法
      const globalInfo = computed(() => store.globalInfo)
      const globalSpeedLimit = computed(() => store.globalSpeedLimit)

      const interval = (fun: Function, time: number) => {
        clearInterval(store.intervalId)
        store.intervalId = setInterval(fun, time)
      }

      //actions
      const refresh = (infoV: any) => {
        const info = store.globalInfo
        info.dht_nodes = infoV.dht_nodes
        info.dl_info_data.setBytes(infoV.dl_info_data)
        info.dl_info_speed.setBytes(infoV.dl_info_speed)
        info.dl_rate_limit = infoV.dl_rate_limit
        info.up_info_data.setBytes(infoV.up_info_data)
        info.up_info_speed.setBytes(infoV.up_info_speed)
        info.up_rate_limit = infoV.up_rate_limit
      }
      const setSpeedLimitsMode = (enable: number) => {
        const globalSpeedLimit = store.globalSpeedLimit
        globalSpeedLimit.speedLimitsMode = enable
      }
      const setDownloadLimit = (downloadLimit: number) => {
        const globalSpeedLimit = store.globalSpeedLimit
        globalSpeedLimit.downloadLimit.setBytes(downloadLimit)
      }

      const setUploadLimit = (uploadLimit: number) => {
        const globalSpeedLimit = store.globalSpeedLimit
        globalSpeedLimit.uploadLimit.setBytes(uploadLimit)
      }
      return {
        globalInfo,
        globalSpeedLimit,
        interval,
        refresh,
        setSpeedLimitsMode,
        setDownloadLimit,
        setUploadLimit
      }
    }
  )

/**
 * 登录鉴权的cookie
 */
const useAuthStore =
  defineStore('auth', () => {
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