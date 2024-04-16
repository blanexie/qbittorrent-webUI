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
      <el-button @click="update" type="primary">修改</el-button>
    </el-col>
  </el-row>

</template>
<script lang="ts" setup>
import { TorrentSetting } from '@/util';

const setting = defineModel<TorrentSetting>()

console.log("setting", setting)


const update = () => {

  // //超级种子
  // if (setting.superSeed != torrent.super_seeding) {
  //   const url = `/api/v2/torrents/setSuperSeeding?hashes=${torrent.hash}?value=${setting.superSeed}`
  //   axios.get(url).then(resp => {

  //   })
  // }

  // //顺序下载
  // if (setting.sequential != torrent.seq_dl) {
  //   const url = `/api/v2/torrents/toggleSequentialDownload?hashes=${torrent.hash}`
  //   axios.get(url).then(resp => {

  //   })
  // }

  // //名称
  // if (setting.torrentName != torrent.name) {
  //   const url = '/api/v2/torrents/rename?hash=' + torrent?.hash + '&name=' + setting.torrentName
  //   axios.get(url).then(resp => {

  //   })
  // }

  // //保存路径
  // if (setting.savePath !== torrent.content_path) {
  //   const url = '/api/v2/torrents/setLocation?hashes=' + torrent?.hash + '&location=' + setting.savePath
  //   axios.get(url).then(resp => {

  //   })
  // }
  // //下载限速
  // const dlLimit = setting.downloadLimit * setting.downloadLimitUnit
  // if (dlLimit != torrent.dl_limit.bytes) {
  //   const url = '/api/v2/torrents/setDownloadLimit?hashes=' + torrent?.hash + '&limit=' + dlLimit
  //   axios.get(url).then(resp => {

  //   })
  // }
  // //上传限速
  // const upLimit = setting.uploadLimit * setting.uploadLimitUnit
  // if (upLimit != torrent.up_limit.bytes) {
  //   const url = '/api/v2/torrents/setUploadLimit?hashes=' + torrent?.hash + '&limit=' + upLimit
  //   axios.get(url).then(resp => {

  //   })
  // }

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