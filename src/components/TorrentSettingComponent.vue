<template>

  <el-row>
    <el-col :span="6">Name:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.torrentName"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">Save Path:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.savePath"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">Download Limit:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.downloadLimit.bytes"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">Upload Limit:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.uploadLimit.bytes"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">Category:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.category"></el-input>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="6">Tag:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.tags"></el-input>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="6">Sequential:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.sequential"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">Super Seed:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.superSeed"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">first/last piece priority:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.f_l_piece_prio"></el-input>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-button @click="update" type="primary">修改</el-button>
    </el-col>
  </el-row>

</template>
<script lang="ts" setup>
import { ByteData, TorrentProperties } from '@/util'
import { TorrentInfo } from "@/util/TorrentInfo";
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { axios } from '@/requests'

const torrentInfo = defineModel<TorrentInfo>()


class Setting {
  savePath: string = ''
  downloadLimit: ByteData = new ByteData(0)
  uploadLimit: ByteData = new ByteData(0)
  torrentName: string = ''
  category: string = ''
  tags: string[] = []
  sequential = false
  superSeed = false
  f_l_piece_prio = false
}


const setting = reactive(new Setting())

const url = '/api/v2/torrents/properties?hash=' + torrentInfo.value?.hash
axios.get(url).then(resp => {
  const tinfo = torrentInfo.value!!

  const tp = resp.data as TorrentProperties
  torrentInfo.value?.setProperties(tp)
  setting.savePath = tp.save_path
  setting.superSeed = tinfo.super_seeding
  setting.sequential = tinfo.seq_dl
  setting.uploadLimit = new ByteData(tp.up_limit)
  setting.downloadLimit = new ByteData(tp.dl_limit)
  setting.category = tinfo.category
  setting.tags = tinfo.tags.split(',')

}).catch(error => {
  ElMessage.error('获取基本信息失败' + error)
})


const update = () => {
  const tp = torrentInfo.value!!.properties
  if (tp.dl_limit === setting.downloadLimit.bytes) {
    console.log('下载速度没有限制')
  } else {
    // 设置上传速度限制
  }



}


</script>
<style scoped>
.el-row {
  margin-top: 10px;

}
</style>