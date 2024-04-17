<template>
  <el-container class="layout-container-demo">
    <el-aside width="220px">
      <AsideComponent></AsideComponent>
    </el-aside>
    <el-container>
      <el-header>
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
import AsideComponent from '@/components/AsideComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import StoreDefinition from '@/stores';
import TorrentList from '@/views/TorrentList.vue';

const store = StoreDefinition()
store.scheduleSyncMainData(true)

console.log("torrentInfos", store.torrentInfos)

</script>

<style scoped>
.layout-container-demo .el-header {
  background-color: #efefef;
  color: var(--el-text-color-primary);
}

.el-main {
  background-color: #f9f9f9;
}
</style>
