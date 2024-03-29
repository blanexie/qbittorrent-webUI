<template>
  <div class="speed-info-card">
    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">Download Speed</p>
          <p class="speed-limit-content">{{ transferInfoStore.globalInfo.dl_info_speed.getSize() }}
            {{ transferInfoStore.globalInfo.dl_info_speed.getSizeUnit() }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">Upload Speed</p>
          <p class="speed-limit-content">{{ transferInfoStore.globalInfo.up_info_speed.getSize() }}
            {{ transferInfoStore.globalInfo.up_info_speed.getSizeUnit() }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">Download Data</p>
          <p class="speed-limit-content">{{ transferInfoStore.globalInfo.dl_info_data.getSize() }}
            {{ transferInfoStore.globalInfo.dl_info_data.getSizeUnit() }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">Upload Data</p>
          <p class="speed-limit-content">{{ transferInfoStore.globalInfo.dl_info_data.getSize() }}
            {{ transferInfoStore.globalInfo.up_info_data.getSizeUnit() }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">DHT Nodes</p>
          <p class="speed-limit-content">{{ transferInfoStore.globalInfo.dht_nodes }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">Speed Limit</p>
          <el-switch v-model="transferInfoStore.globalInfo.dht_nodes" />&nbsp;
          <el-icon>
            <Setting />
          </el-icon>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.speed-info-card {
  margin-right: 10px;
}

.speed-limit {
  margin: 3px;
  padding: 5px;
  background-color: floralwhite;
  border: 1px #efefef solid;
  border-radius: 7px;
}

.speed-limit-header {
  font-size: 12px;
  padding-bottom: 4px;
}

.speed-limit-content {
  font-size: 20px;
}

</style>
<script lang="ts" setup>


import { TransferInfo } from '@/requests'
import { useTransferInfoStore } from '@/stores/pinia'
import { Setting } from '@element-plus/icons-vue'

const transferInfoStore = useTransferInfoStore()
const transferInfoRequest = TransferInfo(transferInfoStore)


transferInfoStore.interval(() => {
  transferInfoStore.refresh({
    connection_status: 'connected',
    dht_nodes: Math.ceil(Math.random() * 100),
    dl_info_data: 1000001,
    dl_info_speed: Math.ceil(Math.random() * 10000000),
    dl_rate_limit: Math.ceil(Math.random() * 10),
    up_info_data: Math.ceil(Math.random() * 10000000),
    up_info_speed: Math.ceil(Math.random() * 10000000),
    up_rate_limit: Math.ceil(Math.random() * 10)
  })
}, 2000)


</script>