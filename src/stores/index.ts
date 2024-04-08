import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { GlobalInfo, GlobalSpeedLimit, TorrentInfo } from '@/util'


/**
 * 全局速度相关
 */
const StoreDefinition =
    defineStore('info', () => {
        //state
        const store = reactive({
            intervalId: 0,
            globalInfo: new GlobalInfo(),
            globalSpeedLimit: new GlobalSpeedLimit(),
            torrentInfos: new Array<TorrentInfo>()
        })

        //get方法
        const globalInfo = computed(() => store.globalInfo)
        const globalSpeedLimit = computed(() => store.globalSpeedLimit)
        const torrentInfos = computed(() => store.torrentInfos)

        const interval = (fun: Function, time: number) => {
            clearInterval(store.intervalId)
            store.intervalId = setInterval(fun, time)
        }

        //actions
        const refresh = (infoV: any) => {
            const info = store.globalInfo
            info.refresh(infoV)
        }

        const refreshTorrentInfos = (ts: any) => {
            const torrentInfos = store.torrentInfos
            const v = new Array()
            //去重
            Object.keys(ts).forEach(it => {
                const tt = torrentInfos.filter(t => {
                    return t.hash === it
                })
                if (tt.length == 0) {
                    v.push({ ...tt, ...ts[it] })
                } else {
                    const ss = { ...{ "hash": it }, ...ts[it] }
                    console.log("ss", ss)
                    v.push(ss)
                }

            })

            torrentInfos.length = 0
            v.forEach(it => {
                console.log(it)
                torrentInfos.push(it)
            })
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
            torrentInfos,
            interval,
            refresh, refreshTorrentInfos,
            setSpeedLimitsMode,
            setDownloadLimit,
            setUploadLimit
        }
    }
    )


export default StoreDefinition