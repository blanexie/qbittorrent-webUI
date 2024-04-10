<template>
  <div class="speed-info-card">
    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">下载速度</p>
          <p class="speed-limit-content">{{ storeDefinition.globalInfo.dl_info_speed.getSpeedStr() }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">上传速度</p>
          <p class="speed-limit-content">{{ storeDefinition.globalInfo.up_info_speed.getSpeedStr() }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">下载量</p>
          <p class="speed-limit-content">{{ storeDefinition.globalInfo.dl_info_data.getSizeStr() }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">上传量</p>
          <p class="speed-limit-content">{{ storeDefinition.globalInfo.up_info_data.getSizeStr() }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">DHT节点数</p>
          <p class="speed-limit-content">{{ storeDefinition.globalInfo.dht_nodes }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">限速</p>
          <el-switch v-model="storeDefinition.globalInfo.dht_nodes" />&nbsp;
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
import { Setting } from '@element-plus/icons-vue'

const storeDefinition = StoreDefinition()

</script>