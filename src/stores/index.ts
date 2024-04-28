import { axios } from '@/requests';
import { Preference } from '@/util';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

const StoreDefinition =
    defineStore('preference', () => {
        //state
        const store = reactive({
            preference: new Preference(),
        })

        //get方法
        const globalPreference = computed(() => store.preference)

        const fetchMaindata = async () => {
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

            // const data = initData
            // const fullUpdate = data.full_update ? data.full_update : false
            // store.info.refresh(data.server_state)
            // refreshTorrents(data.torrents, fullUpdate)

            axios.get('/api/v2/sync/maindata?rid=' + preference.rid + "&" + new Date().getTime()).then(resp => {
                const data = resp.data
                
                if (preference.rid != 0) {
                    preference.rid = data.rid
                } else if (data.rid == 1) {
                    preference.rid = data.rid
                } else {
                    //下次请求就是0了
                }
             
                //设置分类和标签
                preference.setCategory(data.categories)
                preference.setTags(data.tags)
                //设置部分全局属性
                preference.refresh(data.server_state)

                //设置各个torrent属性
                const fullUpdate = data.full_update ? data.full_update : false
                refreshTorrents(data.torrents, fullUpdate)



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

        return {
            globalPreference
        }
    })

export default StoreDefinition