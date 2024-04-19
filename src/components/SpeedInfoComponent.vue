<template>
  <div class="speed-info-card">
    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">下载速度</p>
          <p class="speed-limit-content">{{ globalInfo.dl_info_speed.getSpeedStr() }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">上传速度</p>
          <p class="speed-limit-content">{{ globalInfo.up_info_speed.getSpeedStr() }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">下载量</p>
          <p class="speed-limit-content">{{ globalInfo.dl_info_data.getSizeStr() }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">上传量</p>
          <p class="speed-limit-content">{{ globalInfo.up_info_data.getSizeStr() }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">DHT节点数</p>
          <p class="speed-limit-content">{{ globalInfo.dht_nodes }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="speed-limit">
          <p class="speed-limit-header">限速</p>
          <p class=" speed-set">
            <el-switch v-model=" globalInfo.use_alt_speed_limits" :loading="data.toggleSpeedLimitsModeLoad"
                       @change="toggleSpeedLimitsMode" />&nbsp;&nbsp;
            <el-tooltip content="全局限速设置" effect="light">
              <el-icon @click="openLimitDialog">
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
              <el-select v-model="data.dlLimitUnit" style="width: 80px">
                <el-option label="B/s" :value="1" />
                <el-option label="KB/s" :value="1024" />
                <el-option label="MB/s" :value="1048576" />
                <el-option label="GB/s" :value="1073741824" />
              </el-select>
            </template>
          </el-input>

        </el-form-item>
        <el-form-item label="上传限速">
          <el-input v-model="data.upLimt" placeholder="Please input" class="input-with-select">
            <template #append>
              <el-select v-model="data.upLimitUnit" style="width: 80px">
                <el-option label="B/s" :value="1" />
                <el-option label="KB/s" :value="1024" />
                <el-option label="MB/s" :value="1048576" />
                <el-option label="GB/s" :value="1073741824" />
              </el-select>
            </template>
          </el-input>

        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.dialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="data.setLoading" @click="setLimit">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>
<script lang="ts" setup>
import { axios } from '@/requests'
import StoreDefinition from '@/stores'
import { Operation } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'

const store = StoreDefinition()
const globalInfo = store.globalInfo

const data = reactive({
  dialogVisible: false,
  toggleSpeedLimitsModeLoad: false,
  setLoading: false,
  upLimt: globalInfo.up_rate_limit.getSize(),
  upLimitUnit: globalInfo.up_rate_limit.getUnit(),
  dlLimit: globalInfo.dl_rate_limit.getSize(),
  dlLimitUnit: globalInfo.dl_rate_limit.getUnit()
})

const openLimitDialog = () => {
  //初始化限速值
  data.upLimt = globalInfo.up_rate_limit.getSize()
  data.upLimitUnit = globalInfo.up_rate_limit.getUnit()
  data.dlLimit = globalInfo.dl_rate_limit.getSize()
  data.dlLimitUnit = globalInfo.dl_rate_limit.getUnit()
  data.toggleSpeedLimitsModeLoad = false
  //特殊参数，特殊处理  
  if (data.upLimt == 0) {
    data.upLimitUnit = 1024 * 1024
  }
  if (data.dlLimit == 0) {
    data.dlLimitUnit = 1024 * 1024
  }
  //开启弹窗
  data.dialogVisible = true
}


/**
 * 设置全局限速
 */
const setLimit = () => {
  //设置下载限速
  data.setLoading = true
  const url = '/api/v2/transfer/setDownloadLimit'
  const fromData = new FormData()
  fromData.set('limit', '' + (data.dlLimit * data.dlLimitUnit))
  const dl = axios.post(url, fromData)
  //设置上传速度
  const url2 = '/api/v2/transfer/setUploadLimit'
  const fromData2 = new FormData()
  fromData2.set('limit', '' + (data.upLimitUnit * data.upLimt))
  const up = axios.post(url2, fromData2)
  Promise.all([dl, up]).then(resp => {
    data.setLoading = false
    data.dialogVisible = false
  }).catch(err => {
    data.setLoading = false
  })
}


const toggleSpeedLimitsMode = () => {
  data.toggleSpeedLimitsModeLoad = true
  axios.post('/api/v2/transfer/toggleSpeedLimitsMode').then(resp => {
    console.log('toggleSpeedLimitsMode', resp)
    data.toggleSpeedLimitsModeLoad = false
  }).catch(err => {
    console.log('toggleSpeedLimitsMode', err)
    data.toggleSpeedLimitsModeLoad = false
    ElMessage.error('开启全局限速失败' + err)
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

  border: 1px #b5b5b4 solid;
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
