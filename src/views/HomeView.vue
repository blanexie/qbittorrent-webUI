<template>
  <el-container class="layout-container-demo">
    <el-aside width="230px">
      <AsideComponent></AsideComponent>
    </el-aside>
    <el-container>
      <el-header style="text-align: left;">
        <HeaderComponent></HeaderComponent>
      </el-header>
      <el-main>
        <el-scrollbar>
          <!--         <RouterView></RouterView>-->
          <TorrentList/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AsideComponent from "@/components/AsideComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import TorrentList from "@/views/TorrentList.vue";

import {axios} from '@/requests'
import StoreDefinition from '@/stores'

const storeDefinition = StoreDefinition()

let rid = 0

storeDefinition.interval(() => {
  axios.get('/api/v2/sync/maindata?rid=' + rid).then(resp => {
    storeDefinition.refresh(resp.data.server_state)
    storeDefinition.refreshTorrentInfos(resp.data.torrents)
    rid++
  }).catch(err => {
    console.log(err)
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
