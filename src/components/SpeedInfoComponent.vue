<template>
  <div class="speed-info-card">
    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">下载速度</p>
          <p class="speed-limit-content">{{ store.globalInfo.dl_info_speed.getSpeedStr() }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">上传速度</p>
          <p class="speed-limit-content">{{ store.globalInfo.up_info_speed.getSpeedStr() }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">下载量</p>
          <p class="speed-limit-content">{{ store.globalInfo.dl_info_data.getSizeStr() }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">上传量</p>
          <p class="speed-limit-content">{{ store.globalInfo.up_info_data.getSizeStr() }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">DHT节点数</p>
          <p class="speed-limit-content">{{ store.globalInfo.dht_nodes }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">限速</p>
          <p class=" speed-set">
            <el-switch v-model="store.globalInfo.use_alt_speed_limits" :loading="data.toggleSpeedLimitsModeLoad"
              @change="toggleSpeedLimitsMode" />&nbsp;&nbsp;
            <el-tooltip content="全局限速设置" effect="light">
              <el-icon @click="data.dialogVisible = !data.dialogVisible">
                <Operation />
              </el-icon>
            </el-tooltip>
          </p>
        </div>
      </el-col>
    </el-row>

    <el-dialog v-model="data.dialogVisible" title="全局限速设置" width="400">

      <el-form label-position="right" label-width="auto">
        <el-form-item label="下载限速">
          <el-input v-model="data.dlLimit" placeholder="Please input" class="input-with-select">
            <template #append>
              <el-select v-model="select" style="width: 80px">
                <el-option label="KB" value="1024" />
                <el-option label="MB" value="1,048,576" />
              </el-select>
            </template>
          </el-input>

        </el-form-item>
        <el-form-item label="上传限速">
          <el-input v-model="data.upLimt" placeholder="Please input" class="input-with-select">
            <template #append>
              <el-select v-model="select" style="width: 80px">
                <el-option label="KB" value="1024" />
                <el-option label="MB" value="1,048,576" />
              </el-select>
            </template>
          </el-input>

        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="data.dialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>
<script lang="ts" setup>
import { axios } from '@/requests';
import StoreDefinition from '@/stores';
import { Operation } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
const store = StoreDefinition()

const data = reactive({
  dialogVisible: false,
  toggleSpeedLimitsModeLoad: false,
  upLimt: store.globalInfo.up_rate_limit.bytes,
  dlLimit: store.globalInfo.dl_rate_limit.bytes
})



const toggleSpeedLimitsMode = () => {
  data.toggleSpeedLimitsModeLoad = true
  axios.post("/api/v2/transfer/toggleSpeedLimitsMode").then(resp => {
    console.log("toggleSpeedLimitsMode", resp)
    data.toggleSpeedLimitsModeLoad = false
  }).catch(err => {
    console.log("toggleSpeedLimitsMode", err)
    data.toggleSpeedLimitsModeLoad = false
    ElMessage.error("开启全局限速失败" + err)
  })
}


</script>
<style scoped>
.speed-info-card {
  margin-right: 10px;
}

.speed-limit {
  margin: 3px;
  padding: 7px;

  border: 1px #91949a solid;
  border-radius: 10px;
}

.speed-limit:hover {
  border: 1px var(--border-color) solid;
}

.speed-limit-header {
  font-size: 12px;
  padding-bottom: 4px;

  .el-icon {
    margin-top: 200px;
  }
}

.speed-limit-content {
  font-size: 20px;
}

.speed-set {
  display: flex;
  align-items: center;
  font-size: 20px;

  .el-icon {
    cursor: pointer;
  }
}

.speed-set:hover {
  color: var(--border-color);
}
</style>
