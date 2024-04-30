import { axios } from '@/requests';
import { Preference, Torrent, TorrentFile } from '@/util';
import { Tags, catogry, files2, initData, preferenece, trackers } from '@/util/test';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

const test = true

const StoreDefinition =
    defineStore('preference', () => {
        //state
        const store = reactive<{
            preference: Preference;
            torrents: Torrent[];
        }>({
            preference: new Preference(),
            torrents: [],
        })

        //get方法
        const globalPreference = computed(() => store.preference)

        const showTorrents = computed(() => {
            const menu = store.preference.currentMenu
            return store.preference.getTorrents(menu)
        })

        const fetchFiles = async (torrent: Torrent) => {
            if (test) {
                const data = files2
                torrent.refreshFiles(data.map(it => it as TorrentFile))
                return
            }

            const hash = torrent.hash
            const url = '/api/v2/torrents/files?hash=' + hash + '&' + new Date().getTime()
            return axios.get(url).then(resp => {
                torrent.refreshFiles(resp.data)
            }).catch(error => {
                ElMessage.error("获取内容信息失败" + error)
            })
        }

        const fetchTracker = async (torrent: Torrent) => {
            if (test) {
                const data = trackers
                torrent.refreshTracker(data)
                return
            }
            const url = '/api/v2/torrents/trackers?hash=' + torrent.hash
            return axios.get(url).then(resp => {
                torrent.refreshTracker(resp.data)
            }).catch(err => {
                ElMessage.error("获取内容信息失败" + err)
            })
        }

        const fetchPreference = async () => {
            if (test) {
                const data = preferenece
                console.log("store.preference", data)
                store.preference.refresh(data)
                console.log("store.preference", data)
                return
            }
            return axios.get('/api/v2/app/preferences')
                .then(resp => {
                    console.log("store.preference", resp.data)
                    store.preference.refresh(resp.data)
                    console.log("store.preference", resp.data)
                })
                .catch(err => {
                    ElMessage.error("获取配置失败")
                    console.log(err)
                })
        }

        const fetchCategoryAndTags = async () => {
            const preference = store.preference

            if (test) {
                preference.setTags(Tags)
                preference.setCategory(catogry)
                return
            }

            const categories = axios.get('/api/v2/torrents/categories').then(resp => {
                preference.setCategory(resp.data)
            }).catch(error => {
                ElMessage.error("获取分类失败" + error)
            })

            //获取所有的标签
            const tags = axios.get('/api/v2/torrents/tags').then(resp => {
                console.log(resp.data)
                const tags = resp.data as string[]
                preference.setTags(tags)
            }).catch(error => {
                ElMessage.error("获取标签失败" + error)
            })

            return Promise.all([categories, tags]).then(() => {
                console.log("更新分类和标签成功")
            })
        }

        const scheduleMaindata = async () => {
            const preference = store.preference
            if (preference.isRequesting) {
                console.log("正在请求中")
                return
            }
            preference.isRequesting = true
            let rid = preference.rid
            //检查本次请求是否需要重置
            if (preference.resetRid) {
                rid = 0
                preference.resetRid = false
            }

            if (test) {
                const data = initData
                preference.setCategory(data.categories)
                preference.setTags(data.tags)
                //设置部分全局属性
                preference.refresh(data.server_state)
                //设置各个torrent属性
                const fullUpdate = data.full_update ? data.full_update : false
                preference.refreshTorrents(data.torrents, fullUpdate)
                preference.isRequesting = false
                return
            }
            
            axios.get('/api/v2/sync/maindata?rid=' + rid + "&" + new Date().getTime()).then(resp => {
                const data = resp.data
                preference.rid = data.rid
                //设置分类和标签
                preference.setCategory(data.categories)
                preference.setTags(data.tags)
                //设置部分全局属性
                preference.refresh(data.server_state)
                //设置各个torrent属性
                const fullUpdate = data.full_update ? data.full_update : false
                preference.refreshTorrents(data.torrents, fullUpdate)
                preference.isRequesting = false
                //继续下载请求
                setTimeout(scheduleMaindata, preference.refresh_interval)
            }).catch(err => {
                ElMessage.error('/api/v2/sync/maindata error' + err)
                preference.isRequesting = false
                setTimeout(scheduleMaindata, preference.refresh_interval)
            })
        }

        return {
            globalPreference, showTorrents, fetchFiles, fetchTracker, fetchPreference, fetchCategoryAndTags, scheduleMaindata
        }
    })

export default StoreDefinition