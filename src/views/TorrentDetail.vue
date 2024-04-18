<template>
  <el-drawer v-model="globalInfo.showDetail" :with-header="false" direction="rtl" size="600">

    <el-text size="large" truncated>
      {{ globalInfo.currentTorrent?.name }}
    </el-text>

    <el-tabs :before-leave="beforeLeave" v-model="active">
      <el-tab-pane label="Props" name="Props">
        <TorrentPropsComponent></TorrentPropsComponent>
      </el-tab-pane>

      <el-tab-pane label="Setting" name="Setting">
        <TorrentSettingComponent></TorrentSettingComponent>
      </el-tab-pane>

      <el-tab-pane label="Files" name="Files">
        <TorrentContentComponent></TorrentContentComponent>
      </el-tab-pane>

      <el-tab-pane label="Tackers" name="Tackers">Task</el-tab-pane>

    </el-tabs>
  </el-drawer>
</template>

<script setup lang="ts">
import TorrentContentComponent from '@/components/TorrentContentComponent.vue';
import TorrentPropsComponent from '@/components/TorrentPropsComponent.vue';
import TorrentSettingComponent from '@/components/TorrentSettingComponent.vue';
import { axios } from '@/requests';
import StoreDefinition from '@/stores';
import { TorrentFile } from '@/util';
import { files2 } from '@/util/test';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const store = StoreDefinition()
const globalInfo = store.globalInfo
const active = ref("Props")

const beforeLeave = (activeName: string) => {
  console.log(activeName)
  if (activeName == "Files") {
    const tfiles = files2.map(it => it as TorrentFile)
    globalInfo.refreshFiles(tfiles)
    //refreshFiles()
  }
}

const refreshFiles = () => {
  const hash = globalInfo.currentTorrent?.hash
  const url = '/api/v2/torrents/files?hash=' + hash + '&' + new Date().getTime()

  axios.get(url).then(resp => {
    globalInfo.refreshFiles(resp.data)
  }).catch(error => {
    ElMessage.error("获取内容信息失败" + error)
  })
}

</script>
<style scoped>
.el_drawer__body {
  padding-top: 0;
}
</style>