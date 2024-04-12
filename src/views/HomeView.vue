<template>
  <el-container class="layout-container-demo">
    <el-aside width="220px">
      <AsideComponent></AsideComponent>
    </el-aside>
    <el-container>
      <el-header style="text-align: left;">
        <HeaderComponent></HeaderComponent>
      </el-header>
      <el-main>
        <el-scrollbar>
          <TorrentList />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AsideComponent from '@/components/AsideComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { axios } from '@/requests'
import StoreDefinition from '@/stores'
import TorrentList from '@/views/TorrentList.vue'
import { ElMessage } from 'element-plus'
import { initData, syncData } from '@/util/test'

const store = StoreDefinition()


const globalPreference = store.globalPreference

const syncData1 = () => {
  let rid = globalPreference.rid
  axios.get('/api/v2/sync/maindata?rid=' + rid).then(resp => {
    const data = resp.data
    const fullUpdate = data.full_update ? data.full_update : false
    store.refreshInfo(data.server_state)
    store.refreshTorrents(data.torrents, fullUpdate)
    globalPreference.incrementRid()
  }).catch(err => {
    ElMessage.error('/api/v2/sync/maindata error' + err)
    globalPreference.stopInterval()
  })
}

//syncInfo.startInterval(syncData, 3000)
globalPreference.startInterval(() => {
  let rid = globalPreference.rid
  if (rid == 1) {
    const data = initData
    const fullUpdate = data.full_update ? data.full_update : false
    store.refreshInfo(data.server_state)
    store.refreshTorrents(data.torrents, fullUpdate)
    globalPreference.incrementRid()
  } else {
    const data = syncData
    const fullUpdate = data.full_update ? data.full_update : false
    store.refreshInfo(data.server_state)
    store.refreshTorrents(data.torrents, fullUpdate)
    globalPreference.incrementRid()
  }

}, 3000)

</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: #efefef;
  color: var(--el-text-color-primary);
}
</style>
