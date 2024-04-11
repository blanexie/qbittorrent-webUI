import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { GlobalInfo, GlobalSpeedLimit, mergeObj, TorrentInfo } from '@/util'


/**
 * 全局速度相关
 */
const StoreDefinition =
  defineStore('info', () => {
      //state
      const store = reactive({
        intervalId: 0,
        info: new GlobalInfo(),
        speedLimit: new GlobalSpeedLimit(),
        torrents: new Array<TorrentInfo>()
      })

      //get方法
      const globalInfo = computed(() => store.info)
      const globalSpeedLimit = computed(() => store.speedLimit)
      const torrentInfos = computed(() => store.torrents)

      //actions
      const interval = (fun: Function, time: number) => {
        clearInterval(store.intervalId)
        store.intervalId = setInterval(fun, time)
      }

      const stopInterval = () => {
        clearInterval(store.intervalId)
      }

      /**
       *
       * @param infoV 更新全局的信息
       */
      const refreshInfo = (infoV: any) => {
        const info = store.info
        mergeObj(info, infoV)
      }

      /**
       * 更新 torrents列表信息
       * @param ts
       * @param fullUpdate  是否全量替换
       */
      const refreshTorrents = (ts: any, fullUpdate: boolean) => {
        const torrents = store.torrents
        const keys = Object.keys(ts)
        if (fullUpdate) {
          //第一步清空
          torrents.length = 0
          //转换装载对象
          keys.map(key => mergeObj(new TorrentInfo(key), ts[key]))
            .map(it => it as TorrentInfo)
            .sort((a, b) => b.properties.addition_date - a.properties.addition_date)
            .forEach(it => torrents.push(it))
        } else {
          for (const torrentInfo of torrents) {
            mergeObj(torrentInfo, ts[torrentInfo.hash])
          }
        }

        console.log('torrentInfos', torrents)
      }

      const setSpeedLimitsMode = (enable: number) => {
        const globalSpeedLimit = store.speedLimit
        globalSpeedLimit.speedLimitsMode = enable
      }
      const setDownloadLimit = (downloadLimit: number) => {
        const globalSpeedLimit = store.speedLimit
        globalSpeedLimit.downloadLimit.setBytes(downloadLimit)
      }

      const setUploadLimit = (uploadLimit: number) => {
        const globalSpeedLimit = store.speedLimit
        globalSpeedLimit.uploadLimit.setBytes(uploadLimit)
      }

      return {
        globalInfo,
        globalSpeedLimit,
        torrentInfos,
        interval,
        stopInterval,
        refreshInfo,
        refreshTorrents,
        setSpeedLimitsMode,
        setDownloadLimit,
        setUploadLimit
      }
    }
  )


export default StoreDefinition