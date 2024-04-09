import {computed, reactive} from 'vue'
import {defineStore} from 'pinia'
import {GlobalInfo, GlobalSpeedLimit, mergeObj, TorrentInfo} from '@/util'


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

            const stopInterval = () => {
                clearInterval(store.intervalId)
            }

            //actions
            const refresh = (infoV: any) => {
                const info = store.globalInfo
                mergeObj(info, infoV)
            }

            const refreshTorrentInfos = (ts: any, fullUpdate: boolean) => {
                const torrentInfos = store.torrentInfos
                const keys = Object.keys(ts)
                if (fullUpdate) {
                    //第一步清空
                    torrentInfos.length = 0
                    for (const key of keys) {
                        const torrent =  new TorrentInfo()
                        torrent.hash = key
                        const obj = mergeObj(torrent, ts[key])
                        torrentInfos.push(obj)
                    }
                } else {
                    for (const torrentInfo of torrentInfos) {
                        const hash = torrentInfo.hash
                        mergeObj(torrentInfo, ts[hash])
                    }
                }
                console.log('torrentInfos', torrentInfos)
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
                stopInterval,
                refresh,
                refreshTorrentInfos,
                setSpeedLimitsMode,
                setDownloadLimit,
                setUploadLimit
            }
        }
    )


export default StoreDefinition