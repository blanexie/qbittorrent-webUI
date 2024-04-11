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
import TorrentList from '@/views/TorrentList.vue'
import StoreDefinition from '@/stores'
import { axios } from '@/requests'
import { ElMessage } from 'element-plus'

const storeDefinition = StoreDefinition()

let rid = 0

storeDefinition.interval(() => {
  axios.get('/api/v2/sync/maindata?rid=' + rid).then(resp => {
    const data = resp.data
    const fullUpdate = data.full_update ? data.full_update : false
    storeDefinition.refreshInfo(data.server_state)
    storeDefinition.refreshTorrents(data.torrents, fullUpdate)
    rid++
  }).catch(err => {
    ElMessage.error('/api/v2/sync/maindata error' + err)
    rid = 0
    storeDefinition.stopInterval()
  })
}, 3000)


</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: #efefef;
  color: var(--el-text-color-primary);
}
</style>
