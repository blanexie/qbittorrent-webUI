import { axios } from "@/requests";
import { GlobalInfo, Preference, TorrentInfo } from '@/util';
import { ElMessage } from "element-plus";
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';


/**
 * 全局速度相关
 */
const StoreDefinition =
    defineStore('info', () => {
        //state
        const store = reactive({
            preference: new Preference(),
            info: new GlobalInfo(),
            torrents: new Array<TorrentInfo>()
        })

        //get方法
        const globalPreference = computed(() => store.preference)
        const globalInfo = computed(() => store.info)
        const torrentInfos = computed(() => store.torrents)

        //actions
        /**
         * 获取同步数据
         * @param reset
         */
        const scheduleSyncMainData = (reset: boolean = false, schedule: boolean = true) => {
            const info = store.info
            if (reset) {
                info.rid = 0
            }
            axios.get('/api/v2/sync/maindata?rid=' + info.rid + "&" + new Date().getTime()).then(resp => {
                const data = resp.data
                const fullUpdate = data.full_update ? data.full_update : false
                refreshInfo(data.server_state)
                if (data.torrents) {
                    refreshTorrents(data.torrents, fullUpdate)
                }
                info.incrementRid()
                if (schedule) {
                    setTimeout(scheduleSyncMainData, 1500)
                }
            }).catch(err => {
                ElMessage.error('/api/v2/sync/maindata error' + err)
                if (schedule) {
                    setTimeout(scheduleSyncMainData, 1500)
                }
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
        }



        return {
            globalPreference,
            globalInfo,
            torrentInfos,
            syncMainData: scheduleSyncMainData,
            refreshInfo,
        }
    }
    )


export default StoreDefinition