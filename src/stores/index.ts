import { axios } from '@/requests';
import { GlobalInfo, Preference, TorrentInfo } from '@/util';
import { ElMessage } from 'element-plus';
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
    const torrentInfos = computed(() => {
      const menu = store.info.currentMenu
      if (menu == 'downloading') {
        return store.torrents.filter(it => it.getCState() == 'downloading')
      }
      if (menu == 'finish') {
        return store.torrents.filter(it => it.getCState() == 'finish')
      }
      if (menu == 'quene') {
        return store.torrents.filter(it => it.getCState() == 'quene')
      }
      if (menu == 'error') {
        return store.torrents.filter(it => it.getCState() == 'error')
      }
      return store.torrents.filter(it => it.getCState() == 'error')
    })

    //actions
    /**
     * 获取同步数据
     * @param reset
     */
    const scheduleSyncMainData = (reset: boolean = false, schedule: boolean = true) => {
      const scheduleTime = 3000
      const info = store.info
      if (reset) {
        console.log("scheduleSyncMainData rest ")
        info.rid = 0
      }

      // const data = initData
      // const fullUpdate = data.full_update ? data.full_update : false
      // refreshInfo(data.server_state)
      // if (data.torrents) {
      //   if (Object.keys(data.torrents).length != store.torrents.length) {
      //     info.rid = 0
      //   }
      //   refreshTorrents(data.torrents, fullUpdate)
      // }

      axios.get('/api/v2/sync/maindata?rid=' + info.rid + "&" + new Date().getTime()).then(resp => {
        info.incrementRid()
        const data = resp.data
        const fullUpdate = data.full_update ? data.full_update : false
        refreshInfo(data.server_state)
        if (data.torrents) {
          refreshTorrents(data.torrents, fullUpdate)
        }
        if (schedule) {
          setTimeout(scheduleSyncMainData, scheduleTime)
        }
      }).catch(err => {
        ElMessage.error('/api/v2/sync/maindata error' + err)
        if (schedule) {
          setTimeout(scheduleSyncMainData, scheduleTime)
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
      scheduleSyncMainData,
      refreshInfo,

    }
  }
  )


export default StoreDefinition