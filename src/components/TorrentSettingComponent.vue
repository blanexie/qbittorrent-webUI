<template>

  <el-row>
    <el-col :span="6">名称:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.torrentName"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">保存路径:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.savePath"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">下载限速:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.downloadLimit.bytes"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">上传限速:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.uploadLimit.bytes"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">分类:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.category"></el-input>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="6">标签:</el-col>
    <el-col :span="17">
      <el-input v-model="setting.tags"></el-input>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="6">顺序下载:</el-col>
    <el-col :span="17">
      <el-switch v-model="setting.sequential" />
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">超级种子:</el-col>
    <el-col :span="17">
      <el-switch v-model="setting.superSeed" />
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">优先下载首尾:</el-col>
    <el-col :span="17">
      <el-switch v-model="setting.f_l_piece_prio" />
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="6">自动Torrent管理:</el-col>
    <el-col :span="17">
      <el-switch v-model="setting.autoManagement" />
    </el-col>
  </el-row>

  <el-row>
    <el-col>
      <el-button @click="update" type="primary">修改</el-button>
    </el-col>
  </el-row>

</template>
<script lang="ts" setup>
import StoreDefinition from '@/stores';
import { ByteData } from '@/util';
import { reactive } from 'vue';
const store = StoreDefinition()
const torrentInfo = store.globalInfo.currentTorrent


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
  autoManagement = true
}

const setting = reactive(new Setting())

const torrent = torrentInfo!!
setting.savePath = torrent.content_path
setting.superSeed = torrent.super_seeding
setting.sequential = torrent.seq_dl
setting.uploadLimit = torrent.up_limit
setting.downloadLimit = torrent.dl_limit
setting.category = torrent.category
setting.tags = torrent.tags.split(',')
setting.torrentName = torrent.name




const update = () => {



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