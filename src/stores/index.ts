import {axios} from '@/requests';
import {Preference, Torrent} from '@/util';
import {ElMessage} from 'element-plus';
import {defineStore} from 'pinia';
import {computed, reactive} from 'vue';

const StoreDefinition =
    defineStore('preference', () => {
        //state
        const store = reactive({
            preference: new Preference(),
        })

        //get方法
        const globalPreference = computed(() => store.preference)


        const fetchFiles = async (torrent: Torrent) => {
            const hash = torrent.hash
            const url = '/api/v2/torrents/files?hash=' + hash + '&' + new Date().getTime()
            axios.get(url).then(resp => {
                torrent.refreshFiles(resp.data)
            }).catch(error => {
                ElMessage.error("获取内容信息失败" + error)
            })
        }

        const fetchTracker = async (torrent: Torrent) => {
            const url = '/api/v2/torrents/trackers?hash=' + torrent.hash
            axios.get(url).then(resp => {
                torrent.refreshTracker(resp.data)
            }).catch(err => {
                ElMessage.error("获取内容信息失败" + err)
            })
        }

        const fetchPreference = async () => {
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

            // const data = initData
            // const fullUpdate = data.full_update ? data.full_update : false
            // store.info.refresh(data.server_state)
            // refreshTorrents(data.torrents, fullUpdate)

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
            globalPreference, fetchFiles, fetchTracker, fetchPreference, fetchCategoryAndTags, scheduleMaindata
        }
    })

export default StoreDefinition