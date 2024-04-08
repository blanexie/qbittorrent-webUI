<template>
  <div class="speed-info-card">
    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">Download Speed</p>
          <p class="speed-limit-content">{{ storeDefinition.globalInfo.dl_info_speed.getSpeedStr() }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">Upload Speed</p>
          <p class="speed-limit-content">{{ storeDefinition.globalInfo.up_info_speed.getSpeedStr() }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">Download Data</p>
          <p class="speed-limit-content">{{ storeDefinition.globalInfo.dl_info_data.getSizeStr() }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">Upload Data</p>
          <p class="speed-limit-content">{{ storeDefinition.globalInfo.up_info_data.getSizeStr() }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">DHT Nodes</p>
          <p class="speed-limit-content">{{ storeDefinition.globalInfo.dht_nodes }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">Speed Limit</p>
          <el-switch v-model="storeDefinition.globalInfo.dht_nodes"/>&nbsp;
          <el-icon>
            <Setting/>
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
import StoreDefinition from '@/stores'
import {Setting} from '@element-plus/icons-vue'

const storeDefinition = StoreDefinition()

</script>