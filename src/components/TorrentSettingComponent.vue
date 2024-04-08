<template>
  <el-row>
    <el-col :span="7">Save Path:</el-col>
    <el-col :span="17">
      <el-input v-model="set.savePath"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="7">Download Limit:</el-col>
    <el-col :span="17">
      <el-input v-model="set.downloadLimit.bytes "></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="7">Share Limit:</el-col>
    <el-col :span="17">
      <el-input v-model="set.shareLimit.bytes"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="7">Upload Limit:</el-col>
    <el-col :span="17">
      <el-input v-model="set.uploadLimit.bytes"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="7">Piece Size:</el-col>
    <el-col :span="17">
      {{ torrentInfo?.properties.piece_size }}
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="7">Piece Num:</el-col>
    <el-col :span="17">
      {{ torrentInfo?.properties.pieces_have }} / {{ torrentInfo?.properties.pieces_num }}
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="7">Piece Num:</el-col>
    <el-col :span="17">
      {{ torrentInfo?.properties.pieces_have }} / {{ torrentInfo?.properties.pieces_num }}
    </el-col>
  </el-row>
  <el-row>
    <el-col></el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { ByteData, TorrentInfo, TorrentProperties } from '@/util'
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { axios } from '@/requests'

const torrentInfo = defineModel<TorrentInfo>()

class Setting {
  savePath: string = ''
  downloadLimit: ByteData = new ByteData(100)
  uploadLimit: ByteData = new ByteData(100)
  shareLimit: ByteData = new ByteData(100)
}

const set = reactive(new Setting())

const url = '/api/v2/torrents/properties?hash=' + torrentInfo.value?.hash
axios.get(url).then(resp => {
  const tp = resp.data as TorrentProperties
  torrentInfo.value?.setProperties(tp)
}).catch(error => {
  ElMessage.error('获取基本信息失败' + error)
})


</script>
<style scoped>
.el-row {
  margin-top: 10px;

}

</style>