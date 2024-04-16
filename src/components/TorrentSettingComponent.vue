<template>

  <el-row>
    <el-col :span="6">名称:</el-col>
    <el-col :span="17">
      <el-input v-model="setting!.torrentName"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">保存路径:</el-col>
    <el-col :span="17">
      <el-input v-model="setting!.savePath"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">下载限速:</el-col>
    <el-col :span="17">
      <el-input v-model="setting!.downloadLimit" placeholder="Please input" class="input-with-select">
        <template #append>
          <el-select v-model="setting!.downloadLimitUnit" style="width: 80px">
            <el-option label="B/s" :value="1" />
            <el-option label="KB/s" :value="1024" />
            <el-option label="MB/s" :value="1048576" />
            <el-option label="GB/s" :value="1073741824" />
          </el-select>
        </template>
      </el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">上传限速:</el-col>
    <el-col :span="17">
      <el-input v-model="setting!.uploadLimit" placeholder="Please input" class="input-with-select">
        <template #append>
          <el-select v-model="setting!.uploadLimitUnit" style="width: 80px">
            <el-option label="B/s" :value="1" />
            <el-option label="KB/s" :value="1024" />
            <el-option label="MB/s" :value="1048576" />
            <el-option label="GB/s" :value="1073741824" />
          </el-select>
        </template>
      </el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">分类:</el-col>
    <el-col :span="17">
      <el-input v-model="setting!.category"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">标签:</el-col>
    <el-col :span="17">
      <el-input v-model="setting!.tags"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">顺序下载:</el-col>
    <el-col :span="17">
      <el-switch v-model="setting!.sequential" />
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">超级种子:</el-col>
    <el-col :span="17">
      <el-switch v-model="setting!.superSeed" />
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">优先下载首尾:</el-col>
    <el-col :span="17">
      <el-switch v-model="setting!.f_l_piece_prio" />
    </el-col>
  </el-row>

  <el-row>
    <el-col> &nbsp;
    </el-col>
    <el-col>
      <el-button @click="update" :loading="loading" type="primary">修改</el-button>
    </el-col>
  </el-row>

</template>
<script lang="ts" setup>
import { axios } from "@/requests";
import { TorrentInfo, TorrentSetting } from '@/util';
import { ElMessage, ElNotification } from 'element-plus';
import { inject, ref } from "vue";
const torrentInfo = inject<TorrentInfo>("torrent")
const setting = defineModel<TorrentSetting>()

const loading = ref(false)


if (setting.value?.downloadLimit === 0) {
  setting.value.downloadLimitUnit = 1024
}
if (setting.value?.uploadLimit === 0) {
  setting.value.uploadLimitUnit = 1024
}


const update = () => {
  loading.value = true
  const torrent = torrentInfo?.value
  const set = setting.value
  if (set && torrent) {
    /* empty */
  } else {
    ElMessage.error("页面加载数据失败，无法修改")
    loading.value = false
    return
  }
  const promises = []
  //超级种子
  if (set.superSeed != torrent.super_seeding) {
    const from = new FormData()
    from.set("hashes", torrent.hash)
    from.set("value", set.superSeed + "")
    const url = `/api/v2/torrents/setSuperSeeding`
    const promise = axios.post(url, from).then(resp => {
      console.log(resp)
      ElMessage.success("设置超级种子成功")
    }).catch(error => {
      ElMessage.error("设置超级种子失败，" + error)
    })
    promises.push(promise)
  }

  //顺序下载
  if (set.sequential != torrent.seq_dl) {
    const from = new FormData()
    from.set("hashes", torrent.hash)
    const url = `/api/v2/torrents/toggleSequentialDownload`
    const promise = axios.post(url, from).then(resp => {
      console.log(resp)
      ElMessage.success("设置顺序下载成功")
    }).catch(error => {
      ElMessage.error("设置顺序下载失败，" + error)
    })
    promises.push(promise)
  }

  //名称
  if (set.torrentName != torrent.name) {
    const from = new FormData()
    from.set("hash", torrent.hash)
    from.set("name", set.torrentName)
    const url = '/api/v2/torrents/rename'
    const promise = axios.post(url, from).then(resp => {
      console.log(resp)
      ElMessage.success("修改名称成功")
    }).catch(error => {
      ElMessage.error("修改名称成功失败，" + error)
    })
    promises.push(promise)
  }

  //保存路径
  if (set.savePath !== torrent.save_path) {
    const from = new FormData()
    from.set("hashes", torrent.hash)
    from.set("location", set.savePath)
    const url = '/api/v2/torrents/setLocation'
    const promise = axios.post(url, from).then(resp => {
      console.log(resp)
      ElMessage.success("修改保存路径成功")
    }).catch(error => {
      ElMessage.error("修改保存路径成功" + error)
    })
    promises.push(promise)
  }
  //下载限速
  const dlLimit = set.downloadLimit * set.downloadLimitUnit
  if (dlLimit != torrent.dl_limit.bytes) {
    const from = new FormData()
    from.set("hashes", torrent.hash)
    from.set("limit", dlLimit + "")
    const url = '/api/v2/torrents/setDownloadLimit'
    const promise = axios.post(url, from).then(resp => {
      console.log(resp)
      ElMessage.success("修改下载限速成功")
    }).catch(error => {
      ElMessage.error("修改下载限速失败" + error)
    })
    promises.push(promise)
  }
  //上传限速
  const upLimit = set.uploadLimit * set.uploadLimitUnit
  if (upLimit != torrent.up_limit.bytes) {
    const from = new FormData()
    from.set("hashes", torrent.hash)
    from.set("limit", upLimit + "")
    const url = '/api/v2/torrents/setUploadLimit'
    const promise = axios.post(url, from).then(resp => {
      console.log(resp)
      ElMessage.success("修改上传限速成功")
    }).catch(error => {
      ElMessage.error("修改上传限速失败" + error)
    })
    promises.push(promise)
  }

  Promise.all(promises).then(resp => {

  }).catch(error => {
    ElNotification({
      title: 'Error',
      message: "修改有失败" + error,
      type: 'error',
    })
  })
  loading.value = false
  set.firstOpen = true
}


</script>
<style scoped>
.el-row {
  margin-top: 10px;

  .el-col:first-child {
    text-align: right;
    padding-right: 10px;
  }
}
</style>