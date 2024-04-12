import {GlobalInfo, GlobalSpeedLimit, Preference, TorrentInfo} from '@/util'
import {defineStore} from 'pinia'
import {computed, reactive} from 'vue'
import {axios} from "@/requests";
import {ElMessage} from "element-plus";


/**
 * 全局速度相关
 */
const StoreDefinition =
    defineStore('info', () => {
            //state
            const store = reactive({
                preference: new Preference(),
                info: new GlobalInfo(),
                speedLimit: new GlobalSpeedLimit(),
                torrents: new Array<TorrentInfo>()
            })

            //get方法
            const globalPreference = computed(() => store.preference)
            const globalInfo = computed(() => store.info)
            const globalSpeedLimit = computed(() => store.speedLimit)
            const torrentInfos = computed(() => store.torrents)

            //actions
            /**
             * 获取同步数据
             * @param reset
             */
            const syncMainData = (reset: boolean = false) => {
                const perference = store.preference
                if (reset) {
                    perference.rid = 0
                }
                axios.get('/api/v2/sync/maindata?rid=' + perference.rid).then(resp => {
                    const data = resp.data
                    const fullUpdate = data.full_update ? data.full_update : false
                    refreshInfo(data.server_state)
                    refreshTorrents(data.torrents, fullUpdate)
                    perference.incrementRid()
                }).catch(err => {
                    ElMessage.error('/api/v2/sync/maindata error' + err)
                    perference.stopInterval()
                })
            }

            /**
             *
             * @param infoV 更新全局的信息
             */
            const refreshInfo = (infoV: any) => {
                store.info.refresh(infoV)
            }

            /**
             * 更新 torrents列表信息
             * @param ts
             * @param fullUpdate  是否全量替换
             */
            const refreshTorrents = (ts: any, fullUpdate: boolean) => {
                const torrents = store.torrents
                if (fullUpdate) {
                    //第一步清空
                    torrents.length = 0
                    //转换装载对象
                    Object.keys(ts)
                        .map(key => new TorrentInfo(key).refresh(ts[key]))
                        .sort((a, b) => b.properties.addition_date - a.properties.addition_date)
                        .forEach(it => torrents.push(it))
                } else {
                    torrents.forEach(it => it.refresh(ts[it.hash]))
                }

                console.log('torrentInfos ', new Date(), torrents)
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
                globalPreference,
                globalInfo,
                globalSpeedLimit,
                torrentInfos,
                syncMainData,
                refreshInfo,
                setSpeedLimitsMode,
                setDownloadLimit,
                setUploadLimit
            }
        }
    )


export default StoreDefinition